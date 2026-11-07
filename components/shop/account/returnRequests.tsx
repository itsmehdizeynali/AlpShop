"use client";

import HeaderSection from "@/components/generic/headerSection";
import Table from "@/components/generic/table";
import type {
  ReturnRequestType,
  TableColumnsType,
  TableDataType,
} from "./types";
import Link from "next/link";
import Chip from "@/components/generic/chip";
import Price from "@/components/generic/price";
import Btn from "@/components/generic/btn";
import useFormatDate from "@/utils/format-date";
import useStatus from "@/utils/setStatus";
import type { orderType } from "@/components/genericTypes";
import { useQuery } from "@tanstack/react-query";
import { getReturnRequestsService } from "@/services/account";
import LoadingTableOrder from "@/components/loading/tableOrder";
import Text from "@/components/generic/text";

export default function ShopReturnRequestsPage() {
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
      key: "reason",
      label: "reason",
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
  const {
    data: requestsData,
    isLoading: loadingOrders,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getReturnRequestsService,
  });
  console.log(requestsData);

  const { getFormatDateToDay } = useFormatDate();
  const { setColor } = useStatus();
  const data: TableDataType[] | undefined = !!requestsData?.returnRequests
    ? requestsData?.returnRequests?.map((request: ReturnRequestType) => {
        return {
          order: request.order.orderNumber,
          date: getFormatDateToDay(request.createdAt),
          status: { title: request.status, color: setColor(request.status) },
          reason: request.reason,
          actions: request.order.id,
        } as TableDataType;
      })
    : undefined;

  return (
    <div className="container my-section">
      <HeaderSection size="h2" className="mb-sm-section" shape>
        Return Requests
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
          paginationTotal={requestsData.pagination.totalPages}
          paginationCurrent={requestsData.pagination.page}
          refreshData={refetch}
        />
      )}
    </div>
  );
}
