export default function LoadingAddressCard() {
  return (
    <div className="border border-loading animate-pulse rounded-lg flex lg:p-4 p-3 mb-3 last:mb-0">
      <div className="me-3 bg-loading animate-pulse w-22 h-25 rounded-lg" />
      <div className="grow">
        <div className="mb-3 h-3 w-20 bg-loading rounded-full animate-pulse"></div>
        <div className="mb-2 h-3 w-20 bg-loading rounded-full animate-pulse"></div>
        <div className="mb-2 h-3 w-full bg-loading rounded-full animate-pulse"></div>
        <div className="mb-2 h-3 w-20 bg-loading rounded-full animate-pulse"></div>
        <div className="h-3 w-20 bg-loading rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
