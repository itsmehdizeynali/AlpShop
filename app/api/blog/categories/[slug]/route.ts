import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// PATCH /api/blog/categories/:slug (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();

  try {
    const category = await prisma.blogCategory.update({
      where: { slug },
      data: {
        name: body.name,
        icon: body.icon,
        backgroundColor: body.backgroundColor,
        textColor: body.textColor,
      },
    });
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog category" },
      { status: 500 },
    );
  }
}
