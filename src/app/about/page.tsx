import Link from "next/link";
import { BookOpen, ChevronRight, Globe2, ShieldCheck } from "lucide-react";

import Container from "../components/shared/Container";

import AboutFeatureCard from "./components/AboutFeatureCard";
import AboutNotSection from "./components/AboutNotSection";
import AboutCta from "./components/AboutCta";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafbf9]">
      {/* Top background decorations */}
      <div className="pointer-events-none absolute -right-36 top-0 h-120 w-120 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -right-16 top-20 h-88 w-88 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute left-10 top-28 grid grid-cols-2 gap-4 opacity-70">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      {/* Bottom background decorations */}
      <div className="pointer-events-none absolute -bottom-44 -left-44 h-125 w-125 rounded-full bg-[#edf3f4]" />

      <div className="pointer-events-none absolute -bottom-28 -right-32 h-105 w-105 rounded-full border border-[#e5edf3]" />

      <div className="pointer-events-none absolute -bottom-12 -right-16 h-72 w-72 rounded-full border border-[#edf2f5]" />

      <Container className="relative z-10 py-12 lg:py-16">
        <div className="mx-auto max-w-205">
          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-[#7f94b4] transition hover:text-[#3157d5]"
            >
              Home
            </Link>

            <ChevronRight size={14} className="text-[#9badc7]" />

            <span className="font-semibold text-[#263a5b]">About</span>
          </div>

          {/* Intro */}
          <section>
            <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#111827]">
              About Pathly
            </h1>

            <p className="mt-3 text-base leading-7 text-[#43597b]">
              Pathly exists because studying abroad should not require students
              to piece together a critical life decision from dozens of
              disconnected websites. We organize the journey, explain each step
              in plain language, and connect students to the official sources
              that confirm the details.
            </p>

            <p className="mt-5 text-base leading-7 text-[#43597b]">
              International study involves universities, scholarship providers,
              language-testing bodies, embassy visa centers, and government
              immigration authorities — each with their own requirements,
              timelines, and official portals. A student in their early
              twenties, navigating this for the first time, deserves a clear and
              trusted guide.
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <AboutFeatureCard
                icon={BookOpen}
                title="Study Path Finder"
                description="Guides students through the complete process based on their current level, goal, and destination."
              />

              <AboutFeatureCard
                icon={Globe2}
                title="Country Guides"
                description="Structured, up-to-date information on admission, costs, scholarships, and visas by destination."
              />

              <AboutFeatureCard
                icon={ShieldCheck}
                title="Verified Sources"
                description="Every major claim connects to official university, embassy, or government sources."
              />
            </div>

            {/* What Pathly is not */}
            <AboutNotSection />

            {/* CTA */}
            <AboutCta />
          </section>
        </div>
      </Container>
    </main>
  );
}
