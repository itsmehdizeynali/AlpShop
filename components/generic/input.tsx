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
  rounded=false,
  showMsg = false,
  msgType = "danger",
  msg = null,
  defaultValue,
  ...props
}: InputPropsType) {
  const generateBorderColor = {
    danger: "!border-danger",
    info: "!border-info",
    success: "!border-success",
    warning: "!border-warning",
    primary: "!border-primary",
  };
  return (
    <div className={clsx(wrapClasses,"rounded-md")}>
      {(label?.length || endSideLabel) && (
        <div className="w-full mb-2 flex items-center">
          <Text
            as="label"
            size="sm"
            color="white"
            className="block"
          >
            {label}
          </Text>
          {endSideLabel}
        </div>
      )}
      <div
        className={clsx(
          "w-full lg:h-11 h-10 border border-solid border-neutral-light flex items-center focus-within:!border-primary transition-all",
          rounded?"rounded-full":"rounded-md",
          showMsg && generateBorderColor[msgType],
        )}
      >
        {startSide && (
          startSide
        )}
        <input
          type="text"
          defaultValue={defaultValue}
          className={clsx(className,"w-full h-full bg-transparent border-0 outline-none shadow-none px-3 text-primary placeholder:text-neutral text-sm")}
          {...props}
        />
        {endSide && (
          endSide
        )}
      </div>
      {showMsg && (
        <Alert color={msgType} variant="text" className="mt-2">
          {msg}
        </Alert>
      )}
    </div>
  );
}
