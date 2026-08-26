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
      <Card color="primary-light"
        className="!p-0 !rounded-none md:overflow-x-scroll custom-scroll max-md:!bg-transparent"
      >
        <table className="w-full max-md:!block">
          <thead className="max-md:!hidden">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={clsx({ "p-3 bg-primary": head })}
                >
                  <Text size="sm" color="white" className="capitalize">
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
                className="group max-md:!flex max-md:bg-primary-light flex-wrap max-md:mb-2 last:mb-0 rounded-xl"
              >
                {columns.map((col, key) => (
                  <td
                    className="p-3 border-b border-white md:group-last:border-b-0 max-md:last:border-b-0 max-md:w-full max-md:flex items-center"
                    key={key}
                  >
                    <Text
                      size="sm"
                      color="dim"
                      className="capitalize md:hidden me-auto"
                    >
                      {col.label}:
                    </Text>
                    <Text
                      size="sm"
                      color="dim-light"
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
