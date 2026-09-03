export const DOCUMENT_CATEGORIES = [
  "Academic",
  "Personal",
  "Application",
  "Language",
  "Financial",
] as const;

export type DocumentCategory =
  (typeof DOCUMENT_CATEGORIES)[number];

export type PreparationLevel =
  | "Low"
  | "Medium"
  | "High";

export type DocumentSummary = {
  id: string;
  slug: string;
  name: string;
  category: DocumentCategory;
  description: string | null;
  neededFor: string;
  preparation: PreparationLevel;
  translationRequired: boolean;
  authenticationRequired: boolean;
};

export type DocumentStructureStep = {
  id: string;
  title: string;
  description: string;
};

export type DocumentDetails = DocumentSummary & {
  translationNote: string | null;
  authenticationNote: string | null;
  whatItIs: string;
  whyItIsNeeded: string;
  structureNote: string | null;
  mistakes: string[];
  structureSteps: DocumentStructureStep[];
};