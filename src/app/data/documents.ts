export const DOCUMENT_CATEGORIES = [
  "Academic",
  "Personal",
  "Application",
  "Language",
  "Financial",
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];
export type PreparationDifficulty = "Low" | "Medium" | "High";

export type StudyDocument = {
  slug: string;
  name: string;
  category: DocumentCategory;
  description: string;
  neededFor: string;
  preparation: PreparationDifficulty;
  translationRequired: boolean;
  authenticationRequired: boolean;
};

export const documents: StudyDocument[] = [
  {
    slug: "bac",
    name: "BAC Certificate",
    category: "Academic",
    description: "Official secondary school completion certificate",
    neededFor: "All undergraduate applications",
    preparation: "Low",
    translationRequired: true,
    authenticationRequired: true,
  },
  {
    slug: "bachelor-degree",
    name: "Bachelor Degree",
    category: "Academic",
    description: "Official undergraduate degree certificate",
    neededFor: "Master and PhD applications",
    preparation: "Low",
    translationRequired: true,
    authenticationRequired: true,
  },
  {
    slug: "transcript",
    name: "Academic Transcript",
    category: "Academic",
    description: "Official record of all courses and grades",
    neededFor: "Most applications",
    preparation: "Low",
    translationRequired: true,
    authenticationRequired: false,
  },
  {
    slug: "passport",
    name: "Passport",
    category: "Personal",
    description: "Valid travel document with at least 12 months validity",
    neededFor: "All international applications and visa",
    preparation: "Low",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "photos",
    name: "Passport Photos",
    category: "Personal",
    description: "Recent biometric photographs meeting embassy specifications",
    neededFor: "Visa applications and some universities",
    preparation: "Low",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "cv",
    name: "CV / Résumé",
    category: "Application",
    description: "Academic and professional experience summary",
    neededFor: "Master, PhD, and scholarship applications",
    preparation: "Medium",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "motivation-letter",
    name: "Motivation Letter",
    category: "Application",
    description: "Personal statement explaining your goals and program choice",
    neededFor: "Most Master, PhD, and scholarship applications",
    preparation: "High",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "recommendation",
    name: "Recommendation Letter",
    category: "Application",
    description: "Academic or professional reference from a qualified person",
    neededFor: "Master, PhD, and selective programs",
    preparation: "Medium",
    translationRequired: true,
    authenticationRequired: false,
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    category: "Application",
    description: "Collection of creative or professional work samples",
    neededFor: "Architecture, design, and arts programs",
    preparation: "High",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "research-proposal",
    name: "Research Proposal",
    category: "Application",
    description: "Detailed plan of intended doctoral research",
    neededFor: "PhD applications",
    preparation: "High",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "ielts",
    name: "IELTS",
    category: "Language",
    description: "International English Language Testing System certificate",
    neededFor: "English-taught programs",
    preparation: "Medium",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "toefl",
    name: "TOEFL",
    category: "Language",
    description: "Test of English as a Foreign Language certificate",
    neededFor: "English-taught programs and US-aligned universities",
    preparation: "Medium",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "delf",
    name: "DELF / DALF",
    category: "Language",
    description: "Official French language proficiency certificate",
    neededFor: "French-taught programs and France applications",
    preparation: "Medium",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "testdaf",
    name: "TestDaF",
    category: "Language",
    description: "Test of German as a Foreign Language certificate",
    neededFor: "German-taught programs and Germany applications",
    preparation: "Medium",
    translationRequired: false,
    authenticationRequired: false,
  },
  {
    slug: "proof-funds",
    name: "Proof of Funds",
    category: "Financial",
    description: "Evidence of sufficient financial resources for studies and living",
    neededFor: "Visa applications and some universities",
    preparation: "Medium",
    translationRequired: true,
    authenticationRequired: false,
  },
  {
    slug: "bank-statement",
    name: "Bank Statement",
    category: "Financial",
    description: "Official bank statement showing recent account activity and balance",
    neededFor: "Visa applications",
    preparation: "Low",
    translationRequired: true,
    authenticationRequired: false,
  },
];

export function getDocumentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug);
}
