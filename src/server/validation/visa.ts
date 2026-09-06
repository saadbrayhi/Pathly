import { z } from "zod";

export const visaCountrySlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(
    /^[a-z0-9-]+$/,
    "Country slug must contain only lowercase letters, numbers, or hyphens",
  );
