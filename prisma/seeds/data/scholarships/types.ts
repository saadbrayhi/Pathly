export type Scholarship = {
  slug: string;
  image: string;

  country: string;
  flag: string;
  status: "Verify" | "Open";
  level: string;

  provider: string;
  title: string;

  funding: string;
  deadline: string;

  field: string;
  deadlineStatus: string;
  deadlineTone: "warning" | "success";

  overview: string;
  whoCanApply: string;
  eligibilityNote: string;

  fundingCoverage: string;
  fundingNote: string;
  officialUrl: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  commonMistakes: string[];
};
