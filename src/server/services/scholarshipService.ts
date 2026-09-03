import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  CreateScholarshipInput,
  UpdateScholarshipInput,
  countScholarships,
  createScholarship as repoCreate,
  deleteScholarship as repoDelete,
  findScholarshipBySlug,
  findScholarships,
  updateScholarship as repoUpdate,
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

export async function getTotalScholarships() {
  return countScholarships();
}

export async function createScholarship(input: CreateScholarshipInput) {
  try {
    return await repoCreate(input);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      throw new ApiError({
        status: 409,
        code: "CONFLICT",
        message: "A scholarship with that slug already exists.",
      });
    }
    throw err;
  }
}

export async function updateScholarship(
  slug: string,
  input: UpdateScholarshipInput,
) {
  const existing = await findScholarshipBySlug(slug);
  if (!existing) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Scholarship not found.",
    });
  }

  try {
    return await repoUpdate(slug, input);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      throw new ApiError({
        status: 409,
        code: "CONFLICT",
        message: "A scholarship with that slug already exists.",
      });
    }
    throw err;
  }
}

export async function deleteScholarship(slug: string) {
  const existing = await findScholarshipBySlug(slug);
  if (!existing) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Scholarship not found.",
    });
  }
  return repoDelete(slug);
}

function isUniqueConstraintError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "P2002"
  );
}
