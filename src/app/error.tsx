"use client";

import Container from "@/components/shared/Container";
import ErrorState from "@/components/shared/states/ErrorState";

type AppErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function AppError({ retry }: AppErrorProps) {
  return (
    <main className="warm-page flex-1 py-16">
      <Container className="max-w-3xl">
        <ErrorState
          title="Something went wrong"
          description="We could not load this page. Please try again."
          onRetry={retry}
        />
      </Container>
    </main>
  );
}
