import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import ShopRating from "./rating";
import Link from "next/link";

export default function ShopProductCard() {
  return (
    <Card color="transparent" className="relative" hasBorder>
      <Chip className="!absolute top-4 start-4 z-10">20%</Chip>
      <Link href="/" className="block">
        <Image
          src={"/img/product-1.jpg"}
          width={200}
          height={200}
          className="w-full h-[180px] object-scale-down object-center mb-3"
          alt="product"
        />
      </Link>
      <Heading as={Link} href="/" variant="h6" className="mb-2">
        Smart Watch Series B
      </Heading>
      <ShopRating className="mb-2" productRate={3.6} users={75} />
      <div className="flex items-center">
        <Price>44.55</Price>
        <Text as="del" size="xs" className="ms-2">
          $67.87
        </Text>
        <Btn
          size="xs"
          square
          variant="outline"
          icon="icon-basket1"
          className="ms-auto"
        />
      </div>
    </Card>
  );
}
