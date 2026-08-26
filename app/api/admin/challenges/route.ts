import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
    const decoded = jwt.verify(token!, JWT_SECRET) as { userId: string };

    // بررسی ادمین بودن کاربر
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const { title, description, price, target, duration, reward } = await req.json();

    if (!title || !price || !target || !duration || !reward) {
      return NextResponse.json({ error: "Missing required challenge parameters" }, { status: 400 });
    }

    const newChallenge = await prisma.challenge.create({
      data: { title, description, price, target, duration, reward },
    });

    return NextResponse.json({ message: "Challenge added by Admin", challenge: newChallenge }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create challenge" }, { status: 500 });
  }
}

export async function GET() {
  try {

    const challenges = await prisma.challenge.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(challenges, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or Server Error" }, { status: 401 });
  }
}