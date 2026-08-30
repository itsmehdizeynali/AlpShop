import Image from "next/image";
import Link from "next/link";

export default function ShopSectionsCategories() {
  return (
    <div className="container mb-section">
      <div className="-m-1.5 flex">
        <div className="w-1/4 p-1.5">
          <Link href="/" className="block">
            <Image
              alt="category"
              src="/img/category-1.jpg"
              width={600}
              height={400}
              className="w-full h-full rounded-lg max-h-[200px]"
            />
          </Link>
        </div>
        <div className="w-1/4 p-1.5">
          <Link href="/" className="block">
            <Image
              alt="category"
              src="/img/category-1.jpg"
              width={600}
              height={400}
              className="w-full h-full rounded-lg max-h-[200px]"
            />
          </Link>
        </div>
        <div className="w-1/4 p-1.5">
          <Link href="/" className="block">
            <Image
              alt="category"
              src="/img/category-1.jpg"
              width={600}
              height={400}
              className="w-full h-full rounded-lg max-h-[200px]"
            />
          </Link>
        </div>
        <div className="w-1/4 p-1.5">
          <Link href="/" className="block">
            <Image
              alt="category"
              src="/img/category-1.jpg"
              width={600}
              height={400}
              className="w-full h-full rounded-lg max-h-[200px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
