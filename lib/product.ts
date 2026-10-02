import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// One shared shape for every product returned by the API
// (products list, single product, cart, wishlist, orders, search).
export const productInclude = {
  images: { orderBy: { position: "asc" } },
  category: true,
  brand: true,
  reviews: { select: { rating: true } },
} satisfies Prisma.ProductInclude;

// average rating (1 decimal) + number of reviews
export function computeRate(reviews: { rating: number }[]) {
  const users = reviews.length;
  const rate = users
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / users).toFixed(1))
    : 0;
  return { rate, users };
}

// The stored `price` is the price BEFORE discount. The cards show `price` as the
// main (final) price and `realPrice` as the struck-through one, so the API returns:
//   price     -> price after discount
//   realPrice -> price before discount
export function computePrices(price: number, discount: number) {
  return {
    price: Number((price * (1 - discount / 100)).toFixed(2)),
    realPrice: price,
  };
}

// replaces the raw `reviews` array with the computed `rate: { rate, users }`
// and adds `price` (after discount) + `realPrice` (before discount)
export function withRate<
  T extends { reviews: { rating: number }[]; price: number; discount: number },
>(product: T) {
  const { reviews, ...rest } = product;
  return {
    ...rest,
    ...computePrices(rest.price, rest.discount),
    rate: computeRate(reviews),
  };
}

// Groups a product's flat ProductVariant rows into the shape the selection UI
// wants: one entry per attribute ("color", "size", ...) with the distinct values
// that actually exist among this product's variants. An attribute is left out
// entirely if none of the variants set it (e.g. a product with only sizes gets
// no "color" group at all).
export function groupVariants(variants: { color: string | null; size: string | null }[]) {
  const colors = Array.from(new Set(variants.map((v) => v.color).filter((v): v is string => !!v)));
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter((v): v is string => !!v)));

  return [
    ...(colors.length ? [{ title: "color", items: colors }] : []),
    ...(sizes.length ? [{ title: "size", items: sizes }] : []),
  ];
}

// Adds, per product, whether the CURRENT user has it wishlisted and/or in their
// cart (with the quantity). With no logged-in user (or a guest), everything is
// false/0 rather than erroring - every route that returns products passes
// whatever getAuthUser() gave it here, logged in or not.
export async function enrichForUser<T extends { id: string }>(
  products: T[],
  userId?: string | null,
): Promise<(T & { isWishlisted: boolean; isInCart: boolean; cartQuantity: number })[]> {
  if (!userId || products.length === 0) {
    return products.map((p) => ({ ...p, isWishlisted: false, isInCart: false, cartQuantity: 0 }));
  }

  const ids = products.map((p) => p.id);

  const [wishlistItems, cart] = await Promise.all([
    prisma.wishlistItem.findMany({
      where: { userId, productId: { in: ids } },
      select: { productId: true },
    }),
    prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { where: { productId: { in: ids } }, select: { productId: true, quantity: true } },
      },
    }),
  ]);

  const wishlistedSet = new Set(wishlistItems.map((w) => w.productId));

  // a product can have more than one cart item (different variants) - sum them
  const cartQtyMap = new Map<string, number>();
  for (const item of cart?.items ?? []) {
    cartQtyMap.set(item.productId, (cartQtyMap.get(item.productId) ?? 0) + item.quantity);
  }

  return products.map((p) => ({
    ...p,
    isWishlisted: wishlistedSet.has(p.id),
    isInCart: cartQtyMap.has(p.id),
    cartQuantity: cartQtyMap.get(p.id) ?? 0,
  }));
}
