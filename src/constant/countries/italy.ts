import type { Country } from "./types";

export const italy: Country = {
  name: "Italy",
  slug: "italy",
  flag: "🇮🇹",
  image:
    "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&auto=format&fit=crop",

  description:
    "Broad scholarship access through regional DSU grants. Italian and English-taught programs across major cities.",

  languages: "Italian, English",
  tuition: "€156–€10,000/yr",
  livingCost: "Estimate — varies by city and institution",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["Italian", "English"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "Low",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Jan 2025",

    overview:
      "Italy is a destination with programs in Italian and English. Broad scholarship access through regional DSU grants. Italian and English-taught programs across major cities.",

    mainLanguage: "Italian; English",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Italy has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

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
        language: "Italian / English",
        tuition: "€156–€10,000/yr",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "Italian / English",
        tuition: "€156–€10,000/yr",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "Italian / English",
        tuition: "€156–€10,000/yr",
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

    visaType: "Type D Student Visa",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "Official immigration portal",
        description: "Verify the official visa and residence permit process.",
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
