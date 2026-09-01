import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  RequirementStatus,
  DocumentCategory,
  PreparationLevel,
  DeadlineState,
  VerificationStatus,
} from "../src/generated/prisma/client";
import { countries } from "../src/constant/countries";
import { visaDetails } from "../src/constant/visa/visaDetails";
import { documents } from "../src/data/documents";
import { getDocumentGuide } from "../src/data/documentGuides";
import { scholarships } from "../src/constant/scholarships";
const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({
  adapter,
});
function mapRequirementStatus(status: string): RequirementStatus {
  switch (status) {
    case "Required":
      return RequirementStatus.REQUIRED;

    case "May be required":
      return RequirementStatus.MAY_BE_REQUIRED;

    case "Varies by institution":
      return RequirementStatus.VARIES;

    default:
      return RequirementStatus.OPTIONAL;
  }
}
function parseReviewedDate(value: string) {
  const [month, year] = value.split(" ");

  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return new Date(Date.UTC(Number(year), months[month], 1));
}
function mapDocumentCategory(category: string): DocumentCategory {
  switch (category) {
    case "Academic":
      return DocumentCategory.ACADEMIC;

    case "Personal":
      return DocumentCategory.PERSONAL;

    case "Application":
      return DocumentCategory.APPLICATION;

    case "Language":
      return DocumentCategory.LANGUAGE;

    case "Financial":
      return DocumentCategory.FINANCIAL;

    default:
      return DocumentCategory.APPLICATION;
  }
}

function mapPreparationLevel(level: string): PreparationLevel {
  switch (level) {
    case "Low":
      return PreparationLevel.LOW;

    case "Medium":
      return PreparationLevel.MEDIUM;

    case "High":
      return PreparationLevel.HIGH;

    default:
      return PreparationLevel.MEDIUM;
  }
}
function mapDeadlineState(status: string): DeadlineState {
  if (status === "Open") {
    return DeadlineState.OPEN;
  }

  return DeadlineState.UNKNOWN;
}
async function seedCountries() {
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
async function seedAdmissionRequirements() {
  console.log("Seeding admission requirements...");

  for (const country of countries) {
    const databaseCountry = await prisma.country.findUnique({
      where: {
        slug: country.slug,
      },
    });

    if (!databaseCountry || !country.details) {
      continue;
    }

    await prisma.admissionRequirement.deleteMany({
      where: {
        countryId: databaseCountry.id,
      },
    });

    await prisma.admissionRequirement.createMany({
      data: country.details.admissionRequirements.map((requirement, index) => ({
        label: requirement.label,
        status: mapRequirementStatus(requirement.status),
        sortOrder: index,
        countryId: databaseCountry.id,
      })),
    });

    console.log(`Admission requirements seeded: ${country.name}`);
  }
}
async function seedStudyLevelDetails() {
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
async function seedLanguageRequirements() {
  console.log("Seeding language requirements...");

  for (const country of countries) {
    const databaseCountry = await prisma.country.findUnique({
      where: {
        slug: country.slug,
      },
    });

    if (!databaseCountry || !country.details) {
      continue;
    }

    await prisma.languageRequirement.deleteMany({
      where: {
        countryId: databaseCountry.id,
      },
    });

    await prisma.languageRequirement.createMany({
      data: country.details.languageRequirements.map((requirement, index) => ({
        title: requirement.title,
        description: requirement.description,
        sortOrder: index,
        countryId: databaseCountry.id,
      })),
    });

    console.log(`Language requirements seeded: ${country.name}`);
  }
}
async function seedOfficialSources() {
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
async function seedVisaDetails() {
  console.log("Seeding visa details...");

  for (const visa of visaDetails) {
    await prisma.country.update({
      where: {
        slug: visa.slug,
      },
      data: {
        visaType: visa.visaType,
        visaDescription: visa.description,
        visaProcessingTime: visa.processingTime,
        visaAppointment: visa.appointment,
        visaEstimatedFee: visa.estimatedFee,
        visaFinancialProof: visa.financialProof,
        visaWarning: visa.warning,
        visaLastReviewedAt: parseReviewedDate(visa.lastReviewed),

        visaOfficialSourceLabel: visa.officialSource.label,
        visaOfficialSourceUrl: visa.officialSource.href,

        visaDocuments: visa.documents,
        visaSteps: visa.steps,
        visaCommonMistakes: visa.commonMistakes,
      },
    });

    console.log(`Visa details seeded: ${visa.country}`);
  }
}
async function seedDocumentGuides() {
  console.log("Seeding document guides...");

  for (const document of documents) {
    const guide = getDocumentGuide(document);

    const databaseDocument = await prisma.documentGuide.upsert({
      where: {
        slug: document.slug,
      },
      update: {
        name: document.name,
        category: mapDocumentCategory(document.category),
        description: document.description,
        neededFor: document.neededFor,
        preparation: mapPreparationLevel(document.preparation),
        translationRequired: document.translationRequired,
        authenticationRequired: document.authenticationRequired,
        whatItIs: guide.whatItIs,
        whyItIsNeeded: guide.whyItIsNeeded,
        structureNote: guide.structureNote,
        mistakes: guide.mistakes,
      },
      create: {
        slug: document.slug,
        name: document.name,
        category: mapDocumentCategory(document.category),
        description: document.description,
        neededFor: document.neededFor,
        preparation: mapPreparationLevel(document.preparation),
        translationRequired: document.translationRequired,
        authenticationRequired: document.authenticationRequired,
        whatItIs: guide.whatItIs,
        whyItIsNeeded: guide.whyItIsNeeded,
        structureNote: guide.structureNote,
        mistakes: guide.mistakes,
      },
    });

    await prisma.documentStructureStep.deleteMany({
      where: {
        documentGuideId: databaseDocument.id,
      },
    });

    if (guide.structure.length > 0) {
      await prisma.documentStructureStep.createMany({
        data: guide.structure.map((step, index) => ({
          title: step.title,
          description: step.description,
          sortOrder: index,
          documentGuideId: databaseDocument.id,
        })),
      });
    }

    console.log(`Document guide seeded: ${document.name}`);
  }
}
async function seedScholarships() {
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
async function seedScholarshipDeadlines() {
  console.log("Seeding scholarship deadlines...");

  for (const scholarship of scholarships) {
    const databaseScholarship = await prisma.scholarship.findUnique({
      where: {
        slug: scholarship.slug,
      },
    });

    if (!databaseScholarship) {
      continue;
    }

    await prisma.scholarshipDeadline.deleteMany({
      where: {
        scholarshipId: databaseScholarship.id,
      },
    });

    await prisma.scholarshipDeadline.create({
      data: {
        label: scholarship.title,
        displayText: scholarship.deadline,
        state: mapDeadlineState(scholarship.status),
        verificationStatus: VerificationStatus.NEEDS_VERIFICATION,
        sourceUrl: scholarship.officialUrl,
        scholarshipId: databaseScholarship.id,
      },
    });

    console.log(`Scholarship deadline seeded: ${scholarship.title}`);
  }
}
async function main() {
  console.log("Seed started...");

  await prisma.$queryRaw`SELECT 1`;
  console.log("Database connected successfully.");

  await seedCountries();
  await seedAdmissionRequirements();
  await seedStudyLevelDetails();
  await seedLanguageRequirements();
  await seedOfficialSources();
  await seedVisaDetails();
  await seedDocumentGuides();
  await seedScholarships();
  await seedScholarshipDeadlines();
  console.log("Seed finished.");
}
main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
