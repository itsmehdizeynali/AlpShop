"use client";

import Accordion from "@/components/generic/accordion";
import HeaderSection from "@/components/generic/headerSection";
import dataShopPages from "@/mockData/shop/pages";
import ShopFaqTabBar from "./tabBar";

export default function ShopFaqPage() {
  const { faq } = dataShopPages();
  return (
    <>
      <ShopFaqTabBar className="my-section"/>
      {faq.map((item, index) => (
        <div key={index} className="container mb-section">
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
    </>
  );
}
