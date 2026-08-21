import type { Country } from "./types";

export const canada: Country = {
  name: "Canada",
  slug: "canada",
  flag: "🇨🇦",
  image:
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop",

  description:
    "English and French programs at recognized world-class universities. Study permit required for most international students.",

  languages: "English, French",
  tuition: "CAD 15,000–35,000/yr",
  livingCost: "Estimate — varies by city and institution",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["English", "French"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "High",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Jan 2025",

    overview:
      "Canada is a destination with programs in English and French. English and French programs at recognized world-class universities. Study permit required for most international students.",

    mainLanguage: "English; French",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Canada has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

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
        language: "English / French",
        tuition: "CAD 15,000–35,000/yr",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "English / French",
        tuition: "CAD 15,000–35,000/yr",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "English / French",
        tuition: "CAD 15,000–35,000/yr",
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

    visaType: "Study Permit",

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
