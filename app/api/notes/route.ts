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
    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: { title, content, userId },
    });

    // ثبت خودکار در تقویم
    await prisma.calendarEvent.create({
      data: {
        userId,
        title: `Note Created: ${title}`,
        description: "You created a new personal note.",
        startDate: new Date(),
        endDate: new Date(),
        type: "NOTE_CREATE",
        color: "#8b5cf6",
      },
    });

    return NextResponse.json({ message: "Note created successfully", note }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = getUserId(req);
    const { id, title, content } = await req.json();

    const note = await prisma.note.update({
      where: { id, userId },
      data: { title, content },
    });

    return NextResponse.json({ message: "Note updated successfully", note }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}