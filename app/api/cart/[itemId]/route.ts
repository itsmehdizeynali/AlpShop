import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// The :itemId segment accepts EITHER a cart item's own id OR a product's id
// (optionally paired with ?variantId=... for products that have variants) - so
// the single-product page, which only knows the productId, and the cart page,
// which has the cart item's id, can both call the exact same route/function.
async function resolveCartItem(idOrProductId: string, userId: string, variantId?: string | null) {
  const byItemId = await prisma.cartItem.findFirst({
    where: { id: idOrProductId, cart: { userId } },
  });
  if (byItemId) return byItemId;

  return prisma.cartItem.findFirst({
    where: { productId: idOrProductId, variantId: variantId ?? null, cart: { userId } },
  });
}

// PATCH /api/cart/:itemId  { quantity, variantId? }
// :itemId = cart item id OR product id. quantity <= 0 removes the line instead.
export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;
  const { quantity, variantId } = await req.json();

  if (quantity === undefined) {
    return NextResponse.json({ error: "quantity is required" }, { status: 400 });
  }

  const existing = await resolveCartItem(itemId, authUser.userId, variantId);
  if (!existing) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: existing.id } });
    return NextResponse.json({ item: null, message: "Item removed" }, { status: 200 });
  }

  const item = await prisma.cartItem.update({
    where: { id: existing.id },
    data: { quantity },
  });

  return NextResponse.json({ item }, { status: 200 });
}

// DELETE /api/cart/:itemId[?variantId=...]
// :itemId = cart item id OR product id.
export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;
  const { searchParams } = new URL(req.url);
  const variantId = searchParams.get("variantId");

  const existing = await resolveCartItem(itemId, authUser.userId, variantId);
  if (!existing) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: existing.id } });
  return NextResponse.json({ message: "Item removed" }, { status: 200 });
}
