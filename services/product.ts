import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { ProductDetailType } from "@/components/genericTypes";

export const getProductService = async (productId:string) => {
    console.log(productId);
    
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(productId));
  console.log(response?.data);
  
  return response?.data?.product as ProductDetailType;
};

