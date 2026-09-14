import Text from "@/components/generic/text";
import dataShopPages from "@/mockData/shop/pages";
import Link from "next/link";


export default function ShopDealsCategoryBar(){
    const { dealsCategories } = dataShopPages();
    return(
        <div className="container mb-sm-section">
        <div className="flex items-center hide-scrollbar overflow-x-auto border border-t-0 border-neutral-light rounded-lg">
          {dealsCategories.map((item, index) => (
            <Text
              as={Link}
              key={index}
              href={`?category=${item.category}`}
              color="black"
              className="py-4 lg:px-6 px-4 flex items-center shrink-0 hover:bg-neutral-lighter transition-all"
            >
              <i className="icon-qr-code lg:text-md text-base me-2.5"></i>
              {item.name}
            </Text>
          ))}
        </div>
      </div>
    )
}