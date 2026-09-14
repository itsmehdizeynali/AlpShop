import HeaderSection from "@/components/generic/headerSection";
import Image from "next/image";

export default function ShopAboutGroupIntro() {
  return (
    <div className="container mb-section">
      <HeaderSection size="h3" className="mb-sm-section" shape>
        Alp Shop gGroup
      </HeaderSection>
      <div className="grid h-160 gap-1">
        <div className="relative overflow-hidden col-start-1 col-end-3 row-start-1 row-end-3">
          <Image
            src="/img/category-1.jpg"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full hover:scale-110 transition-all"
            alt="group"
          ></Image>
        </div>
        <div className="relative overflow-hidden col-start-1 col-end-5 row-start-3 row-end-4">
          <Image
            src="/img/category-1.jpg"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full hover:scale-110 transition-all"
            alt="group"
          ></Image>
        </div>
        <div className="relative overflow-hidden col-start-3 col-end-4 row-start-1 row-end-2">
          <Image
            src="/img/category-1.jpg"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full hover:scale-110 transition-all"
            alt="group"
          ></Image>
        </div>
        <div className="relative overflow-hidden col-start-3 col-end-4 row-start-2 row-end-3">
          <Image
            src="/img/category-1.jpg"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full hover:scale-110 transition-all"
            alt="group"
          ></Image>
        </div>
        <div className="relative overflow-hidden col-start-4 col-end-5 row-start-1 row-end-3">
          <Image
            src="/img/category-1.jpg"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full hover:scale-110 transition-all"
            alt="group"
          ></Image>
        </div>
      </div>
    </div>
  );
}
