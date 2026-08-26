// /api/messages/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  return (jwt.verify(token!, JWT_SECRET) as { userId: string }).userId;
}

// ارسال پیام جدید
export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { chatId, content } = await req.json();

    const message = await prisma.message.create({
      data: { chatId, senderId: userId, content },
    });

    await prisma.chat.update({ where: { id: chatId }, data: { updatedAt: new Date() } });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Message failed to send" }, { status: 500 });
  }
}
