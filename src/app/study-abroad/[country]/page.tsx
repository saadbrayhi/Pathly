import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import axios from "axios";

import Container from "@/components/shared/Container";
import CountryActions from "@/components/study-abroad/CountryActions";
import CountryAdmissions from "@/components/study-abroad/CountryAdmissions";
import CountryOverview from "@/components/study-abroad/CountryOverview";
import CountryRequirements from "@/components/study-abroad/CountryRequirements";
import CountrySectionNav from "@/components/study-abroad/CountrySectionNav";
import CountrySources from "@/components/study-abroad/CountrySources";
import CountryStudyInfo from "@/components/study-abroad/CountryStudyInfo";

import { getCountryBySlug } from "@/server/services/countryService";

type CountryPageProps = {
  params: Promise<{
    country: string;
  }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;

  let country;

  try {
    country = await getCountryBySlug(countrySlug);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  const details = country;

  return (
    <main className="pathly-page relative">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-125 w-125 rounded-full border border-[#e8eef7]" />

        <div className="absolute -right-20 top-20 h-87.5 w-87.5 rounded-full border border-[#edf2f8]" />

        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-[#edf3f4]" />
      </div>

      <Container className="relative z-10 py-14">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-7">
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>

          <ChevronRight size={14} className="breadcrumb-separator" />

          <Link href="/study-abroad" className="breadcrumb-link">
            Study Abroad
          </Link>

          <ChevronRight size={14} className="breadcrumb-separator" />

          <span className="breadcrumb-current">{country.name}</span>
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
