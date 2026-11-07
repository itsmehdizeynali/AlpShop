import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/addresses
export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId: authUser.userId },
    orderBy: { isDefault: "desc" },
  });

  return NextResponse.json({ addresses }, { status: 200 });
}

// POST /api/addresses
export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { fullName, phone, countryPhoneCode, country, province, city, postalCode, addressLine, isDefault } = body;

  if (!fullName || !phone || !country || !province || !city || !postalCode || !addressLine) {
    return NextResponse.json(
      { error: "fullName, phone, country, province, city, postalCode and addressLine are required" },
      { status: 400 },
    );
  }

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: authUser.userId },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: authUser.userId,
      fullName,
      phone,
      countryPhoneCode: countryPhoneCode || "1",
      country,
      province,
      city,
      postalCode,
      addressLine,
      isDefault: !!isDefault,
    },
  });

  return NextResponse.json({ address }, { status: 201 });
}
