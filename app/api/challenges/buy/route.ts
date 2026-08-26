import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

export async function GET(req: Request) {
  try {
    const userId = getUserId(req);

    // ۱. پیدا کردن آیدی چالش‌هایی که کاربر در حال حاضر به صورت ACTIVE یا COMPLETED دارد
    const activeOrCompletedChallenges = await prisma.userChallenge.findMany({
      where: {
        userId,
        status: { in: ["ACTIVE", "COMPLETED"] },
      },
      select: {
        challengeId: true,
      },
    });

    // استخراج آیدی‌ها به صورت یک آرایه ساده از رشته‌ها ['id1', 'id2', ...]
    const excludedChallengeIds = activeOrCompletedChallenges.map(
      (uc) => uc.challengeId,
    );

    // ۲. دریافت چالش‌هایی از سیستم که ادمین فعال نگه داشته و کاربر هنوز در آن‌ها شرکت نکرده است
    const availableChallenges = await prisma.challenge.findMany({
      where: {
        isActive: true, // فقط چالش‌های فعال سیستم
        id: {
          notIn: excludedChallengeIds, // حذف چالش‌هایی که کاربر قبلاً خریده و فعال/کامل هستند
        },
      },
      orderBy: {
        createdAt: "desc", // چالش‌های جدیدتر بالا قرار بگیرند
      },
    });

    return NextResponse.json(availableChallenges, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized or Server Error" },
      { status: 401 },
    );
  }
}

export async function POST(req: Request) {
  try {
    // ۱. اعتبارسنجی کاربر از طریق کوکی توکن (احراز هویت)
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // ۲. دریافت دیتای چالش از ورودی
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 },
      );
    }

    // ۳. پیدا کردن چالش و کیف پول کاربر به صورت همزمان
    const challenge = await prisma.challenge.findUnique({
      where: { id: id },
    });

    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!challenge || !challenge.isActive) {
      return NextResponse.json(
        { error: "Challenge not found or inactive" },
        { status: 404 },
      );
    }

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // ۴. بررسی موجودی کیف پول
    if (wallet.balance < challenge.price) {
      return NextResponse.json(
        { error: "Insufficient wallet balance" },
        { status: 400 },
      );
    }

    // ۵. محاسبه تاریخ پایان چالش (تاریخ امروز + تعداد روزهای چالش)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + challenge.duration);

    // ۶. اجرای تمام عملیات‌ها درون یک Transaction دیتابیس برای امنیت داده‌ها
    const result = await prisma.$transaction(async (tx) => {
      // الف) کسر پول از کیف پول
      const updatedWallet = await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: challenge.price } },
      });

      // ب) ثبت تراکنش مالی خرید چالش
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount: challenge.price,
          type: "CHALLENGE_PURCHASE",
          status: "SUCCESS",
          description: `Purchased challenge: ${challenge.title}`,
        },
      });

      // ج) اضافه کردن چالش به لیست چالش‌های کاربر
      const userChallenge = await tx.userChallenge.create({
        data: {
          userId,
          challengeId: challenge.id,
          status: "ACTIVE",
          totalPaid: 0,
          progress: 0,
          startDate,
          endDate,
        },
      });

      // د) ثبت رویداد خرید چالش در تقویم (برای امروز)
      await tx.calendarEvent.create({
        data: {
          userId,
          title: `Started: ${challenge.title}`,
          description: `You bought and started the ${challenge.title} challenge.`,
          startDate,
          endDate: startDate,
          type: "CHALLENGE_BUY",
          color: "#3b82f6", // آبی برای شروع چالش
        },
      });

      // هـ) ثبت رویداد اتمام چالش در تقویم (برای تاریخ پایان)
      await tx.calendarEvent.create({
        data: {
          userId,
          title: `Deadline: ${challenge.title}`,
          description: `The maximum duration for ${challenge.title} challenge ends today.`,
          startDate: endDate,
          endDate,
          type: "CHALLENGE_END",
          color: "#ef4444", // قرمز برای پایان مهلت چالش
        },
      });

      // و) ثبت نوتیفیکیشن سیستم به انگلیسی
      await tx.notification.create({
        data: {
          userId,
          title: "Challenge Purchased Successfully",
          message: `You have successfully unlocked "${challenge.title}" for ${challenge.price}. Balance deducted.`,
        },
      });

      return { updatedWallet, userChallenge };
    });

    return NextResponse.json(
      {
        message: "Challenge purchased successfully",
        wallet: result.updatedWallet,
        userChallenge: result.userChallenge,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
