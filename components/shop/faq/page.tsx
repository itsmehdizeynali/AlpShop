"use client";

import Accordion from "@/components/generic/accordion";
import HeaderSection from "@/components/generic/headerSection";
import dataShopPages from "@/mockData/shop/pages";
import ShopFaqTabBar from "./tabBar";

export default function ShopFaqPage() {
  const { faq } = dataShopPages();

  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap lg:-m-2">
        <ShopFaqTabBar className="top-1 sticky lg:p-2 z-10 max-lg:mb-section"/>
        <div className="grow lg:p-2">
          {faq.map((item, index) => (
            <div
              key={index}
              id={`tab-${item.id}`}
              className="mb-section last:mb-0 lg:scroll-mt-2 scroll-mt-16"
            >
              <HeaderSection className="mb-sm-section" size="h3" shape>
                {item.title}
              </HeaderSection>
              <ul>
                {item.accordionItems.map((accordion, index) => (
                  <Accordion
                    key={index}
                    title={accordion.title}
                    paragraph={accordion.paragraph}
                    className="mb-2 last:mb-0"
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
