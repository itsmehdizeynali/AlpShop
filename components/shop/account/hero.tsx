import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import Image from "next/image";
import type { HeroPropsType } from "./types";

export default function ShopAccountHero({
  name,
  isLoading,
}: HeroPropsType) {
  return (
    <Card
      color="gradient-primary"
      className="lg:p-6 p-4 mb-sm-section flex sm:items-center max-sm:flex-col rounded-xl"
    >
      <div className="sm:max-w-100 sm:pe-6">
        <Text color="white" className="mb-1.5">
          welcome Back
        </Text>
        <Heading
          color="white"
          className="lg:mb-3 mb-2 capitalize flex items-center"
        >
          Hello,{" "}
          {isLoading ? <div className="bg-loading rounded-full animate-pulse w-20 h-2.5 mx-2"></div> : name}!
        </Heading>
        <Text color="white" weight="light" className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          maiores.
        </Text>
      </div>
      <Image
        src="/img/welcome-account.png"
        width={230}
        height={155}
        alt="products"
        className="max-sm:hidden lg:-my-6 -my-4 ms-auto max-lg:w-[200px] py-4"
      />
    </Card>
  );
}
