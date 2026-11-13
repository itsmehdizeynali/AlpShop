"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import HeaderSection from "@/components/generic/headerSection";
import Table from "@/components/generic/table";
import StatAccount from "@/components/stats/account";
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
import type { orderType } from "@/components/genericTypes";
import LoadingTableOrder from "@/components/loading/tableOrder";
import useFormatNumber from "@/utils/format-number";

export default function ShopAccountPage() {
  const {formatNumber}=useFormatNumber()
  const columns: TableColumnsType<TableDataType>[] = [
    {
      key: "images",
      label: "",
      renderCell: (row) =>
        row?.images && (
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary-light flex flex-wrap items-center justify-center">
            {row.images.map((item, index) => (
              <Image
                key={index}
                style={{
                  height: `${100 / (Math.ceil(row.images?.length ? row.images?.length / 2 : 1) || 1)}%`,
                }}
                className={clsx("object-scale-down object-center max-w-1/2")}
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
      renderCell: (row) => <Price>{formatNumber(row.total)}</Price>,
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

  const { setColor } = useStatus();
  const { getFormatDateToDay } = useFormatDate();

  const { data: information, isLoading: loadingInformation } = useQuery({
    queryKey: ["profile_information"],
    queryFn: getProfileService,
  });
  const { data: stats, isLoading: loadingStarts } = useQuery({
    queryKey: ["stats"],
    queryFn: getAccountStatsService,
  });
  const { data: orders, isLoading: loadingOrders,refetch } = useQuery({
    queryKey: ["last_orders"],
    queryFn: getOrdersService,
  });
  const data: TableDataType[] | undefined = !!orders?.orders
    ? orders.orders.map((order: orderType) => {
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

  console.log(information);

  const { accountStats } = dataShopPages({ stats });

  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap -m-2">
        <div className="p-2 lg:grow max-lg:w-full">
          <ShopAccountHero
            name={information?.name}
            isLoading={loadingInformation}
          />
          <ul className="lg:-m-2 -m-1 !mb-sm-section flex flex-wrap">
            {accountStats.map((item, index) => (
              <li
                key={index}
                className="lg:w-1/2 md:w-1/4 sm:w-1/2 max-sm:grow max-sm:min-w-1/2 lg:p-2 p-1"
              >
                <StatAccount
                  isLoading={loadingStarts}
                  linkText={item.linkText}
                  link={item.link}
                  value={item.value}
                  title={item.title}
                  icon={item.icon}
                />
              </li>
            ))}
          </ul>
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
            {loadingOrders ? (
              <div>
                {[0, 1, 2].map((item, index) => (
                  <LoadingTableOrder hasImg className="mb-2 last:mb-0" key={index}/>
                ))}
              </div>
            ) : (
              <Table columns={columns} data={data} refreshData={refetch} />
            )}
          </Card>
        </div>
        <ShopAccountInformation information={information} isLoading={loadingInformation}/>
      </div>
    </div>
  );
}
