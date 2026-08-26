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

    // ۱. محاسبه تاریخ ۷ روز پیش از الان
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // ۲. دریافت تمام رویدادهای کاربر در این بازه زمانی
    const events = await prisma.calendarEvent.findMany({
      where: {
        userId,
        startDate: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        startDate: true,
      },
    });

    // ۳. فرمت‌دهی و گروه‌بندی روزها برای نمودار
    const daysOfWeek = ["Sun", "Mon", "The", "Wed", "Thu", "Fri", "Sat"];
    
    // ساخت یک ساختار اولیه برای ۷ روز گذشته
    const performanceMap: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = daysOfWeek[d.getDay()];
      performanceMap[dayName] = 0;
    }

    // شمارش تعداد رویدادها در هر روز
    events.forEach((event) => {
      const dayName = daysOfWeek[new Date(event.startDate).getDay()];
      if (performanceMap[dayName] !== undefined) {
        performanceMap[dayName] += 1; // به ازای هر لاگ فعالیت، یک امتیاز پرفورمنس
      }
    });

    // تبدیل آبجکت به آرایه استاندارد برای Recharts
    const chartData = Object.keys(performanceMap).map((day) => ({
      day,
      activityCount: performanceMap[day],
    }));

    return NextResponse.json(chartData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or Server Error" }, { status: 500 });
  }
}