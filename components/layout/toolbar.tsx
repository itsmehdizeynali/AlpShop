"use client";

import Link from "next/link";

export default function LayoutToolbar() {

  const items=[
    {
      name:"",
      icon:"",
      href:""
    }
  ]

  return (
    <div className="bg-white shadow-card fixed bottom-0 right-0 z-30 w-full lg:hidden">
      <ul className="container max-sm:!px-0 flex">
        <li className="w-1/5">
          <Link href="/" className="w-full flex flex-col items-center justify-center text-xs h-[60px]">
            <i className="icon-home text-md mb-1.5"></i>
            home
          </Link>
        </li>
        <li className="w-1/5">
          <Link href="/" className="w-full flex flex-col items-center justify-center text-xs h-[60px]">
            <i className="icon-burger-menu text-md mb-1.5"></i>
            categories
          </Link>
        </li>
        <li className="w-1/5">
          <Link href="/" className="w-full flex flex-col items-center justify-center text-xs h-[60px]">
          <div className="w-10 h-10 flex items-center justify-center -mt-6 bg-primary text-white rounded-full mb-2">
            <i className="icon-basket1 text-sm"></i>
          </div>
            basket
          </Link>
        </li>
        <li className="w-1/5">
          <Link href="/" className="w-full flex flex-col items-center justify-center text-xs h-[60px]">
            <i className="icon-bag text-md mb-1.5"></i>
            shop
          </Link>
        </li>
        <li className="w-1/5">
          <Link href="/" className="w-full flex flex-col items-center justify-center text-xs h-[60px]">
            <i className="icon-avatar2 text-md mb-1.5"></i>
            user
          </Link>
        </li>
      </ul>
    </div>
  );
}
