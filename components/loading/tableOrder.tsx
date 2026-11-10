import clsx from "clsx";
import type { LoadingTableOrderType } from "./types";

export default function LoadingTableOrder({ hasImg = false,className }:LoadingTableOrderType ) {
  return (
    <div className={clsx(className,"flex items-center justify-between")}>
      {hasImg && (
        <div className="animate-pulse w-16 h-16 bg-loading rounded-xl"></div>
      )}
      <div className="animate-pulse w-20 h-3 bg-loading rounded-full"></div>
      <div className="animate-pulse w-20 h-3 bg-loading rounded-full"></div>
      <div className="animate-pulse w-20 h-3 bg-loading rounded-full"></div>
      <div className="animate-pulse w-20 h-3 bg-loading rounded-full"></div>
      <div className="animate-pulse w-20 h-3 bg-loading rounded-full"></div>
    </div>
  );
}
