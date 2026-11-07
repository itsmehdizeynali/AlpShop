import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { children: true, _count: { select: { products: true } } },
    where: { parentId: null },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ categories }, { status: 200 });
}

// POST /api/categories (admin only)
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, slug, image, parentId, backgroundColor, textColor } = await req.json();
  if (!name || !slug) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 },
    );
  }

  try {
    const category = await prisma.category.create({
      data: { name, slug, image, parentId, backgroundColor, textColor },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 },
    );
  }
}

// PATCH /api/categories/:slug is handled in categories/[slug]/route.ts
