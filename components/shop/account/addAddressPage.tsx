"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import SelectBox from "@/components/generic/select";
import Text from "@/components/generic/text";
import Textarea from "@/components/generic/textarea";
import type { SelectOption } from "@/components/generic/types";
import { createAddressService } from "@/services/addresses";
import {
  getCitiesService,
  getCountriesService,
  getProvincesService,
} from "@/services/geo";
import {
  accountAddAddressSchema,
  type AccountAddAddressForms,
} from "@/validations/shop/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import type { SingleValue } from "react-select";

export default function ShopAccountAddAddressPage() {

  const route=useRouter()


  const { register, control, handleSubmit, formState } =
    useForm<AccountAddAddressForms>({
      resolver: zodResolver(accountAddAddressSchema),
      defaultValues: {
        countryPhoneCode: "1",
      },
    });

  const { data: countries } = useQuery({
    queryKey: ["counrties"],
    queryFn: getCountriesService,
  });

  const selectedCountry = useWatch({
    control,
    name: "country",
  });
  const { data: provinces } = useQuery({
    queryKey: ["provinces", selectedCountry],
    queryFn: () => getProvincesService(selectedCountry?.value),
    enabled: !!selectedCountry?.value,
  });
  const selectedProvince = useWatch({
    control,
    name: "province",
  });
  const { data: cities } = useQuery({
    queryKey: ["cities", selectedProvince],
    queryFn: () => getCitiesService(selectedProvince?.value),
    enabled: !!selectedProvince?.value,
  });

  const createAddressMutation = useMutation({
    mutationFn: createAddressService,
    onSuccess: () => {
      route.push("/account/addresses")
    },
  });

  const submitFn = (data: AccountAddAddressForms) => {
    createAddressMutation.mutate({
      ...data,
      country: data.country.label,
      province: data.province.label,
      city: data.city.label,
    });
  };

  const countriesOptions: { value: number; label: string }[] = countries?.length
    ? countries.map(
        (country: {
          code: string;
          id: string;
          name: string;
          phoneCode: string;
        }) => {
          return {
            value: country.code,
            label: country.name,
          };
        },
      )
    : [];
  const provincesOptions: { value: number; label: string }[] = provinces?.length
    ? provinces.map(
        (country: {
          code: string;
          id: string;
          name: string;
          phoneCode: string;
        }) => {
          return {
            value: country.id,
            label: country.name,
          };
        },
      )
    : [];
  const citiesOptions: { value: number; label: string }[] = cities?.length
    ? cities.map(
        (country: {
          code: string;
          id: string;
          name: string;
          phoneCode: string;
        }) => {
          return {
            value: country.id,
            label: country.name,
          };
        },
      )
    : [];
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
      <Heading className="text-center mb-4">Add Address</Heading>
      <Card
        onSubmit={handleSubmit(submitFn)}
        as="form"
        className="max-w-[500px] mx-auto"
        color="transparent"
        hasBorder
      >
        <Input
          {...register("fullName")}
          label="Full Name"
          wrapClasses="mb-4"
          msg={formState.errors.fullName?.message}
          showMsg={!!formState.errors.fullName?.message}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <SelectBox
              {...field}
              label="Country"
              className="mb-4"
              options={countriesOptions}
              onChange={(option: SingleValue<SelectOption>) =>
                field.onChange(option)
              }
              placeholder="select country"
              msg={formState.errors.country?.message}
              value={field.value?.value}
            />
          )}
        ></Controller>
        <Controller
          control={control}
          name="province"
          render={({ field }) => (
            <SelectBox
              {...field}
              label="Province"
              className="mb-4"
              options={provincesOptions}
              onChange={(option: SingleValue<SelectOption>) =>
                field.onChange(option)
              }
              placeholder="select province"
              msg={
                formState.errors.province?.message ||
                (!selectedCountry ? "first select country" : undefined)
              }
              msgType={
                formState.errors.province?.message ? "danger" : "warning"
              }
              value={field.value?.value}
              disabled={!provincesOptions.length}
            />
          )}
        ></Controller>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <SelectBox
              {...field}
              label="City"
              className="mb-4"
              options={citiesOptions}
              onChange={(option: SingleValue<SelectOption>) =>
                field.onChange(option)
              }
              placeholder="select city"
              msg={
                formState.errors.city?.message ||
                (!selectedProvince ? "first select province" : undefined)
              }
              msgType={formState.errors.city?.message ? "danger" : "warning"}
              value={field.value?.value}
              disabled={!citiesOptions.length}
            />
          )}
        ></Controller>
        <Input
          {...register("postalCode")}
          label="Postal Code"
          wrapClasses="mb-4"
          msg={formState.errors.postalCode?.message}
          showMsg={!!formState.errors.postalCode?.message}
        />
        <Input
          {...register("phone")}
          label="Phone Number"
          wrapClasses="mb-4"
          msg={formState.errors.phone?.message}
          showMsg={!!formState.errors.phone?.message}
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
                  placeholder="+1"
                  formatOption={(option) => (
                    <div className="flex items-center">{option.label}</div>
                  )}
                />
              )}
            ></Controller>
          }
        />
        <Textarea
          {...register("addressLine")}
          label="Address Line"
          wrapClasses="mb-4"
          msg={formState.errors.addressLine?.message}
          showMsg={!!formState.errors.addressLine?.message}
        />

        <Btn disabled={!formState.isValid} loading={createAddressMutation.isPending} type="submit" color="black" className="w-full">
          Add
        </Btn>
      </Card>
    </div>
  );
}
