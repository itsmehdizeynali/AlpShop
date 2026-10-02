import type { ProductType } from "@/components/genericTypes";

export interface shoppingCartItem {
  cartId: string;
  createdAt: string;
  id: string;
  product: ProductType;
  productId: string;
  quantity: number;
  variant: null | string;
  variantId: null | string;
}
export interface shoppingCartPropsType {
  items: shoppingCartItem[];
}

export interface ShopCartPaymentPropsType {
  totalPriceBefore: number;
  totalPriceAfter: number;
  profit: number;
  itemsCount: number;
}
