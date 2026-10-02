import Chip from "@/components/generic/chip";
import clsx from "clsx";
import { useState } from "react";
import type { SizeRadioPropsType } from "./types";

export default function ShopProductsRardio({
  items,
  className = "",
}: SizeRadioPropsType) {
  const [active, setActive] = useState(items[0]);

  return (
    <ul className={clsx(className, "flex items-center gap-1")}>
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
