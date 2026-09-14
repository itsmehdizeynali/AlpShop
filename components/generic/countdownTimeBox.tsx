"use client"


import clsx from "clsx";
import Text from "./text";
import type { CountdownTimeBoxPropsType } from "./types";



 export default function CountdownTimeBox({ value, label,color="neutral" }: CountdownTimeBoxPropsType) {
  const colors={
    white:{box:"bg-white text-black",text:"white",after:"after:text-white"},
    neutral:{box:"bg-neutral-light text-black",text:"dim-dark",after:"after:text-dim-dark"},
    "primary-light":{box:"bg-primary/70 text-white",text:"white",after:"after:text-white"},
  }
    
  return (
    <div className={clsx("flex flex-col items-center relative countdown-time-box-after",colors[color]["after"])}>
      <div className={clsx(colors[color]["box"],"flex items-center justify-center lg:h-8 h-7 lg:min-w-8 min-w-7 lg:text-sm text-xs rounded-lg p-1")}>
        {String(value).padStart(2, "0")}
      </div>
      <Text size="xs" color={colors[color]["text"] as "white"|"dim-dark"} weight="light" className="max-lg:hidden">
        {label}
      </Text>
    </div>
  );
}
