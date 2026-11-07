import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/geo/provinces?country=<countryCode>
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const countryCode = searchParams.get("country");

  if (!countryCode) {
    return NextResponse.json({ error: "country (code) is required" }, { status: 400 });
  }

  const provinces = await prisma.province.findMany({
    where: { country: { code: countryCode } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ provinces }, { status: 200 });
}

// POST /api/geo/provinces (admin only)  { name, countryCode }
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, countryCode } = await req.json();
  if (!name || !countryCode) {
    return NextResponse.json({ error: "name and countryCode are required" }, { status: 400 });
  }

  const country = await prisma.country.findUnique({ where: { code: countryCode } });
  if (!country) {
    return NextResponse.json({ error: `Unknown countryCode: ${countryCode}` }, { status: 400 });
  }

  try {
    const province = await prisma.province.create({ data: { name, countryId: country.id } });
    return NextResponse.json({ province }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create province" }, { status: 500 });
  }
}
