export default function LoadingArticleRowCard() {
  return (
    <div className="flex items-center lg:py-2 py-1 px-4">
      <div className="lg:w-14 w-12 lg:h-14 h-12 rounded-lg me-3 shrink-0 bg-loading animate-pulse" />
      <div className="grow">
        <div className="mb-1 h-3 rounded-full bg-loading animate-pulse"></div>
        <div className="mb-2 h-3 rounded-full bg-loading animate-pulse"></div>
        <div className="w-20 h-2.5 rounded-full bg-loading animate-pulse"></div>
      </div>
    </div>
  );
}
