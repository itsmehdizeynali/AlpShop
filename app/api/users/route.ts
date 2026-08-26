import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// تابع کمکی برای اعتبارسنجی توکن کوکی و استخراج آیدی کاربر
function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

export async function GET(req: Request) {
  try {
    // ۱. بررسی هویت کاربر درخواست‌دهنده
    const currentUserId = getUserId(req);

    // ۲. دریافت تمام کاربران دیتابیس به جز کاربر فعلی
    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: currentUserId }, // خود کاربر در لیست اعضا نشان داده نشود
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        // فیلدهای اضافی در صورت نیاز برای سایدبار یا کارت‌ها
      },
      orderBy: { name: "asc" }, // مرتب‌سازی بر اساس حروف الفبا
    });

    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}