"use client";

import clsx from "clsx";
import { useState } from "react";
import { AlertPropsType } from "./types";

export default function Alert({
  variant = "filled",
  color = "info",
  children,
  className = "",
  size = "base",
  hasIcon = true,
}: AlertPropsType) {
  const [show, setShow] = useState<boolean>(true);

  const colors = {
    filled: {
      info: "bg-info text-white",
      success: "bg-success text-white",
      danger: "bg-danger text-white",
      warning: "bg-warning text-white",
      primary: "bg-primary text-white",
    },
    lightness: {
      info: "bg-info-light text-info",
      success: "bg-success-light text-success",
      danger: "bg-danger-light text-danger",
      warning: "bg-warning-light text-warning",
      primary: "bg-primary-light text-primary",
    },
    text: {
      info: "text-info !p-0",
      success: "text-success !p-0",
      danger: "text-danger !p-0",
      warning: "text-warning !p-0",
      primary: "text-primary !p-0",
    },
  };
  const icons = {
    name: {
      info: "icon-info-circle",
      success: "icon-check-circle",
      danger: "icon-close-circle",
      warning: "icon-info-circle",
      primary: "icon-info-circle",
    },
    wrapper: {
      filled: {
        info: "text-white bg-black/10",
        success: "text-white bg-black/10",
        danger: "text-white bg-black/10",
        warning: "text-white bg-black/10",
        primary: "text-white bg-black/10",
      },
      lightness: {
        info: "text-white bg-info",
        success: "text-white bg-success",
        danger: "text-white bg-danger",
        warning: "text-white bg-warning",
        primary: "text-white bg-primary",
      },
      text: {
        info: "",
        success: "",
        danger: "",
        warning: "",
        primary: "",
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
        { "opacity-0 hidden": !show },
        className,
      )}
    >
      {hasIcon && (
        <div
          className={clsx(
            "flex items-center justify-center shrink-0 rounded-full me-2 text-xs",
            icons["wrapper"][variant][color],
            sizes[size]["iconCircle"],
            {"w-fit h-fit":variant==="text"}
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
      {size && (
        <i
          onClick={() => setShow(false)}
          className="icon-close-circle ms-auto text-base transition-all cursor-pointer hover:text-danger"
        />
      )}
    </div>
  );
}
