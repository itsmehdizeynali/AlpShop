import clsx from "clsx";
import { CardPropsType } from "./types";
import type { ElementType } from "react";

export default function Card<T extends ElementType>({
  children,
  as: Component = "div",
  color = "neutral",
  href,
  className = "",
  hasBorder = false,
  hasHover = false,
  ...props
}: CardPropsType<T>) {
  const colors = {
    transparent: `bg-transparent border-neutral-light text-dim ${hasHover && "hover:border-primary/60"}`,
    primary: `bg-primary border-primary-dark text-white ${hasHover && "hover:border-primary/60"}`,
    "primary-light": `bg-primary-light border-primary text-primary ${hasHover && "hover:border-primary/60"}`,
    info: `bg-info-light border-info text-info ${hasHover && "hover:border-primary/60"}`,
    success: `bg-success-light border-success text-success ${hasHover && "hover:border-primary/60"}`,
    danger: `bg-danger-light border-danger text-danger ${hasHover && "hover:border-primary/60"}`,
    warning: `bg-warning-light border-warning text-warning ${hasHover && "hover:border-primary/60"}`,
    "neutral-dark": `bg-dim border-dim-light text-white ${hasHover && "hover:border-primary/60"}`,
    neutral: `bg-neutral-lighter border-neutral text-dim ${hasHover && "hover:border-primary/60"}`,
    "gradient-primary": `bg-gradient-primary border-dim-light text-white ${hasHover && "hover:border-primary/60"}`,
    "white": `bg-white border-neutral-lighter text-primary ${hasHover && "hover:border-primary/60"}`,
  };
  const baseClasses = "transition-all block rounded-xl text-sm lg:p-4 p-3";
  return (
    <Component
      {...props}
      href={href?.length && href}
      className={clsx(
        baseClasses,
        colors[color],
        { border: hasBorder },
        className,
      )}
    >
      {children}
    </Component>
  );
}
