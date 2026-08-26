import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { chatId } = await req.json();

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // آپدیت کردن تمام پیام‌های این چت که من نفرستادم و تا الان خوانده نشده‌اند
    const updatedMessages = await prisma.message.updateMany({
      where: {
        chatId: chatId,
        senderId: { not: userId }, // پیام‌های طرف مقابل
        isRead: false,             // فقط پیام‌های خوانده نشده
      },
      data: {
        isRead: true,              // 👈 تبدیل وضعیت به خوانده شده
      },
    });

    return NextResponse.json({ 
      message: "Messages marked as read", 
      count: updatedMessages.count 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or Server Error" }, { status: 401 });
  }
}