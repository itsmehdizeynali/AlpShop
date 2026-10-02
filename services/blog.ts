import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { ArticleDetailsType } from "@/components/genericTypes";

interface BlogParamsType {
  sort?: string;
  pageSize?: number;
  page?: number;
  category?:string
  tags?:string
}

export const getBlogService = async (params: BlogParamsType) => {
  console.log(params);
  
  const response = await apiClient.get(API_ENDPOINTS.BLOG.BASE, { params:{...params,pageSize:params.pageSize||10} });

  return response?.data;
};
export const getBlogCategoriesService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.BLOG.CATEGORIES);
  console.log(response?.data);

  return response?.data?.categories;
};

export const getArticleService = async (articleId:string) => {    
  const response = await apiClient.get(API_ENDPOINTS.BLOG.DETAIL(articleId));
  console.log(response?.data);
  
  return response?.data?.post as ArticleDetailsType;
};


