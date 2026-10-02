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
  isLoading = false,
  queryKeys
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
        {isLoading ? (
          <span className="my-2 w-5 h-5 border-[3px] border-solid border-r-primary border-b-primary border-primary/10 rounded-full block animate-spin m-auto"></span>
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
            {!!products &&
              products.map((item, index: number) => (
                <SwiperSlide
                  key={index}
                  className="max-lg:max-w-[170px] !h-auto"
                >
                  <WidgetProductCard product={item} queryKeys={queryKeys}/>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
