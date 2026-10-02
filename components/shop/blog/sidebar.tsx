"use client";

import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import type { ArticleType, BlogCategoryItemType } from "@/components/genericTypes";
import WidgetArticleRowCard from "@/components/widget/articleRowCard";
import dataShopPages from "@/mockData/shop/pages";
import { getBlogCategoriesService, getBlogService } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";

export default function BlogSidebar() {
  const { data } = useQuery({
    queryKey: ["blog_popular_articles"],
    queryFn: () => getBlogService({ sort: "popular",pageSize:4,page:1 }),
  });
  const { data:categories } = useQuery({
    queryKey: ["blog_categories"],
    queryFn: getBlogCategoriesService,
  });
  
  return (
    <div className="lg:w-[320px] max-lg:grow max-sm:w-full p-2 shrink-0 flex flex-wrap lg:-m-2 -m-1">
      <div className="lg:p-2 p-1 lg:w-full sm:w-1/2 w-full">
        <Card
          hasBorder
          color="transparent"
          className="!p-0 overflow-hidden max-lg:h-full"
        >
          <Heading variant="h5" className="p-4">
            Popular Articles
          </Heading>
          <div className="pb-2">
            {!!data?.posts&& data?.posts.map((item:ArticleType, index:number) => (
              <WidgetArticleRowCard article={item} key={index} />
            ))}
          </div>
        </Card>
      </div>
      <div className="lg:p-2 p-1 lg:w-full sm:w-1/2 w-full">
        <Card
          hasBorder
          color="transparent"
          className="!p-0 overflow-hidden max-lg:h-full"
        >
          <Heading variant="h5" className="p-4">
            Categoris
          </Heading>
          <div className="pb-4 px-4 -my-1">
            {!!categories&& categories.map((item:BlogCategoryItemType, index:number) => (
              <Text
                key={index}
                color="black"
                as={Link}
                href={`/blog?category=${item?.slug}`}
                className="flex items-center py-1 hover:text-secondary capitalize"
              >
                <i
                  className={clsx(
                    item?.icon||"icon-note",
                    "text-base text-secondary-dark me-2.5",
                  )}
                ></i>
                {item.name}
                <span className="ms-auto">({item?._count?.posts})</span>
              </Text>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
