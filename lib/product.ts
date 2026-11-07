import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// One shared shape for every product returned by the API
// (products list, single product, cart, wishlist, orders, search).
export const productInclude = {
  images: { orderBy: { position: "asc" } },
  category: true,
  brand: true,
  reviews: { select: { rating: true } },
  // only the rated ones, and only the rating itself - ProductComments with no
  // rating (most replies, most plain comments) don't count toward the average
  comments: { where: { rating: { not: null } }, select: { rating: true } },
} satisfies Prisma.ProductInclude;

// average rating (1 decimal) + number of ratings counted
export function computeRate(ratings: { rating: number }[]) {
  const users = ratings.length;
  const rate = users
    ? Number((ratings.reduce((sum, r) => sum + r.rating, 0) / users).toFixed(1))
    : 0;
  return { rate, users };
}

// flattens a product's comment tree (top-level + one level of replies) down to
// just the rated ones, for folding into the same average as reviews
export function commentRatings(
  comments: { rating: number | null; replies?: { rating: number | null }[] }[],
) {
  const out: { rating: number }[] = [];
  for (const c of comments) {
    if (c.rating != null) out.push({ rating: c.rating });
    for (const r of c.replies ?? []) {
      if (r.rating != null) out.push({ rating: r.rating });
    }
  }
  return out;
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

// replaces the raw `reviews`/`comments` arrays with the computed `rate: { rate, users }`
// (reviews + any rated comments, combined) and adds `price` (after discount) +
// `realPrice` (before discount)
export function withRate<
  T extends {
    reviews: { rating: number }[];
    comments?: { rating: number | null }[];
    price: number;
    discount: number;
  },
>(product: T) {
  const { reviews, comments, ...rest } = product;
  const ratedComments = (comments ?? []).filter(
    (c): c is { rating: number } => c.rating != null,
  );
  return {
    ...rest,
    ...computePrices(rest.price, rest.discount),
    rate: computeRate([...reviews, ...ratedComments]),
  };
}

// Known color-name -> hex code, for rendering swatches. Matched case-insensitively;
// an unmapped name (a typo, or a color not in this list) falls back to "#CCCCCC"
// rather than breaking the response.
const COLOR_HEX: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  silver: "#C0C0C0",
  gold: "#D4AF37",
  gray: "#808080",
  grey: "#808080",
  red: "#DC2626",
  blue: "#2563EB",
  navy: "#1E3A8A",
  green: "#16A34A",
  olive: "#708238",
  yellow: "#EAB308",
  orange: "#F97316",
  pink: "#DB2777",
  purple: "#7C3AED",
  brown: "#92400E",
  tan: "#D2B48C",
  beige: "#E8DCC4",
  burgundy: "#800020",
  rose: "#E8B4B8",
  "rose nude": "#C9A89A",
  ruby: "#9B111E",
  "ruby red": "#9B111E",
  berry: "#8E3A59",
  cedarwood: "#8B5A3C",
};

function colorToHex(name: string) {
  return COLOR_HEX[name.toLowerCase()] ?? "#CCCCCC";
}

// Groups a product's flat ProductVariant rows into the shape the selection UI
// wants: one entry per attribute ("color", "size", ...) with the distinct values
// that actually exist among this product's variants. An attribute is left out
// entirely if none of the variants set it (e.g. a product with only sizes gets
// no "color" group at all). Color items carry a hex code for rendering swatches;
// size items are plain strings (no natural "code" to give them).
export function groupVariants(variants: { color: string | null; size: string | null }[]) {
  const colors = Array.from(new Set(variants.map((v) => v.color).filter((v): v is string => !!v)));
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter((v): v is string => !!v)));

  return [
    ...(colors.length
      ? [{ title: "color", items: colors.map((name) => ({ name, hex: colorToHex(name) })) }]
      : []),
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
