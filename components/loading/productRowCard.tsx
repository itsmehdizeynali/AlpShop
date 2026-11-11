import Card from "@/components/generic/card";
import clsx from "clsx";
import type { LoadingProductRowCardType } from "./types";

export default function LoadingProductRowCard({
  className = "",
}: LoadingProductRowCardType) {
  return (
    <>
      <Card
        color="transparent"
        hasBorder
        className={clsx(
          className,
          "flex w-full animate-pulse max-sm:flex-col gap-2 max-sm:border-x-0 max-sm:rounded-none max-sm:-mx-4 max-sm:border-t-0",
        )}
      >
        <div className="grow flex">
          <div className="lg:h-30 lg:w-30 h-24 w-24 lg:me-4 me-3 shrink-0 bg-loading animate-pulse rounded-lg"></div>
          <div className="flex flex-col justify-between grow me-2">
            <div>
              <div className="mb-1.5 h-2.5 bg-loading animate-pulse rounded-full max-lg:hidden"></div>
              <div className="mb-4 h-2.5 bg-loading animate-pulse rounded-full"></div>
            </div>
            <div>
              <div className="mb-2.5 h-2.5 bg-loading animate-pulse rounded-full"></div>
              <div className="mb-2 h-3 w-36 bg-loading animate-pulse rounded-full"></div>
              <div className="lg:h-6 h-4 w-40 bg-loading animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="sm:self-end">
          <div className="lg:h-10 h-7 lg:w-30 w-24 bg-loading animate-pulse rounded-full"></div>
        </div>
      </Card>
    </>
  );
}
