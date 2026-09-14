import Btn from "@/components/generic/btn";
import Countdown from "@/components/generic/countdown";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Text from "@/components/generic/text";
import WidgetProductCard from "@/components/widget/productCard";
import dataShopIndex from "@/mockData/shop";

export default function ShopSectionsDeals() {
  const { product } = dataShopIndex();

  return (
    <div className="container max-lg:bg-primary mb-section max-lg:!max-w-full max-lg:w-full max-lg:p-4">
      <div className="flex max-lg:flex-wrap lg:py-2 bg-primary rounded-xl">
        <div className="lg:w-50 w-full overflow-hidden flex lg:flex-col flex-wrap items-center lg:justify-center lg:px-6 shrink-0 max-lg:mb-4">
          <Image
            src="/img/flashDeals.png"
            alt="flashDeals"
            className="w-full h-auto lg:mb-4 max-lg:max-w-[120px] max-sm:max-w-[100px] max-lg:me-3 shrink"
            width={160}
            height={100}
          />
          <Countdown
            color="white"
            endDate="2026-11-10T23:59:59"
            className="max-lg:me-2"
          />
          <Btn
            as={Link}
            href="/deals"
            color="white"
            size="xs"
            icon="icon-right-arrow"
            iconPlace="end"
            className="lg:mt-5 max-lg:ms-auto max-lg:!bg-transparent max-lg:!px-0 max-lg:text-xxs max-lg:text-white"
          >
            View All
          </Btn>
        </div>
        <div className="lg:grow max-lg:min-w-full overflow-hidden max-lg:-mx-4">
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            freeMode={true}
            navigation
            spaceBetween={5}
            className="max-lg:!px-4 !pe-2"
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
              <SwiperSlide
                key={index}
                className="lg:!max-w-[210px] !max-w-[180px] !h-auto"
              >
                <WidgetProductCard
                  product={item}
                  color="white"
                  hasBorder={false}
                  spacial
                />
              </SwiperSlide>
            ))}
            <SwiperSlide className="lg:!max-w-[150px] !max-w-[120px] !h-auto">
              <Link
                href="/deals"
                className="flex flex-col items-center justify-center transition-all hover:bg-white/30 bg-white/20 w-full h-full rounded-xl"
              >
                <i className="icon-right-arrow mb-2 text-white"></i>
                <Text color="white">View All</Text>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
