"use client";

import LayoutFooter from "@/components/layout/footer";
import LayoutHeader from "@/components/layout/header";
import LayoutToolbar from "@/components/layout/toolbar";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const removeLayout = path.startsWith("/products/");

  return (
    <>
      <LayoutToolbar className={clsx({ "max-lg:hidden": removeLayout })} />
      <LayoutHeader className={clsx({ "max-lg:hidden": removeLayout })} />
      {children}
      <LayoutFooter/>
    </>
  );
}
