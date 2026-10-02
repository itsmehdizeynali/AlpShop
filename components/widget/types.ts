import type { ArticleType, ProductType } from "../genericTypes";
import type { shoppingCartItem } from "../shop/cart/type";

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
  queryKeys?:string[]
}
export interface ProductRowCardPropsType {
  className?:string,
  item: shoppingCartItem;
  queryKeys?:string[]
}
