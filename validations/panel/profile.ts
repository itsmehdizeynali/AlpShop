import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().max(200, "bio maximum 3 characters"),
  email: z.string().email("Invalid email address"),
})

export type ProfileForms = z.infer<typeof profileSchema>;