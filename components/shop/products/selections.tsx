import Heading from "@/components/generic/heading";
import ShopProductsSizeRardio from "./sizeRadio";
import ShopProductsColorRardio from "./colorRadio";
import clsx from "clsx";
import type { SelectionsPropsType } from "./types";

export default function ShopProductsSelections({
  className,
  colors,
  sizes,
}: SelectionsPropsType) {
  return (
    <div className={clsx(className)}>
      <Heading variant="h4" className="mb-1">
        size
      </Heading>
      <ShopProductsSizeRardio className="mb-2" sizes={sizes} />
      <Heading variant="h4" className="mb-1">
        color
      </Heading>
      <ShopProductsColorRardio className="mb-4" colors={colors} />
    </div>
  );
}
