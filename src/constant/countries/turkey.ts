import type { Country } from "./types";

export const turkey: Country = {
  name: "Turkey",
  slug: "turkey",
  flag: "🇹🇷",
  image:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=480&auto=format&fit=crop&q=85",

  description:
    "Growing scholarship opportunities through Türkiye Scholarships. Turkish and English programs across major universities.",

  languages: "Turkish, English",
  tuition: "€250–€20,000/yr (public–private)",
  livingCost: "About €400–€800/mo",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["Turkish", "English"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "Low",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Aug 2026",

    overview:
      "Turkey is a destination with programs in Turkish and English. Growing scholarship opportunities through Türkiye Scholarships. Turkish and English programs across major universities.",

    mainLanguage: "Turkish; English",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Turkey has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

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
        language: "Turkish / English",
        tuition: "€250–€700/yr public; private programs cost more",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "Turkish / English",
        tuition: "€500–€1,200/yr public; private programs cost more",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "Turkish / English",
        tuition: "Varies by university and funding arrangement",
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

    visaType: "Student Visa",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "Study in Europe — Türkiye",
        description: "European Commission overview of tuition, living costs, and visas.",
        url: "https://education.ec.europa.eu/study-in-europe/country-profiles/turkiye",
      },
      {
        name: "Türkiye Ministry of Foreign Affairs",
        description: "Official information about student and education visas.",
        url: "https://www.mfa.gov.tr/general-information-about-turkish-visas.en.mfa",
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
