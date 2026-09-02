import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  seedCountries,
  seedOfficialSources,
  seedStudyLevelDetails,
} from "./seeds/countries.seed";
import { seedScholarshipDeadlines } from "./seeds/deadlines.seed";
import { seedDocumentGuides } from "./seeds/documents.seed";
import {
  seedAdmissionRequirements,
  seedLanguageRequirements,
} from "./seeds/requirements.seed";
import { seedScholarships } from "./seeds/scholarships.seed";
import { seedVisaDetails } from "./seeds/visa.seed";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seed started...");

  await prisma.$queryRaw`SELECT 1`;
  console.log("Database connected successfully.");

  await seedCountries(prisma);
  await seedAdmissionRequirements(prisma);
  await seedStudyLevelDetails(prisma);
  await seedLanguageRequirements(prisma);
  await seedOfficialSources(prisma);
  await seedVisaDetails(prisma);
  await seedDocumentGuides(prisma);
  await seedScholarships(prisma);
  await seedScholarshipDeadlines(prisma);
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
