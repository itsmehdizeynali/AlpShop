"use client";

import { useEffect, useMemo, useState, type SubmitEvent } from "react";
import Btn from "../generic/btn";
import Card from "../generic/card";
import Input from "../generic/input";
import clsx from "clsx";
import Image from "next/image";
import Heading from "../generic/heading";
import Link from "next/link";
import Text from "../generic/text";
import Backdrop from "../generic/backdrop";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchService } from "@/services/generic";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProductType } from "../genericTypes";

export default function LayoutSearchBox() {
  const route = useRouter();
  const params = useSearchParams();
  const searchParam = params.get("search") || undefined;
  const [search, setSearch] = useState<string>(searchParam || "");
  const { data, isLoading } = useQuery({
    queryKey: ["products_search",search],
    queryFn: () => searchService(search),
  });

  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    setSearch(searchParam || "");
  }, [searchParam]);

  const handelSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowBackdrop(false);
    route.push(`/products?search=${search}`);
  };

  return (
    <>
      <Backdrop
        isShow={showBackdrop}
        onClick={() => {
          setShowBackdrop(false);
          setSearch(searchParam || "");
        }}
      />
      <form
        className={clsx(
          "me-auto flex max-lg:order-last max-lg:w-full max-lg:mt-4 relative ",
          { "z-40": showBackdrop },
        )}
        onSubmit={handelSubmit}
      >
        <Input
          hasFocus={false}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              as={Link}
              href={`/products?search=${search}`}
              disabled={search === ""}
              type="submit"
              onClick={()=>setShowBackdrop(false)}
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
            {/* DATA */}
            {!isLoading && !!data?.titles.length && (
              <div className="mb-4">
                {data.titles.map((item: string, index: number) => (
                  <Text
                    onClick={() => setShowBackdrop(false)}
                    key={index}
                    color="dim-dark"
                    as={Link}
                    href={`/products?search=${item}`}
                    className="flex items-center py-2 px-4 hover:bg-neutral-lighter transition-all"
                  >
                    <i className="icon-search-svgrepo-com-2 text-xl me-2"></i>
                    {item}
                  </Text>
                ))}
              </div>
            )}
            {!isLoading && !!data?.products.length && (
              <div className="-my-1">
                {data.products.map((item: ProductType, index: number) => (
                  <Link
                    onClick={() => {
                      setShowBackdrop(false);
                      setSearch("")
                    }}
                    key={index}
                    href={`/products/${item.slug}`}
                    className="flex items-start py-1 px-4 hover:bg-neutral-lighter transition-all"
                  >
                    <div className="bg-neutral-lighter w-14 h-14 p-1 rounded-lg flex items-center justify-center me-3">
                      <Image
                        src={`${item.images[0].url}.png`}
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
                        {item.name}
                      </Heading>
                      <Text color="black" weight="bold" size="base">
                        {item.price}$
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* LOADING */}
            {isLoading && (
              <span className="my-2 w-5 h-5 border-[3px] border-solid border-r-primary border-b-primary border-primary/10 rounded-full block animate-spin m-auto"></span>
            )}

            {/* EMPTY-SEARCH-BOX */}
            {!search.length && (
              <Text className="text-center" color="dim" size="xs">
                Search for it
              </Text>
            )}

            {/* NO-DATA */}
            {!!search.length &&
              !data?.titles.length &&
              !data?.products.length && (
                <Text className="text-center" color="dim" size="xs">
                  No results found!
                </Text>
              )}
          </Card>
        )}
      </form>
    </>
  );
}
