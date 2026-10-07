import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";

export const getCartService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.CART.BASE);
  return response?.data?.cart;
};

export const addToCartService = async ({
  productId,
  variantId,
  quantity,
}: {
  productId: string;
  variantId?: string;
  quantity?: number;
}) => {
  const response = await apiClient.post(API_ENDPOINTS.CART.BASE, {
    productId,
    variantId,
    quantity,
  });
  return response?.data;
};

export const updateCartItemService = async ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) => {
  const response = await apiClient.patch(API_ENDPOINTS.CART.ITEM(itemId), {
    quantity,
  });
  return response?.data;
};

export const removeCartItemService = async (itemId: string) => {
  const response = await apiClient.delete(API_ENDPOINTS.CART.ITEM(itemId));
  return response?.data;
};

export const clearCartService = async () => {
  const response = await apiClient.delete(API_ENDPOINTS.CART.BASE);
  return response?.data;
};
