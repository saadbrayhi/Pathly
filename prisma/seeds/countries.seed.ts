import type { PrismaClient } from "../../src/generated/prisma/client";
import { countries } from "../../src/constant/countries";

export async function seedCountries(prisma: PrismaClient) {
  console.log("Seeding countries...");

  for (const country of countries) {
    const data = {
      name: country.name,
      flag: country.flag,
      image: country.image,
      description: country.description,

      languages: country.languages,
      tuition: country.tuition,
      livingCost: country.livingCost,
      tuitionRange: country.tuitionRange,

      languageOptions: country.languageOptions,
      studyLevelOptions: country.studyLevelOptions,

      overview: country.details?.overview,
      mainLanguage: country.details?.mainLanguage,
      livingCostSummary: country.details?.livingCostSummary,
      educationSystem: country.details?.educationSystem,
      whoCanApply: country.details?.whoCanApply,
      eligibilityWarning: country.details?.eligibilityWarning,
      languageWarning: country.details?.languageWarning,

      visaType: country.details?.visaType,
      visaSummary: country.details?.visaSummary,
      visaWarning: country.details?.visaWarning,

      requiredDocuments: country.details?.requiredDocuments ?? [],
      commonMistakes: country.details?.commonMistakes ?? [],
      scholarshipNotes: country.details?.scholarships ?? [],
    };

    await prisma.country.upsert({
      where: {
        slug: country.slug,
      },
      update: data,
      create: {
        slug: country.slug,
        ...data,
      },
    });

    console.log(`Seeded: ${country.name}`);
  }
}

export async function seedStudyLevelDetails(prisma: PrismaClient) {
  console.log("Seeding study level details...");

  for (const country of countries) {
    const databaseCountry = await prisma.country.findUnique({
      where: {
        slug: country.slug,
      },
    });

    if (!databaseCountry || !country.details) {
      continue;
    }

    await prisma.studyLevelDetail.deleteMany({
      where: {
        countryId: databaseCountry.id,
      },
    });

    await prisma.studyLevelDetail.createMany({
      data: country.details.studyLevelDetails.map((studyLevel, index) => ({
        level: studyLevel.level,
        duration: studyLevel.duration,
        language: studyLevel.language,
        tuition: studyLevel.tuition,
        note: studyLevel.note,
        sortOrder: index,
        countryId: databaseCountry.id,
      })),
    });

    console.log(`Study levels seeded: ${country.name}`);
  }
}

export async function seedOfficialSources(prisma: PrismaClient) {
  console.log("Seeding official sources...");

  for (const country of countries) {
    const databaseCountry = await prisma.country.findUnique({
      where: {
        slug: country.slug,
      },
    });

    if (!databaseCountry || !country.details) {
      continue;
    }

    await prisma.officialSource.deleteMany({
      where: {
        countryId: databaseCountry.id,
      },
    });

    const sourcesWithUrl = country.details.officialSources.filter(
      (source) => source.url,
    );

    if (sourcesWithUrl.length > 0) {
      await prisma.officialSource.createMany({
        data: sourcesWithUrl.map((source, index) => ({
          name: source.name,
          description: source.description,
          url: source.url!,
          sortOrder: index,
          countryId: databaseCountry.id,
        })),
      });
    }

    console.log(`Official sources seeded: ${country.name}`);
  }
}
