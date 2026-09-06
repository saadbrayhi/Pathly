import { z } from "zod";

export const aiNavigatorRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(3, "Prompt must be at least 3 characters")
    .max(1500, "Prompt must be at most 1500 characters"),

  currentCountry: z.string().trim().max(100).optional(),

  educationLevel: z.string().trim().max(100).optional(),

  desiredDegree: z.string().trim().max(100).optional(),
  fieldOfStudy: z.string().trim().max(100).optional(),
});

export const aiNavigatorGuidanceSchema = z.object({
  path: z.string().min(1),

  levels: z.array(z.string()),

  destinations: z.array(
    z.object({
      name: z.string().min(1),
      flag: z.string(),
      note: z.string(),
    }),
  ),

  admission: z.array(z.string()),

  documents: z.array(z.string()),

  scholarships: z.array(z.string()),

  visa: z.string(),

  language: z.string(),

  nextSteps: z.array(
    z.object({
      label: z.string().min(1),
      href: z.enum([
        "/study-abroad",
        "/scholarship",
        "/documents",
        "/student-visa",
        "/find-my-path",
      ]),
    }),
  ),
});
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }

  throw lastError;
}

export type AINavigatorRequestInput = z.infer<typeof aiNavigatorRequestSchema>;
