import { z } from "zod";

const optionalFilter = z.string().trim().min(1).max(100).optional();

export const scholarshipQuerySchema = z
  .object({
    search: optionalFilter,
    destination: optionalFilter,
    degree: optionalFilter,
    field: optionalFilter,
    funding: optionalFilter,
  })
  .strict();

export const scholarshipSlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/);

export type ScholarshipQuery = z.infer<typeof scholarshipQuerySchema>;

const optionalNullableStr = (max: number) =>
  z.string().trim().max(max).optional().nullable();

export const createScholarshipSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, digits, or hyphens"),
  image: optionalNullableStr(500),
  flag: z.string().trim().max(10).optional().nullable(),
  scopeLabel: optionalNullableStr(200),
  provider: optionalNullableStr(300),
  level: optionalNullableStr(200),
  field: optionalNullableStr(200),
  funding: optionalNullableStr(300),
  overview: optionalNullableStr(5000),
  whoCanApply: optionalNullableStr(2000),
  eligibilityNote: optionalNullableStr(2000),
  fundingCoverage: optionalNullableStr(2000),
  fundingNote: optionalNullableStr(1000),
  officialUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .optional()
    .nullable(),
  countryIds: z.array(z.string().uuid()).optional(),
});

export const updateScholarshipSchema = createScholarshipSchema.partial();

export type CreateScholarshipBody = z.infer<typeof createScholarshipSchema>;
export type UpdateScholarshipBody = z.infer<typeof updateScholarshipSchema>;

