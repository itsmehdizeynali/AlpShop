"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import SelectBox from "@/components/generic/select";
import Text from "@/components/generic/text";
import Textarea from "@/components/generic/textarea";
import {
  accountAddAddressSchema,
  type AccountAddAddressForms,
} from "@/validations/shop/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ShopAccountAddAddressPage() {
  const { register, handleSubmit, formState, setValue } =
    useForm<AccountAddAddressForms>({
      resolver: zodResolver(accountAddAddressSchema),
    });
  const submitFn = (data: AccountAddAddressForms) => {
    console.log(data);
  };


  const options: { value: number; label: string }[] = [
    {
      value: 0,
      label: "test 0",
    },
    {
      value: 1,
      label: "test 1",
    },
    {
      value: 2,
      label: "test 2",
    },
    {
      value: 3,
      label: "test 3",
    },
  ];
  const countryPhoneCodeOptions: { value: number; label: string }[] = [
    {
      value: 0,
      label: "+1",
    },
    {
      value: 1,
      label: "+2",
    },
    {
      value: 99,
      label: "+99",
    },
    {
      value: 89,
      label: "+89",
    },
  ];
  console.log(formState.errors);

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
        <SelectBox
          {...register("country")}
          label="Country"
          className="mb-4"
          options={options}
          handelChange={(value: string) => setValue("country", value)}
          formatOption={(option) => (
            <span className="flex items-center text-sm">
              <span className="inline-block me-3">{option.label}</span>
            </span>
          )}
          placeholder="select country"
          msg={formState.errors.country?.message}
        />
        <SelectBox
          {...register("province")}
          label="Province"
          className="mb-4"
          options={options}
          handelChange={(value: string) => setValue("province", value)}
          formatOption={(option) => (
            <span className="flex items-center text-sm">
              <span className="inline-block me-3">{option.label}</span>
            </span>
          )}
          placeholder="select province"
          msg={formState.errors.province?.message}
        />
        <SelectBox
          {...register("city")}
          label="City"
          className="mb-4"
          options={options}
          handelChange={(value: string) => setValue("city", value)}
          formatOption={(option) => (
            <span className="flex items-center text-sm">
              <span className="inline-block me-3">{option.label}</span>
            </span>
          )}
          placeholder="select city"
          msg={formState.errors.city?.message}
        />
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
            <SelectBox
            {...register("countryPhoneCode")}
              isSmall
              className="h-11 w-11"
              options={countryPhoneCodeOptions}
              handelChange={(value: string) => setValue("countryPhoneCode", value)}
              formatOption={(option) => (
                <div>{option.label}</div>
              )}
              placeholder="+1"
            />
          }
        />
        <Textarea
          {...register("addressLine")}
          label="Address Line"
          wrapClasses="mb-4"
          msg={formState.errors.addressLine?.message}
          showMsg={!!formState.errors.addressLine?.message}
        />

        <Btn type="submit" color="black" className="w-full">
          Add
        </Btn>
      </Card>
    </div>
  );
}
