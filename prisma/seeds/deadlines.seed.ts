import {
  DeadlineState,
  VerificationStatus,
  type PrismaClient,
} from "../../src/generated/prisma/client";
import { scholarships } from "./data/scholarships";
function mapDeadlineState(status: string): DeadlineState {
  if (status === "Open") {
    return DeadlineState.OPEN;
  }

  return DeadlineState.UNKNOWN;
}

export async function seedScholarshipDeadlines(prisma: PrismaClient) {
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
