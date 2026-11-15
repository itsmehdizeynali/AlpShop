import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { enrichForUser, productInclude, withRate } from "@/lib/product";
import { getDefaultVariant } from "@/lib/cart";

async function getOrCreateCart(userId: string) {
  return prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
    include: {
      items: {
        include: {
          product: { include: productInclude },
          variant: true,
        },
      },
    },
  });
}

// GET /api/cart
export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await getOrCreateCart(authUser.userId);
  const enrichedProducts = await enrichForUser(
    cart.items.map((item) => withRate(item.product)),
    authUser.userId,
  );

  return NextResponse.json(
    {
      cart: {
        ...cart,
        items: cart.items.map((item, i) => ({ ...item, product: enrichedProducts[i] })),
      },
    },
    { status: 200 },
  );
}

// POST /api/cart  { productId, variantId?, quantity? }
export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, variantId, quantity } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }
  const qty = quantity && quantity > 0 ? quantity : 1;

  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Which variant? If the caller picked one (variantId), use it. If not (e.g. the
    // add button on a product card, with no color/size picker), use the product's
    // first in-stock variant: first available color + its first available size.
    let resolvedVariantId: string | null = variantId ?? null;
    if (resolvedVariantId) {
      const chosen = await prisma.productVariant.findUnique({
        where: { id: resolvedVariantId },
        select: { productId: true },
      });
      if (!chosen || chosen.productId !== productId) {
        return NextResponse.json(
          { error: "variantId does not belong to this product" },
          { status: 400 },
        );
      }
    } else {
      const fallback = await getDefaultVariant(productId);
      if (fallback.hasVariants) {
        if (!fallback.variantId) {
          return NextResponse.json({ error: "Out of stock" }, { status: 400 });
        }
        resolvedVariantId = fallback.variantId;
      }
    }

    const cart = await prisma.cart.upsert({
      where: { userId: authUser.userId },
      update: {},
      create: { userId: authUser.userId },
    });

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: resolvedVariantId,
      },
    });

    const item = existingItem
      ? await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + qty },
        })
      : await prisma.cartItem.create({
          data: { cartId: cart.id, productId, variantId: resolvedVariantId, quantity: qty },
        });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      return NextResponse.json(
        { error: "productId or variantId does not point to an existing product/variant" },
        { status: 400 },
      );
    }
    console.error("POST /api/cart failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add item to cart" },
      { status: 500 },
    );
  }
}

// DELETE /api/cart  (clears the whole cart)
export async function DELETE() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({ where: { userId: authUser.userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
}
