"use client";

import HeaderSection from "@/components/generic/headerSection";
import Table from "@/components/generic/table";
import type { TableColumnsType, TableDataType } from "./types";
import Link from "next/link";
import Chip from "@/components/generic/chip";
import Price from "@/components/generic/price";
import Btn from "@/components/generic/btn";

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
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "/5637578",
    },
    {
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "/5637578",
    },
    {
      order: "#5637578",
      date: "2026/05/27",
      status: { title: "cancelled", color: "danger" },
      total: 525.65,
      actions: "/5637578",
    },
  ];

  const refreshData = () => {};
  return (
    <div className="container my-section">
      <HeaderSection size="h2" className="mb-sm-section" shape>
        Return Requests
      </HeaderSection>
        <Table columns={columns} data={data} hasPagination paginationTotal={10} paginationCurrent={2} refreshData={refreshData} />
    </div>
  );
}
