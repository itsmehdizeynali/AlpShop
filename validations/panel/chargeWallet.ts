import { z } from "zod";

export const walletSchema = z.object({
  amount: z.string().min(1,"minimum $1"),
})

export type WalletForms = z.infer<typeof walletSchema>;