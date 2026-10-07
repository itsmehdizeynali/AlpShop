import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// PATCH /api/products/:slug/comments/:commentId  { content?, rating? }
// Only the comment's own author (or an admin) can edit it.
export async function PATCH(
  req: Request,
  { params }: { params: { slug: string; commentId: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;
  const { content, rating } = await req.json();

  if (rating !== undefined && rating !== null && (rating < 1 || rating > 5)) {
    return NextResponse.json({ error: "rating must be between 1 and 5" }, { status: 400 });
  }

  const comment = await prisma.productComment.findUnique({ where: { id: commentId } });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }
  if (comment.userId !== authUser.userId && authUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await prisma.productComment.update({
    where: { id: commentId },
    data: { content, rating },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });

  return NextResponse.json({ comment: updated }, { status: 200 });
}
