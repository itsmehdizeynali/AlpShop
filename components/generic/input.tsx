"use client";

import clsx from "clsx";
import Text from "./text";
import Alert from "./alert";
import { InputPropsType } from "./types";

export default function Input({
  label,
  startSide,
  endSide,
  endSideLabel,
  wrapClasses,
  className,
  rounded = false,
  showMsg = false,
  msgType = "danger",
  msg = null,
  defaultValue,
  labelColor = "black",
  hasFocus = true,
  list,
  ...props
}: InputPropsType) {
  const generateBorderColor = {
    danger: "!border-danger",
    info: "!border-info",
    success: "!border-success",
    warning: "!border-warning",
    primary: "!border-primary",
    black: "!border-black",
  };
  return (
    <div
      className={clsx(
        wrapClasses,
        "group rounded-md relative focus-within:z-10",
      )}
    >
      {(label?.length || endSideLabel) && (
        <div className="w-full mb-2 flex items-center">
          <Text as="label" size="sm" color={labelColor} className="block">
            {label}
          </Text>
          {endSideLabel}
        </div>
      )}
      <div
        className={clsx(
          "w-full lg:h-11 h-10 border border-neutral-light bg-white flex items-center transition-all",
          className,
          rounded ? "rounded-full" : "rounded-md",
          { "focus-within:border-primary": hasFocus },
          showMsg && generateBorderColor[msgType],
        )}
      >
        {startSide && startSide}
        <input
          type="text"
          defaultValue={defaultValue}
          className={clsx(
            "w-full h-full bg-transparent border-0 outline-none shadow-none px-3 text-primary placeholder:text-neutral text-sm",
          )}
          {...props}
        />
        {endSide && endSide}
      </div>
      {showMsg && (
        <Alert color={msgType} variant="text" className="mt-2">
          {msg}
        </Alert>
      )}
      {!!list?.items && (
        <ul
          className="bg-white group-focus-within:block hidden transition-all z-10 shadow-card rounded-lg overflow-hidden w-full absolute top-full translate-y-2"
        >
          {list.items.map((item, index) => (
            <Text
              onMouseDown={() => {
                console.log("dfslnr");
                list.onSelect(item);
              }}
              color="black"
              as="li"
              key={index}
              className={clsx(
                { "!bg-primary-light text-primary": item === list.active },
                "w-full transition-all hover:bg-neutral-lighter cursor-pointer px-4 py-3",
              )}
            >
              {item}
            </Text>
          ))}
        </ul>
      )}
    </div>
  );
}
