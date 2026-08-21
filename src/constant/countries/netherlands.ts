import type { Country } from "./types";

export const netherlands: Country = {
  name: "Netherlands",
  slug: "netherlands",
  flag: "🇳🇱",
  image:
    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&h=480&auto=format&fit=crop&q=85",

  description:
    "Extensive English-taught programs. Higher cost of living but strong academic reputation and international student community.",

  languages: "English, Dutch",
  tuition: "€9,000–€30,000/yr (typical non-EU range)",
  livingCost: "About €1,000–€1,500/mo",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["English", "Dutch"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "High",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Aug 2026",

    overview:
      "Netherlands is a destination with programs in English and Dutch. Extensive English-taught programs. Higher cost of living but strong academic reputation and international student community.",

    mainLanguage: "English; Dutch",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Netherlands has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

    whoCanApply:
      "International applicants from recognized education systems can typically apply, provided they meet the entry requirements for their chosen level and program.",

    eligibilityWarning:
      "Eligibility varies by program and institution. This guide covers the general framework — verify your specific situation on the university's official admissions page.",

    admissionRequirements: [
      {
        label: "Completed prior education at the relevant level",
        status: "Required",
      },
      {
        label: "Language certificate matching the program language",
        status: "Required",
      },
      {
        label: "Official transcripts with translation if required",
        status: "Required",
      },
      {
        label: "Motivation letter",
        status: "May be required",
      },
      {
        label: "Recommendation letters",
        status: "Varies by institution",
      },
    ],

    studyLevelDetails: [
      {
        level: "Bachelor",
        duration: "Varies by program",
        language: "English / Dutch",
        tuition: "€9,000–€20,000/yr typical for non-EU students",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "English / Dutch",
        tuition: "€12,000–€30,000/yr typical for non-EU students",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "English / Dutch",
        tuition: "Varies by institution and funding arrangement",
        note: "Verify tuition with the specific institution and program.",
      },
    ],

    requiredDocuments: [
      "Academic transcripts",
      "Prior degree certificate",
      "Language certificate",
      "Valid passport",
      "Motivation letter",
      "CV / résumé",
      "Recommendation letters",
      "Proof of funds",
    ],

    languageDescription:
      "Language requirements depend on the program language. Check the specific program page for required certificates and minimum scores.",

    languageRequirements: [],

    scholarships: [
      "Check country-specific scholarship portals",
      "Erasmus Mundus programs",
      "Institutional scholarships — verify directly with universities",
    ],

    visaType: "MVV + Residence Permit (via IND)",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "Study in NL",
        description: "Official starting point for programs, applications, and costs.",
        url: "https://www.studyinnl.org/",
      },
      {
        name: "IND",
        description: "Official higher-education student residence permit guidance.",
        url: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education",
      },
    ],

    commonMistakes: [
      "Not verifying institutional requirements separately from country-level guides.",
      "Starting translation or authentication too late.",
      "Missing program-specific language score requirements.",
      "Relying on outdated deadline information from unofficial sources.",
    ],
  },
};
