import { z } from "zod";

export const searchQuerySchema = z
  .object({
    q: z.string().trim().max(100).optional().default(""),
  })
  .strict();

export type SearchQuery = z.infer<typeof searchQuerySchema>;
