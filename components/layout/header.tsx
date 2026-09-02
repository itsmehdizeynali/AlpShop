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

export default function LayoutHeader() {
  const route = usePathname();

  const {links}=dataLayoutHeader()
  
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <LayoutHeaderCategoryModal isOpenModal={showModal} closeModal={()=>setShowModal(false)} />
      <header className="max-lg:shadow-card">
        <div className="border-b border-neutral-light max-lg:hidden">
          <div className="container">
            <ul className="flex -mx-5">
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="tel:+99101040"
                  className="flex items-center text-base font-light py-5 px-5"
                >
                  <i className="icon-telephone me-4 text-primary text-2xl font-medium"></i>
                  <b className="me-1.5 font-bold">Phone</b>
                  +98 10 10 40
                </Link>
              </li>
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="email:info@alpshop.com"
                  className="flex items-center text-base font-light py-5 px-5"
                >
                  <i className="icon-email me-4 text-primary text-2xl font-medium"></i>
                  <b className="me-1.5 font-bold">Email</b>
                  info@alpShop.com
                </Link>
              </li>
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="email:info@alpshop.com"
                  className="flex items-center text-base font-bold text-primary py-5 px-5"
                >
                  <i className="icon-avatar2 me-4 text-2xl font-medium"></i>
                  Register Now
                </Link>
              </li>
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0">
                <Link
                  href="email:info@alpshop.com"
                  className="flex items-center text-base font-bold text-primary py-5 px-5"
                >
                  <i className="icon-padlock me-4 text-2xl font-medium"></i>
                  Login
                </Link>
              </li>
              <li className="border-e border-neutral-light even:border-0 nth-[2]:me-auto last:border-0 hidden">
                <Link
                  href="email:info@alpshop.com"
                  className="flex items-center text-base font-bold text-primary py-5 px-5"
                >
                  <i className="icon-avatar2 me-4 text-2xl font-medium"></i>
                  profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container py-sm-section flex flex-wrap items-center">
          <Logo className="me-auto" />
          <LayoutSearchBox />
          <ul className="flex items-center gap-3">
            <li className="max-lg:hidden">
              <Btn
                className="after:content-['4'] after:leading-none after:absolute after:top-0 after:-translate-y-1/2 after:end-0 after:translate-x-1/2 after:w-5 after:h-5 after:text-xs after:text-white after:bg-primary-dark after:rounded-full after:flex after:items-center after:justify-center"
                href="/backet"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-bag"
                square
              />
            </li>
            <li className="max-lg:hidden">
              <Btn
                href="/heart"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-heart1"
                square
              />
            </li>
            <li className="lg:hidden">
              <Btn
                href="/call"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-telephone"
                square
              />
            </li>
            <li className="lg:hidden">
              <Btn
                href="/auth/login"
                as={Link}
                color="primary"
                variant="lightness"
                icon="icon-add-user"
                square
              />
            </li>
          </ul>
        </div>
        <div className="max-lg:py-4 max-lg:hidden">
          <div className="container">
            <div className="flex items-center border-b border-b-neutral-light !overflow-visible">
              <Btn
                onClick={() => setShowModal(!showModal)}
                className="me-8"
                icon="icon-burger-menu"
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
