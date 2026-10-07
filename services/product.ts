import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type {  ProductDetailType } from "@/components/genericTypes";

export const getProductService = async (productId: string) => {

  const response = await apiClient.get(
    API_ENDPOINTS.PRODUCTS.DETAIL(productId),
  );

  return response?.data?.product as ProductDetailType;
};

export const getProductCommentsService = async (
  slug: string,
  params?: { pageSize?: number; page?: number },
) => {

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.COMMENTS(slug), {
    params,
  });


  return response.data;
};

export const addProductCommentService = async ({
  slug,
  data,
}: {
  slug: string;
  data: { content: string; parentId?: string; rating?: number };
}) => {
  const response = await apiClient.post(
    API_ENDPOINTS.PRODUCTS.COMMENTS(slug),
    data,
  );
  return response?.data;
};

export const getProductVariantService = async ({
  slug,
  selection,
}: {
  slug: string;
  selection: { color?: string; size?: string };
}) => {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.VARIANT(slug), {
    params: selection,
  });

  return response;
};
