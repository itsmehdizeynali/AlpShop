import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import ShopRating from "../shop/generic/rating";
import Link from "next/link";
import clsx from "clsx";
import Counter from "../generic/counter";
import type { ProductRowCardPropsType } from "./types";

export default function WidgetProductRowCard({
  className,
  item,
  queryKeys,
}: ProductRowCardPropsType) {
  console.log(item);

  return (
    <Card
      color="transparent"
      hasBorder
      className={clsx(
        className,
        "flex max-sm:flex-col gap-2 max-sm:border-x-0 max-sm:rounded-none max-sm:-mx-4 max-sm:border-t-0",
      )}
    >
      <div className="grow flex">
        <Link
          href={`/products/${item.product.slug}`}
          className="block lg:me-4 me-3 shrink-0"
        >
          <Image
            src={item.product.images[0].url}
            width={100}
            height={100}
            className={clsx(
              "lg:h-30 lg:w-30 h-24 w-24 object-scale-down object-center",
            )}
            alt="product"
          />
        </Link>
        <div className="flex flex-col justify-between grow me-2">
          <Heading
            as={Link}
            href={`/products/${item.product.slug}`}
            variant="h6"
            className="mb-2.5 line-clamp-2!"
          >
            {item.product.name} frfkrflrnfl klrnflen fwkn
          </Heading>
          <div>
            {(!!item.variant?.color || !!item.variant?.size) && (
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 lg:mb-2 mb-1.5">
                {item.variant?.color && (
                  <div className="flex items-center">
                    <i className="icon-note me-1 lg:text-sm text-xs"></i>
                    <Text size="sm">color {item.variant?.color}</Text>
                  </div>
                )}
                {item.variant?.size && (
                  <div className="flex items-center">
                    <i className="icon-note me-1 lg:text-sm text-xs"></i>
                    <Text size="sm">size {item.variant?.size}</Text>
                  </div>
                )}
              </div>
            )}
            <ShopRating
              disabled
              className="lg:mb-2 mb-1 max-sm:hidden"
              productRate={item.product.rate.rate}
              users={item.product.rate.users}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Price>{item.product.price}</Price>
              {!(item.product.realPrice - item.product.price === 0) && (
                <Text as="del" size="xs">
                  ${item.product.realPrice}
                </Text>
              )}
              {!!item.product.discount && (
                <Chip color="danger" className="max-sm:hidden" rounded>
                  {item.product.discount}%
                </Chip>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:self-end">
        <Counter
          productId={item?.id}
          queryKeys={queryKeys}
          num={item?.quantity}
          max={item.product.stock}
        />
      </div>
    </Card>
  );
}
