import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  findScholarshipBySlug,
  findScholarships,
} from "@/server/repositories/scholarshipRepository";
import type { ScholarshipQuery } from "@/server/validation/scholarship";

export async function getScholarships(filters: ScholarshipQuery) {
  return findScholarships(filters);
}

export async function getScholarshipBySlug(slug: string) {
  const scholarship = await findScholarshipBySlug(slug);

  if (!scholarship) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Scholarship not found.",
    });
  }

  return scholarship;
}
