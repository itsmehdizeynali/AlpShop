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
    const events = await prisma.calendarEvent.findMany({
      where: { userId },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { title, description, startDate, endDate, color } = await req.json();

    const newEvent = await prisma.calendarEvent.create({
      data: {
        userId,
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        color: color || "#3b82f6",
        type: "CUSTOM",
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}