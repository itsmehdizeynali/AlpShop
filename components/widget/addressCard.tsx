import Image from "next/image";
import Btn from "../generic/btn";
import Card from "../generic/card";
import Text from "../generic/text";
import type { AddersesCardPropsType } from "./types";
import clsx from "clsx";
import Chip from "../generic/chip";
import Link from "next/link";

export default function WidgetAdderessCard({
  address,
  handelRemove,
  handelSelect,
  removeLoading=false,
  hasLinkBtn=false,
}: AddersesCardPropsType) {
  return (
    <Card
      color={handelSelect ? "primary-light" : "transparent"}
      hasBorder={address?.isDefault||!handelSelect}
      hasHover={!!handelSelect}
      className={clsx("flex items-start mb-3 last:mb-0 relative")}
      onClick={() => handelSelect && handelSelect(address?.id)}
    >
      {!!handelRemove && (
        <Btn
          icon="icon-cross-out-mark"
          square
          variant="lightness"
          size="xs"
          color="warning"
          className="!absolute top-3 end-3"
          onClick={(e) => {
            e.preventDefault();
            handelRemove && handelRemove(address.id);
          }}
          loading={removeLoading}
        />
      )}
      <Image
        src={"/img/location.png"}
        width={100}
        height={100}
        alt="map"
        className="me-3 object-center object-scale-down w-22 h-25"
      />
      <div>
        <Text color="black" className="mb-1">
          {address?.fullName}
        </Text>
        <Text color="black">{address?.country}</Text>
        <Text color="dim" className="line-clamp-2 mb-1.5">
          {address?.province} , {address?.city} , {address?.addressLine}
        </Text>
        <Text color="dim" className="mb-1">
          {address?.postalCode}
        </Text>
        <Text color="dim">
          +{address?.countryPhoneCode} {address?.phone}
        </Text>
      </div>
      {hasLinkBtn && (
        <Chip
          as={Link}
          href="/account/addresses"
          className="!absolute bottom-2 end-2 z-10 hover:!bg-black hover:!text-white"
          rounded
          color="black"
          variant="lightness"
        >
          select auther
        </Chip>
      )}
    </Card>
  );
}
