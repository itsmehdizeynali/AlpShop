"use client";

import HeaderSection from "@/components/generic/headerSection";
import Pagination from "@/components/generic/pagination";
import WidgetProductCard from "@/components/widget/productCard";
import { useQuery } from "@tanstack/react-query";
import type { WishlistItemType } from "./type";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getWishlistService } from "@/services/wishlist";
import LoadingProductCard from "@/components/loading/productCard";
import Btn from "@/components/generic/btn";
import Text from "@/components/generic/text";

export default function ShopWishlistPage() {
  const params = useSearchParams();
  const page = params.get("page");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () =>
      getWishlistService({ page: page ? Number(page) : undefined }),
  });

  useEffect(() => {
    refetch()
  }, [page]);
  

  return (
    <div className="container my-section">
      <HeaderSection size="h3" className="mb-sm-section" shape>
        Wish List
      </HeaderSection>
      <div className="flex flex-wrap -m-1">
        {isLoading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <div
                className="p-1 xl:w-1/5 md:w-1/4 sm:w-1/3 w-full"
                key={index}
              >
                <LoadingProductCard hasBorder responsive spacial />
              </div>
            ))}
          </>
        ) : !!data?.items.length ? (
          <>
            {data?.items.map((item: WishlistItemType, index: number) => (
              <div
                className="p-1 xl:w-1/5 md:w-1/4 sm:w-1/3 w-full"
                key={index}
              >
                <WidgetProductCard
                  spacial
                  queryKeys={["layout_data", "wishlist_products"]}
                  responsive
                  product={item?.product}
                />
              </div>
            ))}
            {!!data?.pagination.totalPages &&
              data?.pagination.totalPages !== 1 && (
                <Pagination
                  className="w-full p-1 justify-center mt-3"
                  total={data?.pagination.totalPages}
                  current={data?.pagination.page}
                />
              )}
          </>
        ) : (
          <div className="py-30 mx-auto">
            <Btn
              onClick={() => refetch()}
              icon="icon-refresh"
              rounded
              square
              loading={isLoading}
              color="black"
              variant="lightness"
              className="mb-2 mx-auto"
            />
            <Text className="text-center">The Wish List is empty.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
