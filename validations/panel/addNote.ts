import { z } from "zod";

export const AddNoteSchema = z.object({
  title: z.string().min(3, "Note title must be at least 3 characters").max(50, "Note title maximum 50 characters"),
  content: z.string().min(3, "Note content must be at least 3 characters").max(450, "Note content maximum 450 characters")
})

export type AddNoteForms = z.infer<typeof AddNoteSchema>;