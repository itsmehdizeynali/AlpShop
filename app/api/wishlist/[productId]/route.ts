import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";

// DELETE /api/wishlist/:productId
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await params;

  await prisma.wishlistItem.deleteMany({
    where: { userId: authUser.userId, productId },
  });

  return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });
}
