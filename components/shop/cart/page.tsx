"use client";

import { getCartService } from "@/services/cart";
import ShopCartPayment from "./payment";
import ShopCartShoppingCart from "./shoppingCart";
import { useQuery } from "@tanstack/react-query";
import type { shoppingCartItem } from "./type";

export default function ShopCartPage() {
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartService,
  });
  const items = data?.items ?? [];
  const totalPriceBefore = items.reduce(
    (sum: number, item: shoppingCartItem) =>
      item.product.realPrice * item.quantity + sum,
    0,
  );
  const totalPriceAfter = items.reduce(
    (sum: number, item: shoppingCartItem) =>
      item.product.price * item.quantity + sum,
    0,
  );
  const profit = items.reduce(
    (sum: number, item: shoppingCartItem) =>
      (item.product.realPrice - item.product.price) * item.quantity + sum,
    0,
  );

  const itemsCount = items.reduce(
    (sum: number, item: shoppingCartItem) => item.quantity + sum,
    0,
  );

  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap -m-2">
        {data?.items && <ShopCartShoppingCart items={data?.items} />}
        <ShopCartPayment
          totalPriceBefore={totalPriceBefore}
          totalPriceAfter={totalPriceAfter}
          profit={profit}
          itemsCount={itemsCount}
        />
      </div>
    </div>
  );
}
