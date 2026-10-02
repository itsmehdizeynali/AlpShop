import { prisma } from "@/lib/prisma";
import { getAuthUser, requireAdmin } from "@/lib/auth-utils";
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
      comments: {
        where: { parentId: null },
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          replies: {
            include: { user: { select: { id: true, name: true, avatar: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

// POST /api/blog/:slug  { content, parentId? }  (add a comment)
export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { content, parentId } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      postId: post.id,
      userId: authUser.userId,
      content,
      parentId,
    },
  });

  return NextResponse.json({ comment }, { status: 201 });
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
