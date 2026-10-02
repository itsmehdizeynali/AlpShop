"use client";

import HeaderSection from "@/components/generic/headerSection";
import Pagination from "@/components/generic/pagination";
import WidgetProductCard from "@/components/widget/productCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { WishlistItemType } from "./type";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getWishlistService } from "@/services/wishlist";

export default function ShopWishlistPage() {
  const params = useSearchParams();
  const page = params.get("page");
  const QueryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["wishlist_products"],
    queryFn: () =>
      getWishlistService({ page: page ? Number(page) : undefined }),
  });

  useEffect(() => {
    QueryClient.invalidateQueries({ queryKey: ["wishlist_products"] });
  }, [page]);

  return (
    <div className="container my-section">
      <HeaderSection size="h3" className="mb-sm-section" shape>
        Wish List
      </HeaderSection>
      <div className="flex flex-wrap -m-1">
        {!!data?.items &&
          data?.items.map((item: WishlistItemType, index: number) => (
            <div className="p-1 xl:w-1/5 md:w-1/4 sm:w-1/3 w-full" key={index}>
              <WidgetProductCard
                spacial
                queryKeys={["layout_data", "wishlist_products"]}
                responsive
                product={item?.product}
              />
            </div>
          ))}
        {!!data?.pagination.totalPages && data?.pagination.totalPages !== 1 && (
          <Pagination
            className="w-full p-1 justify-center mt-3"
            total={data?.pagination.totalPages}
            current={data?.pagination.page}
          />
        )}
      </div>
    </div>
  );
}
