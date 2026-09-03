import "server-only";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export type CountryFilter = {
  search?: string;
  language?: string;
};

export async function findCountries(filter: CountryFilter) {
  const { search, language } = filter;
  const countries = await prisma.country.findMany({
    where: {
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
      ...(language
        ? {
            languages: {
              contains: language,
              mode: "insensitive",
            },
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      slug: true,
      flag: true,
      image: true,
      description: true,

      languages: true,
      languageOptions: true,
      studyLevelOptions: true,

      tuition: true,
      tuitionRange: true,
      livingCost: true,
    },

    orderBy: {
      name: "asc",
    },
  });

  const countriesWithScholarships = new Set<string>();

  for (const country of countries) {
    const scholarship = await prisma.scholarship.findFirst({
      where: {
        countries: {
          some: {
            slug: country.slug,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (scholarship) {
      countriesWithScholarships.add(country.slug);
    }
  }

  return countries.map((country) => ({
    ...country,
    scholarshipAvailable: countriesWithScholarships.has(country.slug),
  }));
}

export async function findCountryBySlug(slug: string) {
  const country = await prisma.country.findUnique({
    where: {
      slug,
    },
  });

  if (!country) {
    return null;
  }
  const scholarship = await prisma.scholarship.findFirst({
    where: {
      countries: {
        some: {
          slug: country.slug,
        },
      },
    },
    select: {
      id: true,
    },
  });

  const [
    admissionRequirements,
    studyLevelDetails,
    languageRequirements,
    officialSources,
  ] = await Promise.all([
    prisma.admissionRequirement.findMany({
      where: {
        countryId: country.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        label: true,
        status: true,
        sortOrder: true,
      },
    }),

    prisma.studyLevelDetail.findMany({
      where: {
        countryId: country.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        level: true,
        duration: true,
        language: true,
        tuition: true,
        note: true,
        sortOrder: true,
      },
    }),

    prisma.languageRequirement.findMany({
      where: {
        countryId: country.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        sortOrder: true,
      },
    }),

    prisma.officialSource.findMany({
      where: {
        countryId: country.id,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        sortOrder: true,
      },
    }),
    prisma.scholarship.findFirst({
      where: {
        countries: {
          some: {
            slug: country.slug,
          },
        },
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    ...country,
    scholarshipAvailable: Boolean(scholarship),
    admissionRequirements,
    studyLevelDetails,
    languageRequirements,
    officialSources,
  };
}

export type CreateCountryInput = {
  name: string;
  slug: string;
  flag?: string | null;
  image?: string | null;
  description?: string | null;
  languages?: string | null;
  tuition?: string | null;
  livingCost?: string | null;
  tuitionRange?: string | null;
  overview?: string | null;
  mainLanguage?: string | null;
  livingCostSummary?: string | null;
  educationSystem?: string | null;
  whoCanApply?: string | null;
  eligibilityWarning?: string | null;
  languageWarning?: string | null;
  languageOptions?: string[];
  studyLevelOptions?: string[];
};

export type UpdateCountryInput = Partial<CreateCountryInput>;

export async function createCountry(input: CreateCountryInput) {
  return prisma.country.create({
    data: {
      name: input.name,
      slug: input.slug,
      flag: input.flag ?? null,
      image: input.image ?? null,
      description: input.description ?? null,
      languages: input.languages ?? null,
      tuition: input.tuition ?? null,
      livingCost: input.livingCost ?? null,
      tuitionRange: input.tuitionRange ?? null,
      overview: input.overview ?? null,
      mainLanguage: input.mainLanguage ?? null,
      livingCostSummary: input.livingCostSummary ?? null,
      educationSystem: input.educationSystem ?? null,
      whoCanApply: input.whoCanApply ?? null,
      eligibilityWarning: input.eligibilityWarning ?? null,
      languageWarning: input.languageWarning ?? null,
      languageOptions: input.languageOptions ?? [],
      studyLevelOptions: input.studyLevelOptions ?? [],
    },
  });
}

export async function updateCountry(
  slug: string,
  input: UpdateCountryInput,
) {
  const data: Prisma.CountryUpdateInput = {};

  if (input.name !== undefined) data.name = input.name;
  if (input.slug !== undefined) data.slug = input.slug;
  if (input.flag !== undefined) data.flag = input.flag;
  if (input.image !== undefined) data.image = input.image;
  if (input.description !== undefined) data.description = input.description;
  if (input.languages !== undefined) data.languages = input.languages;
  if (input.tuition !== undefined) data.tuition = input.tuition;
  if (input.livingCost !== undefined) data.livingCost = input.livingCost;
  if (input.tuitionRange !== undefined) data.tuitionRange = input.tuitionRange;
  if (input.overview !== undefined) data.overview = input.overview;
  if (input.mainLanguage !== undefined) data.mainLanguage = input.mainLanguage;
  if (input.livingCostSummary !== undefined) data.livingCostSummary = input.livingCostSummary;
  if (input.educationSystem !== undefined) data.educationSystem = input.educationSystem;
  if (input.whoCanApply !== undefined) data.whoCanApply = input.whoCanApply;
  if (input.eligibilityWarning !== undefined) data.eligibilityWarning = input.eligibilityWarning;
  if (input.languageWarning !== undefined) data.languageWarning = input.languageWarning;
  if (input.languageOptions !== undefined) data.languageOptions = input.languageOptions;
  if (input.studyLevelOptions !== undefined) data.studyLevelOptions = input.studyLevelOptions;

  return prisma.country.update({
    where: { slug },
    data,
  });
}

export async function deleteCountry(slug: string) {
  return prisma.country.delete({
    where: { slug },
  });
}

export async function countCountries(): Promise<number> {
  return prisma.country.count();
}
