import clsx from "clsx";
import type { LoadingProductCardType } from "./types";

export default function LoadingProductCard({
  responsive=false,
  spacial=false,
  hasBorder=false,
  className=""
}: LoadingProductCardType) {
  return (
    <div
      className={clsx(
        { "max-sm:flex-row": responsive },
        { "border border-loading": hasBorder },
        "relative flex flex-col h-full shrink-0 bg-white/20 animate-pulse rounded-xl lg:p-4 p-3",
        className
      )}
    >
      <div
        className={clsx(
          "w-full lg:h-[180px] h-[150px] bg-loading animate-pulse rounded-xl mb-3",
          {
            "max-sm:!w-20 max-sm:!h-20 max-sm:mr-2 max-sm:mb-0!": responsive,
          },
        )}
      ></div>
      <div className="flex flex-col grow justify-between">
        <div className={clsx("mb-1.5 h-2.5 bg-loading animate-pulse rounded-full",{"max-sm:hidden":responsive})}></div>
        <div className="mb-4 h-2.5 bg-loading animate-pulse rounded-full"></div>
        <div>
          <div
            className="lg:mb-2 mb-1 h-3 w-36 bg-loading animate-pulse rounded-full"
          />
          <div className="flex items-center">
            <div className="h-4 w-20 bg-loading animate-pulse rounded-full"></div>
            {spacial && (
              <div className="lg:h-8 h-7 lg:w-8 w-7 ms-auto bg-loading animate-pulse rounded-lg"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
