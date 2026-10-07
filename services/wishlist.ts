import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { WishlistItemType } from "@/components/shop/wishlist/type";
import type { PaginationType } from "@/components/genericTypes";

export const getWishlistService = async ({pageSize=12,page=1}: {pageSize?:number|undefined,page?:number|undefined}) => {
  const response = await apiClient.get(API_ENDPOINTS.WISHLIST.BASE, {
    params:{pageSize,page}
  });
  
  return response?.data as { items:WishlistItemType[], pagination:PaginationType};
};

export const addToWishlistService = async (productId: string) => {
  const response = await apiClient.post(API_ENDPOINTS.WISHLIST.BASE, { productId });
  
  return response?.data;
};

export const removeFromWishlistService = async (productId: string) => {
  const response = await apiClient.delete(API_ENDPOINTS.WISHLIST.ITEM(productId));
  
  return response?.data;
};




