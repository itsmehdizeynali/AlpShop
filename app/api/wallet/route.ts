import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

// GET: دریافت موجودی و تاریخچه تراکنش‌ها
export async function GET(req: Request) {
  try {
    const userId = getUserId(req);
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });
    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// POST: شارژ یا برداشت از کیف پول
export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { amount, type } = await req.json(); // type: "DEPOSIT" | "WITHDRAW"

    if (!amount || amount <= 0 || !["DEPOSIT", "WITHDRAW"].includes(type)) {
      return NextResponse.json({ error: "Invalid action parameters" }, { status: 400 });
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) return NextResponse.json({ error: "Wallet not found" }, { status: 404 });

    if (type === "WITHDRAW" && wallet.balance < amount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // تغییر موجودی بر اساس نوع درخواست
      const updatedWallet = await tx.wallet.update({
        where: { userId },
        data: {
          balance: type === "DEPOSIT" ? { increment: amount } : { decrement: amount },
        },
      });

      // ثبت تراکنش مالی
      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type,
          status: "SUCCESS",
          description: type === "DEPOSIT" ? "Wallet top-up" : "Wallet withdrawal",
        },
      });

      // ثبت در رویدادهای تقویم
      await tx.calendarEvent.create({
        data: {
          userId,
          title: type === "DEPOSIT" ? "Wallet Deposited" : "Wallet Withdrawn",
          description: `${type === "DEPOSIT" ? "Added" : "Withdrew"} ${amount} units to/from wallet.`,
          startDate: new Date(),
          endDate: new Date(),
          type: type === "DEPOSIT" ? "WALLET_DEPOSIT" : "WALLET_WITHDRAW",
          color: type === "DEPOSIT" ? "#10b981" : "#f59e0b",
        },
      });

      // ارسال نوتیفیکیشن
      await tx.notification.create({
        data: {
          userId,
          title: type === "DEPOSIT" ? "Deposit Successful" : "Withdrawal Successful",
          message: `Your wallet balance has changed by ${amount} units.`,
        },
      });

      return updatedWallet;
    });

    return NextResponse.json({ message: "Transaction successful", wallet: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}