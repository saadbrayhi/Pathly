import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

const visaSelect = {
  id: true,
  name: true,
  slug: true,
  flag: true,
  image: true,

  visaType: true,
  visaSummary: true,
  visaDescription: true,
  visaProcessingTime: true,
  visaAppointment: true,
  visaEstimatedFee: true,
  visaFinancialProof: true,
  visaWarning: true,
  visaLastReviewedAt: true,
  visaOfficialSourceLabel: true,
  visaOfficialSourceUrl: true,

  visaDocuments: true,
  visaSteps: true,
  visaCommonMistakes: true,
} satisfies Prisma.CountrySelect;

export async function findVisas() {
  return prisma.country.findMany({
    where: {
      visaType: {
        not: null,
      },
    },
    select: visaSelect,
    orderBy: {
      name: "asc",
    },
  });
}

export async function findVisaByCountrySlug(slug: string) {
  return prisma.country.findUnique({
    where: {
      slug,
    },
    select: visaSelect,
  });
}
