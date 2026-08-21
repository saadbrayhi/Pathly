import type { Country } from "./types";

export const germany: Country = {
  name: "Germany",
  slug: "germany",
  flag: "🇩🇪",
  image:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=480&auto=format&fit=crop&q=85",

  description:
    "Many public universities charge low or no tuition fees. Strong engineering and science programs in German and English.",

  languages: "German, English",
  tuition: "Often no public tuition + semester contribution",
  livingCost: "About €900–€1,200/mo",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["German", "English"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "Low",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Aug 2026",

    overview:
      "Germany is a destination with programs in German and English. Many public universities charge low or no tuition fees. Strong engineering and science programs in German and English.",

    mainLanguage: "German; English",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Germany has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

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
        language: "German / English",
        tuition: "Often no public tuition + semester contribution",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "German / English",
        tuition: "Often no public tuition + semester contribution",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "German / English",
        tuition: "Often no public tuition + semester contribution",
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

    visaType: "National Visa (Student)",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "DAAD",
        description: "Official guidance on studying, requirements, and costs in Germany.",
        url: "https://www.daad.de/en/studying-in-germany/",
      },
      {
        name: "DAAD requirements overview",
        description: "Entry, visa, and proof-of-funds guidance for international students.",
        url: "https://www.daad.de/en/studying-in-germany/requirements/overview/",
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
