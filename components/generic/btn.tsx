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
      secondary: "bg-secondary hover:bg-secondary-dark text-white",
      success: "bg-success hover:bg-success-dark text-white",
      info: "bg-info hover:bg-info-dark text-white",
      warning: "bg-warning hover:bg-warning-dark text-white",
      danger: "bg-danger hover:bg-danger-dark text-white",
      dim: "bg-dim hover:bg-dim-light text-white",
      black: "bg-black text-white",
      white: "bg-white text-black hover:bg-neutral-light",
      neutral: "bg-neutral hover:bg-neutral-dark text-white",
    },
    text: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary: "text-primary hover:text-primary-dark",
      secondary: "text-secondary hover:text-secondary-dark",
      success: "text-success hover:text-success-dark",
      info: "text-info hover:text-info-dark",
      warning: "text-warning hover:text-warning-dark",
      danger: "text-danger hover:text-danger-dark",
      dim: "text-dim hover:text-dim-light",
      black: "text-black hover:text-dim-dark",
      white: "text-white hover:text-neutral-light",
      neutral: "text-neutral hover:text-neutral-dark",
    },
    outline: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary border-2 border-primary hover:bg-primary hover:text-white",
      secondary:
        "text-secondary border-2 border-secondary hover:bg-secondary hover:text-white",
      success:
        "text-success border-2 border-success hover:bg-success hover:text-white",
      info: "text-info border-2 border-info hover:bg-info hover:text-white",
      warning:
        "text-warning border-2 border-warning hover:bg-warning hover:text-white",
      danger:
        "text-danger border-2 border-danger hover:bg-danger hover:text-white",
      dim: "text-dim border-2 border-dim hover:bg-dim hover:text-white",
      black: "text-black border-2 border-black hover:bg-black hover:text-white",
      white: "text-white border-2 border-white hover:bg-white hover:text-black",
      neutral:
        "text-dim border-2 border-neutral hover:bg-neutral hover:text-white",
    },
    lightness: {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary bg-primary-light hover:bg-primary hover:text-white",
      secondary:
        "text-secondary bg-secondary-light hover:bg-secondary hover:text-white",
      success:
        "text-success bg-success-light hover:bg-success hover:text-white",
      info: "text-info bg-info-light hover:bg-info hover:text-white",
      warning:
        "text-warning bg-warning-light hover:bg-warning hover:text-white",
      danger: "text-danger bg-danger-light hover:bg-danger hover:text-white",
      dim: "text-white bg-dim-light hover:bg-dim hover:text-white",
      black: "text-black bg-neutral-light hover:bg-black hover:text-white",
      white: "text-black bg-neutral-light hover:bg-white",
      neutral:
        "text-dim bg-neutral-light hover:bg-neutral hover:text-white",
    },
    "outline-lightness": {
      transparent: "hover:bg-primary text-primary hover:text-white",
      primary:
        "text-primary border-2 border-primary-light hover:bg-primary-light",
      secondary:
        "text-secondary border-2 border-secondary-light hover:bg-secondary-light",
      success:
        "text-success border-2 border-success-light hover:bg-success-light",
      info: "text-info border-2 border-info-light hover:bg-info-light",
      warning:
        "text-warning border-2 border-warning-light hover:bg-warning-light",
      danger: "text-danger border-2 border-danger-light hover:bg-danger-light",
      dim: "text-dim border-2 border-dim-light hover:bg-dim-light hover:text-white",
      black: "text-black border-2 border-dim hover:bg-dim hover:text-white",
      white: "text-white border-2 border-neutral-lighter hover:bg-neutral-lighter hover:text-black",
      neutral:
        "text-dim border-2 border-neutral-light hover:text-black hover:bg-neutral-light",
    }
  };
  const baseClasses =
    "flex cursor-pointer items-center justify-center w-fit relative rounded-lg font-semibold transition-all leading-none";
  const btnSize = {
    lg: "lg:h-12 h-11 lg:text-md text-base px-8",
    base: "lg:h-11 h-10 lg:text-sm text-xs px-6",
    sm: "lg:h-9 h-8 lg:text-xs-plus text-xs px-4",
    xs: "lg:h-8 h-7 lg:text-xs-plus text-xs px-4",
  };
  const iconSizes = {
    lg: "lg:text-xl text-lg",
    md: "lg:text-lg text-md",
    base: "lg:text-md text-base",
    sm: "lg:text-base text-sm",
    xs: "text-xs",
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
          className={clsx(icon, iconSizes[size], "me-3", square && "!m-0")}
        ></i>
      )}
      {children}
      {icon && iconPlace === "end" && (
        <i
          className={clsx(icon, iconSizes[size], "ms-3", square && "!m-0")}
        ></i>
      )}
    </Component>
  );
}
