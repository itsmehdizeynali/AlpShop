import type { CategoryItemType } from "../genericTypes";

export interface CategoryModalListItemPropsType {
  item: CategoryItemType;
  className?: string;
  closeModal: () => void;
}
export interface CategoryModalPropsType {
  closeModal: () => void;
  isOpenModal: boolean;
}

export interface ToolbarPropsType {
  className: string;
}
export interface HeaderPropsType {
  className: string;
}
export interface FooterPropsType {
  className: string;
}
