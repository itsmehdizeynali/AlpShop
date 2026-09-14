import clsx from "clsx";
import Text from "./text";
import Btn from "./btn";
import Pagination from "./pagination";
import { TablePropsType } from "./types";
import { ReactNode } from "react";
import Card from "./card";

export default function Table<T>({
  columns,
  data,
  head = true,
  refreshData,
  hasPagination = false,
  paginationTotal = 1,
  paginationCurrent = 1,
}: TablePropsType<T>) {
  return data?.length ? (
    <>
      <Card
        color="transparent"
        className="!p-0 !rounded-none sm:overflow-x-scroll custom-scroll"
      >
        <table className="w-full max-sm:!block">
          <thead className="max-sm:!hidden">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={clsx("first:rounded-s-xl last:rounded-e-xl", {
                    "p-3 bg-primary-light": head,
                  })}
                >
                  <Text size="sm" color="primary" className="capitalize">
                    {col.label}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="group max-sm:!flex flex-wrap max-sm:mb-2 last:mb-0 rounded-xl max-sm:border border-neutral-light"
              >
                {columns.map((col, key) => (
                  <td
                    className="p-3 border-b border-neutral-light sm:group-last:border-b-0 max-sm:last:border-b-0 max-sm:w-full max-sm:flex items-center"
                    key={key}
                  >
                    <Text
                      size="sm"
                      color="black"
                      className="capitalize sm:hidden me-auto"
                    >
                      {col.label}
                    </Text>
                    <Text
                      size="sm"
                      color="dim"
                      className="shrink-0 text-nowrap"
                    >
                      {col?.renderCell
                        ? col.renderCell(row)
                        : (row[col.key] as ReactNode)}
                    </Text>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {hasPagination && paginationTotal != 1 && (
        <Pagination
          reFetch={refreshData}
          total={paginationTotal}
          current={paginationCurrent}
          className="justify-center mt-4"
        />
      )}
    </>
  ) : (
    <div>
      <Btn
        icon="icon-refresh"
        color="neutral"
        className="mx-auto mb-4"
        onClick={() => refreshData}
        rounded
        square
      />
      <Text size="sm" className="text-center">
        no Data!
      </Text>
    </div>
  );
}
