"use client";

import WidgetArticleCard from "@/components/widget/articleCard";
import BlogSidebar from "./sidebar";
import Pagination from "@/components/generic/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogService } from "@/services/blog";
import type { ArticleType } from "@/components/genericTypes";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShopBlogPage() {
  const params = useSearchParams();
  const QueryClient = useQueryClient();

  const page = params.get("page") || undefined;
  const tags = params.get("tags") || undefined;
  const category = params.get("category") || undefined;
  const { data } = useQuery({
    queryKey: ["blog_articles"],
    queryFn: () =>
      getBlogService({ page: page ? Number(page) : undefined, tags,category }),
  });

  useEffect(() => {
    QueryClient.invalidateQueries({ queryKey: ["blog_articles"] });
  }, [page, category,tags]);
  console.log(data);

  return (
    <div className="container my-section">
      <div className="flex max-lg:flex-wrap lg:items-start -m-2">
        <BlogSidebar />
        <div className="grow p-1 flex flex-wrap max-lg:order-first">
          {data?.posts &&
            data?.posts.map((item: ArticleType, index: number) => (
              <div
                key={index}
                className="lg:w-1/2 md:w-1/3 sm:w-1/2 w-full p-1"
              >
                <WidgetArticleCard article={item} />
              </div>
            ))}
          {data?.pagination && data?.pagination?.totalPages !== 1 && (
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
