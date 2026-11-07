import Heading from "@/components/generic/heading";
import ShopProductsRardio from "./radio";
import ShopProductsColorRardio from "./colorRadio";
import clsx from "clsx";
import type { SelectionsPropsType } from "./types";

export default function ShopProductsSelections({
  className,
  colors,
  variants,
}: SelectionsPropsType) {
  return (
    <div className={clsx(className)}>
      {!!variants &&
        variants.map((item, index) => (
          <div key={index} className="mb-2 last:mb-4">
            <Heading variant="h4" className="mb-1">
              size
            </Heading>
            <ShopProductsRardio items={item.items} />
          </div>
        ))}
      {!!colors && (
        <div className="mb-4">
          <Heading variant="h4" className="mb-1">
            color
          </Heading>
          <ShopProductsColorRardio colors={colors} />
        </div>
      )}
    </div>
  );
}
