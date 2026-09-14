"use client";

import WidgetProductCard from "@/components/widget/productCard";
import ShopSidebar from "../generic/sidebar";
import Pagination from "@/components/generic/pagination";
import dataShopPages from "@/mockData/shop/pages";

export default function ShopProductsPage() {
  const { product } = dataShopPages();
  const refreshData = () => {};
  return (
    <div className="container my-section">
      <div className="flex flex-wrap items-start -m-2">
        <ShopSidebar
          categories={[
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
          ]}
          brands={[
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
            "apple",
          ]}
          price={{ min: 10, step: 10, max: 10000 }}
        />
        <div className="lg:w-3/4 w-full flex flex-wrap p-1">
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
            product,
            product,
          ].map((item, index) => (
            <div
              className="p-1 xl:w-1/4 lg:w-1/3 md:w-1/4 sm:w-1/3 w-full"
              key={index}
            >
              <WidgetProductCard responsive product={item} />
            </div>
          ))}
          <Pagination
            className="w-full p-2 justify-center"
            reFetch={refreshData}
            total={4}
            current={1}
          />
        </div>
      </div>
    </div>
  );
}
