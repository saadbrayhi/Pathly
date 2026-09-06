import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import VisaSupportCTA from "@/components/student-visa/VisaSupportCTA";
import VisaRelatedLinks from "@/components/student-visa/VisaRelatedLinks";
import VisaPageBackground from "@/components/student-visa/VisaPageBackground";
import VisaDetails from "@/components/student-visa/VisaDetails";

import { getVisaByCountrySlug } from "@/server/services/visaService";

export const dynamic = "force-dynamic";

type StudentVisaCountryPageProps = {
  params: Promise<{
    country: string;
  }>;
};

export default async function StudentVisaCountryPage({
  params,
}: StudentVisaCountryPageProps) {
  const { country } = await params;

  const apiVisa = await getVisaByCountrySlug(country);

  if (!apiVisa) {
    notFound();
  }

  const visa = {
    slug: apiVisa.slug,
    country: apiVisa.name,
    flag: apiVisa.flag ?? "",
    visaType: apiVisa.visaType ?? "Not available",
    appointment: apiVisa.visaAppointment ?? "Not available",

    lastReviewed: apiVisa.visaLastReviewedAt
      ? new Date(apiVisa.visaLastReviewedAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Not available",

    processingTime: apiVisa.visaProcessingTime ?? "Not available",
    estimatedFee: apiVisa.visaEstimatedFee ?? "Not available",
    financialProof: apiVisa.visaFinancialProof ?? "Not available",
    description: apiVisa.visaDescription ?? "",

    documents: apiVisa.visaDocuments ?? [],
    steps: apiVisa.visaSteps ?? [],
    warning: apiVisa.visaWarning ?? "",
    commonMistakes: apiVisa.visaCommonMistakes ?? [],

    officialSource: {
      label: apiVisa.visaOfficialSourceLabel ?? "Official source",
      href: apiVisa.visaOfficialSourceUrl ?? "#",
    },
  };

  return (
    <main className="warm-page relative overflow-hidden py-10">
      <VisaPageBackground />

      <div className="relative z-10">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>

              <span>›</span>

              <Link
                href="/student-visa"
                className="transition-colors hover:text-primary"
              >
                Student Visa
              </Link>

              <span>›</span>

              <span className="font-semibold text-heading">
                {visa.country} Visa Guide
              </span>
            </div>

            <VisaDetails visa={visa} />

            <div className="mt-6 space-y-6">
              <VisaSupportCTA />
              <VisaRelatedLinks />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
