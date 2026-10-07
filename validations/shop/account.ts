import { z } from "zod";

export const accountInformationSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  code: z.string().min(1, "Code is required!"),
  phone: z.string().min(1, "Phone Number is required!"),
  address: z.string().min(1, "Address is required!"),
});

export const accountAddAddressSchema = z.object({
  fullName: z.string().min(1, "Full Name is required!").max(50, "Full Name must be at least 50 characters"),
  phone: z.string().min(1, "Phone Number is required!").max(10, "Phone Number must be at least 10 characters"),
  countryPhoneCode: z.string().optional(),
  country: z.string("country is required").min(1, "Country is required!").max(100, "Country must be at least 100 characters"),
  province: z.string("province is required").min(1, "Province is required!").max(100, "Province must be at least 100 characters"),
  city: z.string("city is required").min(1, "City is required!").max(100, "City must be at least 100 characters"),
  postalCode: z.string().min(1, "Postal Code is required!").max(15, "Postal Code must be at least 15 characters"),
  addressLine: z.string().min(1, "Address Line is required!").max(450, "Address Line must be at least 450 characters"),
});

export type AccountAddAddressForms = z.infer<typeof accountAddAddressSchema>;