import clsx from "clsx";
import { useState } from "react";
import type { ColorRadioPropsType } from "./types";

export default function ShopProductsColorRardio({
  colors,
  className = "",
}: ColorRadioPropsType) {
  const [active, setActive] = useState(colors[0]||"");

  return (
    <ul className={clsx(className, "flex items-center gap-1")}>
      {colors.map((item, index) => (
        <li
          key={index}
          onClick={() => setActive(item)}
          style={{ backgroundColor: item.hex, borderColor: item.hex }}
          className={clsx(
            { "!bg-white": active === item },
            "border-2 p-0.5 shrink-0 cursor-pointer flex items-center relative justify-center rounded-full transition-all w-6 h-6",
          )}
        >
          <div
            style={{ backgroundColor: item.hex }}
            className="rounded-full transition-all w-4 h-4"
          ></div>
        </li>
      ))}
    </ul>
  );
}
