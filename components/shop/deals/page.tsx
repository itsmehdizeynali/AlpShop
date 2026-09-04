"use client";

import WidgetProductCard from "@/components/widget/productCard";
import ShopSidebar from "../generic/sidebar";
import Pagination from "@/components/generic/pagination";
import dataShopPages from "@/mockData/shop/pages";
import Link from "next/link";
import Text from "@/components/generic/text";
import Heading from "@/components/generic/heading";
import Image from "next/image";
import Countdown from "@/components/generic/countdown";

export default function ShopDealsPage() {
  const { product, dealsCategories } = dataShopPages();
  const refreshData = () => {};

  return (
    <>
      <div className="container my-sm-section">
        <div className="lg:p-6 p-4 bg-gradient-primary flex max-sm:flex-col rounded-xl sm:items-end">
          <div className="sm:pe-6">
            <Heading color="white" className="mb-3">
              Deals Products
            </Heading>
            <Text color="white" weight="light" className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              ullam a vel molestias quas totam earum asperiores enim
              consequuntur, modi ab atque mollitia, placeat voluptatem eligendi!
              Fugiat veniam inventore alias.
            </Text>
            <Heading variant="h5" color="white" className="mb-1.5">
              Time To End
            </Heading>
            <Countdown
              color="primary-light"
              endDate="2026-09-10T23:59:59"
            />
          </div>
          <Image
            src="/img/img-1-removebg-preview.png"
            width={230}
            height={155}
            alt="products"
            className="sm:ms-auto max-sm:mx-auto max-sm:order-first max-lg:w-[200px] max-sm:mb-2"
          />
        </div>
      </div>
      <div className="container mb-sm-section">
        <div className="flex items-center hide-scrollbar overflow-x-auto border border-t-0 border-neutral-light rounded-lg">
          {dealsCategories.map((item, index) => (
            <Text
              as={Link}
              key={index}
              href={`?category=${item.category}`}
              color="black"
              className="py-4 lg:px-6 px-4 flex items-center shrink-0 hover:bg-neutral-lighter transition-all"
            >
              <i className="icon-qr-code lg:text-md text-base me-2.5"></i>
              {item.name}
            </Text>
          ))}
        </div>
      </div>
      <div className="container mb-section">
        <div className="flex flex-wrap items-start -m-2">
          <ShopSidebar
            categories={[
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
            ]}
            brands={[
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
              "apple",
            ]}
            price={{ min: 10, step: 10, max: 10000 }}
          />
          <div className="lg:w-3/4 w-full flex flex-wrap p-1">
            {[
              product,
              product,
              product,
              product,
              product,
              product,
              product,
              product,
              product,
              product,
              product,
              product,
            ].map((item, index) => (
              <div
                className="p-1 xl:w-1/4 lg:w-1/3 md:w-1/4 sm:w-1/3 w-full"
                key={index}
              >
                <WidgetProductCard responsive spacial product={item} />
              </div>
            ))}
            <Pagination
              className="w-full p-2 justify-center"
              reFetch={refreshData}
              total={4}
              current={1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
