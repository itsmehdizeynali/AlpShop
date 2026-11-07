import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/slug";

// GET /api/blog?category=&sort=latest|popular&page=&pageSize=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort") === "popular" ? "popular" : "latest";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 10);

  const where = {
    ...(category ? { category: { slug: category } } : {}),
    ...(tag ? { tags: { some: { slug: tag } } } : {}),
  };
  // no page-view tracking exists yet, so "popular" uses comment count as a stand-in
  const orderBy =
    sort === "popular" ? { comments: { _count: "desc" as const } } : { createdAt: "desc" as const };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: { category: true, tags: true, _count: { select: { comments: true } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json(
    { posts, pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } },
    { status: 200 },
  );
}

// POST /api/blog (admin only)  { title, slug, excerpt, content, image?, author, readTime?, categorySlug?, tags?: string[] }
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, excerpt, content, image, author, readTime, categorySlug, tags } = body;

  if (!title || !slug || !excerpt || !content || !author) {
    return NextResponse.json(
      { error: "title, slug, excerpt, content and author are required" },
      { status: 400 },
    );
  }

  let categoryId: string | undefined;
  if (categorySlug) {
    const category = await prisma.blogCategory.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      return NextResponse.json({ error: `Unknown categorySlug: ${categorySlug}` }, { status: 400 });
    }
    categoryId = category.id;
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        author,
        readTime: readTime ?? 5,
        categoryId,
        tags: tags?.length
          ? {
              connectOrCreate: (tags as string[]).map((name) => ({
                where: { slug: slugify(name) },
                create: { name, slug: slugify(name) },
              })),
            }
          : undefined,
      },
      include: { category: true, tags: true },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
