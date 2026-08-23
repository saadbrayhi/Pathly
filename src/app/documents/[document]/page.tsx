import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DocumentGuide from "@/components/documents/DocumentGuide";
import { getDocumentGuide } from "@/data/documentGuides";
import { documents, getDocumentBySlug } from "@/data/documents";

type DocumentDetailPageProps = {
  params: Promise<{ document: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return documents.map((document) => ({ document: document.slug }));
}

export async function generateMetadata({
  params,
}: DocumentDetailPageProps): Promise<Metadata> {
  const { document: documentSlug } = await params;
  const document = getDocumentBySlug(documentSlug);

  if (!document) {
    return { title: "Document not found | Pathly" };
  }

  return {
    title: `${document.name} Guide | Pathly`,
    description: `${document.description}. Learn when it is needed and how to prepare it for study-abroad applications.`,
  };
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { document: documentSlug } = await params;
  const document = getDocumentBySlug(documentSlug);

  if (!document) {
    notFound();
  }

  const guide = getDocumentGuide(document);

  return <DocumentGuide document={document} guide={guide} />;
}
