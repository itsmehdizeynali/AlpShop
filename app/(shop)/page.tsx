"use client";

import ShopSectionsCategories from "@/components/shop/sections/categories";
import ShopSectionsDeals from "@/components/shop/sections/deals";
import ShopSectionsHero from "@/components/shop/sections/hero";
import ShopSectionsJoinBox from "@/components/shop/sections/joinBox";
import ShopSectionsProductsWrap from "@/components/shop/sections/productsWrap";
import ShopSectionsServices from "@/components/shop/sections/services";
import ShopSectionsSpacialProducts from "@/components/shop/sections/spacialProducts";
import { getProductsService } from "@/services/generic";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: electronicsProducts, isLoading: isLoadingOne } = useQuery({
    queryKey: ["electronics_products"],
    queryFn: () => getProductsService({ category: "electronics" }),
  });
  const { data: beautyAndPersonalCareProducts, isLoading: isLoadingTwo } =
    useQuery({
      queryKey: ["BeautyAndPersonalCare_products"],
      queryFn: () => getProductsService({ category: "BeautyAndPersonalCare" }),
    });
  const { data: fashionAndClothingProducts, isLoading: isLoadingThree } =
    useQuery({
      queryKey: ["FashionAndClothing_products"],
      queryFn: () => getProductsService({ category: "FashionAndClothing" }),
    });
  const { data: toolsAndHardwareProducts, isLoading: isLoadingFour } = useQuery(
    {
      queryKey: ["ToolsAndHardware_products"],
      queryFn: () => getProductsService({ category: "ToolsAndHardware" }),
    },
  );

  return (
    <>
      <ShopSectionsHero />
      <ShopSectionsDeals />
      <ShopSectionsCategories />
      <ShopSectionsSpacialProducts />
      <ShopSectionsProductsWrap
        queryKeys={["electronics_products", "layout_data"]}
        products={electronicsProducts?.products}
        isLoading={isLoadingOne}
        className="mb-section"
        headerTitle="Electronics"
        headerLink="/products?category=electronics"
      />
      <ShopSectionsProductsWrap
        queryKeys={["BeautyAndPersonalCare_products", "layout_data"]}
        products={beautyAndPersonalCareProducts?.products}
        isLoading={isLoadingTwo}
        className="mb-section"
        headerTitle="Beauty & Personal Care"
        headerLink="/products?category=BeautyAndPersonalCare"
      />
      <ShopSectionsProductsWrap
        queryKeys={["FashionAndClothing_products", "layout_data"]}
        products={fashionAndClothingProducts?.products}
        isLoading={isLoadingThree}
        className="mb-section"
        headerTitle="Fashion & Clothing"
        headerLink="/products?category=FashionAndClothing"
      />
      <ShopSectionsProductsWrap
        queryKeys={["ToolsAndHardware_products", "layout_data"]}
        products={toolsAndHardwareProducts?.products}
        isLoading={isLoadingFour}
        className="mb-section"
        headerTitle="Tools & Hardware"
        headerLink="/products?category=ToolsAndHardware"
      />

      <ShopSectionsJoinBox />

      <ShopSectionsServices />
    </>
  );
}
