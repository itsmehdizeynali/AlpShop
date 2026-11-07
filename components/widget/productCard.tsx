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
import type { ProductCardPropsType } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlistService,
  removeFromWishlistService,
} from "@/services/wishlist";
import { addToCartService } from "@/services/cart";

export default function WidgetProductCard({
  spacial = false,
  color = "transparent",
  hasBorder = true,
  product,
  responsive = false,
  queryKeys,
}: ProductCardPropsType) {
  const QueryClient = useQueryClient();

  const handelQueryKeys = () => {
    queryKeys?.map((item) =>
      QueryClient.invalidateQueries({ queryKey: [item] }),
    );
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCartService,
    onSuccess: () => {
      handelQueryKeys()
    },
  });
  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlistService,
    onSuccess: () => {
      handelQueryKeys()
    },
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlistService,
    onSuccess: () => {
      handelQueryKeys()
    },
  });

  const handelWishlistBtn = () => {
    if (product.isWishlisted) {
      removeFromWishlistMutation.mutate(product.id);
      return;
    }
    addToWishlistMutation.mutate(product.id);
  };
  const handelAddToCartBtn = () => {
    addToCartMutation.mutate({productId:product.id});
  };

  return (
    <Card
      color={color}
      className={clsx(
        { "max-sm:flex-row": responsive },
        "relative flex flex-col h-full",
      )}
      hasBorder={hasBorder}
    >
      {!!product?.discount && (
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
      <Btn
        icon={product.isWishlisted ? "icon-heart" : "icon-heart1"}
        square
        variant="text"
        color="danger"
        className={clsx(
          product.isWishlisted ? "opacity-100" : "opacity-20",
          "hover:!opacity-80 lg:top-4 top-3 lg:end-4 end-3 z-10 !absolute",
        )}
        onClick={handelWishlistBtn}
      />
      <Link
        href={`/products/${product.slug}`}
        className={clsx("block mb-3", {
          "max-sm:mb-0 max-sm:me-2": responsive,
        })}
      >
        <Image
          src={product.images[0].url}
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
      <div className="flex flex-col grow justify-between">
        <Heading
          as={Link}
          href={`/products/${product.slug}`}
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
            {!(product.realPrice - product.price === 0) && (
            <Text as="del" size="xs" className="ms-2">
              ${product.realPrice}
            </Text>
            )}
            {!product.isInCart && spacial && (
              <Btn
                size="xs"
                square
                variant="outline"
                icon="icon-basket1"
                className="ms-auto"
                onClick={handelAddToCartBtn}
                loading={addToCartMutation.isPending}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
