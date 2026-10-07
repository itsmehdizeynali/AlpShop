import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// GET /api/returns?page=&pageSize=
// The current user's own return requests (for the account/returnRequests page).
export async function GET(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Number(searchParams.get("pageSize")) || 10);

  const [returnRequests, total] = await Promise.all([
    prisma.returnRequest.findMany({
      where: { userId: authUser.userId },
      include: { order: { select: { id: true, orderNumber: true, total: true, createdAt: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.returnRequest.count({ where: { userId: authUser.userId } }),
  ]);

  return NextResponse.json(
    { returnRequests, pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } },
    { status: 200 },
  );
}
