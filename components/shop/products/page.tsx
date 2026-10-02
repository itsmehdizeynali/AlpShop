"use client";

import WidgetProductCard from "@/components/widget/productCard";
import ShopSidebar from "../generic/sidebar";
import Pagination from "@/components/generic/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsService } from "@/services/generic";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShopProductsPage() {
  const QueryClient = useQueryClient();
  const params = useSearchParams();

  // params
  const search = params.get("search");
  const category = params.get("category");
  const brand = params.get("brand");
  const maxPrice = params.get("maxPrice");
  const minPrice = params.get("minPrice");
  const page = params.get("page");

  // products
  const { data, isLoading } = useQuery({
    queryKey: ["shop_products"],
    queryFn: () =>
      getProductsService({
        page: Number(page) || 1,
        search: search ?? undefined,
        category: category ?? undefined,
        brand: brand ?? undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
      }),
  });
  useEffect(() => {
    QueryClient.invalidateQueries({ queryKey: ["shop_products"] });
  }, [page, search, category, brand, maxPrice, minPrice]);


  return (
    <div className="container my-section">
      <div className="flex flex-wrap items-start -m-2">
        <ShopSidebar price={data?.priceRange} />
        <div className="lg:w-3/4 w-full flex flex-wrap p-1">
          {!!data?.products &&
            data?.products.map((item, index: number) => (
              <div
                className="p-1 xl:w-1/4 lg:w-1/3 md:w-1/4 sm:w-1/3 w-full"
                key={index}
              >
                <WidgetProductCard queryKeys={["shop_products", "layout_data"]} responsive product={item} />
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
        </div>
      </div>
    </div>
  );
}
