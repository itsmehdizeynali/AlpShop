"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Input from "@/components/generic/input";
import Textarea from "@/components/generic/textarea";
import { accountInformationSchema, type AccountInformationForms } from "@/validations/shop/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export default function ShopAccountInformationPage() {
  const { register, handleSubmit } = useForm<AccountInformationForms>({
    resolver:zodResolver(accountInformationSchema)
  });
  const submitFn = (data: AccountInformationForms) => {
    console.log(data);
  };
  return (
    <div className="container my-section">
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
          defaultValue={"Mehdi"}
          label="name"
          wrapClasses="mb-4"
        />
        <Input
          {...register("lastName")}
          defaultValue={"zeynali"}
          label="Last Name"
          wrapClasses="mb-4"
        />
        <Input
          {...register("code")}
          defaultValue={"+99 999 999 9999"}
          label="Code"
          wrapClasses="mb-4"
        />
        <Input
          {...register("phone")}
          defaultValue={"5711785617"}
          label="Phone Number"
          wrapClasses="mb-4"
        />
        <Textarea
          {...register("address")}
          defaultValue={"Türkiye , istambul , taksim paşa , 3 pilaka , 2 kat"}
          label="Address"
          wrapClasses="mb-4"
        />
        <Btn type="submit" color="black" className="w-full">
          Edit
        </Btn>
      </Card>
    </div>
  );
}
