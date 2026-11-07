"use client";

import { getCartService } from "@/services/cart";
import ShopCartPayment from "./payment";
import ShopCartShoppingCart from "./shoppingCart";
import { useQuery } from "@tanstack/react-query";
import type { shoppingCartItem } from "./type";
import Btn from "@/components/generic/btn";
import Text from "@/components/generic/text";
import { useState } from "react";
import ShopModal from "../generic/modal";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Link from "next/link";
import clsx from "clsx";

export default function ShopCartPage() {
  const { data, isLoading, refetch } = useQuery({
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
  const [showModal, setShowModal] = useState<{status:"success"|"unSuccess",active:boolean}>({status:"success",active:false});

  return (
    <div className="container my-section">
      <ShopModal central isOpenModal={showModal.active}
        closeModal={() => setShowModal({active:false,status:"unSuccess"})}>
          <>
          <i className={clsx(showModal.status==="success"?"text-success":"text-danger","icon-checked-circle text-12xl text-center mb-4")}></i>
          <Heading variant="h4" className="text-center mb-2">
            Payment {showModal.status==="success"?"Successfull":"Unsuccessful"}
          </Heading>
          <Price size="lg" className="text-center mb-4">
            145
          </Price>
          <Btn onClick={()=>setShowModal({active:false,status:"success"})} as={Link} href={showModal.status==="success"?"/":"/cart"} color={showModal.status==="success"?"success":"danger"} className="w-full" size="lg">
            ok
          </Btn>
          </>
      </ShopModal>
      {(!!data?.items.length ||isLoading) ? (
        <div className="flex items-start max-lg:flex-wrap -m-2">
          <ShopCartShoppingCart isLoading={isLoading} items={data?.items} />
          <ShopCartPayment
          setShowModal={setShowModal}
            isLoading={isLoading}
            totalPriceBefore={totalPriceBefore}
            totalPriceAfter={totalPriceAfter}
            profit={profit}
            itemsCount={itemsCount}
          />
        </div>
      ) : (
        <div className="py-30">
          <Btn
            onClick={() => refetch()}
            icon="icon-refresh"
            rounded
            square
            color="black"
            variant="lightness"
            className="mb-2 mx-auto"
          />
          <Text className="text-center">The shopping cart is empty.</Text>
        </div>
      )}
    </div>
  );
}
