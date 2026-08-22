export const EDUCATION_LEVEL_OPTIONS = [
  { label: "High school student", value: "high-school" },
  { label: "Bachelor student", value: "bachelor-student" },
  { label: "Bachelor graduate", value: "bachelor-graduate" },
  { label: "Master student", value: "master-student" },
  { label: "Master graduate", value: "master-graduate" },
] as const;

export const DEGREE_OPTIONS = [
  { label: "Bachelor", value: "bachelor" },
  { label: "Master", value: "master" },
  { label: "PhD", value: "phd" },
  { label: "Exchange program", value: "exchange" },
] as const;

export const COUNTRY_OPTIONS = [
  { label: "France", value: "france" },
  { label: "Germany", value: "germany" },
  { label: "Italy", value: "italy" },
  { label: "Canada", value: "canada" },
  { label: "Turkey", value: "turkey" },
  { label: "Netherlands", value: "netherlands" },
  { label: "Spain", value: "spain" },
  { label: "Not sure yet", value: "not-sure" },
] as const;

export const HELP_TYPE_OPTIONS = [
  { label: "University Application", value: "university-application" },
  { label: "Scholarship Application", value: "scholarship-application" },
  { label: "Documents", value: "documents" },
  { label: "Student Visa", value: "student-visa" },
  { label: "Complete Process", value: "complete-process" },
  { label: "Other", value: "other" },
] as const;

export type HelpType = (typeof HELP_TYPE_OPTIONS)[number]["value"];

export type SupportRequestValues = {
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  educationLevel: string;
  desiredDegree: string;
  preferredCountry: string;
  fieldOfStudy: string;
  helpType: HelpType | "";
  target: string;
  deadline: string;
  description: string;
};

export const EMPTY_SUPPORT_REQUEST: SupportRequestValues = {
  fullName: "",
  email: "",
  phone: "",
  currentCountry: "",
  educationLevel: "",
  desiredDegree: "",
  preferredCountry: "",
  fieldOfStudy: "",
  helpType: "",
  target: "",
  deadline: "",
  description: "",
};

export const SUPPORT_STEPS = [
  {
    number: "01",
    title: "Send your request",
    description: "Tell us what you need and share the important details of your study goal.",
  },
  {
    number: "02",
    title: "The team reviews it",
    description: "Pathly checks the request, required work, and whether the service can help.",
  },
  {
    number: "03",
    title: "Receive the next steps",
    description: "We contact you with the proposed scope, timeline, and price before any work starts.",
  },
] as const;

export const SUPPORT_SERVICES = [
  {
    icon: "university",
    title: "University Application Support",
    description: "Help with requirements, forms, documents, and application steps for your chosen programs.",
  },
  {
    icon: "scholarship",
    title: "Scholarship Application Support",
    description: "Help finding suitable scholarships and preparing a strong, complete application.",
  },
  {
    icon: "documents",
    title: "Document Preparation",
    description: "Help preparing CVs, motivation letters, recommendation letters, and academic documents.",
  },
  {
    icon: "visa",
    title: "Visa Preparation Support",
    description: "Help organizing visa requirements, documents, appointments, and official steps.",
  },
  {
    icon: "complete",
    title: "Complete Study-Abroad Support",
    description: "Personal help covering the complete process — from planning through application preparation.",
  },
] as const;
