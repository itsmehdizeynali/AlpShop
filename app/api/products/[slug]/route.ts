import { prisma } from "@/lib/prisma";
import { getAuthUser, requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { computePrices, computeRate, enrichForUser, groupVariants } from "@/lib/product";

// GET /api/products/:slug
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      specs: { orderBy: { position: "asc" } },
      variants: true,
      category: true,
      brand: true,
      reviews: {
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // computed { rate, users } average, alongside the full `reviews` list (used for the comments section)
  const rate = computeRate(product.reviews);
  const withComputed = {
    ...product,
    ...computePrices(product.price, product.discount),
    rate,
    // grouped for the selection UI: [{ title: "color", items: [...] }, { title: "size", items: [...] }]
    // `variants` itself stays too - the raw rows, needed to look up stock/price per exact combination
    variantGroups: groupVariants(product.variants),
  };

  const authUser = await getAuthUser();
  const [enrichedProduct] = await enrichForUser([withComputed], authUser?.userId);

  return NextResponse.json({ product: enrichedProduct }, { status: 200 });
}

// PATCH /api/products/:slug (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();

  try {
    // when "images" is provided, replace the product's image set entirely
    // (delete the old ones, insert the new list in the given order)
    if (body.images) {
      await prisma.product.update({
        where: { slug },
        data: { images: { deleteMany: {} } },
      });
    }

    // same convenience as POST: a categorySlug/brandSlug resolves to its id,
    // so re-filing an existing product into a (sub)category doesn't need the raw id
    let categoryId = body.categoryId as string | undefined;
    if (!categoryId && body.categorySlug) {
      const category = await prisma.category.findUnique({ where: { slug: body.categorySlug } });
      if (!category) {
        return NextResponse.json({ error: `Unknown categorySlug: ${body.categorySlug}` }, { status: 400 });
      }
      categoryId = category.id;
    }

    let brandId = body.brandId as string | undefined;
    if (!brandId && body.brandSlug) {
      const brand = await prisma.brand.findUnique({ where: { slug: body.brandSlug } });
      if (!brand) {
        return NextResponse.json({ error: `Unknown brandSlug: ${body.brandSlug}` }, { status: 400 });
      }
      brandId = brand.id;
    }

    const product = await prisma.product.update({
      where: { slug },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        discount: body.discount,
        stock: body.stock,
        isActive: body.isActive,
        categoryId,
        brandId,
        isFeatured: body.isFeatured,
        images: body.images?.length
          ? {
              create: body.images.map((img: { url: string; altText?: string }, i: number) => ({
                url: img.url,
                altText: img.altText,
                position: i,
              })),
            }
          : undefined,
      },
      include: { images: { orderBy: { position: "asc" } } },
    });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/products/[slug] failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/:slug (admin only)
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    await prisma.product.delete({ where: { slug } });
    return NextResponse.json(
      { message: "Product deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
