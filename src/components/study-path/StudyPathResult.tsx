"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "../shared/Button";
import Container from "../shared/Container";
import ErrorState from "../shared/states/ErrorState";
import LoadingState from "../shared/states/LoadingState";
import JourneyTimeline from "./JourneyTimeline";
import ResultSidebar from "./ResultSidebar";
import ResultSummary from "./ResultSummary";
import SupportCTA from "./SupportCTA";
import { STUDY_PATH_RESULT_STORAGE_KEY } from "@/services/studyPath";
import type { StudyPathResult as StudyPathResultData } from "@/interfaces/studyPath";

export default function StudyPathResult() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [result, setResult] = useState<StudyPathResultData | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem(
      STUDY_PATH_RESULT_STORAGE_KEY,
    );

    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult) as StudyPathResultData;
        if (parsed.requestId === requestId) {
          setResult(parsed);
        }
      } catch {
        sessionStorage.removeItem(STUDY_PATH_RESULT_STORAGE_KEY);
      }
    }

    setHasLoaded(true);
  }, [requestId]);

  if (!hasLoaded) {
    return (
      <main className="warm-page min-h-screen py-8">
        <Container>
          <LoadingState message="Loading your study path..." />
        </Container>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="warm-page min-h-screen py-8">
        <Container>
          <ErrorState
            title="Study path result unavailable"
            description="Start the finder again so Pathly can generate a fresh server-side result."
          />
          <div className="mt-4 flex justify-center">
            <Button href="/find-my-path">Start again</Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="warm-page relative overflow-hidden py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-slate-100/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-105 w-105 rounded-full border border-slate-200/60"
      />

      <Container>
        <div className="relative z-10 mx-auto max-w-280">
          <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            <span>›</span>
            <span>Study Path Finder</span>
            <span>›</span>
            <span className="font-semibold text-heading">Your Result</span>
          </div>

          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <ResultSummary result={result} />
              <SupportCTA />
              <JourneyTimeline stages={result.journeyStages} />
            </div>
            <ResultSidebar result={result} />
          </div>
        </div>
      </Container>
    </main>
  );
}
