import type { CommentType } from "@/components/genericTypes";
import type { ReactNode } from "react";

export interface RatingPropsType {
  productRate?: number;
  users?: number;
  className?: string;
  disabled?: boolean;
  size?: "lg" | "sm";
}

export interface ModalPropsType {
  children: ReactNode;
  closeModal: () => void;
  isOpenModal: boolean;
}

export interface CommentPropsType {
  comment: CommentType;
  className?: string;
}

export interface SidebarPropsType {
  price?: { min: number; max: number };
}
