import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { enrichForUser, productInclude, withRate } from "@/lib/product";

// GET /api/orders/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      address: true,
      items: { include: { product: { include: productInclude }, variant: true } },
      returnRequests: true,
    },
  });

  if (!order || (order.userId !== authUser.userId && authUser.role !== "ADMIN")) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const enrichedProducts = await enrichForUser(
    order.items.map((item) => withRate(item.product)),
    authUser.userId,
  );

  return NextResponse.json(
    {
      order: {
        ...order,
        items: order.items.map((item, i) => ({ ...item, product: enrichedProducts[i] })),
      },
    },
    { status: 200 },
  );
}

// PATCH /api/orders/:id  { status }  (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser || authUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 },
    );
  }
}
