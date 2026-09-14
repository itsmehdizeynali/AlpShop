import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import dataShopPages from "@/mockData/shop/pages";
import Image from "next/image";

export default function ShopShippingAndDeliveryPage({}) {
  const {shippingAndDelivery }= dataShopPages()

  return (
    <div className="my-section">
      {[shippingAndDelivery, shippingAndDelivery, shippingAndDelivery].map(
        (item, index) => (
          <div
            key={index}
            className="container mb-sm-section group"
          >
            <div className="flex flex-wrap items-center group-even:md:flex-row-reverse lg:-m-8 -m-2">
              <div className="md:w-1/2 w-full lg:p-8 p-2">
                <Heading className="lg:mb-4 mb-3">{item.title}</Heading>
                <Text className="text-justify">{item.paragraph}</Text>
              </div>
              <div className="md:w-1/2 w-full lg:p-8 p-2 max-md:order-first">
                <Image
                  src={item.img}
                  alt="shopping"
                  width={500}
                  height={600}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
