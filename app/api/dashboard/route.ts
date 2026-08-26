import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // اجرای همزمان تمام کوئری‌ها برای بالاترین سرعت (Parallel Fetching)
    const [
      user,
      wallet,
      totalChallenges,
      totalNotes,
      unreadNotificationsCount,
      unreadMessagesCount,
      chats
    ] = await prisma.$transaction([
      // ۱. موجودی ولت
      prisma.user.findUnique({ where: { id:userId } }),
      prisma.wallet.findUnique({ where: { userId }, select: { balance: true } }),
      // ۲. تعداد چالش‌های من
      prisma.userChallenge.count({ where: { userId } }),
      // ۳. تعداد کل نوت‌ها
      prisma.note.count({ where: { userId } }),
      // ۴. تعداد نوتیفیکیشن‌های خوانده نشده
      prisma.notification.count({ where: { userId, isRead: false } }),
      // ۵. تعداد پیام‌های خوانده نشده‌ای که دیگران به این کاربر فرستاده‌اند
      prisma.message.count({ where: { chat: { users: { some: { id: userId } } }, senderId: { not: userId }, isRead: false } }),
      // ۶. لیست چت‌های کاربر همراه با آخرین پیام‌ها
      prisma.chat.findMany({
        where: { users: { some: { id: userId } } },
        include: {
          users: { select: { id: true, name: true, avatar: true } },
          messages: { orderBy: { createdAt: "desc" }, take: 1 } // فقط آخرین پیام برای نمایش در سایدبار چت
        },
        orderBy: { updatedAt: "desc" }
      })
    ]);

    return NextResponse.json({
      user,
      walletBalance: wallet?.balance || 0,
      totalChallenges,
      totalNotes,
      unreadNotificationsCount,
      unreadMessagesCount,
      chats
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}