import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/geo/countries
// Feeds both the "country" select (use `name`) and the "countryPhoneCode"
// select (use `phoneCode`, display as "+98" etc.) - same list, two selects,
// picked independently of each other.
export async function GET() {
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ countries }, { status: 200 });
}

// POST /api/geo/countries (admin only)  { name, code, phoneCode }
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, code, phoneCode } = await req.json();
  if (!name || !code || !phoneCode) {
    return NextResponse.json({ error: "name, code and phoneCode are required" }, { status: 400 });
  }

  try {
    const country = await prisma.country.create({ data: { name, code, phoneCode } });
    return NextResponse.json({ country }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 });
  }
}
