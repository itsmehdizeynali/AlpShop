import Card from "@/components/generic/card";
import { getProductVariantService } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ShopProductsSelections from "./selections";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Chip from "@/components/generic/chip";
import Counter from "@/components/generic/counter";
import Btn from "@/components/generic/btn";
import { addToCartService } from "@/services/cart";
import { useState } from "react";

export default function ShopProductsPriceBox({
  slug,
  colors,
  variants,
  id,
}: {
  id: string;
  slug: string;
  colors?: { name: string; hex: string }[];
  variants?: { title: string; items: string[] }[];
}) {
  const [activeSize, setActiveSize] = useState<string | undefined>(undefined);
  const [activeColor, setActiveColor] = useState<string | undefined>(undefined);

  const { data: variant, isLoading } = useQuery({
    queryKey: ["variant", slug, activeSize, activeColor],
    queryFn: () =>
      getProductVariantService({
        slug: slug,
        selection: {
          color: !!colors ? activeColor || colors[0].name : undefined,
          size: variants?.length
            ? activeSize || variants[0].items[0]
            : undefined,
        },
      }),
  });

  console.log(variant);

  const QueryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: addToCartService,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["product_details"] });
      QueryClient.invalidateQueries({ queryKey: ["layout_data"] });
    },
  });
  const handelAddToCartBtn = () => {
    if (id) addToCartMutation.mutate({ productId: id, variantId: variant.id });
  };

  return (
    <Card
      hasBorder
      color="transparent"
      className="max-lg:gap-2 max-lg:flex-wrap max-lg:flex max-lg:items-center max-lg:rounded-none max-lg:border-0"
    >
      {!!colors?.length ||
        (!!variants?.length && (
          <ShopProductsSelections
            colors={colors}
            variants={variants}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
          />
        ))}
      {isLoading ? (
        <div className="h-4 rounded-full w-full animate-pulse bg-loading mb-4"></div>
      ) : variant?.inStock ? (
        <div className="flex items-center lg:mb-2">
          <Price size="lg">{variant?.price}</Price>
          {variant?.realPrice !== variant?.price && (
            <Text as="del" size="base" className="mx-2">
              {variant?.realPrice}$
            </Text>
          )}
          {!!variant?.discount && (
            <Chip rounded color="danger">
              {variant?.discount}%
            </Chip>
          )}
        </div>
      ) : (
        <Text color="danger" size="base" className="mb-2" weight="bold">
          No Stock
        </Text>
      )}
      {variant?.isInCart ? (
        <Counter
          productId={variant?.id as string}
          queryKeys={["layout_data", "variant_details"]}
          num={variant?.cartQuantity}
          max={variant?.stock}
        />
      ) : (
        <Btn
          onClick={handelAddToCartBtn}
          disabled={!variant?.inStock}
          className="lg:w-full max-lg:ms-auto max-sm:w-full"
          loading={addToCartMutation.isPending}
        >
          Add To Basket
        </Btn>
      )}
    </Card>
  );
}
