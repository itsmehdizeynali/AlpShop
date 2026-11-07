import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// POST /api/orders/:id/return  { reason }
export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { reason } = await req.json();

  if (!reason) {
    return NextResponse.json({ error: "reason is required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.userId !== authUser.userId) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "DELIVERED") {
    return NextResponse.json(
      { error: "Only delivered orders can be returned" },
      { status: 400 },
    );
  }

  const returnRequest = await prisma.returnRequest.create({
    data: {
      orderId: id,
      userId: authUser.userId,
      reason,
    },
  });

  return NextResponse.json({ returnRequest }, { status: 201 });
}
