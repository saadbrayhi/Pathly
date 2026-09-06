import { z } from "zod";

const educationLevels = [
  "high-school",
  "bachelor-student",
  "bachelor-graduate",
  "master-student",
  "master-graduate",
] as const;

const degreeOptions = ["bachelor", "master", "phd", "exchange"] as const;

const preferredCountries = [
  "france",
  "germany",
  "italy",
  "canada",
  "turkey",
  "netherlands",
  "spain",
  "not-sure",
] as const;

const helpTypes = [
  "university-application",
  "scholarship-application",
  "documents",
  "student-visa",
  "complete-process",
  "other",
] as const;

const optionalEnum = <TValues extends readonly [string, ...string[]]>(
  values: TValues,
) => z.union([z.enum(values), z.literal("")]).optional();

const optionalPhoneSchema = z
  .string()
  .trim()
  .max(30, "Phone number must be at most 30 characters")
  .refine(
    (value) =>
      value.length === 0 ||
      (/^[+\d\s()./#xX-]+$/.test(value) && value.replace(/\D/g, "").length >= 7),
    "Enter a valid phone or WhatsApp number",
  )
  .optional();

export const createPersonalSupportSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(120, "Full name must be at most 120 characters"),
    email: z
      .string()
      .trim()
      .max(254, "Email must be at most 254 characters")
      .email("Enter a valid email address")
      .transform((value) => value.toLowerCase()),
    phone: optionalPhoneSchema,
    currentCountry: z
      .string()
      .trim()
      .min(2, "Current country is required")
      .max(100, "Current country must be at most 100 characters"),
    educationLevel: z.enum(educationLevels, {
      error: "Select your current education level",
    }),
    desiredDegree: optionalEnum(degreeOptions),
    preferredCountry: optionalEnum(preferredCountries),
    fieldOfStudy: z
      .string()
      .trim()
      .min(2, "Field of study is required")
      .max(150, "Field of study must be at most 150 characters"),
    helpType: z.enum(helpTypes, {
      error: "Select the type of help you need",
    }),
    target: z
      .string()
      .trim()
      .min(2, "Target university, scholarship, or goal is required")
      .max(250, "Target must be at most 250 characters"),
    deadline: z
      .string()
      .trim()
      .min(2, "Deadline is required")
      .max(100, "Deadline must be at most 100 characters"),
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters")
      .max(5000, "Description must be at most 5000 characters"),
  })
  .strict();

export type CreatePersonalSupportInput = z.infer<
  typeof createPersonalSupportSchema
>;
