import HeaderSection from "@/components/generic/headerSection";
import Btn from "@/components/generic/btn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Countdown from "@/components/generic/countdown";
import WidgetProductCard from "@/components/widget/productCard";
import dataShopIndex from "@/mockData/shop";
import { useQuery } from "@tanstack/react-query";
import { getProductsService } from "@/services/generic";
import type { ProductType } from "@/components/genericTypes";
import { getSettingService } from "@/services/settings";
import LoadingSpin from "@/components/generic/loadingSpin";
import LoadingProductCard from "@/components/loading/productCard";

export default function ShopSectionsSpacialProducts() {
  const { data } = useQuery({
    queryKey: ["featured_products"],
    queryFn: () => getProductsService({ featured: true }),
  });
  const { data: countDownData, isLoading } = useQuery({
    queryKey: ["setting", "deals-end-date"],
    queryFn: () => getSettingService("deals-end-date"),
  });
  return (
    <div className="overflow-hidden">
      <div className="container mb-section">
        <HeaderSection
          icon="icon-basket"
          className="mb-sm-section"
          shape={false}
          link="/deals"
          mainSide={
            <Countdown endDate={countDownData?.value} className="me-4" />
          }
        >
          Spacial Products
        </HeaderSection>
        {isLoading ? (
          <div className="flex gap-1.25 overflow-hidden">
            {[0, 1, 2, 3, 4].map((item, index) => (
              <LoadingProductCard
                spacial
                hasBorder
                className="xl:w-1/5 lg:w-1/4 w-[180px]"
                key={index}
              />
            ))}
          </div>
        ) : (
          <Swiper
            className="max-lg:!overflow-visible"
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: "auto",
                freeMode: true,
              },
              992: {
                slidesPerView: 4,
                freeMode: false,
              },
              1200: {
                slidesPerView: 5,
                freeMode: false,
              },
            }}
            navigation
            spaceBetween={8}
          >
            {!!data?.products &&
              data?.products.map((item, index: number) => (
                <SwiperSlide
                  key={index}
                  className="max-lg:max-w-[180px] !h-auto"
                >
                  <WidgetProductCard
                    product={item}
                    spacial
                    queryKeys={["featured_products", "layout_data"]}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
