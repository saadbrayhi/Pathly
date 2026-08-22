"use client";

import { useSearchParams } from "next/navigation";
import Container from "../shared/Container";
import ResultSummary from "./ResultSummary";
import StudyPathOverview from "./StudyPathOverview";

export default function StudyPathResult() {
  const searchParams = useSearchParams();

  const education = searchParams.get("education");
  const degree = searchParams.get("degree");
  const field = searchParams.get("field");
  const destination = searchParams.get("destination");

  return (
    <main className="min-h-screen bg-warm-surface py-10">
      <Container>
        <div className="mx-auto max-w-225">
          {/* Breadcrumb */}
          <p className="mb-6 text-sm text-slate-500">
            Home
            <span className="mx-2">›</span>
            <span className="font-medium text-slate-700">Your Study Path</span>
          </p>

          {/* Page header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-primary">
              YOUR PERSONALIZED PATH
            </p>

            <h1 className="text-3xl font-bold text-heading">Your Study Path</h1>

            <p className="mt-2 text-slate-500">
              Based on your answers, here is your recommended study-abroad path.
            </p>
          </div>

          {/* Result summary */}
          <ResultSummary
            education={education}
            degree={degree}
            field={field}
            destination={destination}
          />

          {/* Temporary journey overview */}
          <StudyPathOverview
            degree={degree}
            field={field}
            destination={destination}
          />
        </div>
      </Container>
    </main>
  );
}
