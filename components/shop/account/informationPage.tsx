"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import SelectBox from "@/components/generic/select";
import Text from "@/components/generic/text";
import type { SelectOption } from "@/components/generic/types";
import LoadingAddressCard from "@/components/loading/addressCard";
import WidgetAdderessCard from "@/components/widget/addressCard";
import { getProfileService, updateProfileService } from "@/services/account";
import { getCountriesService } from "@/services/geo";
import {
  accountInformationSchema,
  type AccountInformationForms,
} from "@/validations/shop/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { SingleValue } from "react-select";

export default function ShopAccountInformationPage() {
  const router = useRouter();

  const {
    data: information,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["information"],
    queryFn: getProfileService,
  });

  const changeInformationMutation = useMutation({
    mutationFn: updateProfileService,
    onSuccess() {
      router.push("/account");
    },
  });

  const submitFn = (data: AccountInformationForms) => {
    console.log(data);
    changeInformationMutation.mutate(data);
  };

  const { register, handleSubmit, formState, control } =
    useForm<AccountInformationForms>({
      resolver: zodResolver(accountInformationSchema),
    });
  const { data: countries } = useQuery({
    queryKey: ["counrties"],
    queryFn: getCountriesService,
  });

  const phoneCodeOptions: { value: number; label: string }[] = countries?.length
    ? countries.map(
        (country: {
          code: string;
          id: string;
          name: string;
          phoneCode: string;
        }) => {
          return {
            value: country.phoneCode,
            label: `+${country.phoneCode}`,
            endSide: country.code,
          };
        },
      )
    : [];
  return (
    <div className="container my-section">
      {isLoading ? (
        <>
          <div className="w-40 h-6 mx-auto rounded-full bg-loading animate-pulse mb-4"></div>
          <div className="w-[500px] mx-auto border-loading border p-4 rounded-lg">
            <div className="w-15 h-4 rounded-full bg-loading animate-pulse mb-2"></div>
            <div className="w-full h-10 rounded-lg bg-loading animate-pulse mb-4"></div>
            <div className="w-15 h-4 rounded-full bg-loading animate-pulse mb-2"></div>
            <div className="w-full h-10 rounded-lg bg-loading animate-pulse mb-4"></div>
            <div className="w-15 h-4 rounded-full bg-loading animate-pulse mb-2"></div>
            <div className="w-full h-10 rounded-lg bg-loading animate-pulse mb-4"></div>
            <LoadingAddressCard />
            <div className="w-full h-10 rounded-lg bg-loading animate-pulse mt-4"></div>
          </div>
        </>
      ) : !!information ? (
        <>
          <Heading className="text-center mb-4">Information</Heading>
          <Card
            onSubmit={handleSubmit(submitFn)}
            as="form"
            className="max-w-[500px] mx-auto"
            color="transparent"
            hasBorder
          >
            <Input
              {...register("name")}
              defaultValue={information?.name}
              label="name"
              wrapClasses="mb-4"
              msg={formState.errors.name?.message}
              showMsg={!!formState.errors.name?.message}
            />
            <Input
              {...register("email")}
              defaultValue={information?.email}
              label="Email"
              wrapClasses="mb-4"
              msg={formState.errors.email?.message}
              showMsg={!!formState.errors.email?.message}
            />
            <Input
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },
              })}
              label="Phone Number"
              inputMode="numeric"
              defaultValue={information?.phone}
              wrapClasses="mb-4"
              msg={formState.errors.phone?.message}
              showMsg={!!formState.errors.phone?.message}
              maxLength={10}
              startSide={
                <Controller
                  control={control}
                  name="countryPhoneCode"
                  render={({ field }) => (
                    <SelectBox
                      {...field}
                      isSmall
                      className="h-11 w-11"
                      options={phoneCodeOptions}
                      onChange={(option: SingleValue<SelectOption>) =>
                        field.onChange(option?.value)
                      }
                      value={String(field.value)}
                      placeholder={
                        information?.countryPhoneCode
                          ? `+${information?.countryPhoneCode}`
                          : "+1"
                      }
                      formatOption={(option) => (
                        <div className="flex items-center">{option.label}</div>
                      )}
                    />
                  )}
                ></Controller>
              }
            />
            {information?.addresses[0] ? (
              <WidgetAdderessCard
                hasLinkBtn
                address={information?.addresses[0]}
              />
            ) : (
              <Card
                as={Link}
                href="/account/addresses/add"
                color="neutral"
                hasHover
                className="mb-3 !py-8 text-center"
              >
                you dont have address
                <Text color="primary" className="mt-1">
                  Add New Address
                </Text>
              </Card>
            )}
            <Btn
              disabled={
                !formState.isDirty ||
                formState.isSubmitting ||
                !formState.isValid
              }
              type="submit"
              color="black"
              className="w-full"
            >
              Edit
            </Btn>
          </Card>
        </>
      ) : (
        <div>
          <Btn
            icon="icon-refresh"
            color="black"
            variant="lightness"
            className="mx-auto mb-2"
            onClick={() => refetch()}
            rounded
            square
          />
          <Text size="sm" className="text-center">
            no Data!
          </Text>
        </div>
      )}
    </div>
  );
}
