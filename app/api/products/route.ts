import { prisma } from "@/lib/prisma";
import { getAuthUser, requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { enrichForUser, productInclude, withRate } from "@/lib/product";

// GET /api/products?category=&brand=&search=&minPrice=&maxPrice=&onSale=&featured=&page=&pageSize=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const onSale = searchParams.get("onSale");
  const featured = searchParams.get("featured");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 12);

  // supports either one slug ("category=electronics") or several,
  // comma-separated ("category=electronics,FashionAndClothing")
  const categorySlugs = category?.split(",").filter(Boolean) ?? [];
  const brandSlugs = brand?.split(",").filter(Boolean) ?? [];

  // every filter EXCEPT price - used below to compute the slider's min/max bounds,
  // so the bounds reflect "all products in this category/brand/sale" rather than
  // shrinking to whatever min/maxPrice the user already dragged the slider to
  const whereWithoutPrice: Prisma.ProductWhereInput = {
    isActive: true,
    // matches a product whose OWN category slug is in the list (works for a
    // subcategory like "audio") OR whose category's PARENT slug is in the list
    // (so filtering by a top-level category like "electronics" still includes
    // every product filed under its subcategories)
    ...(categorySlugs.length
      ? {
          category: {
            OR: [{ slug: { in: categorySlugs } }, { parent: { slug: { in: categorySlugs } } }],
          },
        }
      : {}),
    ...(brandSlugs.length ? { brand: { slug: { in: brandSlugs } } } : {}),
    ...(onSale === "true" ? { discount: { gt: 0 } } : {}),
    ...(featured === "true" ? { isFeatured: true } : {}),
  };

  const where: Prisma.ProductWhereInput = {
    ...whereWithoutPrice,
    ...(minPrice || maxPrice
      ? {
          price: {
            ...(minPrice ? { gte: Number(minPrice) } : {}),
            ...(maxPrice ? { lte: Number(maxPrice) } : {}),
          },
        }
      : {}),
  };

  // SQLite's contains filter is case-sensitive and Prisma's mode: "insensitive"
  // option isn't supported on SQLite, so case-insensitive search is done with a raw
  // query using SQLite's built-in NOCASE collation (folds ASCII a-z/A-Z), then the
  // matching ids are combined with the rest of the filters above.
  if (search) {
    const matches = await prisma.$queryRaw<{ id: string }[]>
      `SELECT id FROM Product WHERE name LIKE ${"%" + search + "%"} COLLATE NOCASE`
    ;
    where.id = { in: matches.map((m) => m.id) };
  }

  const [products, total, priceAgg] = await Promise.all([
    prisma.product.findMany({
      where,
      include: productInclude,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
    // min/max across the filtered-minus-price set, so the slider bounds make sense
    prisma.product.aggregate({ where: whereWithoutPrice, _min: { price: true }, _max: { price: true } }),
  ]);

  const authUser = await getAuthUser();
  const enrichedProducts = await enrichForUser(products.map(withRate), authUser?.userId);

  return NextResponse.json(
    {
      products: enrichedProducts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
      priceRange: {
        min: priceAgg._min.price ?? 0,
        max: priceAgg._max.price ?? 0,
      },
    },
    { status: 200 },
  );
}
// POST /api/products (admin only)
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      price,
      discount,
      stock,
      categoryId,
      categorySlug,
      brandId,
      brandSlug,
      isFeatured,
      images,
      specs,
      variants,
    } = body;

    if (!name || !slug || !description || price === undefined) {
      return NextResponse.json(
        { error: "name, slug, description and price are required" },
        { status: 400 },
      );
    }

    // Convenience for API clients (e.g. Postman) that don't want to look up
    // generated category/brand ids first — a slug resolves to its id here.
    let resolvedCategoryId = categoryId as string | undefined;
    if (!resolvedCategoryId && categorySlug) {
      const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (!category) {
        return NextResponse.json({ error: `Unknown categorySlug: ${categorySlug}` }, { status: 400 });
      }
      resolvedCategoryId = category.id;
    }

    let resolvedBrandId = brandId as string | undefined;
    if (!resolvedBrandId && brandSlug) {
      const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
      if (!brand) {
        return NextResponse.json({ error: `Unknown brandSlug: ${brandSlug}` }, { status: 400 });
      }
      resolvedBrandId = brand.id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        discount: discount ?? 0,
        stock: stock ?? 0,
        categoryId: resolvedCategoryId,
        brandId: resolvedBrandId,
        isFeatured: isFeatured ?? false,
        images: images?.length
          ? {
              create: images.map((img: { url: string; altText?: string }, i: number) => ({
                url: img.url,
                altText: img.altText,
                position: i,
              })),
            }
          : undefined,
        specs: specs?.length
          ? {
              create: specs.map((s: { label: string; value: string }, i: number) => ({
                label: s.label,
                value: s.value,
                position: i,
              })),
            }
          : undefined,
        variants: variants?.length
          ? {
              create: variants.map(
                (v: { color?: string; size?: string; stock: number; priceDiff?: number }) => ({
                  color: v.color,
                  size: v.size,
                  stock: v.stock,
                  priceDiff: v.priceDiff ?? 0,
                }),
              ),
            }
          : undefined,
      },
      include: { images: true, specs: true, variants: true },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A product with this slug already exists" },
          { status: 409 },
        );
      }
      if (error.code === "P2003") {
        return NextResponse.json(
          { error: "categoryId/brandId does not point to an existing category/brand" },
          { status: 400 },
        );
      }
    }
    console.error("POST /api/products failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 },
    );
  }
}