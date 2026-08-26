import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// تابع کمکی برای استخراج راحت‌تر آیدی کاربر از کوکی‌ها
function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

// ==========================================
// GET: دریافت لیست تمام چت‌های کاربر (برای سایدبار)
// ==========================================

export async function GET(req: Request) {
  try {
    const userId = getUserId(req);

    // ۱. دریافت لیست چت‌ها به همراه آخرین پیام‌ها
    const allChats = await prisma.chat.findMany({
      where: { users: { some: { id: userId } } },
      include: {
        users: {
          where: { id: { not: userId } },
          select: { id: true, name: true, avatar: true }
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1 // دریافت آخرین پیام برای پیش‌نمایش
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    // ۲. محاسبه تعداد پیام‌های خوانده‌نشده برای هر چت به صورت همزمان (Parallel Execution)
    const chatsWithUnreadCount = await Promise.all(
      allChats.map(async (chat) => {
        const unreadCount = await prisma.message.count({
          where: {
            chatId: chat.id,
            senderId: { not: userId }, // پیام‌هایی که توسط طرف مقابل فرستاده شده
            isRead: false              // هنوز خوانده نشده است
          }
        });

        return {
          id: chat.id,
          updatedAt: chat.updatedAt,
          createdAt: chat.createdAt,
          partner: chat.users[0] || null, // فرستادن مستقیم اطلاعات طرف مقابل برای راحتی فرانت‌آند
          lastMessage: chat.messages[0] || null, // فرستادن مستقیم آخرین پیام به جای آرایه
          unreadCount: unreadCount // تعداد پیام‌های خوانده‌نشده مخصوص این چت
        };
      })
    );

    return NextResponse.json(chatsWithUnreadCount, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// ==========================================
// POST: ایجاد یا باز کردن چت روم با کلیک روی یک کاربر
// ==========================================
export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { targetUserId } = await req.json();

    

    if (!targetUserId) {
      return NextResponse.json({ error: "Target User ID is required" }, { status: 400 });
    }

    // امنیت: کاربر نباید بتواند با خودش چت روم بسازد
    if (userId === targetUserId) {
      return NextResponse.json({ error: "You cannot start a chat with yourself" }, { status: 400 });
    }

    // ۱. بررسی وجود چت دو نفره از قبل
    let chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: userId } } },
          { users: { some: { id: targetUserId } } }
        ]
      },
      include: { 
        users: { 
          where: { id: { not: userId } }, 
          select: { id: true, name: true, avatar: true } 
        } 
      }
    });

    if (!chat) {
      // ۲. اگر چتی نبود، چت جدید بساز و در تقویم هم ثبت کن
      chat = await prisma.chat.create({
        data: {
          users: { connect: [{ id: userId }, { id: targetUserId }] }
        },
        include: { 
          users: { 
            where: { id: { not: userId } }, 
            select: { id: true, name: true, avatar: true } 
          } 
        }
      });

      // ثبت خودکار رویداد چت جدید در تقویم پروژه اول
      await prisma.calendarEvent.create({
        data: {
          userId: userId,
          title: "New Chat Opened",
          description: "You initiated a chat room with a user.",
          startDate: new Date(),
          endDate: new Date(),
          type: "CHAT_CREATE",
          color: "#ec4899",
        },
      });
    } else {
      // ۳. اگر چت از قبل بود، updatedAt را تازه کن تا در سایدبار بیاید بالا
      chat = await prisma.chat.update({
        where: { id: chat.id },
        data: { updatedAt: new Date() },
        include: { 
          users: { 
            where: { id: { not: userId } }, 
            select: { id: true, name: true, avatar: true } 
          } 
        }
      });
    }

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat window" }, { status: 500 });
  }
}