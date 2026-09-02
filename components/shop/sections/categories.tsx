import dataShopIndex from "@/mockData/shop";
import Image from "next/image";
import Link from "next/link";

export default function ShopSectionsCategories() {
  const { categories } = dataShopIndex();
  return (
    <div className="container mb-section">
      <div className="lg:-m-1.5 -m-1 flex flex-wrap">
        {categories.map((item, index) => (
          <div key={index} className="lg:w-1/4 w-1/2 lg:p-1.5 p-1">
            <Link href={item.href} className="block">
              <Image
                alt={item.alt}
                src={item.src}
                width={600}
                height={400}
                className="w-full h-full rounded-lg max-h-[200px]"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
