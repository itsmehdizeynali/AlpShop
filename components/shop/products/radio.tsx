import Chip from "@/components/generic/chip";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { SizeRadioPropsType } from "./types";

export default function ShopProductsRardio({
  items,
  className = "",
  setActive,
  active,
  ...props
}: SizeRadioPropsType) {

  useEffect(()=>{
    setActive(items[0])
  },[items])

  return (
    <ul {...props} className={clsx(className, "flex items-center gap-1")}>
      {items.map((item, index) => (
        <Chip
          onClick={() => setActive(item)}
          as="li"
          rounded
          key={index}
          className="cursor-pointer"
          color={active === item ? "primary" : "neutral"}
          variant={active === item ? "filled" : "lightness"}
        >
          {item}
        </Chip>
      ))}
    </ul>
  );
}
