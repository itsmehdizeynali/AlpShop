"use client";

import clsx from "clsx";
import { AlertPropsType } from "./types";

export default function Alert({
  variant = "filled",
  color = "info",
  children,
  className = "",
  size = "base",
  hasIcon = true,
}: AlertPropsType) {
  const colors = {
    filled: {
      info: "bg-info text-white",
      success: "bg-success text-white",
      danger: "bg-danger text-white",
      warning: "bg-warning text-white",
      primary: "bg-primary text-white",
      black: "bg-black text-white",
    },
    lightness: {
      info: "bg-info-light text-info",
      success: "bg-success-light text-success",
      danger: "bg-danger-light text-danger",
      warning: "bg-warning-light text-warning",
      primary: "bg-primary-light text-primary",
      black: "bg-dim text-white",
    },
    text: {
      info: "text-info !p-0",
      success: "text-success !p-0",
      danger: "text-danger !p-0",
      warning: "text-warning !p-0",
      primary: "text-primary !p-0",
      black: "text-black !p-0",
    },
  };
  const icons = {
    name: {
      info: "icon-info-circle",
      success: "icon-check-circle",
      danger: "icon-close-circle",
      warning: "icon-info-circle",
      primary: "icon-info-circle",
      black: "icon-info-circle",
    },
    wrapper: {
      filled: {
        info: "text-white bg-black/10",
        success: "text-white bg-black/10",
        danger: "text-white bg-black/10",
        warning: "text-white bg-black/10",
        primary: "text-white bg-black/10",
        black: "text-white bg-white/10",
      },
      lightness: {
        info: "text-white bg-info",
        success: "text-white bg-success",
        danger: "text-white bg-danger",
        warning: "text-white bg-warning",
        primary: "text-white bg-primary",
        black: "text-white bg-dim-dark",
      },
      text: {
        info: "",
        success: "",
        danger: "",
        warning: "",
        primary: "",
        black: "",
      },
    },
  };
  const sizes = {
    sm: {
      box: "p-2 text-xs-plus",
      iconCircle: "w-8 h-8",
    },
    base: {
      box: "p-3 text-sm",
      iconCircle: "w-9 h-9",
    },
  };
  const baseClasses = "flex items-center rounded-md";
  return (
    <div
      className={clsx(
        baseClasses,
        colors[variant][color],
        sizes[size]["box"],
        className,
        { "items-start": variant === "text" },
      )}
    >
      {hasIcon && (
        <div
          className={clsx(
            "flex items-center justify-center shrink-0 rounded-full me-2 text-xs",
            icons["wrapper"][variant][color],
            sizes[size]["iconCircle"],
            { "w-fit h-fit mt-1": variant === "text" },
          )}
        >
          <i
            className={clsx(
              icons["name"][color],
              variant === "text" ? "text-base" : "text-md",
            )}
          ></i>
        </div>
      )}
      {children}
    </div>
  );
}
