"use client";

import ShopSectionsCategories from "@/components/shop/sections/categories";
import ShopSectionsDeals from "@/components/shop/sections/deals";
import ShopSectionsHero from "@/components/shop/sections/hero";
import ShopSectionsJoinBox from "@/components/shop/sections/joinBox";
import ShopSectionsProductsWrap from "@/components/shop/sections/productsWrap";
import ShopSectionsServices from "@/components/shop/sections/services";
import ShopSectionsSpacialProducts from "@/components/shop/sections/spacialProducts";
import dataShopIndex from "@/mockData/shop";

export default function Home() {
  const { product } = dataShopIndex();

  return (
    <>
      <ShopSectionsHero />
      <ShopSectionsDeals />
      <ShopSectionsCategories />
      <ShopSectionsSpacialProducts />
      <ShopSectionsProductsWrap
        products={[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ]}
        className="mb-section"
        headerTitle="Electronics"
        headerLink="/products?category=electronics"
      />
      <ShopSectionsProductsWrap
        products={[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ]}
        className="mb-section"
        headerTitle="Beauty & Personal Care"
        headerLink="/products?category=BeautyAndPersonalCare"
      />
      <ShopSectionsProductsWrap
        products={[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ]}
        className="mb-section"
        headerTitle="Fashion & Clothing"
        headerLink="/products?category=FashionAndClothing"
      />
      <ShopSectionsProductsWrap
        products={[
          product,
          product,
          product,
          product,
          product,
          product,
          product,
        ]}
        className="mb-section"
        headerTitle="Tools & Hardware"
        headerLink="/products?category=ToolsAndHardware"
      />

      <ShopSectionsJoinBox />

      <ShopSectionsServices />
    </>
  );
}
