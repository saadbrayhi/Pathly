import { axiosGet } from "@/lib/axios";
import type {
  DocumentDetails,
  DocumentSummary,
} from "@/interfaces/document";

export async function fetchDocuments(): Promise<DocumentSummary[]> {
  const response = await axiosGet<DocumentSummary[]>("/documents");

  if (!response.data) {
    throw new Error("Document data is missing.");
  }

  return response.data;
}

export async function fetchDocumentBySlug(
  slug: string,
): Promise<DocumentDetails> {
  const response = await axiosGet<DocumentDetails>(
    `/documents/${encodeURIComponent(slug)}`,
  );

  if (!response.data) {
    throw new Error("Document data is missing.");
  }

  return response.data;
}
