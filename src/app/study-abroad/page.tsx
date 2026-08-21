import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Container from "../components/shared/Container";
import { countries } from "../../constant/countries";
import StudyAbroadDirectory from "./StudyAbroadDirectory";

export default function StudyAbroadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-37.5 -top-30 h-125 w-125 rounded-full border border-[#e8eef7]" />

      <div className="pointer-events-none absolute -right-18.75 -top-11.25 h-87.5 w-87.5 rounded-full border border-[#edf2f8]" />

      <div className="pointer-events-none absolute right-15 top-7.5 h-50 w-50 rounded-full border border-[#f0f4f9]" />

      {/* Bottom decoration */}
      <div className="pointer-events-none absolute -bottom-52.5 -left-45 h-130 w-130 rounded-full bg-[#edf5f7]" />

      <div className="pointer-events-none absolute -bottom-62.5 -right-35 h-125 w-125 rounded-full border border-[#e3edf3]" />

      <Container className="relative z-10 pb-24 pt-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#7f94b4] transition hover:text-[#3157d5]"
          >
            Home
          </Link>

          <ChevronRight size={15} className="text-[#9badc7]" />

          <span className="font-semibold text-[#263a5b]">Study Abroad</span>
        </div>

        {/* Heading */}
        <div className="mb-9">
          <h1 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-gray-900">
            Explore study destinations
          </h1>

          <p className="mt-2 max-w-162.5 text-base leading-6 text-[#61779a]">
            Compare admission paths, costs, scholarships, and visa requirements
            before choosing a country.
          </p>
        </div>

        <StudyAbroadDirectory countries={countries} />
      </Container>
    </main>
  );
}
