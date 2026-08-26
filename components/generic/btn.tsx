"use client";

import clsx from "clsx";
import { BtnPropsType } from "./types";
import { ElementType } from "react";

export default function Btn<T extends ElementType = "button">({
  children,
  as,
  color = "primary",
  size = "base",
  variant = "normal",
  loading = false,
  square = false,
  rounded = false,
  disabled = false,
  icon = "",
  iconPlace = "start",
  href,
  className = "",
  ...props
}: BtnPropsType<T>) {
  const Component = as || "button";

  const colors = {
    normal: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary: "bg-primary hover:bg-primary-dark text-white",
      success: "bg-success hover:bg-success-dark text-white",
      info: "bg-info hover:bg-info-dark text-white",
      warning: "bg-warning hover:bg-warning-dark text-white",
      danger: "bg-danger hover:bg-danger-dark text-white",
      dim: "bg-dim hover:bg-dim-light text-white",
      neutral: "bg-neutral hover:bg-neutral-dark text-white",
    },
    text: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary: "text-primary hover:text-primary-dark",
      success: "text-success hover:text-success-dark",
      info: "text-info hover:text-info-dark",
      warning: "text-warning hover:text-warning-dark",
      danger: "text-danger hover:text-danger-dark",
      dim: "text-dim hover:text-dim-light",
      neutral: "text-neutral hover:text-neutral",
    },
    outline: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary border-2 border-primary hover:bg-primary hover:text-white",
      success:
        "text-success border-2 border-success hover:bg-success hover:text-white",
      info: "text-info border-2 border-info hover:bg-info hover:text-white",
      warning:
        "text-warning border-2 border-warning hover:bg-warning hover:text-white",
      danger:
        "text-danger border-2 border-danger hover:bg-danger hover:text-white",
      dim: "text-dim border-2 border-dim hover:bg-dim hover:text-white",
      neutral:
        "text-dim border-2 border-neutral hover:bg-neutral hover:text-white",
    },
    lightness: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary bg-primary-light hover:bg-primary hover:text-white",
      success:
        "text-success bg-success-light hover:bg-success hover:text-white",
      info: "text-info bg-info-light hover:bg-info hover:text-white",
      warning:
        "text-warning bg-warning-light hover:bg-warning hover:text-white",
      danger: "text-danger bg-danger-light hover:bg-danger hover:text-white",
      dim: "text-white bg-dim-light hover:bg-dim hover:text-white",
      neutral:
        "text-dim bg-neutral-light hover:bg-neutral hover:text-white",
    },
    "outline-lightness": {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary border-2 border-primary-light hover:bg-primary-light",
      success:
        "text-success border-2 border-success-light hover:bg-success-light",
      info: "text-info border-2 border-info-light hover:bg-info-light",
      warning:
        "text-warning border-2 border-warning-light hover:bg-warning-light",
      danger: "text-danger border-2 border-danger-light hover:bg-danger-light",
      dim: "text-dim border-2 border-dim-light hover:bg-dim-light hover:text-white",
      neutral:
        "text-dim border-2 border-neutral-light hover:bg-neutral-light",
    }
  };
  const baseClasses =
    "flex cursor-pointer items-center justify-center w-fit relative px-4 rounded-lg font-semibold transition-all leading-none";
  const btnSize = {
    lg: "lg:h-11 h-10 lg:text-md text-base",
    base: "lg:h-10 h-9 lg:text-base text-sm",
    sm: "lg:h-9 h-8 lg:text-sm text-xs",
    xs: "lg:h-8 h-7 lg:text-sm text-xs",
  };
  const iconSizes = {
    lg: "lg:text-lg text-md",
    md: "lg:text-md text-base",
    base: "lg:text-base text-sm",
    sm: "lg:text-sm text-xs",
    xs: "text-xxs",
  };
  const variants = {
    normal: "",
    text: "!bg-transparent !h-auto !p-0",
    outline: "",
    lightness: "",
    "outline-lightness": "",
    gradient: "",
  };
  const squareClasses = "aspect-square !p-0 justify-center";
  const disabledClass = "opacity-20 pointer-events-none cursor-not-allowed";
  const loadingClass = "!text-transparent pointer-events-none";
  const roundedClass = "!rounded-full";

  return (
    <Component
      href={href?.length && href}
      className={clsx(
        baseClasses,
        colors[variant][color],
        btnSize[size],
        variants[variant],
        className,
        loading ? loadingClass : "",
        square ? squareClasses : "",
        rounded ? roundedClass : "",
        disabled ? disabledClass : "",
      )}
      {...props}
    >
      {loading && (
        <span className="w-5 h-5 border-[3px] border-solid border-r-white border-b-white border-white/10 rounded-full block animate-spin absolute m-auto"></span>
      )}
      {icon && iconPlace === "start" && (
        <i
          className={clsx(icon, iconSizes[size], "me-2", square && "!m-0")}
        ></i>
      )}
      {children}
      {icon && iconPlace === "end" && (
        <i
          className={clsx(icon, iconSizes[size], "ms-2", square && "!m-0")}
        ></i>
      )}
    </Component>
  );
}
