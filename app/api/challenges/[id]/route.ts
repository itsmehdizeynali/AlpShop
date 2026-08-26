import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //params در نسخه جدید نکس‌جی‌اس باید await شود
    const { id: challengeId } = await params; 
    const userId = getUserId(req);

    // ۱. پیدا کردن اطلاعات اصلی چالش
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    // ۲. بررسی اینکه آیا کاربر این چالش را خریده است یا خیر
    let challengeData = null;
    if (userId) {
      challengeData = await prisma.userChallenge.findFirst({
        where: {
          userId,
          challengeId,
        },
      });
    }

    // ۳. خروجی ترکیبی برای فرانت‌آند
    return NextResponse.json({
      challenge,
      isPurchased: !!challengeData, // یک فلگ متنی ساده (true/false) برای فرانت‌آند
      ...challengeData, // جزئیات خرید کاربر (اگر خریده باشد، مقدار دارد وگرنه null است)
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}