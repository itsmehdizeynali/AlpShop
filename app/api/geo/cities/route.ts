import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/geo/cities?province=<provinceId>
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provinceId = searchParams.get("province");

  if (!provinceId) {
    return NextResponse.json({ error: "province (id) is required" }, { status: 400 });
  }

  const cities = await prisma.city.findMany({
    where: { provinceId },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ cities }, { status: 200 });
}

// POST /api/geo/cities (admin only)  { name, provinceId }
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, provinceId } = await req.json();
  if (!name || !provinceId) {
    return NextResponse.json({ error: "name and provinceId are required" }, { status: 400 });
  }

  try {
    const city = await prisma.city.create({ data: { name, provinceId } });
    return NextResponse.json({ city }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create city" }, { status: 500 });
  }
}
