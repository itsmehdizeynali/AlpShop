import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";
import Link from "next/link";

export default function ShopAccountInformation() {
  return (
    <div className="p-2 lg:w-78 w-full shrink-0 lg:sticky lg:top-0">
      <Card color="transparent" className="mb-2" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Your Information
        </HeaderSection>
        <ul>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Name
            </Text>
            <Text size="sm" className="ms-auto capitalize">
              Mehdi
            </Text>
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Last Name
            </Text>
            <Text size="sm" className="ms-auto capitalize">
              zeynali
            </Text>
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Address
            </Text>
            <Text size="sm" className="ms-auto capitalize">
              Türkiye , istambul , taksim paşa , 3 pilaka , 2 kat
            </Text>
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Code
            </Text>
            <Text size="sm" className="ms-auto capitalize">
              5711785617
            </Text>
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Phone Number
            </Text>
            <Text size="sm" className="ms-auto capitalize">
              +99 999 999 9999
            </Text>
          </li>
        </ul>
      </Card>
      <Btn as={Link} href="/account/information" className="lg:w-full max-sm:w-full" icon="icon-edit1" color="black">
        Edit
      </Btn>
    </div>
  );
}
