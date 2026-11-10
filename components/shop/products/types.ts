import { useState, type ComponentPropsWithoutRef, type Dispatch } from "react";

export interface ColorRadioPropsType {
  colors: { name: string; hex: string }[];
  className?: string;
  active:string|undefined,
  setActive: Dispatch<string|undefined>
}
export type SizeRadioPropsType= {
  items: string[];
  className?: string;
  active:string|undefined,
  setActive: Dispatch<string|undefined>
} & ComponentPropsWithoutRef<"ul">


export interface SelectionsPropsType {
  className?: string;
  colors?: { name: string; hex: string }[];
  variants?: { title: string; items: string[] }[];
  activeColor:string|undefined,
  setActiveColor: Dispatch<string|undefined>
  activeSize:string|undefined,
  setActiveSize: Dispatch<string|undefined>
}
