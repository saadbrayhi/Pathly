import "server-only";

import {
  DocumentCategory as PrismaDocumentCategory,
  PreparationLevel as PrismaPreparationLevel,
} from "@/generated/prisma/client";
import { ApiError } from "@/server/api/errors";
import {
  findAllDocuments,
  findDocumentBySlug,
} from "@/server/repositories/documentRepository";
import type {
  DocumentCategory,
  DocumentDetails,
  DocumentSummary,
  PreparationLevel,
} from "@/types/document";

const categoryMap: Record<
  PrismaDocumentCategory,
  DocumentCategory
> = {
  ACADEMIC: "Academic",
  PERSONAL: "Personal",
  APPLICATION: "Application",
  LANGUAGE: "Language",
  FINANCIAL: "Financial",
};

const preparationMap: Record<
  PrismaPreparationLevel,
  PreparationLevel
> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export async function getDocuments(): Promise<
  DocumentSummary[]
> {
  const documents = await findAllDocuments();

  return documents.map((document) => ({
    id: document.id,
    slug: document.slug,
    name: document.name,
    category: categoryMap[document.category],
    description: document.description,
    neededFor: document.neededFor,
    preparation: preparationMap[document.preparation],
    translationRequired: document.translationRequired,
    authenticationRequired: document.authenticationRequired,
  }));
}

export async function getDocumentBySlug(
  slug: string,
): Promise<DocumentDetails> {
  const document = await findDocumentBySlug(slug);

  if (!document) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Document not found.",
    });
  }

  return {
    id: document.id,
    slug: document.slug,
    name: document.name,
    category: categoryMap[document.category],
    description: document.description,
    neededFor: document.neededFor,
    preparation: preparationMap[document.preparation],
    translationRequired: document.translationRequired,
    authenticationRequired: document.authenticationRequired,
    translationNote: document.translationNote,
    authenticationNote: document.authenticationNote,
    whatItIs: document.whatItIs,
    whyItIsNeeded: document.whyItIsNeeded,
    structureNote: document.structureNote,
    mistakes: document.mistakes,
    structureSteps: document.structureSteps.map((step) => ({
      id: step.id,
      title: step.title,
      description: step.description,
    })),
  };
}