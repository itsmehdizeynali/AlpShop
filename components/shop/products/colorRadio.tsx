import clsx from "clsx";
import { useState } from "react";
import type { ColorRadioPropsType } from "./types";

export default function ShopProductsColorRardio({
  colors,
  className=""
}: ColorRadioPropsType) {
  const [active, setActive] = useState(colors[0]);

  return (
    <ul className={clsx(className,"flex items-center gap-1")}>
      {colors.map((item, index) => (
        <li key={index}
          onClick={() => setActive(item)}
          style={{backgroundColor:item}}
          className={clsx({"after:border-white":active===item},"p-0.5 shrink-0 cursor-pointer rounded-full after:block after:w-4.5 after:h-4.5 after:rounded-full after:border-3 after:border-transparent after:shrink-0 after:transition-all")}
        ></li>
      ))}
    </ul>
  );
}
