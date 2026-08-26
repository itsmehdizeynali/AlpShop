import clsx from "clsx";
import { HeadingPropsType } from "./types";
import type { ElementType } from "react";

export default function Heading<T extends ElementType>({
  as,
  variant = "h3",
  color = "dim-dark",
  weight = "bold",
  children,
  className = "",
  ...props
}: HeadingPropsType<T>) {
  const Component = as || "div";
  const colors = {
    white: "text-white",
    "dim-dark": "text-dim-dark",
    "dim-light": "text-dim-light",
    "primary": "text-primary",
  };
  const weights = {
    bold: "font-bold",
    medium: "font-medium",
  };
  const variants = {
    h1: "lg:text-5xl text-3xl",
    h2: "lg:text-3xl text-xl",
    h3: "lg:text-xl text-lg",
    h4: "lg:text-lg text-md",
    h5: "lg:text-base text-sm",
    h6: "lg:text-sm text-xs",
  };
  return (
    <Component
      className={clsx(
        "block",
        variants[variant],
        colors[color],
        weights[weight],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
