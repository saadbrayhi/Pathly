import type { Metadata } from "next";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/shared/Container";

import DocumentLibrary from "@/components/documents/DocumentLibrary";

export const metadata: Metadata = {
  title: "Document Library | Pathly",
  description:
    "Explore study-abroad application documents with preparation, translation, and authentication guidance.",
};

export default function DocumentsPage() {
  return (
    <main className="warm-page overflow-x-hidden py-8 sm:py-12">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Documents" }]} />

        <header className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Document library
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Every document you may need for study-abroad applications — explained,
            with preparation guidance.
          </p>
        </header>

        <DocumentLibrary />
      </Container>
    </main>
  );
}
