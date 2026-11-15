import { prisma } from "@/lib/prisma";

// Which variant to use when a caller only gives a productId (the "add to cart" button
// on the home page / cards, which has no color/size picker): the product's FIRST
// variant that is in stock, in creation order - i.e. its first available color with
// that color's first available size.
//
//   hasVariants        false -> the product has no variants at all (use variantId null)
//   variantId          the first in-stock variant, or null when every variant is out of stock
//   fallbackVariantId  the very first variant, in stock or not (for finding a cart line
//                      that already exists, when everything has since sold out)
export async function getDefaultVariant(productId: string) {
  const variants = await prisma.productVariant.findMany({
    where: { productId },
    orderBy: { id: "asc" },
    select: { id: true, stock: true },
  });

  if (variants.length === 0) {
    return { hasVariants: false, variantId: null, fallbackVariantId: null } as const;
  }

  return {
    hasVariants: true,
    variantId: variants.find((v) => v.stock > 0)?.id ?? null,
    fallbackVariantId: variants[0].id,
  } as const;
}
