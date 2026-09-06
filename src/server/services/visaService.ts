import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  findVisaByCountrySlug,
  findVisas,
} from "@/server/repositories/visaRepository";

export async function getVisas() {
  return findVisas();
}

export async function getVisaByCountrySlug(slug: string) {
  const visa = await findVisaByCountrySlug(slug);

  if (!visa || !visa.visaType) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Visa guide not found.",
    });
  }

  return visa;
}
