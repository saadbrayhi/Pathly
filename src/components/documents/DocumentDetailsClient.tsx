"use client";

import { useQuery } from "@tanstack/react-query";

import DocumentGuide from "@/components/documents/DocumentGuide";
import ErrorState from "@/components/shared/states/ErrorState";
import LoadingState from "@/components/shared/states/LoadingState";
import { ApiError } from "@/lib/axios";
import { fetchDocumentBySlug } from "@/services/documents";
import type { DocumentDetails } from "@/types/document";

type DocumentDetailsClientProps = {
  slug: string;
};

export default function DocumentDetailsClient({
  slug,
}: DocumentDetailsClientProps) {
  const {
    data: document,
    isLoading,
    error,
    refetch,
  } = useQuery<DocumentDetails, Error>({
    queryKey: ["documents", slug],
    queryFn: () => fetchDocumentBySlug(slug),
    retry: (failureCount, reason) =>
      !(reason instanceof ApiError && reason.status === 404) &&
      failureCount < 2,
  });

  if (isLoading) {
    return <LoadingState message="Loading document guide..." />;
  }

  if (error) {
    const isNotFound = error instanceof ApiError && error.status === 404;

    return (
      <ErrorState
        title={isNotFound ? "Document not found" : "Could not load document"}
        description={
          isNotFound
            ? "The requested document guide does not exist."
            : error.message
        }
        onRetry={isNotFound ? undefined : () => void refetch()}
        className="m-6"
      />
    );
  }

  if (!document) {
    return (
      <ErrorState
        title="Document not found"
        description="The requested document guide does not exist."
        className="m-6"
      />
    );
  }

  return <DocumentGuide document={document} />;
}
