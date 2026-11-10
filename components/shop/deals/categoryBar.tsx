import Text from "@/components/generic/text";
import dataShopPages from "@/mockData/shop/pages";
import clsx from "clsx";
import Link from "next/link";

export default function ShopDealsCategoryBar() {
  const { dealsCategories:categories } = dataShopPages({})

  
  return (
    <div className="container mb-sm-section">
      <div className="flex items-center hide-scrollbar overflow-x-auto border border-t-0 border-neutral-light rounded-lg">
        <Text
          as={Link}
          href={"/deals"}
          color="black"
          className="py-4 lg:px-6 px-4 shrink-0 hover:bg-neutral-lighter transition-all"
        >
          All
        </Text>
        {categories.map((item, index: number) => (
          <Text
            as={Link}
            key={index}
            href={`?category=${item.slug}`}
            color="black"
            className="py-4 lg:px-6 px-4 flex items-center shrink-0 hover:bg-neutral-lighter transition-all"
          >
            <i className={clsx(item.icon,"lg:text-md text-base me-2.5")}></i>
            {item.name}
          </Text>
        ))}
      </div>
    </div>
  );
}
