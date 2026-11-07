"use client";
import { useLayoutEffect, useState } from "react";
import Select from "react-select";
import Text from "./text";
import clsx from "clsx";
import { SelectBoxPropsType } from "./types";
import Alert from "./alert";
export default function SelectBox({
  isSmall = false,
  label,
  options,
  className = "",
  loading = false,
  disabled = false,
  onChange,
  value,
  placeholder,
  msgType = "danger",
  msg,
  endSideLabel,
  formatOption
}: SelectBoxPropsType) {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  const placeholderTxt = {
    default: placeholder,
    loading: "loading ...",
    disabled: "...",
  };

  const selectedOption=options.find((item)=>item.value===value)


  if (!isClient) return null; // Prevent SSR rendering
  return (
    <div
      className={clsx("select-wrap", className, {
        "mini-select-wrap": isSmall,
      })}
    >
      {(endSideLabel || label) && (
        <div className="w-full mb-1.5 flex items-center justify-between">
          <Text as="label" color="black" size="sm" className="block">
            {label}
          </Text>
          {endSideLabel}
        </div>
      )}
      <Select
        value={selectedOption}
        onChange={(option)=>onChange(option)}
        options={options}
        classNamePrefix="react-select"
        isDisabled={disabled}
        isLoading={loading}
        placeholder={
          placeholderTxt[
            disabled ? "disabled" : loading ? "loading" : "default"
          ]
        }
        menuPortalTarget={isClient ? document.body : null}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        className="react-select-container"
        formatOptionLabel={(option)=>!!formatOption?formatOption(option):option.label}
      />
      {!!msg && (
        <Alert color={msgType} variant="text" className="mt-2">
          {msg}
        </Alert>
      )}
    </div>
  );
}
