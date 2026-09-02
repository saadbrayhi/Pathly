import type { PrismaClient } from "../../src/generated/prisma/client";
import { visaDetails } from "../../src/constant/visa/visaDetails";

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

export async function seedVisaDetails(prisma: PrismaClient) {
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
