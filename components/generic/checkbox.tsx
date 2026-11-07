"use client";

import Text from "./text";
import clsx from "clsx";
import type { CheckboxPropsType } from "./types";

export default function Checkbox({
  name,
  slug,
  className,
  checked = false,
  changeSelectedList,
  ...props
}: CheckboxPropsType) {
  const handelCheck = () => {
    if (checked) {
      changeSelectedList({ type: "remove", slug });
      return;
    }
    changeSelectedList({ type: "add", slug });
  };
  return (
    <li
      className={clsx(className, "flex items-center cursor-pointer")}
      onClick={handelCheck}
      {...props}
    >
      <div
        className={clsx(
          checked ? "bg-primary" : "border border-neutral",
          "transition-all w-4 h-4 rounded-sm flex items-center justify-center me-2",
        )}
      >
        <i
          className={clsx(
            checked ? "scale-90" : "scale-0",
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
