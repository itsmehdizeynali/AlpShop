import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// PATCH /api/addresses/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const address = await prisma.address.findUnique({ where: { id } });
  if (!address || address.userId !== authUser.userId) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const body = await req.json();

  if (body.isDefault) {
    await prisma.address.updateMany({
      where: { userId: authUser.userId },
      data: { isDefault: false },
    });
  }

  const updated = await prisma.address.update({
    where: { id },
    data: {
      fullName: body.fullName,
      phone: body.phone,
      country: body.country,
      province: body.province,
      city: body.city,
      postalCode: body.postalCode,
      addressLine: body.addressLine,
      isDefault: body.isDefault,
    },
  });

  return NextResponse.json({ address: updated }, { status: 200 });
}

// DELETE /api/addresses/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const address = await prisma.address.findUnique({ where: { id } });
  if (!address || address.userId !== authUser.userId) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  await prisma.address.delete({ where: { id } });
  return NextResponse.json({ message: "Address deleted" }, { status: 200 });
}
