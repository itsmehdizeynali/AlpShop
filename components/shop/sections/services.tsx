import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import dataShopIndex from "@/mockData/shop";
import clsx from "clsx";

export default function ShopSectionsServices() {
  const { services } = dataShopIndex();
  return (
    <div className="container mb-section">
      <div className="lg:-m-2 -m-1 flex flex-wrap">
        {services.map((item, index) => (
          <div key={index} className="lg:p-2 p-1 lg:w-1/4 sm:w-1/2 max-sm:grow max-sm:min-w-1/2">
            <div className="flex max-sm:flex-col max-sm:justify-center items-center bg-neutral-lighter lg:p-6 p-3.5 rounded-xl">
              <i className={clsx(item.icon,"text-6xl text-primary sm:me-4 max-sm:mb-2")}></i>
              <div>
                <Heading
                  color="black"
                  variant="h5"
                  className="max-sm:text-center"
                >
                  {item.title}
                </Heading>
                <Text>
                  {item.subTitle}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
