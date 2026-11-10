import { z } from "zod";

export const accountInformationSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().min(1,"Email is required!").email("Email is invalid"),
  phone: z.string().regex(/^[0-9]+$/, "just number").length(10, "Phone Number is 10 characters").optional(),
  countryPhoneCode: z.string().optional(),
});

export const accountAddAddressSchema = z.object({
  fullName: z.string().min(1, "Full Name is required!").max(50, "Full Name must be at least 50 characters"),
  phone: z.string().regex(/^[0-9]+$/, "just number").min(1, "Phone Number is required!").length(10, "Phone Number is 10 characters"),
  countryPhoneCode: z.string().optional(),
  country: z.object({value:z.string(),label:z.string()},"select Country is required"),
  province: z.object({value:z.string(),label:z.string()}, "select Province is required!"),
  city: z.object({value:z.string(),label:z.string()}, "select City is required!"),
  postalCode: z.string().min(1, "Postal Code is required!").max(15, "Postal Code must be at least 15 characters"),
  addressLine: z.string().min(1, "Address Line is required!").max(450, "Address Line must be at least 450 characters"),
});

export type AccountInformationForms = z.infer<typeof accountInformationSchema>;
export type AccountAddAddressForms = z.infer<typeof accountAddAddressSchema>;