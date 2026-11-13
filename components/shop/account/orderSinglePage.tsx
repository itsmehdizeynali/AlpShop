"use client";

import HeaderSection from "@/components/generic/headerSection";
import Link from "next/link";
import Chip from "@/components/generic/chip";
import Price from "@/components/generic/price";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getOrderService } from "@/services/account";
import Card from "@/components/generic/card";
import type { ProductType } from "@/components/genericTypes";
import Image from "next/image";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import LoadingOrder from "@/components/loading/order";
import Btn from "@/components/generic/btn";
import useStatus from "@/utils/setStatus";
import useFormatNumber from "@/utils/format-number";
import { useState } from "react";
import ShopAccountReturnRequestModal from "./returnRequestModal";

export default function ShopAccountOrderSinglePage() {
  const { id } = useParams();
  const { formatNumber } = useFormatNumber();
  const { data: order, isLoading: loadingOrder } = useQuery({
    queryKey: ["order_single",id],
    queryFn: () => getOrderService(id as string),
  });

  const [showModal, setShowModal] = useState(false);
  const { setColor } = useStatus();

  return (
    <div className="container my-section">
      <ShopAccountReturnRequestModal showModal={showModal} setShowModal={setShowModal} id={id as string}/>
      <HeaderSection
        className="mb-sm-section"
        shape
        mainSide={
          !!order ? (
            <div className="flex items-center gap-2 ms-auto">
              <Chip
                color={setColor(order?.status)}
                variant="lightness"
                className="self-center"
              >
                {order?.status}
              </Chip>
              <Chip color="neutral" variant="lightness" className="self-center">
                {order?.orderNumber}
              </Chip>
            </div>
          ) : null
        }
      >
        order
      </HeaderSection>
      <Card as="ul" color="transparent" hasBorder className="mb-4">
        {loadingOrder ? (
          <>
            <LoadingOrder className="mb-2 last:mb-0" />
            <LoadingOrder className="mb-2 last:mb-0" />
            <LoadingOrder className="mb-2 last:mb-0" />
            <LoadingOrder className="mb-2 last:mb-0" />
          </>
        ) : (
          <>
            {!!order?.items && (
              <>
                {order.items.map(
                  (
                    item: {
                      product: ProductType;
                      price: number;
                      realPrice?: number;
                    },
                    index: number,
                  ) => (
                    <li className="mb-2 last:mb-0" key={index}>
                      <Card
                        hasHover
                        as={Link}
                        href={`/products/${item.product.slug}`}
                        className="!p-2 flex items-center"
                      >
                        <div className="bg-primary-light w-14 h-14 p-1 rounded-lg me-3">
                          <Image
                            src={item.product.images[0].url}
                            className="w-full h-full object-center object-scale-down"
                            width={48}
                            height={48}
                            alt={item.product.images[0].altText || "product"}
                          />
                        </div>
                        <Heading variant="h6" className="me-auto">
                          {item.product.name}
                        </Heading>
                        {!!item?.realPrice && (
                          <Text as="del" className="me-4">
                            {formatNumber(item?.realPrice)}
                          </Text>
                        )}
                        <Price className="me-2">
                          {formatNumber(item.price)}
                        </Price>
                      </Card>
                    </li>
                  ),
                )}
              </>
            )}
          </>
        )}
      </Card>
      {(!!order || loadingOrder) && (
        <Card as="ul" color="transparent" hasBorder className="mb-4">
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Total price of goods (1 item)
            </Text>
            {loadingOrder ? (
              <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Price color="primary" className="ms-auto capitalize">
                {formatNumber(order.subtotal)}
              </Price>
            )}
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Hhipping Cost
            </Text>
            {loadingOrder ? (
              <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Price color="primary" className="ms-auto capitalize">
                {order.shippingCost}
              </Price>
            )}
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4 bg-primary-light py-2 px-4 lg:-mx-4 -mx-3">
            <Text
              color="primary"
              weight="bold"
              className="flex items-center capitalize"
            >
              <i className="icon-target me-2"></i>
              Your profit
            </Text>
            {loadingOrder ? (
              <div className="w-14 h-4 bg-white animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Price color="primary" className="ms-auto capitalize">
                {formatNumber(order?.discount) || 0}
              </Price>
            )}
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="me-auto capitalize">
              Shopping cart total
            </Text>
            {!!order?.discount && (
              <Text as="del" size="sm" className="capitalize">
                ${formatNumber(order.total - order?.discount)}
              </Text>
            )}
            {loadingOrder ? (
              <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Price color="primary" className="capitalize">
                {formatNumber(order.total)}
              </Price>
            )}
          </li>
        </Card>
      )}
      {!order ||
        (!loadingOrder && (
          <Btn
            onClick={() => setShowModal(true)}
            color="danger"
            variant="outline-lightness"
          >
            Return Request
          </Btn>
        ))}
    </div>
  );
}
