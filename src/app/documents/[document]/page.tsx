import type { Metadata } from "next";

import DocumentDetailsClient from "@/components/documents/DocumentDetailsClient";

type DocumentDetailPageProps = {
  params: Promise<{ document: string }>;
};

export const metadata: Metadata = {
  title: "Document Guide | Pathly",
  description:
    "Learn how to prepare important documents for study-abroad applications.",
};

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { document: documentSlug } = await params;

  return <DocumentDetailsClient key={documentSlug} slug={documentSlug} />;
}
