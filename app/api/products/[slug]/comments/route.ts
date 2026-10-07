import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { buildCommentTree } from "@/lib/comments";

// GET /api/products/:slug/comments?page=&pageSize=
// Separate from GET /api/products/:slug on purpose - the comment thread can be
// long, so it's fetched (and paginated) on its own rather than always riding
// along with the product's own data. Pagination applies to TOP-LEVEL comments;
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

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const [topLevelIds, total, flat] = await Promise.all([
    prisma.productComment.findMany({
      where: { productId: product.id, parentId: null },
      select: { id: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.productComment.count({ where: { productId: product.id, parentId: null } }),
    // the whole thread, flat - nested into a tree below. Fine at this project's
    // scale; a very high-traffic product would want a recursive SQL query instead.
    prisma.productComment.findMany({
      where: { productId: product.id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // buildCommentTree groups by insertion order (oldest first, since `flat` is);
  // restore the newest-first order + exact page the top-level query asked for
  const order = new Map(topLevelIds.map((c, i) => [c.id, i]));
  const tree = buildCommentTree(flat)
    .filter((c) => order.has(c.id))
    .sort((a, b) => order.get(a.id)! - order.get(b.id)!);

  return NextResponse.json(
    { comments: tree, pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } },
    { status: 200 },
  );
}

// POST /api/products/:slug/comments  { content, parentId? }
// Plain comment (with optional threaded reply) - separate from reviews, which
// always carry a 1-5 rating. The full comment tree is returned as part of
// GET /api/products/:slug (the `comments` field), not from this route.
export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { content, parentId, rating } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }
  if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
    return NextResponse.json({ error: "rating must be between 1 and 5" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const comment = await prisma.productComment.create({
    data: {
      productId: product.id,
      userId: authUser.userId,
      content,
      parentId,
      rating: rating ?? undefined,
    },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });

  return NextResponse.json({ comment }, { status: 201 });
}
