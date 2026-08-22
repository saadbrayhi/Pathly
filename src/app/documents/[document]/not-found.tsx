import { FileQuestion } from "lucide-react";

import Button from "@/app/components/shared/Button";
import Card from "@/app/components/shared/Card";
import Container from "@/app/components/shared/Container";

export default function DocumentNotFound() {
  return (
    <main className="min-h-screen bg-warm-surface py-16">
      <Container className="max-w-3xl">
        <Card className="flex flex-col items-center p-8 text-center sm:p-12">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-soft-blue text-primary">
            <FileQuestion aria-hidden="true" size={28} />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-heading">
            Document guide not found
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            This guide may have moved, or the document address may be incorrect.
          </p>
          <Button href="/documents" className="mt-6">
            View all documents
          </Button>
        </Card>
      </Container>
    </main>
  );
}
