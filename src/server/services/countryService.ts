import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  CountryFilter,
  findCountries,
  findCountryBySlug,
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
