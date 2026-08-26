import { z } from "zod";

export const adminChallengeSchema = z.object({
  title: z.string().min(3,"Title must be at least 3 characters").max(100,"maximum 100 characters"),
  description: z.string().max(450,"maximum 450 characters").optional(),
  price: z.string(),
  target: z.string(),
  duration: z.string(),
  reward: z.string(),
})

export type AdminChallengeForms = z.infer<typeof adminChallengeSchema>;