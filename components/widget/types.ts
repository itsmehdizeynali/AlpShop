import type { ArticleType, ProductType } from "../genericTypes";

export interface ArticleCardPropsType {
  article: ArticleType;
}
export interface ArticleRowCardPropsType {
  article: ArticleType;
}
export interface ProductCardPropsType {
  spacial?: boolean;
  color?: "transparent" | "white";
  hasBorder?: boolean;
  responsive?: boolean;
  product: ProductType;
}
export interface ProductRowCardPropsType {
  className:string,
  product: ProductType;
}
