import Card from "@/components/generic/card";

export default function LoadingArticleCard() {
  return (
    <Card hasBorder color="transparent" className="!p-0">
      <div className="w-full lg:h-[180px] h-[150px] rounded-lg bg-loading animate-pulse rounded-bl-none" />
      <div className="bg-white group-hover:bg-neutral-lighter transition-all w-fit rounded-xl z-10 relative py-1.5 px-3 -mt-3">
        <div className="h-7 w-14 bg-loading rounded-lg"></div>
      </div>
      <div className="p-3 pt-1">
        <div className="mb-2 h-3 bg-loading animate-pulse rounded-full"></div>
        <div className="mb-3 h-3 bg-loading animate-pulse rounded-full"></div>
        <div className="mb-2 h-2 bg-loading animate-pulse rounded-full"></div>
        <div className="mb-3 h-2 bg-loading animate-pulse rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="mb-3 h-3 w-20 bg-loading animate-pulse rounded-full"></div>
          <div className="mb-3 h-3 w-20 bg-loading animate-pulse rounded-full"></div>
        </div>
      </div>
    </Card>
  );
}
