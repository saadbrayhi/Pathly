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
