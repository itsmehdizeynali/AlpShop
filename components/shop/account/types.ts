import type { ChipColors } from "@/components/generic/types";
import type { OrderStatusesType, orderType } from "@/components/genericTypes";
import type { ReactNode } from "react";

export type TableColumnsType<T> = {
  key: keyof T;
  label: string;
  renderCell?: (row: T) => ReactNode|undefined;
};


export type TableDataType= {
  images?: string[];
  reason?: string;
  order: string;
  date: string;
  status: { title: OrderStatusesType; color: ChipColors };
  total: number;
  actions: string;
}


export interface ReturnRequestType {
  order:orderType
createdAt:string
status:OrderStatusesType
reason:string
id:string
}