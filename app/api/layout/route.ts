import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/home
// Returns the logged-in user's profile plus their cart item count
// and wishlist item count, in a single request for the home page header.
export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user, cart, wishlistCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    }),
    prisma.cart.findUnique({
      where: { userId: authUser.userId },
      include: { items: { select: { quantity: true } } },
    }),
    prisma.wishlistItem.count({
      where: { userId: authUser.userId },
    }),
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // sum of quantities, not just row count — a stack of 3 of one product still counts as 3
  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return NextResponse.json(
    {
      user,
      cartCount,
      wishlistCount,
    },
    { status: 200 },
  );
}
