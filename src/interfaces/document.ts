export const DOCUMENT_CATEGORIES = [
  "Academic",
  "Personal",
  "Application",
  "Language",
  "Financial",
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

export type PreparationLevel = "Low" | "Medium" | "High";

export interface DocumentSummary {
  id: string;
  slug: string;
  name: string;
  category: DocumentCategory;
  description: string | null;
  neededFor: string;
  preparation: PreparationLevel;
  translationRequired: boolean;
  authenticationRequired: boolean;
}

export interface DocumentStructureStep {
  id: string;
  title: string;
  description: string;
}

export interface DocumentDetails extends DocumentSummary {
  translationNote: string | null;
  authenticationNote: string | null;
  whatItIs: string;
  whyItIsNeeded: string;
  structureNote: string | null;
  mistakes: string[];
  structureSteps: DocumentStructureStep[];
}
