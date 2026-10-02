import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-utils";

export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    include: { addresses: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { password: _, ...profile } = user;
  return NextResponse.json({ user: profile }, { status: 200 });
}

export async function PUT(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, bio, avatar, theme } = await req.json();

    if (email) {
      const conflictingUser = await prisma.user.findFirst({
        where: { email, NOT: { id: authUser.userId } },
      });
      if (conflictingUser) {
        return NextResponse.json(
          { error: "Email is already taken" },
          { status: 400 },
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.userId },
      data: { name, email, bio, avatar, theme },
    });

    const { password: _, ...userProfile } = updatedUser;
    return NextResponse.json(
      { message: "Profile updated successfully", user: userProfile },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
