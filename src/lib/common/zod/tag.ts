import { z } from "zod";

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().optional(),
});
