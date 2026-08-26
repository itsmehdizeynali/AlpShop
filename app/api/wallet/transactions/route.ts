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

    // ۱. استخراج پارامترهای صفحه‌بندی از URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // ۲. پیدا کردن کیف پول کاربر برای دسترسی به آیدی آن
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    // اگر کیف پولی وجود نداشت، یک آرایه خالی برگردان
    if (!wallet) {
      return NextResponse.json({
        transactions: [],
        pagination: { total: 0, page, limit, totalPages: 0 }
      }, { status: 200 });
    }

    // ۳. گرفتن تعداد کل تراکنش‌ها برای محاسبات فرانت‌آند
    const totalTransactions = await prisma.transaction.count({
      where: { walletId: wallet.id },
    });

    // ۴. دریافت تراکنش‌های صفحه مورد نظر
    const transactions = await prisma.transaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: limit,
    });

    // ۵. بازگرداندن دیتای تراکنش‌ها و وضعیت صفحات
    return NextResponse.json({
      transactions,
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
      },
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}