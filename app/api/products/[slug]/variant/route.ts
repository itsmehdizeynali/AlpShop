import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { computeVariantPrices } from "@/lib/product";
import { NextResponse } from "next/server";

// Is THIS exact line (product + variant) in the current user's cart, and how many?
// A guest, or a combination that doesn't exist (variantId null from a missing combo,
// which must not be confused with the product's default line), gets false / 0.
async function cartInfo(userId: string | undefined, productId: string, variantId: string | null) {
  if (!userId) return { isInCart: false, cartQuantity: 0 };
  const item = await prisma.cartItem.findFirst({
    where: { productId, variantId, cart: { userId } },
    select: { quantity: true },
  });
  return { isInCart: !!item, cartQuantity: item?.quantity ?? 0 };
}

// GET /api/products/:slug/variant?color=&size=
// Price/stock for the chosen combination (e.g. color=black&size=40) - call this
// whenever the user changes a selection on the product page. Omit a param for a
// product that doesn't have that attribute (a color-only product: just ?color=black).
//
// With NO selection at all (no color and no size), it returns the product's
// DEFAULT price and stock (`isDefault: true`), so the page always has a price to
// show - on first load, after clearing the selection, and for products without variants.
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const color = searchParams.get("color") || null;
  const size = searchParams.get("size") || null;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const authUser = await getAuthUser();

  if (!color && !size) {
    return NextResponse.json(
      {
        variant: {
          id: null,
          color: null,
          size: null,
          stock: product.stock,
          inStock: product.stock > 0,
          ...computeVariantPrices(product.price, product.discount, 0),
          // the product's default line (no variant) in the cart
          ...(await cartInfo(authUser?.userId, product.id, null)),
          isDefault: true,
        },
      },
      { status: 200 },
    );
  }

  const variant = await prisma.productVariant.findFirst({
    where: { productId: product.id, color, size },
  });

  // No such color+size combination (e.g. a color that only comes in one of the two
  // sizes): that's just "not available", not an error - stock 0 / inStock false,
  // priced at the default price, so the page can show "out of stock" for it.
  if (!variant) {
    return NextResponse.json(
      {
        variant: {
          id: null,
          color,
          size,
          stock: 0,
          inStock: false,
          ...computeVariantPrices(product.price, product.discount, 0),
          isInCart: false,
          cartQuantity: 0,
          isDefault: false,
        },
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      variant: {
        id: variant.id,
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        inStock: variant.stock > 0,
        ...computeVariantPrices(product.price, product.discount, variant.priceDiff),
        ...(await cartInfo(authUser?.userId, product.id, variant.id)),
        isDefault: false,
      },
    },
    { status: 200 },
  );
}
