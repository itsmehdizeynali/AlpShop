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
    transparent: `bg-transparent border-neutral-light text-dim ${hasHover && "hover:bg-neutral-lighter hover:border-neutral-light"}`,
    primary: `bg-primary border-primary-dark text-white ${hasHover && "hover:bg-primary-dark hover:border-primary"}`,
    "primary-light": `bg-primary-light border-primary text-primary ${hasHover && "hover:bg-primary/10 hover:border-primary/40"}`,
    info: `bg-info-light border-info text-info ${hasHover && "hover:bg-info/5 hover:border-info/40"}`,
    success: `bg-success-light border-success text-success ${hasHover && "hover:bg-success/5 hover:border-success/40"}`,
    danger: `bg-danger-light border-danger text-danger ${hasHover && "hover:bg-danger/5 hover:border-danger/40"}`,
    warning: `bg-warning-light border-warning text-warning ${hasHover && "hover:bg-warning/5 hover:border-warning/40"}`,
    "neutral-dark": `bg-dim border-dim-light text-white ${hasHover && "hover:bg-dim/5 hover:border-dim/40"}`,
    neutral: `bg-neutral-lighter border-neutral text-dim ${hasHover && "hover:bg-neutral-light/40 hover:border-neutral-light"}`,
    "gradient-primary": `bg-gradient-primary border-dim-light text-white ${hasHover && "hover:bg-primary hover:border-primary-dark"}`,
    white: `bg-white border-neutral-lighter text-primary ${hasHover && "hover:bg-neutral-lighter hover:border-neutral-light"}`,
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
