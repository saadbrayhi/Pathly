export type StudyLevel = "Bachelor" | "Master" | "PhD" | "Exchange";

export type TuitionRange = "Low" | "Medium" | "High";

export type RequirementStatus =
  | "Required"
  | "May be required"
  | "Varies by institution";

export type AdmissionRequirement = {
  label: string;
  status: RequirementStatus;
};

export type StudyLevelDetail = {
  level: string;
  duration: string;
  language: string;
  tuition: string;
  note?: string;
};

export type LanguageRequirement = {
  title: string;
  description: string;
};

export type OfficialSource = {
  name: string;
  description: string;
  url?: string;
};

export type CountryDetails = {
  lastReviewed: string;
  overview: string;

  mainLanguage: string;
  livingCostSummary: string;
  visaSummary: string;

  educationSystem: string;

  whoCanApply: string;
  eligibilityWarning: string;

  admissionRequirements: AdmissionRequirement[];

  studyLevelDetails: StudyLevelDetail[];

  requiredDocuments: string[];

  languageDescription?: string;
  languageRequirements: LanguageRequirement[];
  languageWarning?: string;

  scholarships: string[];

  visaType: string;
  visaWarning: string;

  officialSources: OfficialSource[];

  commonMistakes: string[];
};

export type Country = {
  name: string;
  slug: string;
  flag: string;
  image: string;
  description: string;

  languages: string;
  tuition: string;
  livingCost: string;
  studyLevels: string;

  languageOptions: string[];
  studyLevelOptions: StudyLevel[];
  tuitionRange: TuitionRange;
  scholarshipAvailable: boolean;
  fields: string[];

  details?: CountryDetails;
};
