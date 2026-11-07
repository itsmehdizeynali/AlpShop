import Card from "@/components/generic/card";

export default function LoadingProductSingle() {
  return (
    <div className="container my-section max-sm:mt-sm-section">
      <div className="-m-2 flex items-start max-lg:flex-wrap">
        <div className="p-2 lg:grow max-lg:w-full">
          <div className="flex max-sm:flex-wrap mb-4">
            <div className="flex sm:max-h-80 max-h-60 sm:flex-col gap-2 overflow-hidden max-sm:order-last">
              <div className="w-16 h-16 rounded-lg bg-loading animate-pulse shrink-0"></div>
              <div className="w-16 h-16 rounded-lg bg-loading animate-pulse shrink-0"></div>
              <div className="w-16 h-16 rounded-lg bg-loading animate-pulse shrink-0"></div>
              <div className="w-16 h-16 rounded-lg bg-loading animate-pulse shrink-0"></div>
              <div className="w-16 h-16 rounded-lg bg-loading animate-pulse shrink-0"></div>
            </div>
            <div className="sm:grow max-sm:w-full sm:ps-4 max-sm:mb-2">
              <div className="w-full sm:h-80 h-60 bg-loading rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="mb-2 h-6 rounded-full bg-loading animate-pulse"></div>
            <div className="mb-4 h-4 w-50 rounded-full bg-loading animate-pulse" />
            <div className="mb-2 h-3 rounded-full bg-loading animate-pulse"></div>
            <div className="mb-2 h-3 rounded-full bg-loading animate-pulse"></div>
            <div className="mb-4 h-3 rounded-full bg-loading animate-pulse"></div>
            <ul className="flex flex-wrap -m-1 mb-4">
              {[0, 1, 2].map((item, index) => (
                <li className="p-1 w-1/3" key={index}>
                  <div className="h-17 bg-loading rounded-lg"></div>
                </li>
              ))}
            </ul>
            <Card color="transparent" hasBorder>
              <div className="border-s-4 border-s-loading animate-pulse ps-4 py-1 mb-4">
                <div className="h-6 w-40 rounded-full bg-loading animate-pulse"></div>
              </div>
              <div className="h-3 bg-loading mb-2 last:mb-0"></div>
              <div className="h-3 bg-loading mb-2 last:mb-0"></div>
              <div className="h-3 bg-loading mb-2 last:mb-0"></div>
            </Card>
          </div>
        </div>
        <div className="lg:p-2 lg:w-78 w-full sticky lg:top-0 shrink-0 max-lg:z-40 max-lg:bg-white max-lg:shadow-card max-lg:bottom-0 max-lg:fixed max-lg:start-0">
          <Card
            hasBorder
            color="transparent"
            className="max-lg:gap-2 max-lg:flex-wrap max-lg:flex max-lg:items-center max-lg:rounded-none max-lg:border-0"
          >
            <div className="bg-loading animate-pulse rounded-full h-5 w-20 mb-3"></div>
            <ul className="gap-1 flex mb-5">
              <li className="bg-loading animate-pulse rounded-full h-5 w-10"></li>
              <li className="bg-loading animate-pulse rounded-full h-5 w-10"></li>
              <li className="bg-loading animate-pulse rounded-full h-5 w-10"></li>
              <li className="bg-loading animate-pulse rounded-full h-5 w-10"></li>
            </ul>
            <div className="flex gap-1 mb-3">
              <div className="bg-loading animate-pulse rounded-full h-5 w-20 mb-3"></div>
              <div className="bg-loading animate-pulse rounded-full h-5 w-20 mb-3"></div>
            </div>
            <div className="bg-loading animate-pulse rounded-lg lg:h-11 h-10"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
