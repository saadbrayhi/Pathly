import { FileQuestion } from "lucide-react";

import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Container from "@/components/shared/Container";

export default function DocumentNotFound() {
  return (
    <main className="warm-page py-16">
      <Container className="max-w-3xl">
        <Card className="state-panel">
          <span className="state-icon bg-soft-blue text-primary">
            <FileQuestion aria-hidden="true" size={28} />
          </span>
          <h1 className="state-title">
            Document guide not found
          </h1>
          <p className="state-description">
            This guide may have moved, or the document address may be incorrect.
          </p>
          <Button href="/documents" className="state-action">
            View all documents
          </Button>
        </Card>
      </Container>
    </main>
  );
}
