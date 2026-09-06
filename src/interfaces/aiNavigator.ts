export type AINavigatorRequest = {
  prompt: string;
  currentCountry?: string;
  educationLevel?: string;
  desiredDegree?: string;
  fieldOfStudy?: string;
};

export type AIDestination = {
  name: string;
  flag: string;
  note: string;
};

export type AINextStep = {
  label: string;
  href: string;
};

export type AINavigatorGuidance = {
  path: string;
  levels: string[];
  destinations: AIDestination[];
  admission: string[];
  documents: string[];
  scholarships: string[];
  visa: string;
  language: string;
  nextSteps: AINextStep[];
};
