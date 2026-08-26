import { z } from "zod";

export const challengePaymentSchema = z.object({
  amount: z.string().min(1,"minimum 1$"),
})

export type ChallengePaymentForms = z.infer<typeof challengePaymentSchema>;