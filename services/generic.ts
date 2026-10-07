import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { PaginationType, ProductsDataType } from "@/components/genericTypes";
import type { WishlistItemType } from "@/components/shop/wishlist/type";

interface ProductsParamsType {
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

// layout | pages
export const searchService = async (q?:string) => {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.SEARCH,{
    params:{q}
  });
  return response?.data;
};

export const getLayoutDataService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.LAYOUT);
  return response?.data;
};

export const getCategoriesService = async ({pageSize=undefined}: {pageSize?:number|undefined}) => {
  const response = await apiClient.get(API_ENDPOINTS.CATEGORIES, {
    params:{pageSize}
  });
  
  return response?.data?.categories;
};

export const getProductsService = async ({pageSize=12,...params}: ProductsParamsType) => {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, {
    params:{...params,pageSize}
  });
  
  return response?.data as ProductsDataType;
};

export const getBrandsService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.BRANDS);
  
  return response?.data?.brands;
};
