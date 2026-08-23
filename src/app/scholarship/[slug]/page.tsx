import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/shared/Container";

import { scholarships } from "@/constant/scholarships";

import ScholarshipApplicationSteps from "@/components/scholarship/ScholarshipApplicationSteps";
import ScholarshipCommonMistakes from "@/components/scholarship/ScholarshipCommonMistakes";
import ScholarshipDocuments from "@/components/scholarship/ScholarshipDocuments";
import ScholarshipHeader from "@/components/scholarship/ScholarshipHeader";
import ScholarshipHelpCta from "@/components/scholarship/ScholarshipHelpCta";
import ScholarshipMainSections from "@/components/scholarship/ScholarshipMainSections";
import ScholarshipSidebar from "@/components/scholarship/ScholarshipSidebar";

type ScholarshipDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ScholarshipDetailsPage({
  params,
}: ScholarshipDetailsPageProps) {
  const { slug } = await params;

  const scholarship = scholarships.find((item) => item.slug === slug);

  if (!scholarship) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafbf9]">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-40 top-0 h-120 w-120 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute left-10 top-8 grid grid-cols-4 gap-4 opacity-70">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-44 -left-44 h-120 w-120 rounded-full bg-[#eef2f3]" />

      <div className="pointer-events-none absolute -bottom-32 -right-28 h-96 w-96 rounded-full border border-[#e8eef7]" />

      <Container className="relative z-10 py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Home
          </Link>

          <ChevronRight size={14} className="text-[#9badc7]" />

          <Link
            href="/scholarship"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Scholarships
          </Link>

          <ChevronRight size={14} className="text-[#9badc7]" />

          <span className="font-semibold text-[#263a5b]">
            {scholarship.title}
          </span>
        </div>

        {/* Scholarship header */}
        <ScholarshipHeader scholarship={scholarship} />

        {/* Main content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left column */}
          <div className="space-y-5">
            <ScholarshipMainSections scholarship={scholarship} />

            <ScholarshipDocuments scholarship={scholarship} />

            <ScholarshipApplicationSteps scholarship={scholarship} />

            <ScholarshipHelpCta />

            <ScholarshipCommonMistakes scholarship={scholarship} />
          </div>

          {/* Right column */}
          <div>
            <ScholarshipSidebar scholarship={scholarship} />
          </div>
        </div>
      </Container>
    </main>
  );
}
