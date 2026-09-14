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
  comment: {
    id: string;
    img: string;
    user: {
      id: string;
      name: string;
    };
    date: string;
    paragraph: string;
    replies?: {
      id: string;
      img: string;
      user: {
        id: string;
        name: string;
      };
      date: string;
      paragraph: string;
    }[];
  };
  className?: string;
}

export interface SidebarPropsType{
  categories?: string[];
  brands?: string[];
  price?: { min: number; step: number; max: number };
}