import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> } // دریافت آیدی به صورت مستقیم از روت داینامیک
) {
  try {
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;
    
    // باز کردن مقدار پارامتر روت
    const { chatId } = await params;

    const singleChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        users: { some: { id: userId } } // لایه امنیتی: حتماً کاربر باید خودش عضو این چت باشد
      },
      include: {
        users: {
          select: { id: true, name: true, avatar: true, bio: true }
        },
        messages: {
          orderBy: { createdAt: "asc" } // پیام‌ها از قدیم به جدید برای باکس گفتگو
        }
      }
    });

    if (!singleChat) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    const partner=singleChat.users.find((u)=>u.id!==userId)??null

    return NextResponse.json({...singleChat,partner}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
