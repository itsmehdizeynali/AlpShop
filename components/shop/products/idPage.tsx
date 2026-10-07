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
import Tabs from "@/components/generic/tabs";
import clsx from "clsx";
import ShopProductsSelections from "./selections";
import {
  getProductService,
  getProductVariantService,
} from "@/services/product";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Counter from "@/components/generic/counter";
import { addToCartService } from "@/services/cart";
import Link from "next/link";
import { getProductsService } from "@/services/generic";
import ShopSectionsProductsWrap from "../sections/productsWrap";
import ShopCommentsWrap from "../generic/commentsWrap";

type TabsItemType = { id: string; name: string };

export default function ShopProductsIdPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: detailsLoading } = useQuery({
    queryKey: ["product_details"],
    queryFn: () => getProductService(id),
  });
  const { data: related, isLoading: relatedProductsLoading } = useQuery({
    queryKey: ["related_product", product?.category?.slug, product?.slug],
    queryFn: () => getProductsService({ category: product?.category?.slug }),
  });

  const relatedProducts = related?.products.filter(
    (item) => item.id !== product?.id,
  );

  const [activeTab, setActiveTab] = useState<string>("description");
  const tabsItems: TabsItemType[] = [
    {
      id: "description",
      name: "description",
    },
    {
      id: "specifications",
      name: "specifications",
    },
    {
      id: "tags",
      name: "tags",
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

  const QueryClient = useQueryClient();
  const handelQueryKeys = () => {
    QueryClient.invalidateQueries({ queryKey: ["product_details"] });
    QueryClient.invalidateQueries({ queryKey: ["layout_data"] });
  };
  const addToCartMutation = useMutation({
    mutationFn: addToCartService,
    onSuccess: () => {
      handelQueryKeys();
    },
  });
  const handelAddToCartBtn = () => {
    if (product?.id) addToCartMutation.mutate({ productId: product?.id });
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const colors = product?.variantGroups.find(
    (item) => item.title === "color",
  )?.items;
  const variants = product?.variantGroups.filter(
    (item) => item.title !== "color",
  );

  return (
    <>
      {!!product && (
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
                  {product?.images.map((item, index) => (
                    <SwiperSlide key={index} className="max-h-16 max-w-16">
                      <Image
                        src={product.images[0].url}
                        alt={item.altText || "product"}
                        width={300}
                        height={300}
                        className="w-16 h-16 object-center cursor-pointer object-scale-down p-2 rounded-lg bg-neutral-lighter hover:bg-neutral-light transition-all"
                      />
                    </SwiperSlide>
                  ))}
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
                      {product?.images.map((item, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={product.images[0].url}
                            alt={item.altText || "product"}
                            width={300}
                            height={300}
                            className="w-full h-full object-center object-scale-down"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div>
                <Heading className="mb-2">{product?.name}</Heading>
                <ShopRating
                  size="lg"
                  disabled
                  className="mb-4"
                  productRate={product?.rate.rate}
                  users={product?.rate.users}
                />
                <ShopProductsSelections
                  className="lg:hidden"
                  colors={colors}
                  variants={variants}
                />
                <Text className="mb-4 text-justify">
                  {product?.description}
                </Text>
                <ul className="flex flex-wrap -m-1 mb-4">
                  {product?.specs.map((item, index) => (
                    <li className="p-1 grow" key={index}>
                      <div className="p-3 bg-neutral-light rounded-lg">
                        <Text color="dim" className="mb-1.5">
                          {item.label}
                        </Text>
                        <Text color="black">{item.value}</Text>
                      </div>
                    </li>
                  ))}
                </ul>
                <Tabs
                  wrapclass="flex items-center hide-scrollbar overflow-x-auto border border-t-0 border-neutral-light rounded-lg mb-4"
                  renderCell={renderCell}
                  tabs={tabsItems}
                  changeTab={(id) => setActiveTab(id)}
                />
                {activeTab === "description" && (
                  <Card color="transparent" hasBorder>
                    <HeaderSection shape size="h4" className="mb-sm-section">
                      Description
                    </HeaderSection>
                    <Text>{product?.description}</Text>
                  </Card>
                )}
                {activeTab === "specifications" && (
                  <Card color="transparent" hasBorder>
                    <HeaderSection shape size="h4" className="mb-sm-section">
                      Specifications
                    </HeaderSection>
                    {product?.specs && (
                      <ul>
                        {product?.specs.map((item, index) => (
                          <li
                            key={index}
                            className="flex group mb-4 last:mb-0 max-sm:flex-wrap"
                          >
                            <Text
                              color="black"
                              weight="bold"
                              className="lg:w-50 sm:w-32 w-full max-sm:mb-3 shrink-0"
                            >
                              {item.label}
                            </Text>
                            <Text className="border-b group-last:border-b-0 border-b-neutral-light grow pb-4">
                              {item.value}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                )}
                {activeTab === "tags" && (
                  <Card color="transparent" hasBorder>
                    <HeaderSection shape size="h4" className="mb-sm-section">
                      Blog Tags
                    </HeaderSection>
                    {!!product?.tags && (
                      <ul className="flex flex-wrap gap-2">
                        {product?.tags.map((item, index: number) => (
                          <li key={index}>
                            <Btn
                              size="sm"
                              variant="lightness"
                              color="black"
                              as={Link}
                              href={`/blog?tag=${item?.slug}`}
                            >
                              {item?.name}
                            </Btn>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                )}
                {activeTab === "comments" && !!product?.slug && (
                  <ShopCommentsWrap slug={product.slug} />
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
                  variants={variants}
                />
                <div className="flex items-center lg:mb-2">
                  <Price size="lg">{product?.price}</Price>
                  {product?.realPrice !== product?.price && (
                    <Text as="del" size="base" className="mx-2">
                      {product?.realPrice}$
                    </Text>
                  )}
                  {!!product?.discount && (
                    <Chip rounded color="danger">
                      {product?.discount}%
                    </Chip>
                  )}
                </div>
                {product?.isInCart ? (
                  <Counter
                    productId={product?.id}
                    queryKeys={["layout_data", "product_details"]}
                    num={product?.cartQuantity}
                    max={product?.stock}
                  />
                ) : (
                  <Btn
                    onClick={handelAddToCartBtn}
                    className="lg:w-full max-lg:ms-auto max-sm:w-full"
                  >
                    Add To Basket
                  </Btn>
                )}
              </Card>
            </div>
          </div>
        </div>
      )}
      <ShopSectionsProductsWrap
        queryKeys={["layout_data", "related_product"]}
        isLoading={relatedProductsLoading}
        products={relatedProducts}
        className="mb-section"
        headerTitle="Related Products"
      />
    </>
  );
}
