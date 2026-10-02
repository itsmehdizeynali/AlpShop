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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCartService,
  removeCartItemService,
  updateCartItemService,
} from "@/services/cart";

export default function WidgetProductRowCard({
  className,
  item,
  queryKeys,
}: ProductRowCardPropsType) {

  
  return (
    <Card color="neutral" className={clsx(className, "flex w-full")}>
      <Link
        href={`/products/${item.product.id}`}
        className="block lg:me-4 me-3 shrink-0"
      >
        <Image
          src={item.product.images[0].url}
          width={100}
          height={100}
          className={clsx(
            "lg:h-25 lg:w-25 h-18 w-18 object-scale-down object-center",
          )}
          alt="product"
        />
      </Link>
      <div className="flex flex-col justify-between grow">
        <Heading
          as={Link}
          href={`/products/${item.product.id}`}
          variant="h6"
          className="mb-2.5 !line-clamp-2"
        >
          {item.product.name}
        </Heading>
        <div className="flex items-end flex-wrap justify-between gap-2">
          <div>
            <ShopRating
              disabled
              className="mb-2"
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
                <Chip color="danger" rounded>
                  {item.product.discount}%
                </Chip>
              )}
            </div>
          </div>
          <Counter
            productId={item?.id}
            queryKeys={queryKeys}
            num={item?.quantity}
            max={item.product.stock}
          />
        </div>
      </div>
    </Card>
  );
}
