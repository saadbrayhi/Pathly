import "server-only";
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
