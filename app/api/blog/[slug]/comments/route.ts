import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { buildCommentTree } from "@/lib/comments";

// GET /api/blog/:slug/comments?page=&pageSize=
// Separate from GET /api/blog/:slug on purpose - the comment thread can be
// long, so it's fetched (and paginated) on its own rather than always riding
// along with the post's own data. Pagination applies to TOP-LEVEL comments;
// a top-level comment brings its whole reply tree with it (reply-to-a-reply,
// to any depth), so a reply never gets cut off mid-thread by the page size.
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 10);

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const [topLevelIds, total, flat] = await Promise.all([
    prisma.comment.findMany({
      where: { postId: post.id, parentId: null },
      select: { id: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.comment.count({ where: { postId: post.id, parentId: null } }),
    prisma.comment.findMany({
      where: { postId: post.id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const order = new Map(topLevelIds.map((c, i) => [c.id, i]));
  const tree = buildCommentTree(flat)
    .filter((c) => order.has(c.id))
    .sort((a, b) => order.get(a.id)! - order.get(b.id)!);

  return NextResponse.json(
    { comments: tree, pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } },
    { status: 200 },
  );
}

// POST /api/blog/:slug/comments  { content, parentId? }
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
    data: { postId: post.id, userId: authUser.userId, content, parentId },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });

  return NextResponse.json({ comment }, { status: 201 });
}
