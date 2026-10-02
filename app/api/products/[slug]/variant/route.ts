import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/products/:slug/variant?color=&size=
// Looks up the exact variant for a chosen combination (e.g. color=black&size=40)
// and returns its price/stock - call this whenever the user changes a selection
// on the product page. Omit a param entirely for a product that doesn't have
// that attribute (e.g. a color-only product: just ?color=black).
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const color = searchParams.get("color");
  const size = searchParams.get("size");

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const variant = await prisma.productVariant.findFirst({
    where: { productId: product.id, color: color ?? null, size: size ?? null },
  });

  if (!variant) {
    return NextResponse.json(
      { error: "No variant matches that combination" },
      { status: 404 },
    );
  }

  const price = Number((product.price * (1 - product.discount / 100) + variant.priceDiff).toFixed(2));
  const realPrice = Number((product.price + variant.priceDiff).toFixed(2));

  return NextResponse.json(
    {
      variant: {
        id: variant.id,
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        price,
        realPrice,
      },
    },
    { status: 200 },
  );
}
