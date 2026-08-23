import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Container from "@/components/shared/Container";

import HowItWorksStep from "@/components/how-it-works/HowItWorksStep";
import TrustSection from "@/components/how-it-works/TrustSection";
import HowItWorksCta from "@/components/how-it-works/HowItWorksCta";

const steps = [
  {
    number: "01",
    title: "Share your education level and study goal",
    description:
      "Tell Pathly where you are in your studies and where you want to go. The Study Path Finder uses four focused questions — no account needed.",
  },
  {
    number: "02",
    title: "Review the suitable path",
    description:
      "Pathly generates a structured, step-by-step guide for your specific combination of level, field, destination, and current qualification.",
  },
  {
    number: "03",
    title: "Prepare admissions and documents",
    description:
      "Each stage of the path links to the relevant admission requirements and document guides, with clear prep difficulty and authentication guidance.",
  },
  {
    number: "04",
    title: "Explore funding options",
    description:
      "The scholarship finder organizes relevant opportunities by country, level, field, and funding type — each linked to its official provider.",
  },
  {
    number: "05",
    title: "Follow the official visa process",
    description:
      "Country-specific visa guides cover required documents, timelines, appointment requirements, and direct links to official immigration portals.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="pathly-page relative overflow-hidden">
      {/* Top background decorations */}
      <div className="pointer-events-none absolute -right-36 top-0 h-120 w-120 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -right-16 top-20 h-88 w-88 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute left-10 top-8 grid grid-cols-5 gap-4 opacity-70">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      {/* Bottom background decorations */}
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-130 w-130 rounded-full bg-[#edf2f3]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-110 w-110 rounded-full border border-[#e5edf3]" />

      <div className="pointer-events-none absolute -bottom-12 -right-12 h-72 w-72 rounded-full border border-[#edf2f5]" />

      <div className="pointer-events-none absolute bottom-20 right-12 grid grid-cols-2 gap-4 opacity-60">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      <Container className="relative z-10 py-12 lg:py-16">
        <div className="mx-auto max-w-228">
          {/* Breadcrumb */}
          <div className="breadcrumb mb-7">
            <Link
              href="/"
              className="breadcrumb-link"
            >
              Home
            </Link>

            <ChevronRight size={14} className="breadcrumb-separator" />

            <span className="breadcrumb-current">How It Works</span>
          </div>

          {/* Intro */}
          <section>
            <h1 className="pathly-page-title">
              How Pathly works
            </h1>

            <p className="mt-3 max-w-150 text-base leading-7 text-[#61779a]">
              Pathly organizes the complete study-abroad journey into a clear
              sequence of steps — from choosing a path to verifying official
              requirements.
            </p>
          </section>

          {/* Steps */}
          <section className="mt-10 space-y-5">
            {steps.map((step) => (
              <HowItWorksStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </section>

          {/* Trust */}
          <TrustSection />

          {/* CTA */}
          <HowItWorksCta />
        </div>
      </Container>
    </main>
  );
}
