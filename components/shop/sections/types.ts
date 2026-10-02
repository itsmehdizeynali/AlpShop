import type { ProductType } from "@/components/genericTypes";

export interface ProductsWrapPropsType {
  headerTitle: string;
  headerLink?: string;
  className?: string;
  products?: ProductType[];
  isLoading?:boolean;
  queryKeys?:string[]
}

export interface CommentBoxPropsType {
  id?: string;
}
