"use client";

import Link from "next/link";
import LayoutHeaderCategoryModal from "./categoryModal";
import { useState } from "react";
import type { ToolbarPropsType } from "./types";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function LayoutToolbar({ className = "" }: ToolbarPropsType) {
  const [showModal, setShowModal] = useState(false);
  const pathName=usePathname()
  return (
    <>
      <LayoutHeaderCategoryModal
        isOpenModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <div
        className={clsx(
          className,
          "max-w-90 px-4 w-full z-30 lg:hidden fixed bottom-2 right-1/2 translate-x-1/2",
        )}
      >
        <div className="w-full p-1 bg-white shadow-lighter-alpha backdrop-blur-2xl rounded-full">
          <ul className="mx-auto flex items-center gap-1">
            <li className="w-1/5">
              <Link
                href="/"
                className={clsx("flex items-center justify-center h-11 bg-neutral-light/40 rounded-full transition-all",{"bg-primary text-white":pathName==="/"})}
              >
                <i className="icon-home text-md"></i>
              </Link>
            </li>
            <li className="w-1/5">
              <div
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center h-11 bg-neutral-light/40 rounded-full transition-all"
              >
                <i className="icon-layout text-md"></i>
              </div>
            </li>
            <li className="w-1/5">
              <Link
                href="/cart"
                className={clsx("flex items-center justify-center h-11 bg-neutral-light/40 rounded-full transition-all",{"bg-primary text-white":pathName==="/cart"})}
              >
                <i className="icon-basket1 text-md"></i>
              </Link>
            </li>
            <li className="w-1/5">
              <Link
                href="/products"
                className={clsx("flex items-center justify-center h-11 bg-neutral-light/40 rounded-full transition-all",{"bg-primary text-white":pathName==="/products"})}
              >
                <i className="icon-bag text-md"></i>
              </Link>
            </li>
            <li className="w-1/5">
              <Link
                href="/account"
                className={clsx("flex items-center justify-center h-11 bg-neutral-light/40 rounded-full transition-all",{"bg-primary text-white":pathName==="/account"})}
              >
                <i className="icon-avatar2 text-md"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
