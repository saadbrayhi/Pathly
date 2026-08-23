"use client";

import { AlertTriangle } from "lucide-react";

import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Container from "@/components/shared/Container";

type DocumentsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DocumentsError({ reset }: DocumentsErrorProps) {
  return (
    <main className="warm-page py-16">
      <Container className="max-w-3xl">
        <Card className="state-panel">
          <span className="state-icon bg-soft-warning text-warning">
            <AlertTriangle aria-hidden="true" size={28} />
          </span>
          <h1 className="state-title">
            We could not load the document guides
          </h1>
          <p className="state-description">
            Please retry the request. If the problem continues, you can return to the
            document library and try again later.
          </p>
          <Button onClick={reset} className="state-action">
            Try again
          </Button>
        </Card>
      </Container>
    </main>
  );
}
