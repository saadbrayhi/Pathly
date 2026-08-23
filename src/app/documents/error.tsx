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
    <main className="min-h-screen bg-warm-surface py-16">
      <Container className="max-w-3xl">
        <Card className="flex flex-col items-center p-8 text-center sm:p-12">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-soft-warning text-warning">
            <AlertTriangle aria-hidden="true" size={28} />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-heading">
            We could not load the document guides
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Please retry the request. If the problem continues, you can return to the
            document library and try again later.
          </p>
          <Button onClick={reset} className="mt-6">
            Try again
          </Button>
        </Card>
      </Container>
    </main>
  );
}
