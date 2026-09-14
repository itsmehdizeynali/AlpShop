import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import HeaderSection from "@/components/generic/headerSection";
import Heading from "@/components/generic/heading";
import Price from "@/components/generic/price";
import Text from "@/components/generic/text";
import Image from "next/image";
import Link from "next/link";

export default function ordersIdPage() {
  return (
    <div className="container my-section">
      <HeaderSection
      className="mb-sm-section"
        shape
        mainSide={
          <Chip
            color="neutral"
            variant="lightness"
            className="self-center ms-auto"
          >
            #55568
          </Chip>
        }
      >
        order
      </HeaderSection>
      <Card as="ul" color="transparent" hasBorder className="mb-4">
        <li className="mb-2 last:mb-0">
          <Card hasHover as={Link} href="/" className="!p-2 flex items-center">
            <div className="bg-primary-light w-14 h-14 p-1 rounded-lg me-3">
              <Image
                src="/img/product-1.png"
                className="w-full h-full object-center object-scale-down"
                width={48}
                height={48}
                alt="product"
              />
            </div>
            <Heading variant="h6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Heading>
            <Text as="del" className="ms-auto me-4">
              852
            </Text>
            <Price className="me-2">754</Price>
          </Card>
        </li>
        <li className="mb-2 last:mb-0">
          <Card hasHover as={Link} href="/" className="!p-2 flex items-center">
            <div className="bg-primary-light w-14 h-14 p-1 rounded-lg me-3">
              <Image
                src="/img/product-1.png"
                className="w-full h-full object-center object-scale-down"
                width={48}
                height={48}
                alt="product"
              />
            </div>
            <Heading variant="h6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Heading>
            <Text as="del" className="ms-auto me-4">
              852
            </Text>
            <Price className="me-2">754</Price>
          </Card>
        </li>
        <li className="mb-2 last:mb-0">
          <Card hasHover as={Link} href="/" className="!p-2 flex items-center">
            <div className="bg-primary-light w-14 h-14 p-1 rounded-lg me-3">
              <Image
                src="/img/product-1.png"
                className="w-full h-full object-center object-scale-down"
                width={48}
                height={48}
                alt="product"
              />
            </div>
            <Heading variant="h6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Heading>
            <Text as="del" className="ms-auto me-4">
              852
            </Text>
            <Price className="me-2">754</Price>
          </Card>
        </li>
      </Card>
      <Card as="ul" color="transparent" hasBorder className="mb-4">
        <li className="mb-2 last:mb-0 flex items-center gap-4">
          <Text color="dim" weight="bold" className="capitalize">
            Total price of goods (1 item)
          </Text>
          <Price color="primary" className="ms-auto capitalize">
            520$
          </Price>
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
          <Price color="primary" className="ms-auto capitalize">
            60$
          </Price>
        </li>
        <li className="mb-2 last:mb-0 flex items-center gap-4">
          <Text color="dim" weight="bold" className="capitalize">
            Shopping cart total
          </Text>
          <Text as="del" size="sm" className="ms-auto capitalize">
            580$
          </Text>
          <Price color="primary" className="capitalize">
            520$
          </Price>
        </li>
      </Card>
    </div>
  );
}
