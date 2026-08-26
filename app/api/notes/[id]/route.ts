import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const { id } = await params;

    // پیدا کردن یادداشت و بررسی اینکه متعلق به خود کاربر باشد (امنیت)
    const singleNote = await prisma.note.findFirst({
      where: {
        id: id,
        userId: userId 
      }
    });

    if (!singleNote) {
      return NextResponse.json({ error: "Note not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(singleNote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}