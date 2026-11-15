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
  variantId,
  quantity,
}: {
  itemId: string;
  variantId?: string;
  quantity: number;
}) => {
  const response = await apiClient.patch(API_ENDPOINTS.CART.ITEM(itemId), {
    quantity,
    variantId
  });
  return response?.data;
};

export const removeCartItemService = async ({id,variantId}:{id: string, variantId?: string}) => {
  const response = await apiClient.delete(API_ENDPOINTS.CART.ITEM(id), { params: { variantId } });
  return response?.data;
};

export const checkoutService = async ({
  addressId,
  shippingCost,
}: {
  addressId: string;
  shippingCost?: number;
}) => {
  const response = await apiClient.post(API_ENDPOINTS.ORDERS.BASE, { addressId, shippingCost });
  return response;
};