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
