"use client";

import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import WidgetArticleRowCard from "@/components/widget/articleRowCard";
import dataShopPages from "@/mockData/shop/pages";
import clsx from "clsx";
import Link from "next/link";

export default function BlogSidebar() {
  const { article, articleCategory } = dataShopPages();
  return (
    <div className="lg:w-[320px] max-lg:grow max-sm:w-full p-2 shrink-0 flex flex-wrap lg:-m-2 -m-1">
      <div className="lg:p-2 p-1 lg:w-full sm:w-1/2 w-full">
        <Card
          hasBorder
          color="transparent"
          className="!p-0 overflow-hidden max-lg:h-full"
        >
          <Heading variant="h5" className="p-4">
            Pepular Articles
          </Heading>
          <div className="pb-2">
            {[article, article, article, article].map((item, index) => (
              <WidgetArticleRowCard article={item} key={index} />
            ))}
          </div>
        </Card>
      </div>
      <div className="lg:p-2 p-1 lg:w-full sm:w-1/2 w-full">
        <Card hasBorder color="transparent" className="!p-0 overflow-hidden max-lg:h-full">
          <Heading variant="h5" className="p-4">
            Categoris
          </Heading>
          <div className="pb-4 px-4 -my-1">
            {[
              articleCategory,
              articleCategory,
              articleCategory,
              articleCategory,
              articleCategory,
              articleCategory,
            ].map((item, index) => (
              <Text
                key={index}
                color="black"
                as={Link}
                href={`/blog?category=${item.category}`}
                className="flex items-center py-1 hover:text-secondary capitalize"
              >
                <i
                  className={clsx(
                    item.icon,
                    "text-base text-secondary-dark me-2.5",
                  )}
                ></i>
                {item.name}
                <span className="ms-auto">({item.count})</span>
              </Text>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
