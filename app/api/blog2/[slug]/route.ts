import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

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
