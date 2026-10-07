import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/account/stats
// The four numbers on the account dashboard's stat cards.
export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalOrders, wishlistItems, returnRequests, orders] = await Promise.all([
    prisma.order.count({ where: { userId: authUser.userId } }),
    prisma.wishlistItem.count({ where: { userId: authUser.userId } }),
    prisma.returnRequest.count({ where: { userId: authUser.userId } }),
    prisma.order.findMany({
      where: { userId: authUser.userId, status: { not: "CANCELLED" } },
      select: { total: true },
    }),
  ]);

  const totalSpent = Number(orders.reduce((sum, o) => sum + o.total, 0).toFixed(2));

  return NextResponse.json(
    { stats: { totalOrders, wishlistItems, totalSpent, returnRequests } },
    { status: 200 },
  );
}
