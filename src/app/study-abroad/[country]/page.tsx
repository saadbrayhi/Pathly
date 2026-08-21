import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "../../components/shared/Container";
import { countries } from "../../../constant/countries";

import CountryActions from "./componentss/CountryActions";
import CountryAdmissions from "./componentss/CountryAdmissions";
import CountryOverview from "./componentss/CountryOverview";
import CountryRequirements from "./componentss/CountryRequirements";
import CountrySectionNav from "./componentss/CountrySectionNav";
import CountrySources from "./componentss/CountrySources";
import CountryStudyInfo from "./componentss/CountryStudyInfo";

type CountryPageProps = {
  params: Promise<{
    country: string;
  }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;

  const country = countries.find((item) => item.slug === countrySlug);

  if (!country || !country.details) {
    notFound();
  }

  const details = country.details;

  return (
    <main className="relative min-h-screen bg-[#fafbf9]">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-125 w-125 rounded-full border border-[#e8eef7]" />

        <div className="absolute -right-20 top-20 h-87.5 w-87.5 rounded-full border border-[#edf2f8]" />

        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-[#edf3f4]" />
      </div>

      <Container className="relative z-10 py-14">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Home
          </Link>

          <ChevronRight size={14} className="text-[#9badc7]" />

          <Link
            href="/study-abroad"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Study Abroad
          </Link>

          <ChevronRight size={14} className="text-[#9badc7]" />

          <span className="font-semibold text-[#263a5b]">{country.name}</span>
        </div>

        {/* Country Overview */}
        <CountryOverview country={country} details={details} />

        {/* Sidebar + Content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[230px_1fr]">
          <CountrySectionNav />

          <div className="space-y-6">
            <CountryAdmissions details={details} />

            <CountryStudyInfo details={details} />

            <CountryRequirements details={details} countryName={country.name} />

            <CountrySources details={details} />

            <CountryActions countryName={country.name} />
          </div>
        </div>
      </Container>
    </main>
  );
}
