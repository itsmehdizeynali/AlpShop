import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/slug";

// GET /api/blog/:slug
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
      // full comment thread is its own endpoint: GET /api/blog/:slug/comments
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

// PATCH /api/blog/:slug (admin only)  { title?, excerpt?, content?, image?, author?, readTime?, categorySlug?, tags?: string[] }
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
  const { title, excerpt, content, image, author, readTime, categorySlug, tags } = body;

  let categoryId: string | undefined;
  if (categorySlug) {
    const category = await prisma.blogCategory.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      return NextResponse.json({ error: `Unknown categorySlug: ${categorySlug}` }, { status: 400 });
    }
    categoryId = category.id;
  }

  try {
    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        title,
        excerpt,
        content,
        image,
        author,
        readTime,
        categoryId,
        tags: tags?.length
          ? {
              set: [],
              connectOrCreate: (tags as string[]).map((name) => ({
                where: { slug: slugify(name) },
                create: { name, slug: slugify(name) },
              })),
            }
          : undefined,
      },
      include: { category: true, tags: true },
    });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}
