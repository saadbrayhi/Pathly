import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "../../components/shared/Container";
import VisaDetails from "../../components/student-visa/VisaDetails";
import VisaSupportCTA from "../../components/student-visa/VisaSupportCTA";
import VisaRelatedLinks from "../../components/student-visa/VisaRelatedLinks";
import VisaPageBackground from "../../components/student-visa/VisaPageBackground";

import { visaDetails } from "@/constant/visa/visaDetails";

type StudentVisaCountryPageProps = {
  params: Promise<{
    country: string;
  }>;
};

export default async function StudentVisaCountryPage({
  params,
}: StudentVisaCountryPageProps) {
  const { country } = await params;

  const visa = visaDetails.find((item) => item.slug === country);

  if (!visa) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-warm-surface py-10">
      <VisaPageBackground />

      <div className="relative z-10">
        <Container>
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
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

            {/* Main visa guide */}
            <VisaDetails visa={visa} />

            {/* Bottom sections */}
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
