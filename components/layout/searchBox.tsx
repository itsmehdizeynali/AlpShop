"use client";

import { useEffect, useState } from "react";
import Btn from "../generic/btn";
import Card from "../generic/card";
import Input from "../generic/input";
import clsx from "clsx";
import Image from "next/image";
import Heading from "../generic/heading";
import Link from "next/link";
import Text from "../generic/text";
import Backdrop from "../generic/backdrop";

export default function LayoutSearchBox() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  useEffect(() => {
    console.log(showBackdrop);
  }, [showBackdrop]);
  return (
    <>
      <Backdrop isShow={showBackdrop} onClick={() => setShowBackdrop(false)} />
      <form
        className={clsx(
          "me-auto flex max-lg:order-last max-lg:w-full max-lg:mt-4 relative ",
          { "z-40": showBackdrop },
        )}
      >
        <Input
          wrapClasses="w-full bg-white"
          onClick={() => setShowBackdrop(true)}
          className="lg:!w-[350px] !w-full"
          placeholder="Search for tech products . . ."
          endSide={
            <Btn
              size="base"
              color="transparent"
              className="rounded-s-none rounded-e-md max-lg:!bg-primary max-lg:!text-white"
              square
              icon="icon-search-svgrepo-com-2"
            ></Btn>
          }
        />
        {showBackdrop && (
          <Card
            color="white"
            className={clsx(
              "absolute top-[calc(100%+8px)] !px-0 start-0 w-full max-h-[350px] hide-scrollbar overflow-y-auto opacity-0",
              { "opacity-100": showBackdrop },
            )}
          >
            <div className="mb-4">
              <Text
                color="dim-dark"
                as={Link}
                href="/"
                className="flex items-center py-2 px-4 hover:bg-neutral-lighter transition-all"
              >
                <i className="icon-search-svgrepo-com-2 text-xl me-2"></i>
                smart watch series B
              </Text>
              <Text
                color="dim-dark"
                as={Link}
                href="/"
                className="flex items-center py-2 px-4 hover:bg-neutral-lighter transition-all"
              >
                <i className="icon-search-svgrepo-com-2 text-xl me-2"></i>
                smart watch series B
              </Text>
              <Text
                color="dim-dark"
                as={Link}
                href="/"
                className="flex items-center py-2 px-4 hover:bg-neutral-lighter transition-all"
              >
                <i className="icon-search-svgrepo-com-2 text-xl me-2"></i>
                smart watch series B
              </Text>
              <Text
                color="dim-dark"
                as={Link}
                href="/"
                className="flex items-center py-2 px-4 hover:bg-neutral-lighter transition-all"
              >
                <i className="icon-search-svgrepo-com-2 text-xl me-2"></i>
                smart watch series B
              </Text>
            </div>
            <div className="-my-1">
              <Link
                href="/"
                className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
              >
                <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <Heading
                    variant="h5"
                    weight="medium"
                    className="line-clamp-1 mb-1"
                  >
                    smart watch series B
                  </Heading>
                  <Text color="black" weight="bold" size="base">
                    45$
                  </Text>
                </div>
              </Link>
              <Link
                href="/"
                className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
              >
                <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <Heading
                    variant="h5"
                    weight="medium"
                    className="line-clamp-1 mb-1"
                  >
                    smart watch series B
                  </Heading>
                  <Text color="black" weight="bold" size="base">
                    45$
                  </Text>
                </div>
              </Link>
              <Link
                href="/"
                className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
              >
                <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <Heading
                    variant="h5"
                    weight="medium"
                    className="line-clamp-1 mb-1"
                  >
                    smart watch series B
                  </Heading>
                  <Text color="black" weight="bold" size="base">
                    45$
                  </Text>
                </div>
              </Link>
              <Link
                href="/"
                className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
              >
                <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <Heading
                    variant="h5"
                    weight="medium"
                    className="line-clamp-1 mb-1"
                  >
                    smart watch series B
                  </Heading>
                  <Text color="black" weight="bold" size="base">
                    45$
                  </Text>
                </div>
              </Link>
              <Link
                href="/"
                className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
              >
                <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                  <Image
                    src="/img/img-1-removebg-preview.png"
                    alt="product"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <Heading
                    variant="h5"
                    weight="medium"
                    className="line-clamp-1 mb-1"
                  >
                    smart watch series B
                  </Heading>
                  <Text color="black" weight="bold" size="base">
                    45$
                  </Text>
                </div>
              </Link>
            </div>
          </Card>
        )}
      </form>
    </>
  );
}
