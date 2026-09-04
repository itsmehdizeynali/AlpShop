import HeaderSection from "@/components/generic/headerSection";
import Btn from "@/components/generic/btn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Countdown from "@/components/generic/countdown";
import WidgetProductCard from "@/components/widget/productCard";
import dataShopIndex from "@/mockData/shop";

export default function ShopSectionsSpacialProducts() {
  const { product } = dataShopIndex();
  return (
    <div className="overflow-hidden">
      <div className="container mb-section">
        <HeaderSection
          icon="icon-basket"
          className="mb-sm-section"
          shape={false}
          link="/deals"
          mainSide={
            <Countdown endDate="2026-09-10T23:59:59" className="me-4" />
          }
        >
          Spacial Products
        </HeaderSection>
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
          {[
            product,
            product,
            product,
            product,
            product,
            product,
            product,
            product,
          ].map((item, index) => (
            <SwiperSlide key={index} className="max-lg:max-w-[180px]">
              <WidgetProductCard product={item} spacial />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
