export default function LoadingSearchBox() {
  return (
    <div className="lg:-my-4 -my-3">
      <ul className="mb-6">
        <li className="my-4 mx-4 h-4 bg-loading animate-pulse rounded-full"></li>
        <li className="my-4 mx-4 h-4 bg-loading animate-pulse rounded-full"></li>
        <li className="my-4 mx-4 h-4 bg-loading animate-pulse rounded-full"></li>
        <li className="my-4 mx-4 h-4 bg-loading animate-pulse rounded-full"></li>
        <li className="my-4 mx-4 h-4 bg-loading animate-pulse rounded-full"></li>
      </ul>
      <ul className="mb-3">
        <li className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all">
          <div className="bg-loading animate-pulse w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3"></div>
          <div className="grow">
            <div className="h-4 w-full mb-4 bg-loading animate-pulse rounded-full"></div>
            <div className="h-4 w-20 bg-loading animate-pulse rounded-full"></div>
          </div>
        </li>
        <li className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all">
          <div className="bg-loading animate-pulse w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3"></div>
          <div className="grow">
            <div className="h-4 w-full mb-4 bg-loading animate-pulse rounded-full"></div>
            <div className="h-4 w-20 bg-loading animate-pulse rounded-full"></div>
          </div>
        </li>
        <li className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all">
          <div className="bg-loading animate-pulse w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3"></div>
          <div className="grow">
            <div className="h-4 w-full mb-4 bg-loading animate-pulse rounded-full"></div>
            <div className="h-4 w-20 bg-loading animate-pulse rounded-full"></div>
          </div>
        </li>
        <li className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all">
          <div className="bg-loading animate-pulse w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3"></div>
          <div className="grow">
            <div className="h-4 w-full mb-4 bg-loading animate-pulse rounded-full"></div>
            <div className="h-4 w-20 bg-loading animate-pulse rounded-full"></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
