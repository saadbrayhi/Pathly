import "server-only";

import prisma from "@/lib/prisma";

const RESULTS_PER_TYPE = 5;

export async function searchCountries(query: string) {
  return prisma.country.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          languages: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      name: true,
      slug: true,
      description: true,
    },
    take: RESULTS_PER_TYPE,
    orderBy: {
      name: "asc",
    },
  });
}

export async function searchScholarships(query: string) {
  return prisma.scholarship.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          provider: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          funding: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          field: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          level: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      title: true,
      slug: true,
      provider: true,
      funding: true,
    },
    take: RESULTS_PER_TYPE,
    orderBy: {
      title: "asc",
    },
  });
}

export async function searchDocuments(query: string) {
  return prisma.documentGuide.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          neededFor: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      name: true,
      slug: true,
      description: true,
      neededFor: true,
    },
    take: RESULTS_PER_TYPE,
    orderBy: {
      name: "asc",
    },
  });
}

export async function searchVisaGuides(query: string) {
  return prisma.country.findMany({
    where: {
      visaType: {
        not: null,
      },
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          visaType: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          visaDescription: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          visaSummary: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      name: true,
      slug: true,
      visaType: true,
      visaDescription: true,
    },
    take: RESULTS_PER_TYPE,
    orderBy: {
      name: "asc",
    },
  });
}
