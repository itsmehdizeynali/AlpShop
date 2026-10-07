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
import { getBrandsService, getCategoriesService } from "@/services/generic";
import { useQuery } from "@tanstack/react-query";
import type { BrandType, CategoryItemType } from "@/components/genericTypes";
import { useSetParams } from "@/utils/setParams";
import { useSearchParams } from "next/navigation";
import ShopCheckboxWrap from "./checkboxWrap";

export default function ShopSidebar({ price }: SidebarPropsType) {
  // categories
  const { data: categories, isLoading: categoriesDataLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesService({}),
  });
  // brands
  const { data: brands, isLoading: brandsDataLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrandsService,
  });

  const searchParams = useSearchParams();
  const { setManyParams, getParamList } = useSetParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    getParamList("category"),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
    getParamList("brand"),
  );

  const minPrice = Number(searchParams.get("minPrice"));
  const maxPrice = Number(searchParams.get("maxPrice"));
  const [priceRange, setPriceRange] = useState<number[]>(() => [
    minPrice || price?.min || 0,
    maxPrice || price?.max || 10000,
  ]);

  const handleCheckCategory = ({
    type,
    slug,
  }: {
    type: "add" | "remove";
    slug: string;
  }) => {
    if (type === "add") {
      if (!selectedCategories) {
        setSelectedCategories([slug]);
        return;
      }
      setSelectedCategories([...selectedCategories, slug]);
    }
    if (type === "remove") {
      const list: string[] | undefined = selectedCategories?.filter(
        (item) => item !== slug,
      );
      setSelectedCategories(list);
    }
  };
  const handleCheckBrand = ({
    type,
    slug,
  }: {
    type: "add" | "remove";
    slug: string;
  }) => {
    if (type === "add") {
      if (!selectedBrands) {
        setSelectedBrands([slug]);
        return;
      }
      setSelectedBrands([...selectedBrands, slug]);
    }
    if (type === "remove") {
      const list: string[] | undefined = selectedBrands?.filter(
        (item) => item !== slug,
      );
      setSelectedBrands(list);
    }
  };

  const changePriceRange = (range: number[]) => {
    setPriceRange(range);
  };

  const handleFilter = () => {
    setManyParams({
      category: selectedCategories.join(",") || undefined,
      brand: selectedBrands.join(",") || undefined,
      minPrice:
        price && priceRange[0] !== price.min
          ? String(priceRange[0])
          : undefined,
      maxPrice:
        price && priceRange[1] !== price.max
          ? String(priceRange[1])
          : undefined,
      page: String(1),
    });
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setManyParams({
      category: undefined,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      page: undefined,
    });
  };

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
          <Btn
            onClick={clearFilters}
            color="danger"
            variant="lightness"
            className="!w-full"
          >
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
            <Btn
              onClick={clearFilters}
              variant="outline-lightness"
              color="danger"
              size="xs"
            >
              Clear All
            </Btn>
          </div>
          {!!categories && (
            <Card
              hasBorder
              color="transparent"
              className="!p-0 mb-4 overflow-hidden"
            >
              <Heading
                variant="h5"
                className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light"
              >
                Category
              </Heading>
              <ul className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                {categories.map((item: CategoryItemType, index: number) => (
                  <ShopCheckboxWrap
                    key={index}
                    item={item}
                    selectedList={selectedCategories}
                    handleCheck={handleCheckCategory}
                  />
                ))}
              </ul>
            </Card>
          )}
          {!!brands && (
            <Card
              hasBorder
              color="transparent"
              className="!p-0 mb-4 overflow-hidden"
            >
              <Heading
                variant="h5"
                className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light"
              >
                Brand
              </Heading>
              <ul className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                {brands.map((item: BrandType, index: number) => (
                  <Checkbox
                    checked={selectedBrands?.includes(item.slug)}
                    changeSelectedList={handleCheckBrand}
                    key={index}
                    name={item?.name}
                    slug={item?.slug}
                    className="mb-2 last:mb-0"
                  />
                ))}
              </ul>
            </Card>
          )}
          {price?.max !== 0 &&
            (!!price?.min || price?.min === 0) &&
            price?.max !== price?.min && (
              <Card
                hasBorder
                color="transparent"
                className="!p-0 mb-4 overflow-hidden w-full"
              >
                <Heading
                  variant="h5"
                  className="px-4 py-3 bg-neutral-lighter border-b border-neutral-light"
                >
                  Price
                </Heading>
                <div className="p-4 max-h-[180px] overflow-y-auto custom-scroll">
                  <PriceRange
                    min={price.min}
                    max={price.max}
                    onChange={changePriceRange}
                  />
                </div>
              </Card>
            )}
          <Btn className="w-full" onClick={handleFilter}>
            Filter
          </Btn>
        </div>
      </div>
    </>
  );
}
