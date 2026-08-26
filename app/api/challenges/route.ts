import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}

// دریافت چالش‌های من
export async function GET(req: Request) {
  try {
    const userId = getUserId(req);
    const myChallenges = await prisma.userChallenge.findMany({
      where: { userId },
      include: { challenge: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(myChallenges, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// پرداخت درون چالش و کسر از کیف پول
export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { userChallengeId, amount } = await req.json();

    if (!userChallengeId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
    }

    const userChallenge = await prisma.userChallenge.findUnique({
      where: { id: userChallengeId },
      include: { challenge: true },
    });
    

    if (!userChallenge || userChallenge.status !== "ACTIVE") {
      return NextResponse.json({ error: "Challenge is not active" }, { status: 400 });
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet || wallet.balance < amount) {
      return NextResponse.json({ error: "Insufficient wallet balance" }, { status: 400 });
    }

    // بررسی اتمام زمان چالش قبل از واریز
    if (new Date() > new Date(userChallenge.endDate)) {
      return NextResponse.json({ error: "Challenge duration has expired" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // ۱. کسر از ولت
      await tx.wallet.update({
        where: { userId },
        data: { balance: { decrement: amount } },
      });

      // ۲. ثبت تراکنش کسر وجه چالش
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: "CHALLENGE_PAYMENT",
          status: "SUCCESS",
          description: `Installment for challenge: ${userChallenge.challenge.title}`,
        },
      });

      // ۳. محاسبه پیشرفت جدید
      const newTotalPaid = userChallenge.totalPaid + amount;
      let newProgress = (newTotalPaid / userChallenge.challenge.target) * 100;
      if (newProgress > 100) newProgress = 100;

      let finalStatus = userChallenge.status;

      // اگر کاربر به تارگت رسید، چالش موفقیت‌آمیز تمام می‌شود و پاداش واریز می‌شود
      if (newTotalPaid >= userChallenge.challenge.target) {
        finalStatus = "COMPLETED";

        // واریز پاداش به ولت
        await tx.wallet.update({
          where: { userId },
          data: { balance: { increment: userChallenge.challenge.reward } },
        });

        // ثبت تراکنش پاداش
        await tx.transaction.create({
          data: {
            walletId: wallet.id,
            amount: userChallenge.challenge.reward,
            type: "REWARD",
            status: "SUCCESS",
            description: `Reward for completing: ${userChallenge.challenge.title}`,
          },
        });

        // نوتیفیکیشن موفقیت چالش
        await tx.notification.create({
          data: {
            userId,
            title: "Challenge Completed!",
            message: `Congratulations! You accomplished "${userChallenge.challenge.title}" and won a reward of ${userChallenge.challenge.reward}!`,
          },
        });
      }

      // آپدیت وضعیت چالش کاربر
      const updatedUserChallenge = await tx.userChallenge.update({
        where: { id: userChallengeId },
        data: {
          totalPaid: newTotalPaid,
          progress: newProgress,
          status: finalStatus,
        },
      });

      return updatedUserChallenge;
    });
    return NextResponse.json({ message: "Payment processed successfully", data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}