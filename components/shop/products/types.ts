import type { ComponentPropsWithoutRef } from "react";

export interface ColorRadioPropsType {
  colors: { name: string; hex: string }[];
  className?: string;
}
export type SizeRadioPropsType= {
  items: string[];
  className?: string;
} & ComponentPropsWithoutRef<"ul">

export interface SelectionsPropsType {
  className?: string;
  colors?: { name: string; hex: string }[];
  variants?: { title: string; items: string[] }[];
}
