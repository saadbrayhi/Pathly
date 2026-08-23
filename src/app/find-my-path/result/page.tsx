import { Suspense } from "react";

import StudyPathResult from "@/components/study-path/StudyPathResult";

export default function StudyPathResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <StudyPathResult />
    </Suspense>
  );
}

function ResultLoading() {
  return (
    <main className="warm-page">
      <div className="page-container py-8">
        <p className="text-sm text-slate-500">Loading your study path...</p>
      </div>
    </main>
  );
}
