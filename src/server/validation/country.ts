import { z } from "zod";

export const countryListQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),
  language: z.string().trim().min(1).optional(),
});

export type CountryListQuery = z.infer<typeof countryListQuerySchema>;

const slugField = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(100)
  .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, digits, or hyphens");

export const createCountrySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  slug: slugField,
  flag: z.string().trim().max(10).optional().nullable(),
  image: z.string().trim().url("Image must be a valid URL").optional().nullable(),
  description: z.string().trim().max(2000).optional().nullable(),
  languages: z.string().trim().max(200).optional().nullable(),
  tuition: z.string().trim().max(200).optional().nullable(),
  livingCost: z.string().trim().max(200).optional().nullable(),
  tuitionRange: z.string().trim().max(200).optional().nullable(),
  overview: z.string().trim().max(5000).optional().nullable(),
  mainLanguage: z.string().trim().max(100).optional().nullable(),
  livingCostSummary: z.string().trim().max(500).optional().nullable(),
  educationSystem: z.string().trim().max(2000).optional().nullable(),
  whoCanApply: z.string().trim().max(2000).optional().nullable(),
  eligibilityWarning: z.string().trim().max(1000).optional().nullable(),
  languageWarning: z.string().trim().max(1000).optional().nullable(),
  languageOptions: z.array(z.string().trim().min(1)).optional(),
  studyLevelOptions: z.array(z.string().trim().min(1)).optional(),
});

export const updateCountrySchema = createCountrySchema.partial();

export type CreateCountryBody = z.infer<typeof createCountrySchema>;
export type UpdateCountryBody = z.infer<typeof updateCountrySchema>;