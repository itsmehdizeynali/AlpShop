"use client";

import Heading from "@/components/generic/heading";
import ShopProductsRardio from "./radio";
import ShopProductsColorRardio from "./colorRadio";
import clsx from "clsx";
import type { SelectionsPropsType } from "./types";
import { useEffect } from "react";

export default function ShopProductsSelections({
  className,
  colors,
  variants,
  activeColor,
  setActiveColor,
  activeSize,
  setActiveSize,
}: SelectionsPropsType) {
  console.log(variants, colors);

  return (
    <div className={clsx(className)}>
      {!!variants &&
        variants.map((item, index) => (
          <div key={index} className="mb-2 last:mb-4">
            <Heading variant="h4" className="mb-1">
              size
            </Heading>
            <ShopProductsRardio
              active={activeSize}
              setActive={setActiveSize}
              items={item.items}
            />
          </div>
        ))}
      {!!colors && (
        <div className="mb-4">
          <Heading variant="h4" className="mb-1">
            color
          </Heading>
          <ShopProductsColorRardio
            active={activeColor}
            setActive={setActiveColor}
            colors={colors}
          />
        </div>
      )}
    </div>
  );
}
