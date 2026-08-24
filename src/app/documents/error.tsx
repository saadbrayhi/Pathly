"use client";

import Container from "@/components/shared/Container";
import ErrorState from "@/components/shared/states/ErrorState";

type DocumentsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DocumentsError({ reset }: DocumentsErrorProps) {
  return (
    <main className="warm-page py-16">
      <Container className="max-w-3xl">
        <ErrorState
          title="We could not load the document guides"
          description="Please retry the request. If the problem continues, you can return to the document library and try again later."
          onRetry={reset}
        />
      </Container>
    </main>
  );
}
