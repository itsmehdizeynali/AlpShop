import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function getUserId(req: Request) {
  const token = req.headers.get("cookie")?.split("access=")[1]?.split(";")[0];
  return (jwt.verify(token!, JWT_SECRET) as { userId: string }).userId;
}

export async function PUT(req: Request) {
  try {
    const userId = getUserId(req);
    const { name, email, bio, theme } = await req.json();

    // بررسی یونیک بودن ایمیل جدید در صورت ویرایش
    if (email) {
      const conflictingUser = await prisma.user.findFirst({
        where: { email, NOT: { id: userId } },
      });
      if (conflictingUser) {
        return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, bio, theme },
    });

    const { password: _, ...userProfile } = updatedUser;
    return NextResponse.json({ message: "Profile updated successfully", user: userProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}