import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import ShopRating from "../shop/generic/rating";
import Link from "next/link";
import clsx from "clsx";

export default function WidgetProductCard({
  spacial = false,
  color = "transparent",
  hasBorder = true,
  product,
  responsive = false,
}: {
  spacial?: boolean;
  color?: "transparent" | "white";
  hasBorder?: boolean;
  responsive?: boolean;
  product: {
    id: string;
    img: string;
    name: string;
    rate: {
      users: number;
      rate: number;
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
      className={clsx(
        { "max-sm:flex-row": responsive },
        "relative flex flex-col h-full",
      )}
      hasBorder={hasBorder}
    >
      {product?.discount && (
        <Chip
          color={spacial ? "primary" : "secondary"}
          className={clsx(
            { "max-sm:hidden": responsive },
            "!absolute lg:top-4 top-3 lg:start-4 start-3 z-10",
          )}
        >
          {product.discount}%
        </Chip>
      )}
      {spacial ? (
        <Link href={`/products/${product.id}`} className={clsx("block mb-3",{"max-sm:mb-0 max-sm:me-2": responsive})}>
          <Image
            src={product.img}
            width={180}
            height={180}
            className={clsx(
              "w-full lg:h-[180px] h-[150px] object-scale-down object-center",
              {
                "max-sm:!w-20 max-sm:!h-20": responsive,
              },
            )}
            alt="product"
          />
        </Link>
      ) : (
        <Image
          src={product.img}
          width={180}
          height={180}
          className={clsx(
            "w-full lg:h-[180px] h-[150px] object-scale-down object-center mb-3",
            {
              "max-sm:!w-20 max-sm:!h-20 max-sm:mb-0 max-sm:me-2": responsive,
            },
          )}
          alt="product"
        />
      )}
      <div className="flex flex-col grow justify-between">
        <Heading
          as={spacial ? Link : "h3"}
          href={spacial ? `/products/${product.id}` : undefined}
          variant="h6"
          className="mb-2.5 !line-clamp-2"
        >
          {product.name}
        </Heading>
        <div>
          <ShopRating
            disabled
            className="lg:mb-2 mb-1"
            productRate={product.rate.rate}
            users={product.rate.users}
          />
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
        </div>
      </div>
    </Card>
  );
}
