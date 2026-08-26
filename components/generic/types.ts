import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// ALERT
export type AlertColors = "info" | "success" | "danger" | "warning" | "primary";
export type AlertVarients = "filled" | "lightness" | "text";
export type AlertSizes = "sm" | "base";
export type AlertPropsType = Partial<{
  variant: AlertVarients;
  color: AlertColors;
  children: ReactNode;
  size: AlertSizes;
  className: string;
  hasIcon: boolean;
}>;

// BTN
export type BtnColors =
  | "transparent"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "dim"
  | "neutral";
export type BtnVarients =
  | "normal"
  | "text"
  | "outline"
  | "lightness"
  | "outline-lightness";
export type BtnSizes = "lg" | "base" | "sm" | "xs";
export type BtnPropsType<T extends ElementType> = Partial<{
  children: ReactNode;
  as: ElementType;
  color: BtnColors;
  size: BtnSizes;
  variant: BtnVarients;
  loading: boolean;
  square: boolean;
  rounded: boolean;
  disabled: boolean;
  icon: string;
  iconPlace: "start" | "end";
  href: string;
  className: string;
}> &
  ComponentPropsWithoutRef<T>;

// CARD
export type CardColors =
  | "transparent"
  | "primary"
  | "primary-light"
  | "gradient-primary"
  | "info"
  | "success"
  | "danger"
  | "warning"
  | "neutral-dark"
  | "neutral";

export type CardPropsType<T extends ElementType> = Partial<{
  children: ReactNode;
  as: ElementType;
  color: CardColors;
  href: string;
  className: string;
  hasBorder: boolean;
  hasHover: boolean;
}> &
  ComponentPropsWithoutRef<T>;

// CHIP
export type ChipColors =
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "primary"
  | "neutral";
export type ChipVarients = "filled" | "lightness" | "outline";
export type ChipPropsType = Partial<{
  children: ReactNode;
  variant: ChipVarients;
  color: ChipColors;
  className: string;
  icon: string;
}>;

// HEADING
export type HeadingVarients = "h1" | "h2" | "h3" | "h4" | "h5";

export type HeadingPropsType<T extends ElementType> = Partial<{
  as: ElementType;
  variant: HeadingVarients;
  color: "white" | "dim-dark" | "dim-light"|"primary";
  weight: "bold" | "medium";
  children: ReactNode;
  className: string;
}> &
  ComponentPropsWithoutRef<T>;

// INPUT
export type InputPropsType = Partial<{
  label: string;
  startSide: ReactNode;
  endSide: ReactNode;
  endSideLabel: ReactNode;
  wrapClasses: string;
  showMsg: boolean;
  msgType: AlertColors;
  msg: string | null;
  defaultValue: string;
  rounded: boolean;
}> &
  ComponentPropsWithoutRef<"input">;

// LOGO
export type LogoPropsType = Partial<{
  className: string;
  size: "sm" | "base" | "lg";
  whiteLogo: boolean;
}>;

// PAGINATION
export type PaginationPropsType = {
  total?: number;
  current?: number;
  reFetch: (num: number) => void;
  className?: string;
};

// PANEL-HEADER-SECTION
export type HeaderSectionPropsType = Partial<{
  children: ReactNode;
  className: string;
  endSide: ReactNode;
  badge: string;
  border: boolean;
  shape: boolean;
  size: HeadingVarients;
  icon: string;
}> &
  ComponentPropsWithoutRef<"div">;

// SELECT-BOX
export type SelectOption<T> = {
  label: string;
  value: string | number;
  status?: T;
  statusText?: string;
};

export type SelectBoxPropsType<T> = {
  label?: string;
  options: SelectOption<T>[];
  endSideLabel?: ReactNode;
  className?: string;
  formatOption?: (option: SelectOption<T>) => ReactNode;
};

// TABLE
export type TableColumnsType<T> = {
  key: keyof T;
  label: string;
  renderCell?: (row: T) => ReactNode;
};

export type TablePropsType<T> = {
  columns: TableColumnsType<T>[];
  data: T[];
  head?: boolean;
  refreshData: (num: number) => void;
  hasPagination?: boolean;
  paginationTotal?: number;
  paginationCurrent?: number;
};

// TABS
export type TabsPropsType<T extends { id: string }> = {
  tabs: T[];
  renderCell: (item: T) => ReactNode;
  changeTab: (id: string) => void;
  wrapclass?: string;
  className?: string;
};

// TEXT
export type TextSizesType = "lg" | "md" | "base" | "sm" | "xs";
export type TextWeightsType = "light" | "medium" | "bold";
export type TextColorsType =
  | "dim-dark"
  | "dim-light"
  | "dim"
  | "white"
  | "black"
  | "info"
  | "danger"
  | "success"
  | "warning"
  | "primary"
  | "primary-light";
export type TextPropsType<T extends ElementType> = Partial<{
  as: T;
  size: TextSizesType;
  color: TextColorsType;
  weight: TextWeightsType;
  children: ReactNode;
  className: string;
}> &
  ComponentPropsWithoutRef<T>;

// TEXTAREA
export type TextareaPropsType = Partial<{
  label: string;
  startSide: ReactNode;
  endSide: ReactNode;
  endSideLabel: ReactNode;
  wrapClasses: string;
  showMsg: boolean;
  msgType: AlertColors;
  msg: string | null;
  defaultValue: string;
}>;
