import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  CountryFilter,
  CreateCountryInput,
  UpdateCountryInput,
  countCountries,
  createCountry as repoCreate,
  deleteCountry as repoDelete,
  findCountries,
  findCountryBySlug,
  updateCountry as repoUpdate,
} from "@/server/repositories/countryRepository";

export async function getCountries(filters: CountryFilter = {}) {
  return findCountries(filters);
}

export async function getCountryBySlug(slug: string) {
  const country = await findCountryBySlug(slug);

  if (!country) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: `Country '${slug}' was not found.`,
    });
  }

  return country;
}

export async function getTotalCountries() {
  return countCountries();
}

export async function createCountry(input: CreateCountryInput) {
  try {
    return await repoCreate(input);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      throw new ApiError({
        status: 409,
        code: "CONFLICT",
        message: "A country with that name or slug already exists.",
      });
    }
    throw err;
  }
}

export async function updateCountry(slug: string, input: UpdateCountryInput) {
  const existing = await findCountryBySlug(slug);
  if (!existing) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: `Country '${slug}' was not found.`,
    });
  }

  try {
    return await repoUpdate(slug, input);
  } catch (err: unknown) {
    if (isUniqueConstraintError(err)) {
      throw new ApiError({
        status: 409,
        code: "CONFLICT",
        message: "A country with that name or slug already exists.",
      });
    }
    throw err;
  }
}

export async function deleteCountry(slug: string) {
  const existing = await findCountryBySlug(slug);
  if (!existing) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: `Country '${slug}' was not found.`,
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
