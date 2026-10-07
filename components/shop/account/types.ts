import type { ChipColors } from "@/components/generic/types";
import type { ReactNode } from "react";

export type TableColumnsType<T> = {
  key: keyof T;
  label: string;
  renderCell?: (row: T) => ReactNode|undefined;
};


export type TableDataStatusesType="CANCELLED"|"DELIVERED"|"SHIPPED"|"RETURNED";

export type TableDataType= {
  images?: string[];
  order: string;
  date: string;
  status: { title: TableDataStatusesType; color: ChipColors };
  total: number;
  actions: string;
}
