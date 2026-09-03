import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import type { ScholarshipQuery } from "@/server/validation/scholarship";

export async function findScholarships(filters: ScholarshipQuery) {
  const conditions: Prisma.ScholarshipWhereInput[] = [];

  if (filters.search) {
    conditions.push({
      OR: [
        {
          title: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          provider: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          scopeLabel: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          level: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          field: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (filters.destination) {
    conditions.push({
      OR: [
        {
          scopeLabel: {
            equals: filters.destination,
            mode: "insensitive",
          },
        },
        {
          countries: {
            some: {
              name: {
                equals: filters.destination,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }

  if (filters.degree) {
    conditions.push({
      level: {
        contains: filters.degree,
        mode: "insensitive",
      },
    });
  }

  if (filters.field) {
    conditions.push({
      field: {
        contains: filters.field,
        mode: "insensitive",
      },
    });
  }

  if (filters.funding) {
    if (filters.funding === "fully-funded") {
      conditions.push({
        OR: [
          {
            funding: {
              contains: "fully funded",
              mode: "insensitive",
            },
          },
          {
            funding: {
              contains: "full tuition",
              mode: "insensitive",
            },
          },
        ],
      });
    } else {
      conditions.push({
        funding: {
          contains: filters.funding,
          mode: "insensitive",
        },
      });
    }
  }

  return prisma.scholarship.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    include: {
      countries: true,
      deadlines: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      title: "asc",
    },
  });
}

export async function findScholarshipBySlug(slug: string) {
  return prisma.scholarship.findUnique({
    where: {
      slug,
    },
    include: {
      countries: true,
      deadlines: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export type CreateScholarshipInput = {
  title: string;
  slug: string;
  image?: string | null;
  flag?: string | null;
  scopeLabel?: string | null;
  provider?: string | null;
  level?: string | null;
  field?: string | null;
  funding?: string | null;
  overview?: string | null;
  whoCanApply?: string | null;
  eligibilityNote?: string | null;
  fundingCoverage?: string | null;
  fundingNote?: string | null;
  officialUrl?: string | null;
  countryIds?: string[];
};

export type UpdateScholarshipInput = Partial<CreateScholarshipInput>;

export async function createScholarship(input: CreateScholarshipInput) {
  return prisma.scholarship.create({
    data: {
      title: input.title,
      slug: input.slug,
      image: input.image ?? null,
      flag: input.flag ?? null,
      scopeLabel: input.scopeLabel ?? null,
      provider: input.provider ?? null,
      level: input.level ?? null,
      field: input.field ?? null,
      funding: input.funding ?? null,
      overview: input.overview ?? null,
      whoCanApply: input.whoCanApply ?? null,
      eligibilityNote: input.eligibilityNote ?? null,
      fundingCoverage: input.fundingCoverage ?? null,
      fundingNote: input.fundingNote ?? null,
      officialUrl: input.officialUrl ?? null,
      countries:
        input.countryIds && input.countryIds.length > 0
          ? { connect: input.countryIds.map((id) => ({ id })) }
          : undefined,
    },
    include: { countries: true, deadlines: true },
  });
}

export async function updateScholarship(
  slug: string,
  input: UpdateScholarshipInput,
) {
  const data: Prisma.ScholarshipUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.slug !== undefined) data.slug = input.slug;
  if (input.image !== undefined) data.image = input.image;
  if (input.flag !== undefined) data.flag = input.flag;
  if (input.scopeLabel !== undefined) data.scopeLabel = input.scopeLabel;
  if (input.provider !== undefined) data.provider = input.provider;
  if (input.level !== undefined) data.level = input.level;
  if (input.field !== undefined) data.field = input.field;
  if (input.funding !== undefined) data.funding = input.funding;
  if (input.overview !== undefined) data.overview = input.overview;
  if (input.whoCanApply !== undefined) data.whoCanApply = input.whoCanApply;
  if (input.eligibilityNote !== undefined) data.eligibilityNote = input.eligibilityNote;
  if (input.fundingCoverage !== undefined) data.fundingCoverage = input.fundingCoverage;
  if (input.fundingNote !== undefined) data.fundingNote = input.fundingNote;
  if (input.officialUrl !== undefined) data.officialUrl = input.officialUrl;
  if (input.countryIds !== undefined) {
    data.countries = { set: input.countryIds.map((id) => ({ id })) };
  }

  return prisma.scholarship.update({
    where: { slug },
    data,
    include: { countries: true, deadlines: true },
  });
}

export async function deleteScholarship(slug: string) {
  return prisma.scholarship.delete({
    where: { slug },
  });
}

export async function countScholarships(): Promise<number> {
  return prisma.scholarship.count();
}
