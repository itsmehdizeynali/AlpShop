import Text from "@/components/generic/text";
import type { CategoryItemType } from "@/components/genericTypes";
import { getCategoriesService } from "@/services/generic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ShopDealsCategoryBar() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: ()=>getCategoriesService({}),
  });
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
        {!!data&&data.map((item: CategoryItemType, index: number) => (
          <Text
            as={Link}
            key={index}
            href={`?category=${item.slug}`}
            color="black"
            className="py-4 lg:px-6 px-4 flex items-center shrink-0 hover:bg-neutral-lighter transition-all"
          >
            <i className="icon-qr-code lg:text-md text-base me-2.5"></i>
            {item.name}
          </Text>
        ))}
      </div>
    </div>
  );
}
