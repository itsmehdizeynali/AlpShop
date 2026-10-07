import type { ProductType } from "@/components/genericTypes";
import type { Dispatch, SetStateAction } from "react";

export interface ProductsWrapPropsType {
  headerTitle: string;
  headerLink?: string;
  className?: string;
  products?: ProductType[];
  isLoading?:boolean;
  queryKeys?:string[]
}

export interface CommentBoxPropsType {
  slug: string;
  parentId?: string;
  setParentId: Dispatch<SetStateAction<string | undefined>>;
  type: "article"|"product";
  queryKeys:string[]
}
