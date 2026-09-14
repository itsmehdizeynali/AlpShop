"use client";

import Backdrop from "@/components/generic/backdrop";
import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Checkbox from "@/components/generic/checkbox";
import Heading from "@/components/generic/heading";
import PriceRange from "@/components/generic/priceRange";
import clsx from "clsx";
import { useState } from "react";
import type { SidebarPropsType } from "./types";

export default function ShopSidebar({
  categories,
  brands,
  price,
}: SidebarPropsType) {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  return (
    <>
      <Backdrop
        isShow={openFilterModal}
        onClick={() => setOpenFilterModal(false)}
      />
      <div className="lg:hidden flex p-1 w-full">
        <div className="p-1 w-1/2">
          <Btn
            color="black"
            className="!w-full"
            onClick={() => setOpenFilterModal(true)}
          >
            Filters
          </Btn>
        </div>
        <div className="p-1 w-1/2">
          <Btn color="danger" variant="lightness" className="!w-full">
            Clear All
          </Btn>
        </div>
      </div>
      <div
        className={clsx(
          openFilterModal ? "block max-lg:z-50" : "max-lg:hidden",
          "lg:w-1/4 w-full max-lg:bg-white max-lg:rounded-t-xl max-lg:fixed max-lg:bottom-0 max-lg:start-0 max-lg:h-4/5",
        )}
      >
        <div className="!h-full max-lg:overflow-y-auto lg:p-2 p-3">
          <div className="flex items-center justify-between mb-4">
            <Heading variant="h4">Filters</Heading>
            <Btn variant="text" color="danger" size="base">
              Clear All
            </Btn>
          </div>
          {!!categories && (
            <Card hasBorder color="transparent" className="!p-0 mb-4 overflow-hidden">
              <Heading variant="h5" className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light">
                Category
              </Heading>
              <ul className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                {categories.map((item, index) => (
                  <Checkbox
                    key={index}
                    name={item}
                    className="mb-2 last:mb-0"
                  />
                ))}
              </ul>
            </Card>
          )}
          {!!brands && (
            <Card hasBorder color="transparent" className="!p-0 mb-4 overflow-hidden">
              <Heading variant="h5" className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light">
                Brand
              </Heading>
              <ul className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                {brands.map((item, index) => (
                  <Checkbox
                    key={index}
                    name={item}
                    className="mb-2 last:mb-0"
                  />
                ))}
              </ul>
            </Card>
          )}
          {!!price && (
            <Card hasBorder color="transparent" className="!p-0 mb-4 overflow-hidden">
              <Heading variant="h5" className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light">
                Price
              </Heading>
              <div className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                <PriceRange
                  min={price?.min}
                  step={price?.step}
                  max={price?.max}
                />
              </div>
            </Card>
          )}
          <Btn className="w-full">Filter</Btn>
        </div>
      </div>
    </>
  );
}
