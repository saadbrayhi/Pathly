import type { Country } from "./types";

export const spain: Country = {
  name: "Spain",
  slug: "spain",
  flag: "🇪🇸",
  image:
    "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&h=480&auto=format&fit=crop&q=85",

  description:
    "Spanish and English programs with varied regional requirements. Lower cost than Northern Europe, rich academic tradition.",

  languages: "Spanish, English",
  tuition: "€700–€20,000/yr (public–private)",
  livingCost: "About €700–€1,200/mo",
  studyLevels: "Bachelor, Master, PhD",

  languageOptions: ["Spanish", "English"],

  studyLevelOptions: ["Bachelor", "Master", "PhD"],

  tuitionRange: "Medium",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Aug 2026",

    overview:
      "Spain is a destination with programs in Spanish and English. Spanish and English programs with varied regional requirements. Lower cost than Northern Europe, rich academic tradition.",

    mainLanguage: "Spanish; English",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "Spain has a regulated higher education system. Programs and admission criteria vary by institution. Always verify requirements directly with the university or official government education authority.",

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
        language: "Spanish / English",
        tuition: "€700–€1,700/yr at many public universities",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "Master",
        duration: "Varies by program",
        language: "Spanish / English",
        tuition: "€1,000–€3,500/yr at many public universities",
        note: "Verify tuition with the specific institution and program.",
      },
      {
        level: "PhD",
        duration: "Varies by program",
        language: "Spanish / English",
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

    visaType: "Long-Stay Student Visa",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "Study in Europe — Spain",
        description: "European Commission overview of Spanish study costs and visas.",
        url: "https://education.ec.europa.eu/study-in-europe/country-profiles/spain",
      },
      {
        name: "Spanish Ministry of Foreign Affairs",
        description: "Official study visa requirements; verify with your responsible consulate.",
        url: "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
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
