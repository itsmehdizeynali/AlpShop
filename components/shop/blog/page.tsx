"use client"

import WidgetArticleCard from "@/components/widget/articleCard";
import dataShopPages from "@/mockData/shop/pages";
import BlogSidebar from "./sidebar";
import Pagination from "@/components/generic/pagination";

export default function ShopBlogPage() {
  const { article } = dataShopPages();
  const refreshData=()=>{

  }
  return (
    <div className="container my-section">
      <div className="flex max-lg:flex-wrap lg:items-start -m-2">
        <BlogSidebar />
        <div className="grow p-1 flex flex-wrap max-lg:order-first">
          {[article, article, article, article, article, article, article, article].map((item, index) => (
            <div key={index} className="lg:w-1/2 md:w-1/3 sm:w-1/2 w-full p-1">
              <WidgetArticleCard article={item} />
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
