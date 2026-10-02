import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// POST /api/products/:slug/reviews
export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { rating, comment } = await req.json();

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "rating must be between 1 and 5" },
      { status: 400 },
    );
  }

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const review = await prisma.review.upsert({
      where: {
        productId_userId: { productId: product.id, userId: authUser.userId },
      },
      update: { rating, comment },
      create: {
        productId: product.id,
        userId: authUser.userId,
        rating,
        comment,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 },
    );
  }
}
