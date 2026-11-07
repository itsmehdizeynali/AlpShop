import { z } from "zod";

export const addAommentBoxSchema = z.object({
  content: z.string().min(1, "Content must be at least 1 characters").max(350, "Name must be at least 350 characters")
});

export type AddAommentBoxForms = z.infer<typeof addAommentBoxSchema>;