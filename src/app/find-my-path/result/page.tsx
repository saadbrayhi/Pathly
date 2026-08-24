import { Suspense } from "react";

import LoadingState from "@/components/shared/states/LoadingState";
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
        <LoadingState
          message="Loading your study path..."
          className="justify-start py-0"
        />
      </div>
    </main>
  );
}
