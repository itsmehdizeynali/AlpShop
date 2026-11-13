import dataShopIndex from "@/mockData/shop";
import Image from "next/image";
import Link from "next/link";

export default function ShopSectionsCategories() {
  const { categories } = dataShopIndex();
  return (
    <div className="container mb-section">
      <div className="lg:-m-1.5 -m-1 flex flex-wrap">
        {categories.map((item, index) => (
          <div key={index} className="md:w-1/4 w-1/2 lg:p-1.5 p-1">
            <Link href={item.href} className="block h-full">
              <Image
                alt={item.alt}
                src={item.src}
                width={1536}
                height={1024}
                className="w-full h-full rounded-lg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
