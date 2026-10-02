import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/settings/:key  -> { key, value } | { key, value: null } if not set yet
// Public - the deals countdown is shown to every visitor, logged in or not.
export async function GET(
  req: Request,
  { params }: { params: { key: string } },
) {
  const { key } = await params;
  const setting = await prisma.setting.findUnique({ where: { key } });
  return NextResponse.json({ key, value: setting?.value ?? null }, { status: 200 });
}

// PATCH /api/settings/:key  { value }  (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: { key: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;
  const { value } = await req.json();
  if (typeof value !== "string") {
    return NextResponse.json({ error: "value (string) is required" }, { status: 400 });
  }

  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  return NextResponse.json({ setting }, { status: 200 });
}
