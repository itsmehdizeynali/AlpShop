import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth-utils";
import { NextResponse } from "next/server";
import { enrichForUser, productInclude, withRate } from "@/lib/product";

// GET /api/orders  (the current user's order history)
export async function GET() {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: authUser.userId },
    include: {
      items: { include: { product: { include: productInclude } } },
    },
    orderBy: { createdAt: "desc" },
  });

  // enrich every order's items in one batch rather than one query per order
  const flatItems = orders.flatMap((order) => order.items);
  const enrichedProducts = await enrichForUser(
    flatItems.map((item) => withRate(item.product)),
    authUser.userId,
  );
  let cursor = 0;
  const enrichedOrders = orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({ ...item, product: enrichedProducts[cursor++] })),
  }));

  return NextResponse.json({ orders: enrichedOrders }, { status: 200 });
}

// POST /api/orders  { addressId, shippingCost? }
// Checks out the current cart into a new order.
export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { addressId, shippingCost } = await req.json();
  if (!addressId) {
    return NextResponse.json({ error: "addressId is required" }, { status: 400 });
  }

  const address = await prisma.address.findUnique({ where: { id: addressId } });
  if (!address || address.userId !== authUser.userId) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: authUser.userId },
    include: { items: { include: { product: true, variant: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  for (const item of cart.items) {
    const availableStock = item.variant ? item.variant.stock : item.product.stock;
    if (availableStock < item.quantity) {
      return NextResponse.json(
        { error: `Not enough stock for ${item.product.name}` },
        { status: 400 },
      );
    }
  }

  const subtotal = cart.items.reduce((sum, item) => {
    const unitPrice =
      item.product.price * (1 - item.product.discount / 100) +
      (item.variant?.priceDiff ?? 0);
    return sum + unitPrice * item.quantity;
  }, 0);
  const shipping = shippingCost ?? 0;
  const total = subtotal + shipping;
  const orderNumber = `#${Date.now().toString(36).toUpperCase()}`;

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        userId: authUser.userId,
        addressId,
        subtotal,
        shippingCost: shipping,
        total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price:
              item.product.price * (1 - item.product.discount / 100) +
              (item.variant?.priceDiff ?? 0),
          })),
        },
      },
      include: { items: true },
    });

    for (const item of cart.items) {
      if (item.variantId) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return created;
  });

  return NextResponse.json({ order }, { status: 201 });
}
