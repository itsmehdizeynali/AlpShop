import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/account/spending?page=&pageSize=
// A lighter, cost-focused view of the user's orders for the "spending" page -
// one row per order with its cost breakdown, instead of the full item/product
// details GET /api/orders returns.
export async function GET(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 10);

  const [orders, total, allOrders] = await Promise.all([
    prisma.order.findMany({
      where: { userId: authUser.userId },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        subtotal: true,
        shippingCost: true,
        discount: true,
        total: true,
        createdAt: true,
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.order.count({ where: { userId: authUser.userId } }),
    // for the running total below - cancelled orders don't count as money spent
    prisma.order.findMany({
      where: { userId: authUser.userId, status: { not: "CANCELLED" } },
      select: { total: true },
    }),
  ]);

  const totalSpent = Number(allOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2));

  return NextResponse.json(
    {
      orders,
      totalSpent,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    },
    { status: 200 },
  );
}
