import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import ShopRating from "../shop/generic/rating";
import Link from "next/link";

export default function WidgetProductCard({
  spacial = false,
  color = "transparent",
  hasBorder = true,
  product,
}: {
  spacial?: boolean;
  color?: "transparent" | "white";
  hasBorder?: boolean;
  product: {
    id:string;
    img: string;
    name: string;
    rate: {
      users:number,
      rate:number
    };
    discount?: number;
    price: number;
    realPrice: number;
  };
}) {
  return (
    <Card
      as={spacial ? "div" : Link}
      href={spacial ? undefined : "/product"}
      color={color}
      className="relative"
      hasBorder={hasBorder}
    >
      {
        product?.discount&&
      <Chip
        color={spacial ? "primary" : "secondary"}
        className="!absolute lg:top-4 top-3 lg:start-4 start-3 z-10"
      >
        {product.discount}%
      </Chip>
      }
      {spacial ? (
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.img}
            width={200}
            height={200}
            className="w-full lg:h-[180px] h-[150px] object-scale-down object-center mb-3"
            alt="product"
          />
        </Link>
      ) : (
        <Image
          src={product.img}
          width={200}
          height={200}
          className="w-full lg:h-[180px] h-[150px] object-scale-down object-center mb-3"
          alt="product"
        />
      )}
      <Heading
        as={spacial ? Link : "h3"}
        href={spacial ? `/products/${product.id}` : undefined}
        variant="h6"
        className="mb-2 line-clamp-1 h-5"
      >
        {
          product.name
        }
      </Heading>
      <ShopRating disabled className="mb-2" productRate={product.rate.rate} users={product.rate.users} />
      <div className="flex items-center">
        <Price>{product.price}</Price>
        <Text as="del" size="xs" className="ms-2">
          {product.realPrice}
        </Text>
        {spacial && (
          <Btn
            size="xs"
            square
            variant="outline"
            icon="icon-basket1"
            className="ms-auto"
          />
        )}
      </div>
    </Card>
  );
}
