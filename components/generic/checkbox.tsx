"use client";

import { useState } from "react";
import Text from "./text";
import clsx from "clsx";
import type { CheckboxPropsType } from "./types";

export default function Checkbox({
  name,
  className,
  ...props
}: CheckboxPropsType) {
  const [isActive, setIsActive] = useState(false);
  return (
    <li
      className={clsx(className, "flex items-center cursor-pointer")}
      onClick={() => setIsActive(!isActive)}
      {...props}
    >
      <div
        className={clsx(
          isActive ? "bg-primary" : "border border-neutral",
          "transition-all w-4 h-4 rounded-sm flex items-center justify-center me-2",
        )}
      >
        <i
          className={clsx(
            isActive ? "scale-90" : "scale-0",
            "icon-check leading-none transition-all text-white text-xxs",
          )}
        ></i>
      </div>
      <Text size="sm" color="dim-dark">
        {name}
      </Text>
    </li>
  );
}
