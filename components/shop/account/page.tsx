"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import HeaderSection from "@/components/generic/headerSection";
import Table from "@/components/generic/table";
import StatAcount from "@/components/stats/account";
import Image from "next/image";
import Link from "next/link";
import type { TableColumnsType, TableDataType } from "./types";
import Price from "@/components/generic/price";
import ShopAccountHero from "./hero";
import ShopAccountInformation from "./information";
import dataShopPages from "@/mockData/shop/pages";

export default function ShopAccountPage() {
  const columns: TableColumnsType<TableDataType>[] = [
    {
      key: "img",
      label: "",
      renderCell: (row) =>
        row?.img && (
          <Link
            href={`/products/${row.actions}`}
            className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center"
          >
            <Image
              className="object-scale-down object-center w-12 h-12"
              src={row?.img || ""}
              width={56}
              height={56}
              alt="product"
            />
          </Link>
        ),
    },
    {
      key: "order",
      label: "order #",
    },
    {
      key: "date",
      label: "date",
    },
    {
      key: "status",
      label: "status",
      renderCell: (row) => (
        <Chip size="sm" variant="lightness" color={row.status.color}>
          {row.status.title}
        </Chip>
      ),
    },
    {
      key: "total",
      label: "total",
      renderCell: (row) => <Price>{row.total}</Price>,
    },
    {
      key: "actions",
      label: "",
      renderCell: (row) => (
        <Btn
          variant="outline"
          color="primary"
          icon="icon-right-arrow"
          iconPlace="end"
          size="xs"
          href={`/account/orders/${row.actions}`}
          as={Link}
          className="ms-auto"
        >
          Details
        </Btn>
      ),
    },
  ];
  const data: TableDataType[] = [
    {
      img: "/img/product-1.png",
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "5637578",
    },
    {
      img: "/img/product-1.png",
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "5637578",
    },
    {
      img: "/img/product-1.png",
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "5637578",
    },
  ];

  const { accountStats } = dataShopPages();

  const refreshData = () => {};
  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap -m-2">
        <div className="p-2 lg:grow max-lg:w-full">
          <ShopAccountHero />
          <div className="lg:-m-2 -m-1 !mb-sm-section flex flex-wrap">
            {accountStats.map(
              (item, index) => (
                <div
                  key={index}
                  className="lg:w-1/2 md:w-1/4 sm:w-1/2 max-sm:grow lg:p-2 p-1"
                >
                  <StatAcount
                    linkText={item.linkText}
                    link={item.link}
                    value={item.value}
                    title={item.title}
                    icon={item.icon}
                  />
                </div>
              ),
            )}
          </div>
          <Card
            hasBorder
            color="transparent"
            className="w-full max-sm:p-0 max-sm:border-0"
          >
            <HeaderSection
              size="h3"
              className="mb-sm-section"
              shape
              link="/account/orders"
            >
              Lateast Orders
            </HeaderSection>
            <Table columns={columns} data={data} refreshData={refreshData} />
          </Card>
        </div>
        <ShopAccountInformation />
      </div>
    </div>
  );
}
