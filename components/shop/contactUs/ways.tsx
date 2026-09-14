"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import Link from "next/link";

export default function ShopContactUsWays() {
  return (
    <div className="container my-section">
      <Card hasBorder color="transparent">
        <HeaderSection size="h3" className="mb-sm-section" shape>
          Contact Ways
        </HeaderSection>
        <div className="flex flex-wrap lg:-m-2 -m-1">
          <div className="xl:w-1/2 w-full lg:p-2 p-1">
            <Card
              hasBorder
              color="transparent"
              className="flex items-center !p-3 h-full"
            >
              <div className="w-12 h-12 me-2.5 shrink-0 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <i className="icon-chart text-xl"></i>
              </div>
              <div>
                <Heading variant="h5" className="mb-0.5">
                  Address
                </Heading>
                <Text color="dim">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime
                </Text>
              </div>
            </Card>
          </div>
          <div className="xl:w-1/4 sm:w-1/2 w-full lg:p-2 p-1">
            <Card
              as={Link}
              href="tel:+999999999999"
              hasBorder
              hasHover
              color="transparent"
              className="flex items-center !p-3 h-full"
            >
              <div className="w-12 h-12 me-2.5 shrink-0 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <i className="icon-chart text-xl"></i>
              </div>
              <div>
                <Heading variant="h5" className="mb-0.5">
                  Phone Number
                </Heading>
                <Text color="dim">+99 999 999 9999</Text>
              </div>
            </Card>
          </div>
          <div className="xl:w-1/4 sm:w-1/2 w-full lg:p-2 p-1">
            <Card
              as={Link}
              href="info@alpShop.com"
              hasBorder
              hasHover
              color="transparent"
              className="flex items-center !p-3 h-full"
            >
              <div className="w-12 h-12 me-2.5 shrink-0 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <i className="icon-chart text-xl"></i>
              </div>
              <div>
                <Heading variant="h5" className="mb-0.5">
                  Email
                </Heading>
                <Text color="dim">info@alpShop.com</Text>
              </div>
            </Card>
          </div>
          <div className="sm:w-1/2 w-full lg:p-2 p-1">
            <Card
              hasBorder
              color="transparent"
              className="flex items-center !p-3 h-full"
            >
              <div className="w-12 h-12 me-2.5 shrink-0 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <i className="icon-chart text-xl"></i>
              </div>
              <div>
                <Heading variant="h5" className="mb-0.5">
                  Business Hours
                </Heading>
                <Text color="dim">Every day from 10 am to 8 pm</Text>
              </div>
            </Card>
          </div>
          <div className="sm:w-1/2 w-full lg:p-2 p-1">
            <Card
              hasBorder
              color="transparent"
              className="flex items-center !p-3 h-full flex-wrap gap-2.5"
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-primary-light text-primary rounded-lg">
                <i className="icon-chart text-xl"></i>
              </div>
              <Heading variant="h5" className="me-auto">
                Social Media
              </Heading>
              <div className="flex">
                <Btn
                  as={Link}
                  href="/"
                  className="me-1 last:me-0"
                  icon="icon-instagram"
                  size="sm"
                  color="black"
                  square
                  variant="lightness"
                />
                <Btn
                  as={Link}
                  href="/"
                  className="me-1 last:me-0"
                  icon="icon-twitter"
                  size="sm"
                  color="black"
                  square
                  variant="lightness"
                />
                <Btn
                  as={Link}
                  href="/"
                  className="me-1 last:me-0"
                  icon="icon-messenger"
                  size="sm"
                  color="black"
                  square
                  variant="lightness"
                />
                <Btn
                  as={Link}
                  href="/"
                  className="me-1 last:me-0"
                  icon="icon-send1"
                  size="sm"
                  color="black"
                  square
                  variant="lightness"
                />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
