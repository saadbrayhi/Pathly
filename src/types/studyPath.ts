export const STUDY_PATH_EDUCATION_LEVELS = [
  "bac-high-school",
  "bachelor-student",
  "bachelor-graduate",
  "master-student",
  "master-graduate",
] as const;

export const STUDY_PATH_DEGREES = [
  "bachelor",
  "master",
  "phd",
  "exchange",
] as const;

export const STUDY_PATH_FIELDS = [
  "computer-science",
  "engineering",
  "business",
  "medicine",
  "architecture",
  "sciences",
  "arts-humanities",
] as const;

export const STUDY_PATH_DESTINATIONS = [
  "france",
  "germany",
  "italy",
  "canada",
  "turkey",
  "netherlands",
  "not-sure",
] as const;

export type StudyPathRequestPayload = {
  educationLevel: (typeof STUDY_PATH_EDUCATION_LEVELS)[number];
  desiredDegree: (typeof STUDY_PATH_DEGREES)[number];
  fieldOfStudy: (typeof STUDY_PATH_FIELDS)[number];
  destination: (typeof STUDY_PATH_DESTINATIONS)[number];
};

export type StudyPathJourneyStage = {
  id: number;
  title: string;
  timing: string;
  description: string;
  documents: string[];
  estimatedCost: string | null;
  note: string | null;
  links: Array<{
    label: string;
    href: string;
    external: boolean;
  }>;
};

export type StudyPathResult = {
  requestId: string;
  generatedAt: string;
  selections: {
    educationLevel: string;
    educationLabel: string;
    desiredDegree: string;
    degreeLabel: string;
    fieldOfStudy: string;
    fieldLabel: string;
  };
  destination: {
    id: string;
    slug: string;
    name: string;
    flag: string | null;
    recommended: boolean;
  };
  eligibility: {
    status: "LIKELY_ELIGIBLE" | "REVIEW_REQUIRED";
    headline: string;
    note: string;
  };
  admission: {
    overview: string | null;
    educationSystem: string | null;
    whoCanApply: string | null;
    warning: string | null;
    requirements: Array<{
      id: string;
      label: string;
      status: string;
    }>;
    studyLevel: {
      level: string;
      duration: string | null;
      language: string | null;
      tuition: string | null;
      note: string | null;
    } | null;
  };
  requiredDocuments: string[];
  scholarships: Array<{
    id: string;
    slug: string;
    title: string;
    provider: string | null;
    level: string | null;
    field: string | null;
    funding: string | null;
    deadline: string | null;
    officialUrl: string | null;
  }>;
  visa: {
    type: string | null;
    summary: string | null;
    description: string | null;
    processingTime: string | null;
    appointment: string | null;
    estimatedFee: string | null;
    financialProof: string | null;
    warning: string | null;
    documents: string[];
    steps: string[];
  };
  language: {
    summary: string | null;
    mainLanguage: string | null;
    options: string[];
    warning: string | null;
    requirements: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  costs: {
    tuition: string | null;
    tuitionRange: string | null;
    livingCost: string | null;
    livingCostSummary: string | null;
  };
  journeyStages: StudyPathJourneyStage[];
  officialSources: Array<{
    id: string;
    name: string;
    description: string | null;
    url: string;
  }>;
};
