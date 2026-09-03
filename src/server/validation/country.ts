import { z } from "zod";

export const countryListQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),
  language: z.string().trim().min(1).optional(),
});

export type CountryListQuery = z.infer<typeof countryListQuerySchema>;