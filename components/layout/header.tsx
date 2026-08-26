"use client";

import Link from "next/link";
import Btn from "../generic/btn";
import Input from "../generic/input";
import Logo from "../generic/logo";
import Text from "../generic/text";

export default function LayoutHeader() {
  return (
    <header>
      <div className="border-b border-neutral-light">
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
                info@shopik.com
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
      <div className="container py-sm-section flex items-center">
        <Logo className="me-auto" />
        <form className="me-auto flex">
          <Input
            wrapClasses=""
            className="!w-[350px]"
            placeholder="Search for tech products . . ."
            endSide={
              <Btn
                size="lg"
                color="transparent"
                className="rounded-s-none rounded-e-md"
                square
                icon="icon-search-svgrepo-com-2"
              ></Btn>
            }
          />
        </form>
        <ul className="flex items-center">
          <li className="me-3 last:me-0">
            <Btn
              className="after:content-['4'] after:leading-none after:absolute after:top-0 after:-translate-y-1/2 after:end-0 after:translate-x-1/2 after:w-5 after:h-5 after:text-xs after:text-white after:bg-primary-dark after:rounded-full after:flex after:items-center after:justify-center"
              href="/backet"
              size="lg"
              as={Link}
              color="primary"
              variant="lightness"
              icon="icon-bag"
              square
            />
          </li>
          <li className="me-3 last:me-0">
            <Btn
              href="/heart"
              size="lg"
              as={Link}
              color="primary"
              variant="lightness"
              icon="icon-heart1"
              square
            />
          </li>
        </ul>
      </div>
      <div className="bg-primary">
        <div className="container">
          <div className="overflow-hidden">
            <ul className="flex items-center overflow-x-auto py-4 -mx-8 hide-scrollbar">
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  All Categories
                </Text>
              </li>
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  Electronics
                </Text>
              </li>
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  Beauty
                </Text>
              </li>
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  Fashion
                </Text>
              </li>
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  Tools
                </Text>
              </li>
              <li className="border-e border-e-white/20 last:border-0">
                <Text
                  as={Link}
                  size="base"
                  color="primary-light"
                  href="/"
                  className="hover:text-white py-1 px-8 text-nowrap"
                >
                  Deals
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
