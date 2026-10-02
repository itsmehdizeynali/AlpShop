import type { ProductType } from "@/components/genericTypes";

export interface WishlistItemType {
  createdAt: string;
  id: string;
  product: ProductType;
  productId: string;
  userId: string;
}
