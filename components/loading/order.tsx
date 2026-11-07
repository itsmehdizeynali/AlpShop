import clsx from "clsx";

export default function LoadingOrder({ className="" }: { className?: string }) {
  return (
    <div className={clsx(className,"p-2 flex items-center bg-loading/20 animate-pulse rounded-lg")}>
      <div className="bg-loading animate-pulse w-14 h-14 rounded-lg me-3"></div>
      <div className="me-auto h-4 grow rounded-full bg-loading animate-pulse"></div>
    </div>
  );
}
