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
      handelQueryKeys();
    },
  });
  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlistService,
    onSuccess: () => {
      handelQueryKeys();
    },
  });
  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlistService,
    onSuccess: () => {
      handelQueryKeys();
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
    addToCartMutation.mutate({ productId: product.id });
  };

  return (
    <Card
      color={color}
      className={clsx(
        { "max-sm:flex-row max-sm:items-center max-sm:p-2!": responsive },
        "relative flex flex-col h-full p-3!",
      )}
      hasBorder={hasBorder}
    >
      {!!product?.discount && (
        <Chip
          color={spacial ? "primary" : "secondary"}
          rounded
          className={clsx(
            { "max-sm:hidden": responsive },
            "!absolute top-2 start-2 z-10",
          )}
        >
          {product.discount}%
        </Chip>
      )}
      <Btn
        icon={product.isWishlisted ? "icon-heart" : "icon-heart1"}
        square
        size="xs"
        color={product.isWishlisted ? "danger" : "white"}
        rounded
        className={clsx(
          { "shadow-card": !product.isWishlisted },
          "top-1 end-1 z-10 !absolute",
        )}
        loading={addToWishlistMutation.isPending}
        onClick={handelWishlistBtn}
      />
      <Link
        href={`/products/${product.slug}`}
        className={clsx("block mb-3 rounded-lg overflow-hidden shrink-0",
           responsive?"max-sm:mb-0 max-sm:me-2 sm:w-full":"w-full",
        )}
      >
        <Image
          src={product.images[0].url}
          width={180}
          height={180}
          className={clsx(
            "w-full lg:h-[180px] h-[150px] shrink-0 object-cover object-center",
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
          className={clsx(
            { "pe-8": responsive },
            "mb-2.5 !line-clamp-2",
          )}
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
