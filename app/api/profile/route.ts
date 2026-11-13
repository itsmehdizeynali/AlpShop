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
    include: { addresses: { orderBy: { isDefault: "desc" } } },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // lastName is not part of the account information (the address's fullName covers it)
  const { password: _, lastName: __, ...profile } = user;
  return NextResponse.json({ user: profile }, { status: 200 });
}

export async function PUT(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, phone, countryPhoneCode } = await req.json();

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
      data: { name, email, phone, countryPhoneCode: countryPhoneCode || 1 },
    });

    const { password: _, lastName: __, ...userProfile } = updatedUser;
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
