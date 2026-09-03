import "server-only";

import prisma from "@/lib/prisma";

export function findAllDocuments() {
  return prisma.documentGuide.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      description: true,
      neededFor: true,
      preparation: true,
      translationRequired: true,
      authenticationRequired: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export function findDocumentBySlug(slug: string) {
  return prisma.documentGuide.findUnique({
    where: {
      slug,
    },
    include: {
      structureSteps: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}