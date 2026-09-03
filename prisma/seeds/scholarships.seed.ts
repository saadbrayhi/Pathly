import type { PrismaClient } from "../../src/generated/prisma/client";
import { scholarships } from "./data/scholarships";
export async function seedScholarships(prisma: PrismaClient) {
  console.log("Seeding scholarships...");

  for (const scholarship of scholarships) {
    const databaseCountry = await prisma.country.findUnique({
      where: {
        name: scholarship.country,
      },
    });

    const databaseScholarship = await prisma.scholarship.upsert({
      where: {
        slug: scholarship.slug,
      },
      update: {
        title: scholarship.title,
        image: scholarship.image,
        flag: scholarship.flag,
        scopeLabel: scholarship.country,
        provider: scholarship.provider,
        level: scholarship.level,
        field: scholarship.field,
        funding: scholarship.funding,
        overview: scholarship.overview,
        whoCanApply: scholarship.whoCanApply,
        eligibilityNote: scholarship.eligibilityNote,
        fundingCoverage: scholarship.fundingCoverage,
        fundingNote: scholarship.fundingNote,
        officialUrl: scholarship.officialUrl,
        requiredDocuments: scholarship.requiredDocuments,
        applicationSteps: scholarship.applicationSteps,
        commonMistakes: scholarship.commonMistakes,
      },
      create: {
        slug: scholarship.slug,
        title: scholarship.title,
        image: scholarship.image,
        flag: scholarship.flag,
        scopeLabel: scholarship.country,
        provider: scholarship.provider,
        level: scholarship.level,
        field: scholarship.field,
        funding: scholarship.funding,
        overview: scholarship.overview,
        whoCanApply: scholarship.whoCanApply,
        eligibilityNote: scholarship.eligibilityNote,
        fundingCoverage: scholarship.fundingCoverage,
        fundingNote: scholarship.fundingNote,
        officialUrl: scholarship.officialUrl,
        requiredDocuments: scholarship.requiredDocuments,
        applicationSteps: scholarship.applicationSteps,
        commonMistakes: scholarship.commonMistakes,
      },
    });

    await prisma.scholarship.update({
      where: {
        id: databaseScholarship.id,
      },
      data: {
        countries: databaseCountry
          ? {
              set: [{ id: databaseCountry.id }],
            }
          : {
              set: [],
            },
      },
    });

    console.log(`Scholarship seeded: ${scholarship.title}`);
  }
}
