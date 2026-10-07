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
import { useQuery } from "@tanstack/react-query";
import {
  getAccountStatsService,
  getOrdersService,
  getProfileService,
} from "@/services/account";
import clsx from "clsx";
import useStatus from "@/utils/setStatus";
import useFormatDate from "@/utils/format-date";

export default function ShopAccountPage() {
  const columns: TableColumnsType<TableDataType>[] = [
    {
      key: "images",
      label: "",
      renderCell: (row) =>
        row?.images && (
          <div
            className="w-16 h-16 rounded-xl overflow-hidden bg-primary-light flex flex-wrap items-center justify-center"
          >
            {row.images.map((item, index) => (
                <Image
                  key={index}
                  style={{height:`${(100/((Math.ceil(row.images?.length?row.images?.length/2:1))||1))}%`}}
                  className={clsx("object-scale-down object-center max-w-1/2",)}
                  src={item || ""}
                  width={48}
                  height={48}
                  alt="product"
                />
            ))}
          </div>
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

  const {setColor}=useStatus()
  const {getFormatDateToDay}=useFormatDate()

  const { data: information, isLoading: loadingInformation } = useQuery({
    queryKey: ["profile_information"],
    queryFn: getProfileService,
  });
  const { data: stats, isLoading: loadingStarts } = useQuery({
    queryKey: ["stats"],
    queryFn: getAccountStatsService,
  });
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ["last_orders"],
    queryFn: getOrdersService,
  });
  const data: TableDataType[] | undefined = !!orders
    ? orders.map((order) => {
        return {
          images: order.items.map((item) => item.product.images[0].url),
          order: order.orderNumber,
          date: getFormatDateToDay(order.createdAt),
          status: { title: order.status, color: setColor(order.status) },
          total: order.total,
          actions: order.id,
        } as TableDataType;
      })
    : undefined;

  console.log(data);

  const { accountStats } = dataShopPages({ stats });

  const refreshData = () => {};
  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap -m-2">
        <div className="p-2 lg:grow max-lg:w-full">
          <ShopAccountHero
            name={information?.name}
            isLoading={loadingInformation}
          />
          <div className="lg:-m-2 -m-1 !mb-sm-section flex flex-wrap">
            {accountStats.map((item, index) => (
              <div
                key={index}
                className="lg:w-1/2 md:w-1/4 sm:w-1/2 max-sm:grow lg:p-2 p-1"
              >
                <StatAcount
                  isLoading={loadingStarts}
                  linkText={item.linkText}
                  link={item.link}
                  value={item.value}
                  title={item.title}
                  icon={item.icon}
                />
              </div>
            ))}
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
        <ShopAccountInformation information={information} />
      </div>
    </div>
  );
}
