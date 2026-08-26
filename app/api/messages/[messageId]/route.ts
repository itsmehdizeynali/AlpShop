// app/api/messages/[messageId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// تابع کمکی برای گرفتن آیدی کاربر از کوکی
async function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}

// ==========================================
// PUT: ویرایش متن پیام (Edit Message)
// ==========================================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    const userId = await getUserId(req);
    const { messageId } = await params;
    const { newContent } = await req.json();

    if (!newContent || newContent.trim() === "") {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }

    // ۱. پیدا کردن پیام و بررسی مالکیت آن
    const message = await prisma.message.findUnique({ where: { id: messageId } });
    
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    if (message.senderId !== userId) {
      return NextResponse.json({ error: "You can only edit your own messages" }, { status: 403 });
    }
    if (message.isDeleted) {
      return NextResponse.json({ error: "Cannot edit a deleted message" }, { status: 400 });
    }

    // ۲. آپدیت متن پیام و فعال کردن فلگ ویرایش
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        content: newContent.trim(),
        isEdited: true
      }
    });

    return NextResponse.json({ message: "Message updated", data: updatedMessage }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or Server Error" }, { status: 401 });
  }
}

// ==========================================
// DELETE: حذف پیام (Delete Message)
// ==========================================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    // ۱. استخراج آیدی کاربر لاگین شده از کوکی
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const { messageId } = await params;

    // ۲. پیدا کردن پیام برای بررسی وجود و مالکیت آن
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // ۳. لایه امنیتی: فقط فرستنده پیام اجازه حذف کامل آن را دارد
    if (message.senderId !== userId) {
      return NextResponse.json({ error: "You can only delete your own messages" }, { status: 403 });
    }

    // ۴. حذف قطعی و فیزیکی رکورد پیام از دیتابیس
    await prisma.message.delete({
      where: { id: messageId }
    });

    return NextResponse.json({ message: "Message permanently deleted from database" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}