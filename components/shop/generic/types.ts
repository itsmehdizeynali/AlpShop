import type { CommentType } from "@/components/genericTypes";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface RatingPropsType {
  productRate?: number;
  users?: number;
  className?: string;
  disabled?: boolean;
  size?: "lg" | "sm";
  showDetails?:boolean
  handelSetRate?:(rate:number)=>void
}

export interface ModalPropsType {
  children: ReactNode;
  closeModal: () => void;
  isOpenModal: boolean;
}

export interface CommentPropsType {
  comment: CommentType;
  className?: string;
  handelReply:Dispatch<SetStateAction<string | undefined>>
  isReply?:boolean
}

export interface CommentsWrapPropsType {
  slug:string,
  type?:"article"|"product",
}

export interface SidebarPropsType {
  price?: { min: number; max: number };
}
