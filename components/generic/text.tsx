import clsx from "clsx";
import { ElementType } from "react";
import { TextPropsType } from "./types";

export default function Text<T extends ElementType = "div">({
  as,
  size = "sm",
  color = "dim-light",
  weight = "medium",
  children,
  className = "",
  ...props
}: TextPropsType<T>) {
  const Component = as || "div";
  const colors = {
    "dim-dark": "text-dim-dark",
    "dim-light": "text-dim-light",
    dim: "text-dim",
    white: "text-white",
    black: "text-black",
    info: "text-info",
    danger: "text-danger",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
    "primary-light": "text-primary-light",
  };
  const weights = {
    light: "font-light",
    medium: "font-medium",
    bold: "font-bold",
  };
  const sizes = {
    lg: "lg:text-lg text-md",
    md: "lg:text-md text-base",
    base: "lg:text-base text-sm",
    sm: "lg:text-sm text-xs",
    xs: "text-xs",
  };
  return (
    <Component
      className={clsx("transition-all",sizes[size], colors[color], weights[weight], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
