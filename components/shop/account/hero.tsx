import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import Image from "next/image";

export default function ShopAccountHero() {
  return (
    <Card
      color="gradient-primary"
      className="lg:p-6 p-4 mb-sm-section flex max-sm:flex-col rounded-xl"
    >
      <div className="sm:max-w-100 sm:pe-6">
        <Text color="white" className="mb-1.5">
          welcome Back
        </Text>
        <Heading color="white" className="lg:mb-3 mb-2 capitalize">
          Hello, Mehdi!
        </Heading>
        <Text color="white" weight="light" className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          maiores.
        </Text>
      </div>
      <Image
        src="/img/img-1-removebg-preview.png"
        width={230}
        height={155}
        alt="products"
        className="max-sm:hidden lg:-my-6 -my-4 ms-auto max-lg:w-[200px] object-bottom object-cover"
      />
    </Card>
  );
}
