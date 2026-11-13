import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Chip from "@/components/generic/chip";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";
import { authLogoutService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { InformationPropsType } from "./types";

export default function ShopAccountInformation({
  information,
  isLoading,
}: InformationPropsType) {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: authLogoutService,
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  console.log("25",information);
  
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
            {isLoading ? (
              <div className="animate-pulse bg-loading rounded-full h-3 w-40 mt-2.5"></div>
            ) : (
              <Text size="sm" className="ms-auto capitalize">
                {information?.name}
              </Text>
            )}
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Email
            </Text>
            {isLoading ? (
              <div className="animate-pulse bg-loading rounded-full h-3 w-40 mt-2.5"></div>
            ) : (
              <Text size="sm" className="ms-auto capitalize">
                {information?.email}
              </Text>
            )}
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Address
            </Text>
            {isLoading ? (
              <>
                <div className="animate-pulse bg-loading rounded-full h-3 w-20 mt-2.5"></div>
                <div className="animate-pulse bg-loading rounded-full h-3 w-full mt-2.5"></div>
                <div className="animate-pulse bg-loading rounded-full h-5 w-24 mt-3"></div>
              </>
            ) : (
              <>
                {!!information?.addresses[0] ? (
                  <>
                    <Text size="sm" className="ms-auto capitalize mb-2">
                      <Text color="dim">
                        {information.addresses[0].country}
                      </Text>
                      <Text color="dim" className="line-clamp-2 mb-1.5">
                        {/* {information.addresses[0].country} , */}
                        {information.addresses[0].province} ,
                        {information.addresses[0].city} ,
                        {information.addresses[0].addressLine}
                      </Text>
                    </Text>
                    <Chip
                      as={Link}
                      href="/account/addresses"
                      className="hover:bg-primary hover:text-white"
                      rounded
                      variant="outline"
                    >
                      Addresses List
                    </Chip>
                  </>
                ) : (
                  <Chip
                    as={Link}
                    href="/account/addresses/add"
                    className="hover:bg-primary hover:text-white mt-2"
                    rounded
                    variant="outline"
                  >
                    Add Adderss
                  </Chip>
                )}
              </>
            )}
          </li>
          <li className="mb-2">
            <Text color="black" weight="bold" className="mb-0.5 capitalize">
              Phone Number
            </Text>
            {isLoading ? (
              <div className="animate-pulse bg-loading rounded-full h-3.5 w-40 mt-2.5"></div>
            ) : (
              <>
                {!!information?.phone ? (
                  <Text size="sm" className="ms-auto capitalize">
                    +{information?.countryPhoneCode} {" "}
                    {information?.phone}
                  </Text>
                ) : (
                  <Chip
                    as={Link}
                    href="/account/information"
                    className="hover:bg-primary hover:text-white mt-2"
                    rounded
                    variant="outline"
                  >
                    Add Phone Number
                  </Chip>
                )}
              </>
            )}
          </li>
        </ul>
      </Card>
      <Btn
        as={Link}
        href="/account/information"
        className="lg:w-full max-sm:w-full mb-2"
        icon="icon-edit1"
        color="black"
      >
        Edit
      </Btn>
      <Btn
        className="lg:w-full max-sm:w-full"
        icon="icon-logout"
        color="danger"
        variant="lightness"
        onClick={() => logoutMutation.mutate()}
      >
        Log Out
      </Btn>
    </div>
  );
}
