import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { enrichForUser, productInclude, withRate } from "@/lib/product";

// GET /api/wishlist?page=&pageSize=
export async function GET(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 12);

  const [items, total] = await Promise.all([
    prisma.wishlistItem.findMany({
      where: { userId: authUser.userId },
      include: { product: { include: productInclude } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.wishlistItem.count({ where: { userId: authUser.userId } }),
  ]);

  const enrichedProducts = await enrichForUser(
    items.map((item) => withRate(item.product)),
    authUser.userId,
  );

  return NextResponse.json(
    {
      items: items.map((item, i) => ({
        ...item,
        product: enrichedProducts[i],
      })),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
    { status: 200 },
  );
}

// POST /api/wishlist  { productId }
export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 },
    );
  }

  try {
    const item = await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: authUser.userId, productId } },
      update: {},
      create: { userId: authUser.userId, productId },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 },
    );
  }
}
