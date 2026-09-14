import Alert from "@/components/generic/alert";
import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";

export default function ShopCartPayment() {
  return (
    <div className="lg:w-84 w-full p-2 shrink-0 sticky top-0">
      <Card color="transparent" className="mb-3" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Payment Details
        </HeaderSection>
        <ul className="mb-4">
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Total price of goods (1 item)
            </Text>
            <Text
              size="base"
              weight="bold"
              color="primary"
              className="ms-auto capitalize"
            >
              520$
            </Text>
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
            <Text
              size="base"
              weight="bold"
              color="primary"
              className="ms-auto capitalize"
            >
              60$
            </Text>
          </li>
          <li className="mb-2 last:mb-0 flex items-center gap-4">
            <Text color="dim" weight="bold" className="capitalize">
              Shopping cart total
            </Text>
            <Text as="del" size="sm" className="ms-auto capitalize">
              580$
            </Text>
            <Text
              size="base"
              weight="bold"
              color="primary"
              className="capitalize"
            >
              520$
            </Text>
          </li>
        </ul>
        <Alert color="danger" variant="text">
          The order amount has not yet been paid and if the stock runs out, the
          goods will be removed from the cart.
        </Alert>
      </Card>
      <Btn className="w-full">Place an order</Btn>
    </div>
  );
}
