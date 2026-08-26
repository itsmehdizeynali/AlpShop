"use client";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import Text from "./text";
import clsx from "clsx";
import { SelectBoxPropsType, SelectOption } from "./types";

export default function SelectBox<T>({
  label,
  options,
  formatOption,
  endSideLabel,
  className = "",
}: SelectBoxPropsType<T>) {
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<SelectOption<T>>
  >(options[0] ?? null);

  return (
    <div className={clsx("select-wrap", className)}>
      <div className="w-full mb-1.5 flex items-center justify-between">
        <Text as="label" size="sm" htmlFor="" className="block">
          {label}
        </Text>
        {endSideLabel}
      </div>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        getOptionLabel={(option: SelectOption<T>) => option.label}
        formatOptionLabel={(option) =>
          formatOption ? formatOption(option) : option.label
        }
        getOptionValue={(option: SelectOption<T>) => String(option.value)} // Ensures unique values
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
