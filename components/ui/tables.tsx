import Link from "next/link";
import Btn from "../generic/btn";
import Table from "../generic/table";
import { TableDataTypes } from "./types";
import { TableColumnsType } from "../generic/types";



export default function UiTables() {
  const columns:TableColumnsType<TableDataTypes>[] = [
    {
      key: "line",
      label: "line",
    },
    {
      key: "number",
      label: "number",
    },
    {
      key: "password",
      label: "password",
    },
    {
      key: "investorPassword",
      label: "investorPassword",
    },
    {
      key: "server",
      label: "server",
    },
    {
      key: "platform",
      label: "platform",
    },
    {
      key: "type",
      label: "type",
    },
    {
      key: "link",
      label: "",
      renderCell: (row) => (
        <Btn
          variant="outline"
          color="primary"
          icon="icon-right-arrow"
          iconPlace="end"
          size="sm"
          href={row.link}
          as={Link}
          className="w-fit ms-auto"
        >
          login
        </Btn>
      ),
    },
  ];
  const data:TableDataTypes[] = [
    {
      line: 1,
      number: "5637578",
      password: "11111",
      investorPassword: "111111",
      server: "server name",
      platform: "Roboforex-Demo",
      type: "BestBenefit-Rail23",
      link: "/",
    },
    {
      line: 2,
      number: "5637578",
      password: "11111",
      investorPassword: "111111",
      server: "server name",
      platform: "Roboforex-Demo",
      type: "BestBenefit-Rail23",
      link: "/",
    },
  ];

  const refreshData=(num?:number)=>{
  }
  return (
    <div>
      <Table refreshData={refreshData} columns={columns} data={data} />
    </div>
  );
}
