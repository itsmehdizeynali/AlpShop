import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  return (jwt.verify(token!, JWT_SECRET) as { userId: string }).userId;
}

export async function GET(req: Request) {
  try {
    const userId = getUserId(req);
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// خوانده شدن نوتیفیکیشن
export async function PUT(req: Request) {
  try {
    const userId = getUserId(req);
    const { id } = await req.json();

    const updatedNotification = await prisma.notification.update({
      where: { id, userId },
      data: { isRead: true },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}