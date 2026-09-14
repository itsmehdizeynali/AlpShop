import type { ProductType } from "@/components/genericTypes";

export interface ProductsWrapPropsType {
  headerTitle: string;
  headerLink?: string;
  className: string;
  products: ProductType[];
}

export interface CommentBoxPropsType {
  id?: string;
}
