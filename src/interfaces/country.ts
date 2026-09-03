import type { RequirementStatus } from "@/generated/prisma/client";
export type { RequirementStatus };

export interface Country {
  id: string;
  name: string;
  slug: string;
  flag: string | null;
  image: string | null;
  description: string | null;

  languages: string | null;
  tuition: string | null;
  livingCost: string | null;
  tuitionRange: string | null;

  languageOptions: string[];
  studyLevelOptions: string[];
  scholarshipAvailable: boolean;
}

export interface AdmissionRequirement {
  id: string;
  label: string;
  status: RequirementStatus;
  sortOrder: number;
}

export interface StudyLevelDetail {
  id: string;
  level: string;
  duration: string | null;
  language: string | null;
  tuition: string | null;
  note: string | null;
  sortOrder: number;
}

export interface LanguageRequirement {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface OfficialSource {
  id: string;
  name: string;
  description: string | null;
  url: string;
  sortOrder: number;
}

export interface CountryDetails extends Country {
  overview: string | null;
  lastReviewedAt: Date | string | null;
  mainLanguage: string | null;
  livingCostSummary: string | null;

  educationSystem: string | null;
  whoCanApply: string | null;
  eligibilityWarning: string | null;
  languageWarning: string | null;

  visaType: string | null;
  visaSummary: string | null;
  visaDescription: string | null;
  visaProcessingTime: string | null;
  visaAppointment: string | null;
  visaEstimatedFee: string | null;
  visaFinancialProof: string | null;
  visaWarning: string | null;
  visaLastReviewedAt: Date | string | null;
  visaOfficialSourceLabel: string | null;
  visaOfficialSourceUrl: string | null;

  requiredDocuments: string[];
  commonMistakes: string[];
  scholarshipNotes: string[];

  visaDocuments: string[];
  visaSteps: string[];
  visaCommonMistakes: string[];

  admissionRequirements: AdmissionRequirement[];
  studyLevelDetails: StudyLevelDetail[];
  languageRequirements: LanguageRequirement[];
  officialSources: OfficialSource[];
}
