"use client";

import HeaderSection from "@/components/generic/headerSection";
import Table from "@/components/generic/table";
import type { TableColumnsType, TableDataType } from "./types";
import Link from "next/link";
import Chip from "@/components/generic/chip";
import Price from "@/components/generic/price";
import Btn from "@/components/generic/btn";
import useFormatDate from "@/utils/format-date";
import { getOrdersService } from "@/services/account";
import useStatus from "@/utils/setStatus";
import { useQuery } from "@tanstack/react-query";
import type { orderType } from "@/components/genericTypes";
import LoadingTableOrder from "@/components/loading/tableOrder";
import useFormatNumber from "@/utils/format-number";

export default function ShopAccountOrdersPage() {
  const {formatNumber}=useFormatNumber()
  const columns: TableColumnsType<TableDataType>[] = [
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
  const { data: orders, isLoading: loadingOrders,refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersService,
  });
  const { getFormatDateToDay } = useFormatDate();
  const { setColor } = useStatus();
  const data: TableDataType[] | undefined = !!orders?.orders
    ? orders?.orders.map((order: orderType) => {
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

  return (
    <div className="container my-section">
      <HeaderSection size="h2" className="mb-sm-section" shape>
        Orders
      </HeaderSection>
      {loadingOrders ? (
        <div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <LoadingTableOrder className="mb-2 last:mb-0 py-3" key={index} />
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          data={data}
          hasPagination
          paginationTotal={orders?.pagination?.totalPages}
          paginationCurrent={orders?.pagination?.page}
          refreshData={refetch}
        />
      )}
    </div>
  );
}
