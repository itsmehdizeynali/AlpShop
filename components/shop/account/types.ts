import type { ChipColors } from "@/components/generic/types";
import type { OrderStatusesType, orderType } from "@/components/genericTypes";
import type { Dispatch, ReactNode, SetStateAction } from "react";

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

export interface HeroPropsType {
  name?: string;
  isLoading: boolean;
}
export interface InformationPropsType {
  information: {
    name: string;
    lastName?: string;
    addresses: {
      country: string;
      province: string;
      city: string;
      addressLine: string;
    }[];
    email: string;
    phone: string;
  };
  isLoading: boolean;
}
export interface ReturnRequestModalPropsType {
  id: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}