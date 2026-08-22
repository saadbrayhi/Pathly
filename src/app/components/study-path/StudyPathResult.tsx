"use client";

import { useSearchParams } from "next/navigation";

import Container from "../shared/Container";
import ResultSummary from "./ResultSummary";
import ResultSidebar from "./ResultSidebar";
import JourneyTimeline from "./JourneyTimeline";
import SupportCTA from "./SupportCTA";

export default function StudyPathResult() {
  const searchParams = useSearchParams();

  const education = searchParams.get("education");
  const degree = searchParams.get("degree");
  const field = searchParams.get("field");
  const destination = searchParams.get("destination");

  return (
    <main className="relative min-h-screen overflow-hidden bg-warm-surface py-8">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-slate-100/70"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-105 w-105 rounded-full border border-slate-200/60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-16 h-75 w-75 rounded-full border border-slate-200/40"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-32 h-47.5 w-47.5 rounded-full border border-slate-200/30"
      />
      <Container>
        <div className="relative z-10 mx-auto max-w-280">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            <span>›</span>
            <span>Study Path Finder</span>
            <span>›</span>

            <span className="font-semibold text-heading">Your Result</span>
          </div>

          {/* Result layout */}
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <ResultSummary
                education={education}
                degree={degree}
                field={field}
                destination={destination}
              />

              <SupportCTA />

              <JourneyTimeline destination={destination} />
            </div>

            <ResultSidebar destination={destination} />
          </div>
        </div>
      </Container>
    </main>
  );
}
