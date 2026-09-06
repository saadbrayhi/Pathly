import "server-only";

import prisma from "@/lib/prisma";

const studyPathCountryInclude = {
  admissionRequirements: {
    orderBy: { sortOrder: "asc" as const },
  },
  studyLevelDetails: {
    orderBy: { sortOrder: "asc" as const },
  },
  languageRequirements: {
    orderBy: { sortOrder: "asc" as const },
  },
  officialSources: {
    orderBy: { sortOrder: "asc" as const },
  },
  scholarships: {
    include: {
      deadlines: {
        orderBy: { sortOrder: "asc" as const },
      },
    },
  },
};

export function findStudyPathCountries(destination?: string) {
  return prisma.country.findMany({
    where: destination ? { slug: destination } : undefined,
    include: studyPathCountryInclude,
    orderBy: { name: "asc" },
  });
}

export function createStudyPathRequestRecord(input: {
  educationLevel: string;
  desiredDegree: string;
  fieldOfStudy: string;
  destinationValue: string;
  countryId: string;
}) {
  return prisma.studyPathRequest.create({
    data: input,
    select: {
      id: true,
      createdAt: true,
    },
  });
}
