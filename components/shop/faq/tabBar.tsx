"use client";

import Text from "@/components/generic/text";
import dataShopPages from "@/mockData/shop/pages";
import clsx from "clsx";
import { useState } from "react";

export default function ShopFaqTabBar({ className }: { className?: string }) {
  const { faqTabs } = dataShopPages();

  const [activeTab, setActiveTab] = useState<null|number|string>(null);

  const handleScroll = (id: number|string) => {
    setActiveTab(id);
    const element = document.getElementById(`tab-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  return (
    <div className={clsx(className, "max-lg:container lg:w-72 shrink-0")}>
      <div className="max-lg:flex items-center hide-scrollbar bg-white overflow-x-auto max-lg:shadow-card lg:border max-lg:border-t-0 border-neutral-light rounded-lg">
        {faqTabs.map((item, index) => (
          <Text
            onClick={() => handleScroll(item.id)}
            key={index}
            color="black"
            className={clsx(
              "py-4 px-4 cursor-pointer flex items-center shrink-0 hover:bg-neutral-lighter transition-all",
              {"!bg-primary-light !text-primary max-lg:!bg-primary/10":activeTab===item.id}
            )}
          >
            <i className={clsx(item.icon,"lg:text-md text-base me-2.5")}></i>
            {item.name}
          </Text>
        ))}
      </div>
    </div>
  );
}
