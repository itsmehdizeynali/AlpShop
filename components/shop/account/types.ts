import type { ChipColors } from "@/components/generic/types";
import type { ReactNode } from "react";

export type TableColumnsType<T> = {
  key: keyof T;
  label: string;
  renderCell?: (row: T) => ReactNode|undefined;
};


export type TableDataStatusesType="cancelled"|"delivered"|"shipped"|"returned";

export type TableDataType= {
  img?: string;
  order: string;
  date: string;
  status: { title: TableDataStatusesType; color: ChipColors };
  total: number;
  actions: string;
}
