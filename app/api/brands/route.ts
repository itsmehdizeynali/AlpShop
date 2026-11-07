import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/brands
export async function GET() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ brands }, { status: 200 });
}

// POST /api/brands (admin only)
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, slug, logo } = await req.json();
  if (!name || !slug) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 },
    );
  }

  try {
    const brand = await prisma.brand.create({ data: { name, slug, logo } });
    return NextResponse.json({ brand }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 },
    );
  }
}
