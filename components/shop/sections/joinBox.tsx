import Btn from "@/components/generic/btn";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import Text from "@/components/generic/text";
import Image from "next/image";

export default function ShopSectionsJoinBox() {
  return (
    <div className="container mb-section max-sm:!px-0">
      <div className="sm:rounded-xl flex overflow-hidden">
        <div className="md:w-100 w-full shrink-0 bg-primary lg:p-6 p-4 flex flex-col justify-center z-10">
          <div className="flex items-center mb-4">
            <i className="icon-bag lg:text-10xl text-6xl text-white me-4"></i>
            <Heading color="white" weight="medium">
              Join ALP SHOP & Get
              <br />
              10% Off Your First Order!
            </Heading>
          </div>
          <Text color="white" className="mb-4">
            Be the first to know about archivals exchived promioums, and spacial
            products
          </Text>
          <Input
            wrapClasses="p-1 bg-white ps-0"
            placeholder="Enter Your Email Address"
            className="border-0"
            color="white"
            endSide={<Btn>subscribe</Btn>}
          />
        </div>
        <div className="w-full relative max-md:hidden">
          <div className="w-28 h-full absolute top-0 -start-16 skew-x-12 bg-primary"></div>
          <Image
            src="/img/shopping.jfif"
            width={1000}
            height={200}
            className="w-full object-cover lg:h-[250px] h-[225px]"
            alt="shopping"
          />
        </div>
      </div>
    </div>
  );
}
