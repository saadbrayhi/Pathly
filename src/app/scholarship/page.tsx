import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Container from "../components/shared/Container";

import ScholarshipExplorer from "./components/ScholarshipExplorer";
import ScholarshipNotice from "./components/ScholarshipNotice";

export default function ScholarshipPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafbf9]">
      {/* Top background decorations */}
      <div className="pointer-events-none absolute -right-36 top-0 h-120 w-120 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -right-16 top-20 h-88 w-88 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute left-10 top-8 grid grid-cols-4 gap-4 opacity-70">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      {/* Bottom background decorations */}
      <div className="pointer-events-none absolute -bottom-44 -left-44 h-120 w-120 rounded-full bg-[#eef2f3]" />

      <div className="pointer-events-none absolute -bottom-36 -right-28 h-96 w-96 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -bottom-16 -right-8 h-72 w-72 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute bottom-20 right-12 grid grid-cols-2 gap-4 opacity-60">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#dbe4f0]" />
        ))}
      </div>

      <Container className="relative z-10 py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Home
          </Link>

          <ChevronRight size={14} className="text-[#9badc7]" />

          <span className="font-semibold text-[#263a5b]">Scholarships</span>
        </div>

        {/* Intro */}
        <section>
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#111827]">
            Find scholarships that fit your study path
          </h1>

          <p className="mt-3 max-w-155 text-base leading-7 text-[#61779a]">
            Filter by destination, degree, field, and funding. Always confirm
            eligibility on the official provider page.
          </p>
        </section>

        {/* Search + results + cards */}
        <ScholarshipExplorer />

        {/* Verification notice */}
        <ScholarshipNotice />
      </Container>
    </main>
  );
}
