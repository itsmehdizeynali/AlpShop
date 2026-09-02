import clsx from "clsx";
import { ChipPropsType } from "./types";

export default function Chip({
  children,
  variant = "filled",
  color = "primary",
  className = "",
  icon,
}: ChipPropsType) {
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
  const baseClasses =
    "flex items-center relative w-fit px-3 py-1 rounded text-xs font-semibold transition-all";
  return (
    <div className={clsx(baseClasses, className, colors[variant][color])}>
      {children}
      {icon && <i className={`${icon} text-xs-plus ms-2`}></i>}
    </div>
  );
}
