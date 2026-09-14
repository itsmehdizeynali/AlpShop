import { z } from "zod";

export const accountInformationSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters"),
  lastName: z.string().min(1, "Last Name must be at least 1 characters"),
  code: z.string().min(1, "Code must be at least 1 characters"),
  phone: z.string().min(1, "Phone Number must be at least 1 characters"),
  address: z.string().min(1, "Address must be at least 1 characters"),
});

export type AccountInformationForms = z.infer<typeof accountInformationSchema>;