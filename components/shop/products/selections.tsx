"use client";

import Heading from "@/components/generic/heading";
import ShopProductsRardio from "./radio";
import ShopProductsColorRardio from "./colorRadio";
import clsx from "clsx";
import type { SelectionsPropsType } from "./types";

export default function ShopProductsSelections({
  className,
  colors,
  variants,
  activeColor,
  setActiveColor,
  activeSize,
  setActiveSize,
}: SelectionsPropsType) {

  return (
    <div className={clsx(className,"max-lg:w-full max-lg:flex flex-wrap gap-y-2 gap-x-4 lg:mb-4")}>
      {!!variants &&
        variants.map((item, index) => (
          <div key={index} className="max-lg:flex items-center gap-y-1 gap-x-2">
            <Heading variant="h4">
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
        <div className="max-lg:flex items-center gap-y-1 gap-x-2">
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
