"use client";

import Btn from "@/components/generic/btn";
import HeaderSection from "@/components/generic/headerSection";
import ShopProductCard from "@/components/shop/generic/productCard";
import ShopSectionsCategories from "@/components/shop/sections/categories";
import ShopSectionsHero from "@/components/shop/sections/hero";

export default function Home() {
  return (
    <div className="">
      <ShopSectionsHero />
      <ShopSectionsCategories/>
      <div className="container mb-8">
        <HeaderSection
          icon="icon-thunder1"
          className="mb-sm-section"
          shape={false}
          endSide={
            <Btn
              size="sm"
              icon="icon-right-arrow"
              iconPlace="end"
              className="ms-auto"
              variant="outline-lightness"
            >
              View All
            </Btn>
          }
        >
          Flash Deals
        </HeaderSection>
        <div className="flex -m-1">
          <div className="w-1/5 p-1">
            <ShopProductCard/>
          </div>
          <div className="w-1/5 p-1">
            <ShopProductCard/>
          </div>
          <div className="w-1/5 p-1">
            <ShopProductCard/>
          </div>
          <div className="w-1/5 p-1">
            <ShopProductCard/>
          </div>
          <div className="w-1/5 p-1">
            <ShopProductCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
