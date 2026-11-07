import Card from "@/components/generic/card";

export default function LoadingBlogSingle() {
  return (
    <>
      <Card hasBorder color="transparent" className="w-full mb-sm-section">
        <div className="mb-4 h-6 rounded-lg animate-pulse bg-loading w-50"></div>
        <ul className="mb-4 lg:gap-3 gap-2 flex flex-wrap">
          <div className="h-9 rounded-lg animate-pulse bg-loading w-50"></div>
          <div className="h-9 rounded-lg animate-pulse bg-loading w-50"></div>
          <div className="h-9 rounded-lg animate-pulse bg-loading w-50"></div>
        </ul>
        <div className="w-full bg-loading animate-pulse rounded-lg mb-4 h-100" />
        <div className="h-2 bg-loading animate-pulse rounded-full mb-2"></div>
        <div className="h-2 bg-loading animate-pulse rounded-full mb-3"></div>
        <div className="h-5 w-1/2 bg-loading animate-pulse rounded-full mb-3"></div>
        <div className="h-2 bg-loading animate-pulse rounded-full mb-2"></div>
        <div className="h-2 bg-loading animate-pulse rounded-full mb-4"></div>
      </Card>
      <Card hasBorder color="transparent" className="w-full mb-sm-section">
        <div className="border-s-4 border-s-loading animate-pulse ps-4 py-1 mb-4">
          <div className="h-6 w-40 rounded-full bg-loading animate-pulse"></div>
        </div>
        <ul className=" flex flex-wrap gap-2">
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
          <li className="h-8 w-20 bg-loading animate-pulse rounded-lg"></li>
        </ul>
      </Card>
      <Card hasBorder color="transparent" className="w-full mb-sm-section">
        <div className="border-s-4 border-s-loading animate-pulse ps-4 py-1 mb-4">
          <div className="h-6 w-40 rounded-full bg-loading animate-pulse"></div>
        </div>
        <div>
          <div className="flex flex-wrap items-center mb-2 lg:gap-3 gap-2">
            <div className="rounded-full w-12 h-12 bg-loading animate-pulse"></div>
            <div className="w-25 h-5 rounded-full animate-pulse bg-loading"></div>
            <div className="flex items-center ms-auto">
              <div className="w-15 h-3 rounded-full animate-pulse bg-loading me-3"></div>
              <div className="w-15 h-3 rounded-full animate-pulse bg-loading"></div>
            </div>
          </div>
          <div className="h-2 bg-loading animate-pulse rounded-full mb-2"></div>
          <div className="h-2 bg-loading animate-pulse rounded-full"></div>
        </div>
      </Card>
    </>
  );
}
