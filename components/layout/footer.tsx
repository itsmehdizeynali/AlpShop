import Link from "next/link";
import Btn from "../generic/btn";
import Heading from "../generic/heading";
import Logo from "../generic/logo";
import Text from "../generic/text";
import clsx from "clsx";
import type { FooterPropsType } from "./types";

export default function LayoutFooter({ className = "" }: FooterPropsType) {
  return (
    <footer className={clsx(className, "py-section bg-neutral-lighter")}>
      <div className="container">
        <div className="lg:-m-6 -m-3 flex max-lg:flex-wrap items-start justify-between">
          <div className="lg:w-[300px] shrink-0 w-full lg:p-6 p-3">
            <Logo className="mb-4" size="sm" />
            <Text color="dim-dark" className="text-justify mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              itaque totam cum rem voluptatum neque dolorum! Dolorum rerum
            </Text>
            <ul className="flex items-center">
              <li className="me-1.5 last:me-0">
                <Btn
                  icon="icon-instagram"
                  size="sm"
                  square
                  rounded
                  color="black"
                  variant="lightness"
                />
              </li>
              <li className="me-1.5 last:me-0">
                <Btn
                  icon="icon-twitter"
                  size="sm"
                  square
                  rounded
                  color="black"
                  variant="lightness"
                />
              </li>
              <li className="me-1.5 last:me-0">
                <Btn
                  icon="icon-send1"
                  size="sm"
                  square
                  rounded
                  color="black"
                  variant="lightness"
                />
              </li>
              <li className="me-1.5 last:me-0">
                <Btn
                  icon="icon-messenger"
                  size="sm"
                  square
                  rounded
                  color="black"
                  variant="lightness"
                />
              </li>
            </ul>
          </div>
          <div className="lg:grow max-lg:w-full lg:p-6 p-3">
            <Heading variant="h4" className="mb-3">
              Links
            </Heading>
            <ul className="flex flex-wrap items-center -m-1">
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/about"
                  className="block hover:text-primary p-1"
                >
                  About Us
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/contactUs"
                  className="block hover:text-primary p-1"
                >
                  Contact Us
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2 max-sm:order-last">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/products?category=electronics"
                  className="block hover:text-primary p-1"
                >
                  Electronics
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/account"
                  className="block hover:text-primary p-1"
                >
                  My Acount
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/faq"
                  className="block hover:text-primary p-1"
                >
                  FAQs
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2 max-sm:order-last">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/products?category=BeautyAndPersonalCare"
                  className="block hover:text-primary p-1"
                >
                  Beauty & Personal Care
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/shippingAndDelivery"
                  className="block hover:text-primary p-1"
                >
                  Shipping & Delivery
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/blog"
                  className="block hover:text-primary p-1"
                >
                  Blog
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2 max-sm:order-last">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/products?category=FashionAndClothing"
                  className="block hover:text-primary p-1"
                >
                  Fashion & Clothing
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/products"
                  className="block hover:text-primary p-1"
                >
                  Shop
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/termsAndConditions"
                  className="block hover:text-primary p-1"
                >
                  Terms And Conditions
                </Text>
              </li>
              <li className="sm:w-1/3 w-1/2">
                <Text
                  as={Link}
                  color="dim-dark"
                  href="/products?category=ToolsAndHardware"
                  className="block hover:text-primary p-1"
                >
                  Tools & Hardware
                </Text>
              </li>
            </ul>
          </div>
          <div className="lg:w-[200px] w-full lg:p-6 p-3 shrink-0">
            <Heading variant="h4" className="mb-3">
              Contact Us
            </Heading>
            <ul>
              <li className="mb-3 last:mb-0 ">
                <Text
                  as={Link}
                  href="info@alpShop.com"
                  color="dim-dark"
                  className="block hover:text-primary"
                >
                  info@alpShop.com
                </Text>
              </li>
              <li className="mb-3 last:mb-0 ">
                <Text
                  as={Link}
                  href="tel:+999999999"
                  color="dim-dark"
                  className="block hover:text-primary"
                >
                  +99 999 9999
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
