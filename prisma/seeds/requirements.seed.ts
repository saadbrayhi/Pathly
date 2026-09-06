import {
  RequirementStatus,
  type PrismaClient,
} from "../../src/generated/prisma/client";
import { countries } from "./data/countries";

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

export async function seedAdmissionRequirements(prisma: PrismaClient) {
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

export async function seedLanguageRequirements(prisma: PrismaClient) {
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
