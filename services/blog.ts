import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { ArticleDetailsType } from "@/components/genericTypes";

interface BlogParamsType {
  sort?: string;
  pageSize?: number;
  page?: number;
  category?:string
  tag?:string
}

export const getBlogService = async (params: BlogParamsType) => {
  
  const response = await apiClient.get(API_ENDPOINTS.BLOG.BASE, { params:{...params,pageSize:params.pageSize||10} });

  return response?.data;
};



export const getBlogCategoriesService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.BLOG.CATEGORIES);

  return response?.data?.categories;
};

export const getArticleService = async (articleId:string) => {    
  const response = await apiClient.get(API_ENDPOINTS.BLOG.DETAIL(articleId));
  
  return response?.data?.post as ArticleDetailsType;
};
export const getArticleCommentsService = async (slug: string,params?:{pageSize?:number,page?:number}
) => {
  
  const response = await apiClient.get(
    API_ENDPOINTS.BLOG.COMMENTS(slug),{
      params
    });
    
  return response.data;
};
export const AddArticleCommentService = async ({
  slug,
  data,
}: {
  slug: string;
  data: { content: string; parentId?: string };
}) => {
  const response = await apiClient.post(
    API_ENDPOINTS.BLOG.COMMENTS(slug),
    data,
  );
  return response?.data;
};

