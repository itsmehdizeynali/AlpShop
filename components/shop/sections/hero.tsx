import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import dataShopIndex from "@/mockData/shop";
import Image from "next/image";
import Link from "next/link";
export default function ShopSectionsHero() {
  const { hero } = dataShopIndex();
  return (
    <div className="overflow-hidden mt-sm-section mb-section">
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: "auto",
              loop: true,
              centeredSlides: true,
              freeMode: true,
            },
            992: {
              slidesPerView: 1,
              loop: false,
              centeredSlides: false,
              freeMode: false,
            },
          }}
          navigation
          spaceBetween={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="lg:rounded-xl max-lg:!overflow-visible swiper-hero"
        >
          {hero.map((item, index) => (
            <SwiperSlide className="!h-auto max-lg:!max-w-[99%]" key={index}>
              <Link href={item.href}>
                <Image
                  alt={item.alt}
                  src={item.img}
                  height={400}
                  width={600}
                  className="w-full h-full max-h-[400px] min-h-[170px] max-lg:rounded-lg object-cover object-left"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
