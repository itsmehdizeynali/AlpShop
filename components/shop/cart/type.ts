import type { ProductType } from "@/components/genericTypes";
import type { Dispatch, SetStateAction } from "react";

export interface shoppingCartItem {
  cartId: string;
  createdAt: string;
  id: string;
  product: ProductType;
  productId: string;
  quantity: number;
  variant: {
    color: string|null;
    id: string;
    priceDiff: number;
    productId: string;
    size: string;
    stock: number;
  };
  variantId: null | string;
}
export interface shoppingCartPropsType {
  items: shoppingCartItem[];
  isLoading?: boolean;
}

export interface ShopCartPaymentPropsType {
  totalPriceBefore: number;
  totalPriceAfter: number;
  profit: number;
  itemsCount: number;
  isLoading?: boolean;
  setShowModal: Dispatch<
    SetStateAction<{
      status: "success" | "unSuccess";
      active: boolean;
    }>
  >;
}
