import Countdown from "@/components/generic/countdown";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import Image from "next/image";

export default function ShopDealsHero() {
  return (
    <div className="container my-sm-section">
      <div className="lg:p-6 p-4 bg-gradient-primary flex max-sm:flex-col rounded-xl sm:items-end">
        <div className="sm:pe-6">
          <Heading color="white" className="mb-3">
            Deals Products
          </Heading>
          <Text color="white" weight="light" className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ullam
            a vel molestias quas totam earum asperiores enim consequuntur, modi
            ab atque mollitia, placeat voluptatem eligendi! Fugiat veniam
            inventore alias.
          </Text>
          <Heading variant="h5" color="white" className="mb-1.5">
            Time To End
          </Heading>
          <Countdown color="primary-light" endDate="2026-11-10T23:59:59" />
        </div>
        <Image
          src="/img/img-1-removebg-preview.png"
          width={230}
          height={155}
          alt="products"
          className="sm:ms-auto max-sm:mx-auto max-sm:order-first max-lg:w-[200px] max-sm:mb-2"
        />
      </div>
    </div>
  );
}
