import HeaderSection from "@/components/generic/headerSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import clsx from "clsx";
import WidgetProductCard from "@/components/widget/productCard";
import type { ProductsWrapPropsType } from "./types";

export default function ShopSectionsProductsWrap({
  headerTitle,
  headerLink,
  className = "",
  products,
}: ProductsWrapPropsType) {
  return (
    <div className={clsx(className, "overflow-hidden")}>
      <div className="container">
        <HeaderSection
          className="mb-sm-section"
          shape={false}
          link={headerLink}
        >
          {headerTitle}
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
              slidesPerView: 5,
              freeMode: false,
            },
            1200: {
              slidesPerView: 6,
              freeMode: false,
            },
          }}
          navigation
          spaceBetween={8}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index} className="max-lg:max-w-[170px]">
              <WidgetProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
