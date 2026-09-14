import clsx from "clsx";
import { ChipPropsType } from "./types";
import type { ElementType } from "react";

export default function Chip<T extends ElementType = "li">({
  children,
  variant = "filled",
  color = "primary",
  size = "sm",
  className = "",
  icon,
  as,
  rounded=false,
  ...props
}: ChipPropsType<T>) {
  const Component = as || "div";
  const colors = {
    filled: {
      info: "text-info-light bg-info",
      warning: "text-warning-light bg-warning",
      danger: "text-danger-light bg-danger",
      success: "text-success-light bg-success",
      primary: "text-primary-light bg-primary",
      secondary: "text-secondary-light bg-secondary",
      neutral: "text-dim bg-neutral",
    },
    lightness: {
      info: "text-info bg-info-light",
      warning: "text-warning bg-warning-light",
      danger: "text-danger bg-danger-light",
      success: "text-success bg-success-light",
      primary: "text-primary bg-primary-light",
      secondary: "text-secondary bg-secondary-light",
      neutral: "text-dim bg-neutral-light",
    },
    outline: {
      info: "text-info border border-info",
      warning: "text-warning border border-warning",
      danger: "text-danger border border-danger",
      success: "text-success border border-success",
      primary: "text-primary border border-primary",
      secondary: "text-secondary border border-secondary",
      neutral: "text-dim-dark border border-neutral-light",
    },
  };
  const sizes={
    sm:"text-xs py-1 font-semibold",
    base:"text-sm py-2 font-bold",
  }
  const baseClasses =
    "flex items-center px-3 relative w-fit transition-all rounded-md";
  return (
    <Component {...props} className={clsx(baseClasses, className,{"!rounded-full":rounded}, colors[variant][color],sizes[size])}>
      {icon && <i className={`${icon} text-xs-plus me-2`}></i>}
      {children}
    </Component>
  );
}
