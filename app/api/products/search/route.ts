import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { enrichForUser, productInclude, withRate } from "@/lib/product";

// GET /api/products/search?q=&titles=&limit=
// A lightweight endpoint for a search dropdown/autocomplete:
// - "titles": a short list of matching product names (for suggestions)
// - "products": a short list of matching products (id/name/slug/price/image) for previews
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const titlesLimit = Math.min(7, Number(searchParams.get("titles")) || 7);
  const productsLimit = Math.min(7, Number(searchParams.get("limit")) || 7);

  if (!q) {
    return NextResponse.json({ titles: [], products: [] }, { status: 200 });
  }

  // SQLite's `contains` filter is case-sensitive and Prisma's `mode: "insensitive"`
  // isn't supported on SQLite, so matching ids come from a raw query using SQLite's
  // built-in NOCASE collation (folds ASCII a-z/A-Z).
  const matches = await prisma.$queryRaw<{ id: string; name: string }[]>`
    SELECT id, name FROM Product
    WHERE name LIKE ${"%" + q + "%"} COLLATE NOCASE AND isActive = 1
    ORDER BY name ASC
    LIMIT ${productsLimit}
  `;

  const titles = Array.from(new Set(matches.map((m) => m.name))).slice(0, titlesLimit);

  const products = await prisma.product.findMany({
    where: { id: { in: matches.map((m) => m.id) } },
    include: productInclude,
  });

  // findMany doesn't preserve the `in` list order, so re-sort to match the raw query's order
  const order = matches.map((m) => m.id);
  products.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  const authUser = await getAuthUser();
  const enrichedProducts = await enrichForUser(products.map(withRate), authUser?.userId);

  return NextResponse.json({ titles, products: enrichedProducts }, { status: 200 });
}
