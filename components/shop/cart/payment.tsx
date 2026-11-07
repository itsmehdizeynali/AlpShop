import Alert from "@/components/generic/alert";
import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";
import type { ShopCartPaymentPropsType } from "./type";
import useFormatNumber from "@/utils/format-number";
import Price from "@/components/generic/price";
import WidgetAdderessCard from "@/components/widget/addressCard";
import { getAddressesService } from "@/services/addresses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Chip from "@/components/generic/chip";
import Link from "next/link";
import { checkoutService } from "@/services/cart";

export default function ShopCartPayment({
  totalPriceBefore,
  totalPriceAfter,
  profit,
  itemsCount,
  isLoading = false,
  setShowModal
}: ShopCartPaymentPropsType) {
  const { formatNumber } = useFormatNumber();
  const { data: addresses } = useQuery({
    queryKey: ["Addresses"],
    queryFn: getAddressesService,
  });
  console.log(addresses);
  const QueryClient = useQueryClient();

  const checkoutMutation=useMutation({
    mutationFn:(addressId:string)=>checkoutService({addressId}),
    onSuccess:()=>{
      setShowModal({active:true,status:"success"})
      QueryClient.invalidateQueries({ queryKey: ["cart"] })
      QueryClient.invalidateQueries({ queryKey: ["layout_data"] })
    },
    onError:()=>{
      setShowModal({active:true,status:"unSuccess"})
    }
  })

  return (
    <div className="lg:w-84 w-full p-2 shrink-0 sticky top-0">
      <Card color="transparent" className="mb-3" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Payment Details
        </HeaderSection>
        <ul className="mb-4">
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Total price of goods ({itemsCount} item{itemsCount > 1 && "s"})
            </Text>
            {isLoading ? (
              <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Text
                size="base"
                weight="bold"
                color="primary"
                className="ms-auto capitalize"
              >
                {formatNumber(totalPriceAfter)}$
              </Text>
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
            {isLoading ? (
              <div className="w-14 h-4 bg-white animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Text
                size="base"
                weight="bold"
                color="primary"
                className="ms-auto capitalize"
              >
                {formatNumber(profit)}$
              </Text>
            )}
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Hhipping Cost
            </Text>
            {isLoading ? (
              <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full ms-auto"></div>
            ) : (
              <Text
                size="base"
                weight="bold"
                color="primary"
                className="ms-auto capitalize"
              >
                9.99$
              </Text>
            )}
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Shopping cart total
            </Text>
            {isLoading ? (
              <div className=" ms-auto">
                <div className="w-14 h-4 bg-primary-light animate-pulse rounded-full mb-1"></div>
                <div className="w-14 h-4 bg-loading animate-pulse rounded-full"></div>
              </div>
            ) : (
              <div className="ms-auto text-end">
                <Text
                  size="base"
                  weight="bold"
                  color="primary"
                  className="capitalize"
                >
                  {formatNumber(totalPriceAfter+9.99)}$
                </Text>
                <Text as="del" size="sm">
                  {formatNumber(totalPriceBefore+9.99)}$
                </Text>
              </div>
            )}
          </li>
        </ul>
        <Alert color="danger" variant="text">
          The order amount has not yet been paid and if the stock runs out, the
          goods will be removed from the cart.
        </Alert>
      </Card>
      {!!addresses?.length ? (
        <WidgetAdderessCard address={addresses[0]} />
      ) : (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Alert color="black" variant="text" className="me-auto">
            First add an Address
          </Alert>
          <Chip
            as={Link}
            href="/account/addresses/add"
            className="hover:bg-primary hover:text-white"
            rounded
            variant="outline"
          >
            Add Adderss
          </Chip>
        </div>
      )}
      <Btn loading={checkoutMutation.isPending} onClick={()=>!!addresses?.length &&checkoutMutation.mutate(addresses[0]?.id)} className="w-full" disabled={!addresses?.length}>
        Place an order
      </Btn>
    </div>
  );
}
