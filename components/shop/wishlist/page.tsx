"use client";

import HeaderSection from "@/components/generic/headerSection";
import Pagination from "@/components/generic/pagination";
import WidgetProductCard from "@/components/widget/productCard";
import dataShopPages from "@/mockData/shop/pages";

export default function ShopWishlistPage() {
  const { product } = dataShopPages();
  const refreshData = () => {};
  return (
    <div className="container my-section">
      <HeaderSection size="h3" className="mb-sm-section" shape>
        ShopWishlistPage
      </HeaderSection>
      <div className="flex flex-wrap -m-1">
        {[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ].map((item, index) => (
          <div className="p-1 xl:w-1/5 md:w-1/4 sm:w-1/3 w-full" key={index}>
            <WidgetProductCard responsive product={item} />
          </div>
        ))}
        <Pagination
          className="w-full p-1 justify-center mt-3"
          reFetch={refreshData}
          total={4}
          current={1}
        />
      </div>
    </div>
  );
}
