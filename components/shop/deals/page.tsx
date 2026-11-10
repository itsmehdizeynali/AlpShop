"use client";

import WidgetProductCard from "@/components/widget/productCard";
import ShopSidebar from "../generic/sidebar";
import Pagination from "@/components/generic/pagination";
import ShopDealsHero from "./hero";
import ShopDealsCategoryBar from "./categoryBar";
import { getProductsService } from "@/services/generic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoadingProductCard from "@/components/loading/productCard";

export default function ShopDealsPage() {
  const params = useSearchParams();

  // params
  const search = params.get("search");
  const category = params.get("category");
  const brand = params.get("brand");
  const maxPrice = params.get("maxPrice");
  const minPrice = params.get("minPrice");
  const page = params.get("page");

  // products
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["deals_products"],
    queryFn: () =>
      getProductsService({
        onSale: true,
        page: Number(page) || 1,
        search: search ?? undefined,
        category: category ?? undefined,
        brand: brand ?? undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
      }),
  });

  useEffect(() => {
    refetch();
  }, [page, search, category, brand, maxPrice, minPrice]);

  return (
    <>
      <ShopDealsHero />
      <ShopDealsCategoryBar />
      <div className="container mb-section">
        <div className="flex flex-wrap items-start -m-2">
          <ShopSidebar price={{ min: 0, max: 200 }} />
          <div className="lg:w-3/4 w-full flex flex-wrap p-1">
            {isLoading ? (
              <>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
                  <div
                    key={index}
                    className="p-1 xl:w-1/4 lg:w-1/3 md:w-1/4 sm:w-1/3 w-full"
                  >
                    <LoadingProductCard responsive hasBorder />
                  </div>
                ))}
              </>
            ) : (
              <>
                {!!data?.products &&
                  data?.products.map((item, index) => (
                    <div
                      className="p-1 xl:w-1/4 lg:w-1/3 md:w-1/4 sm:w-1/3 w-full"
                      key={index}
                    >
                      <WidgetProductCard
                        queryKeys={["deals_products", "layout_data"]}
                        responsive
                        spacial
                        product={item}
                      />
                    </div>
                  ))}
                {!!data?.pagination?.totalPages &&
                  data?.pagination?.totalPages !== 1 && (
                    <Pagination
                      className="w-full p-2 justify-center"
                      total={data?.pagination?.totalPages}
                      current={data?.pagination?.page}
                    />
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
