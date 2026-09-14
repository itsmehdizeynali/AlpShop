"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import { useState } from "react";
import { Mousewheel, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import ShopRating from "../generic/rating";
import HeaderSection from "@/components/generic/headerSection";
import ShopSectionsProductsWrap from "../sections/productsWrap";
import dataShopPages from "@/mockData/shop/pages";
import ShopComment from "../generic/comment";
import Tabs from "@/components/generic/tabs";
import clsx from "clsx";
import ShopSectionsCommentBox from "../sections/commentBox";
import ShopProductsSelections from "./selections";

type TabsItemType = { id: string; name: string };

export default function ShopProductsIdPage() {
  const { product, comment } = dataShopPages();

  const colors = ["#82b415", "#cb3030", "#034289"];
  const sizes = ["small", "medium", "large", "xl"];

  const [activeTab, setActiveTab] = useState<string>("Lorem1");
  const tabsItems: TabsItemType[] = [
    {
      id: "Lorem1",
      name: "Lorem1",
    },
    {
      id: "Lorem2",
      name: "Lorem2",
    },
    {
      id: "comments",
      name: "Comments",
    },
  ];
  const renderCell = (item: TabsItemType) => {
    return (
      <Text
        color="black"
        className={clsx(
          { active: activeTab === item.id },
          "lg:py-4 p-3 lg:px-6 px-4 flex items-center shrink-0 hover:bg-neutral-lighter [&.active]:bg-primary-light [&.active]:text-primary transition-all",
        )}
      >
        {item.name}
      </Text>
    );
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <>
      <div className="container my-section max-sm:mt-sm-section">
        <div className="-m-2 flex items-start max-lg:flex-wrap">
          <div className="p-2 lg:grow max-lg:w-full">
            <div className="flex max-sm:flex-wrap mb-4">
              <Swiper
                className="sm:h-80 sm:w-16 w-full shrink-0 max-sm:order-last"
                mousewheel={true}
                breakpoints={{
                  576: {
                    direction: "vertical",
                  },
                }}
                slidesPerView={"auto"}
                spaceBetween={8}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress={true}
                modules={[Mousewheel, Thumbs]}
              >
                <SwiperSlide className="max-h-16 max-w-16">
                  <Image
                    src="/img/product-1.png"
                    alt="product"
                    width={300}
                    height={300}
                    className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                  />
                </SwiperSlide>
                <SwiperSlide className="max-h-16 max-w-16">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={300}
                    height={300}
                    className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                  />
                </SwiperSlide>
                <SwiperSlide className="max-h-16 max-w-16">
                  <Image
                    src="/img/img-2-removebg-preview.png"
                    alt="product"
                    width={300}
                    height={300}
                    className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                  />
                </SwiperSlide>
                <SwiperSlide className="max-h-16 max-w-16">
                  <Image
                    src="/img/img-3-removebg-preview.png"
                    alt="product"
                    width={300}
                    height={300}
                    className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                  />
                </SwiperSlide>
                <SwiperSlide className="max-h-16 max-w-16">
                  <Image
                    src="/img/img-4-removebg-preview.png"
                    alt="product"
                    width={300}
                    height={300}
                    className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                  />
                </SwiperSlide>
              </Swiper>
              <div className="sm:grow max-sm:w-full sm:ps-4 max-sm:mb-2">
                <div className="w-full sm:h-80 h-60 bg-neutral-lighter rounded-lg p-4 overflow-hidden">
                  <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="!max-w-full h-full"
                    breakpoints={{
                      576: {
                        direction: "vertical",
                      },
                    }}
                    slidesPerView={1}
                    spaceBetween={8}
                  >
                    <SwiperSlide>
                      <Image
                        src="/img/product-1.png"
                        alt="product"
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-scale-down"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/img/img-1-removebg-preview.png"
                        alt="product"
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-scale-down"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/img/img-2-removebg-preview.png"
                        alt="product"
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-scale-down"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/img/img-3-removebg-preview.png"
                        alt="product"
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-scale-down"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src="/img/img-4-removebg-preview.png"
                        alt="product"
                        width={300}
                        height={300}
                        className="w-full h-full object-center object-scale-down"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
            <div>
              <Heading className="mb-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              </Heading>
              <ShopRating
                size="lg"
                disabled
                className="mb-4"
                productRate={4.6}
                users={50}
              />
              <ShopProductsSelections
                className="lg:hidden"
                colors={colors}
                sizes={sizes}
              />
              <Text className="mb-4 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                repudiandae rerum asperiores eaque aliquid eveniet facilis iure
                aliquam voluptatum voluptate aperiam libero ratione saepe
                consequatur hic excepturi exercitationem, unde laudantium.
              </Text>
              <ul className="flex flex-wrap -m-1 mb-4">
                <li className="p-1 grow">
                  <div className="p-3 bg-neutral-light rounded-lg">
                    <Text color="dim" className="mb-1.5">
                      Country of manufacture
                    </Text>
                    <Text color="black">Germany</Text>
                  </div>
                </li>
                <li className="p-1 grow">
                  <div className="p-3 bg-neutral-light rounded-lg">
                    <Text color="dim" className="mb-1.5">
                      Country of manufacture
                    </Text>
                    <Text color="black">Germany</Text>
                  </div>
                </li>
                <li className="p-1 grow">
                  <div className="p-3 bg-neutral-light rounded-lg">
                    <Text color="dim" className="mb-1.5">
                      Country of manufacture
                    </Text>
                    <Text color="black">Germany</Text>
                  </div>
                </li>
              </ul>
              <Tabs
                wrapclass="flex items-center hide-scrollbar overflow-x-auto border border-t-0 border-neutral-light rounded-lg mb-4"
                renderCell={renderCell}
                tabs={tabsItems}
                changeTab={(id) => setActiveTab(id)}
              />
              {activeTab === "Lorem1" && (
                <Card color="transparent" hasBorder>
                  <HeaderSection shape size="h4" className="mb-sm-section">
                    lorem lorem lorem
                  </HeaderSection>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque sequi quibusdam, itaque possimus laborum non aliquid
                    delectus, enim repudiandae quasi quo iure sint minima nemo
                    ratione eos quia iste! Neque. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Neque sequi quibusdam, itaque
                    possimus laborum non aliquid delectus, enim repudiandae
                    quasi quo iure sint minima nemo ratione eos quia iste!
                    Neque.
                  </Text>
                </Card>
              )}
              {activeTab === "Lorem2" && (
                <Card color="transparent" hasBorder>
                  <HeaderSection shape size="h4" className="mb-sm-section">
                    lorem lorem lorem
                  </HeaderSection>
                  <ul>
                    <li className="flex group mb-4 last:mb-0 max-sm:flex-wrap">
                      <Text
                        color="black"
                        weight="bold"
                        className="lg:w-50 sm:w-32 w-full max-sm:mb-3 shrink-0"
                      >
                        lorem
                      </Text>
                      <Text className="border-b group-last:border-b-0 border-b-neutral-light grow pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                      </Text>
                    </li>
                    <li className="flex group mb-4 last:mb-0 max-sm:flex-wrap">
                      <Text
                        color="black"
                        weight="bold"
                        className="lg:w-50 sm:w-32 w-full max-sm:mb-3 shrink-0"
                      >
                        lorem
                      </Text>
                      <Text className="border-b group-last:border-b-0 border-b-neutral-light grow pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit. Lorem ipsum dolor, sit amet
                        consectetur adipisicing elit. Lorem ipsum dolor, sit
                        amet consectetur adipisicing elit. Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit. Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit.
                      </Text>
                    </li>
                    <li className="flex group mb-4 last:mb-0 max-sm:flex-wrap">
                      <Text
                        color="black"
                        weight="bold"
                        className="lg:w-50 sm:w-32 w-full max-sm:mb-3 shrink-0"
                      >
                        lorem
                      </Text>
                      <Text className="border-b group-last:border-b-0 border-b-neutral-light grow pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                      </Text>
                    </li>
                  </ul>
                </Card>
              )}
              {activeTab === "comments" && (
                <>
                  <Card color="transparent" hasBorder className="mb-4">
                    <HeaderSection shape size="h4" className="mb-sm-section">
                      Comments
                    </HeaderSection>
                    {[comment, comment, comment, comment].map((item, index) => (
                      <ShopComment comment={item} key={index} />
                    ))}
                  </Card>
                  <ShopSectionsCommentBox />
                </>
              )}
            </div>
          </div>
          <div className="lg:p-2 lg:w-78 w-full sticky lg:top-0 shrink-0 max-lg:z-40 max-lg:bg-white max-lg:shadow-card max-lg:bottom-0 max-lg:fixed max-lg:start-0">
            <Card
              hasBorder
              color="transparent"
              className="max-lg:gap-2 max-lg:flex-wrap max-lg:flex max-lg:items-center max-lg:rounded-none max-lg:border-0"
            >
              <ShopProductsSelections
                className="max-lg:hidden"
                colors={colors}
                sizes={sizes}
              />
              <div className="flex items-center lg:mb-4">
                <Price size="lg">520</Price>
                <Text as="del" size="base" className="mx-2">
                  580$
                </Text>
                <Chip rounded color="danger">
                  25%
                </Chip>
              </div>
              <Btn className="lg:w-full max-lg:ms-auto max-sm:w-full">
                Add To Basket
              </Btn>
            </Card>
          </div>
        </div>
      </div>
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
        headerTitle="Related Products"
      />
    </>
  );
}
