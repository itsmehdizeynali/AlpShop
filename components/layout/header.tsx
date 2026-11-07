"use client";

import Link from "next/link";
import Btn from "../generic/btn";
import Logo from "../generic/logo";
import Text from "../generic/text";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LayoutSearchBox from "./searchBox";
import { useState } from "react";
import LayoutHeaderCategoryModal from "./categoryModal";
import dataLayoutHeader from "@/mockData/layout/header";
import type { HeaderPropsType } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getLayoutDataService } from "@/services/generic";

export default function LayoutHeader({ className = "" }: HeaderPropsType) {
  const route = usePathname();

  const { links } = dataLayoutHeader();

  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["layout_data"],
    queryFn: getLayoutDataService,
  });
  return (
    <>
      <LayoutHeaderCategoryModal
        isOpenModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <header className={clsx(className, "max-lg:shadow-card")}>
        <div className="border-b border-neutral-light max-lg:hidden">
          <div className="container">
            <ul className="flex -mx-5">
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="tel:+99101040"
                  className="flex items-center text-base font-light py-5 px-5 hover:bg-neutral-lighter transition-all"
                >
                  <i className="icon-telephone me-4 text-primary text-2xl font-medium"></i>
                  <b className="me-1.5 font-bold">Phone</b>
                  +98 10 10 40
                </Link>
              </li>
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="info@alpShop.com"
                  className="flex items-center text-base font-light py-5 px-5 hover:bg-neutral-lighter transition-all"
                >
                  <i className="icon-email me-4 text-primary text-2xl font-medium"></i>
                  <b className="me-1.5 font-bold">Email</b>
                  info@alpShop.com
                </Link>
              </li>
              {!!data?.user ? (
                <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                  <Link
                    href="/account"
                    className="flex items-center text-base font-bold text-primary py-5 px-5 hover:bg-neutral-lighter transition-all"
                  >
                    <i className="icon-avatar2 me-4 text-2xl font-medium"></i>
                    profile
                  </Link>
                </li>
              ) : (
                <>
                  <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                    <Link
                      href="/auth/register"
                      className="flex items-center text-base font-bold text-primary py-5 px-5 hover:bg-neutral-lighter transition-all"
                    >
                      <i className="icon-avatar2 me-4 text-2xl font-medium"></i>
                      Register Now
                    </Link>
                  </li>
                  <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                    <Link
                      href="/auth/login"
                      className="flex items-center text-base font-bold text-primary py-5 px-5 hover:bg-neutral-lighter transition-all"
                    >
                      <i className="icon-padlock me-4 text-2xl font-medium"></i>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="container py-sm-section flex flex-wrap items-center">
          <Logo className="me-auto" />
          <LayoutSearchBox />
          <ul className="flex items-center gap-3">
            <li className="relative max-lg:hidden">
              <span className="leading-none absolute z-10 top-0 -translate-y-1/2 end-0 translate-x-1/2 w-5 h-5 text-xs text-white bg-primary-dark rounded-full flex items-center justify-center">
                {data?.cartCount}
              </span>
              <Btn
                href="/cart"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-bag"
                square
              />
            </li>
            <li className="relative max-lg:hidden">
              <span className="leading-none absolute z-10 top-0 -translate-y-1/2 end-0 translate-x-1/2 w-5 h-5 text-xs text-white bg-danger-dark rounded-full flex items-center justify-center">
                {data?.wishlistCount}
              </span>
              <Btn
                href="/wishlist"
                as={Link}
                color="danger"
                variant="lightness"
                icon="icon-heart1"
                square
              />
            </li>
            <li className="relative lg:hidden">
              <Btn
                href="/contactUs"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-telephone"
                square
              />
            </li>
            {!!data?.user ? (
              <li className="relative lg:hidden">
                <Btn
                  href="/account"
                  as={Link}
                  color="primary"
                  variant="lightness"
                  icon="icon-avatar"
                  square
                />
              </li>
            ) : (
              <li className="relative lg:hidden">
                <Btn
                  href="/auth/login"
                  as={Link}
                  color="primary"
                  variant="lightness"
                  icon="icon-add-user"
                  square
                />
              </li>
            )}
          </ul>
        </div>
        <div className="max-lg:py-4 max-lg:hidden">
          <div className="container">
            <div className="flex items-center border-b border-b-neutral-light !overflow-visible">
              <Btn
                onClick={() => setShowModal(!showModal)}
                className="me-8"
                icon="icon-layout"
              >
                categories
              </Btn>
              <ul className="flex items-center grow overflow-x-auto hide-scrollbar">
                {links.map((item, index) => (
                  <li key={index}>
                    <Text
                      as={Link}
                      size="base"
                      color="dim"
                      href={item.href}
                      className={clsx(
                        "py-4 px-6 text-nowrap block relative navbar-item-after",
                        { active: route === item.href },
                      )}
                    >
                      {item.title}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
