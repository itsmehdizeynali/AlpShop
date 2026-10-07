"use client";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import Text from "./text";
import clsx from "clsx";
import { SelectBoxPropsType, SelectOption } from "./types";
import Alert from "./alert";

export default function SelectBox<T>({
  label,
  options,
  formatOption,
  endSideLabel,
  handelChange,
  msg,
  msgType = "danger",
  className = "",
  isSmall=false,
  placeholder,
}: SelectBoxPropsType<T>) {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<SelectOption<T>>>(null);

  return (
    <div className={clsx("select-wrap", className,{"mini-select-wrap":isSmall})}>
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
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        getOptionLabel={(option: SelectOption<T>) => option.label}
        formatOptionLabel={(option) =>
          formatOption ? formatOption(option) : option.label
        }
        getOptionValue={(option: SelectOption<T>) => {
          if (handelChange) handelChange(String(option.value));
          return String(option.value);
        }} // Ensures unique values
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {!!msg && (
        <Alert color={msgType} variant="text" className="mt-2">
          {msg}
        </Alert>
      )}
    </div>
  );
}
