import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/blog/categories
export async function GET() {
  const categories = await prisma.blogCategory.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ categories }, { status: 200 });
}

// POST /api/blog/categories (admin only)
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, slug, icon, backgroundColor, textColor } = await req.json();
  if (!name || !slug) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 },
    );
  }

  try {
    const category = await prisma.blogCategory.create({
      data: { name, slug, icon, backgroundColor, textColor },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog category" },
      { status: 500 },
    );
  }
}
