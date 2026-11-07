"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import SelectBox from "@/components/generic/select";
import Text from "@/components/generic/text";
import type { SelectOption } from "@/components/generic/types";
import WidgetAdderessCard from "@/components/widget/addressCard";
import {
  getProfileService,
  updateProfileService
} from "@/services/account";
import { getCountriesService } from "@/services/geo";
import {
  accountInformationSchema,
  type AccountInformationForms,
} from "@/validations/shop/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { SingleValue } from "react-select";

export default function ShopAccountInformationPage() {

  const QueryClient=useQueryClient()

  const router=useRouter()


  const changeInformationMutation=useMutation({
    mutationFn:updateProfileService,
    onSuccess() {     
      QueryClient.invalidateQueries({queryKey:["information"]})
      router.push("/account")
    },
  })

  const submitFn = (data: AccountInformationForms) => {
    console.log(data);
    changeInformationMutation.mutate(data);
  };
  const { data: information } = useQuery({
    queryKey: ["information"],
    queryFn: getProfileService,
  });
  

  const { register, handleSubmit, formState, control } =
    useForm<AccountInformationForms>({
      resolver: zodResolver(accountInformationSchema),
    });
  const { data: countries } = useQuery({
    queryKey: ["counrties"],
    queryFn: getCountriesService,
  });
  console.log(information);
  
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
      <Heading className="text-center mb-4">Information</Heading>
      {!!information && (
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
            {...register("phone")}
            label="Phone Number"
            defaultValue={information?.phone}
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
                    placeholder={information?.countryPhoneCode?`+${information?.countryPhoneCode}`:"+1"}
                    formatOption={(option) => (
                      <div className="flex items-center">{option.label}</div>
                    )}
                  />
                )}
                ></Controller>
              }
          />
          {information?.addresses[0]?
          <WidgetAdderessCard hasLinkBtn address={information?.addresses[0]} />:
          <Card as={Link} href="/account/addresses/add" color="neutral" hasHover className="mb-3 !py-8 text-center">
            you dont have address
            <Text color="primary" className="mt-1">
              Add New Address
            </Text>
          </Card>
          }
          <Btn disabled={!formState.isDirty||formState.isSubmitting||!formState.isValid} type="submit" color="black" className="w-full">
            Edit
          </Btn>
        </Card>
      )}
    </div>
  );
}
