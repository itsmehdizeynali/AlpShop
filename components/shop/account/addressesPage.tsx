"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import LoadingAddressCard from "@/components/loading/addressCard";
import WidgetAdderessCard from "@/components/widget/addressCard";
import {
  getAddressesService,
  removeAddressService,
  updateAddressService,
} from "@/services/addresses";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ShopAccountAddressesPage() {
  const { data: addresses, isLoading,refetch } = useQuery({
    queryKey: ["Addresses"],
    queryFn: getAddressesService,
  });
  const removeAddressMutation = useMutation({
    mutationFn: removeAddressService,
    onSuccess: () => {
      refetch()
    },
  });
  const selectAddressMutation = useMutation({
    mutationFn: updateAddressService,
    onSuccess: () => {
      refetch()
    },
  });

  const handelRemoveAdderss = (id: string) => {
    removeAddressMutation.mutate(id);
  };

  const handelSelectAdderss = (id: string) => {
    selectAddressMutation.mutate({ id, isDefault: true });
  };

  console.log(addresses);

  return (
    <div className="container my-section">
      <Heading className="text-center mb-4">Addersses</Heading>
      {addresses || isLoading ? (
        <Card
          as="form"
          className="max-w-[500px] mx-auto"
          color="transparent"
          hasBorder
        >
          {isLoading ? (
            <>
              <LoadingAddressCard />
              <LoadingAddressCard />
              <LoadingAddressCard />
            </>
          ) : (
            <>
              {!!addresses &&
                addresses.map((address, index) => (
                  <WidgetAdderessCard
                    address={address}
                    key={index}
                    handelSelect={handelSelectAdderss}
                    handelRemove={handelRemoveAdderss}
                  />
                ))}
              <Card
                color="primary-light"
                hasHover
                className="flex items-center justify-center"
                as={Link}
                href="/account/addresses/add"
              >
                <i className="icon-plus me-2"></i>
                Add New Address
              </Card>
            </>
          )}
        </Card>
      ) : (
        <div className="py-30">
          <Btn
            onClick={() => refetch()}
            icon="icon-refresh"
            rounded
            square
            color="black"
            variant="lightness"
            className="mb-2 mx-auto"
          />
          <Text className="text-center">Address List is empty.</Text>
        </div>
      )}
    </div>
  );
}
