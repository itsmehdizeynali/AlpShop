import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // دریافت آیدی مستقیماً از روت داینامیک API
) {
  try {
    
    // ۱. بررسی لایه امنیت (کاربر حتماً باید لاگین باشد تا بتواند پروفایل‌ها را ببیند)
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    // ۲. باز کردن مقدار پارامتر آیدی از روت داینامیک
    const { id } = await params;

    // ۳. کوئری دیتابیس برای پیدا کردن کاربر با فیلدهای کامل‌تر جهت صفحه پروفایل
    const singleUser = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
    });

    // ۴. اگر کاربر با این آیدی وجود نداشت
    if (!singleUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ۵. بازگرداندن اطلاعات کاربر به فرانت‌آند
    return NextResponse.json(singleUser, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}