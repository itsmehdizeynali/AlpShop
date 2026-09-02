"use client";

import ShopSectionsCategories from "@/components/shop/sections/categories";
import ShopSectionsDeals from "@/components/shop/sections/deals";
import ShopSectionsHero from "@/components/shop/sections/hero";
import ShopSectionsJoinBox from "@/components/shop/sections/joinBox";
import ShopSectionsProductsWrap from "@/components/shop/sections/productsWrap";
import ShopSectionsServices from "@/components/shop/sections/services";
import ShopSectionsSpacialProducts from "@/components/shop/sections/spacialProducts";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <div className="">
      <ShopSectionsHero />
      <ShopSectionsDeals />
      <ShopSectionsCategories />
      <ShopSectionsSpacialProducts />
      <ShopSectionsProductsWrap
        className="mb-section"
        headerTitle="Electronics"
        headerLink="/catigory/electronics"
      />
      <ShopSectionsProductsWrap
        className="mb-section"
        headerTitle="Beauty & Personal Care"
        headerLink="/catigory/Beauty&PersonalCare"
      />
      <ShopSectionsProductsWrap
        className="mb-section"
        headerTitle="Fashion & Clothing"
        headerLink="/catigory/Fashion&Clothing"
      />
      <ShopSectionsProductsWrap
        className="mb-section"
        headerTitle="Tools & Hardware"
        headerLink="/catigory/Tools&Hardware"
      />

      <ShopSectionsJoinBox />

      <ShopSectionsServices />
    </div>
  );
}
