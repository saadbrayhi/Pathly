import type { Country } from "./types";

export const france: Country = {
  name: "France",
  slug: "france",
  flag: "🇫🇷",
  image:
    "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&auto=format&fit=crop",

  description:
    "Leading destination with prestigious grandes écoles, broad scholarship access, and programs in French and English.",

  languages: "French, English",
  tuition: "€2,770–€15,000/yr (public–private)",
  livingCost: "Estimate — varies by city and institution",
  studyLevels: "Bachelor, Master, PhD, Exchange",

  languageOptions: ["French", "English"],

  studyLevelOptions: ["Bachelor", "Master", "PhD", "Exchange"],

  tuitionRange: "Medium",
  scholarshipAvailable: true,
  fields: [],

  details: {
    lastReviewed: "Jan 2025",

    overview:
      "France is one of the world's leading study destinations, with a prestigious higher education system that includes grandes écoles, research universities, and institutes of technology. Programs range from affordable public degrees to private and engineering schools. France welcomes over 400,000 international students annually.",

    mainLanguage: "French; English",
    livingCostSummary: "Higher in major cities",
    visaSummary: "Required for most",

    educationSystem:
      "France operates a dual-track higher education system. Public universities (universités) are governed by the state and offer degrees at fixed national tuition rates. Grandes écoles are selective, prestigious institutions focused on engineering, business, and public administration, and typically charge higher fees. Classes préparatoires (CPGE) are competitive post-BAC programs that prepare students for selective school entrance exams.",

    whoCanApply:
      "Most international students can apply to French higher education if they hold a recognized secondary school qualification equivalent to the French BAC (for Bachelor programs) or an equivalent undergraduate degree (for Master programs). EU and non-EU applicants are subject to different tuition rates at public universities.",

    eligibilityWarning:
      "Eligibility varies by program and institution. This guide covers the general framework — verify your specific situation on the university's official admissions page.",

    admissionRequirements: [
      {
        label: "Completed secondary education (BAC or equivalent)",
        status: "Required",
      },
      {
        label: "French or English language certificate (depending on program)",
        status: "Required",
      },
      {
        label: "Campus France pre-registration (many countries)",
        status: "Required",
      },
      {
        label: "Official transcripts (translated if not in French/English)",
        status: "Required",
      },
      {
        label: "Motivation letter",
        status: "May be required",
      },
      {
        label: "Entrance exam (CPGE / classes préparatoires)",
        status: "Varies by institution",
      },
    ],

    studyLevelDetails: [
      {
        level: "Bachelor (Licence)",
        duration: "3 years",
        language: "French / some English",
        tuition: "€2,770–€15,000/yr",
        note: "Public universities: fixed national tuition. Selective grandes écoles: higher.",
      },
      {
        level: "Master",
        duration: "2 years",
        language: "French & English",
        tuition: "€3,770–€20,000/yr",
        note: "Many programs in English. Highly competitive for leading schools.",
      },
      {
        level: "PhD (Doctorat)",
        duration: "3–5 years",
        language: "Primarily French",
        tuition: "€3,770/yr + supervisor",
        note: "Often funded through research contracts. Requires research proposal.",
      },
      {
        level: "Exchange Program",
        duration: "1 semester – 1 year",
        language: "Varies",
        tuition: "Home university fees usually apply",
        note: "Requires institutional agreement between universities.",
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

    languageRequirements: [
      {
        title: "French-taught programs",
        description:
          "Typically require DELF B2 or DALF C1. Exact requirements vary — verify on the program page.",
      },
      {
        title: "English-taught programs",
        description:
          "Typically IELTS 6.0+ or TOEFL 80+. Exact thresholds vary by institution and program.",
      },
    ],

    languageWarning:
      "Some programs waive the language test for students from countries where the language is official. Verify your specific case on the program page.",

    scholarships: [
      "Eiffel Excellence Scholarship (institutional nomination required)",
      "Erasmus Mundus programs based in France",
      "Regional and institutional scholarships (varies by university)",
      "French government excellence grants",
    ],

    visaType: "Long-Stay Student Visa (VLS-TS)",

    visaWarning:
      "Admission to a program does not guarantee a visa. The visa decision is made independently by the embassy or immigration authority.",

    officialSources: [
      {
        name: "Campus France",
        description:
          "Official gateway for international students applying in France.",
        url: "https://www.campusfrance.org/",
      },
      {
        name: "France-Visas",
        description: "Official student visa application and information.",
        url: "https://france-visas.gouv.fr/",
      },
      {
        name: "Service-Public.fr",
        description: "French government services and official information.",
        url: "https://www.service-public.fr/",
      },
    ],

    commonMistakes: [
      "Assuming all programs use the same application process — some use Campus France, others apply directly.",
      "Preparing translations too late — certified translation can take 2–4 weeks or more.",
      "Missing institution-specific language score requirements — always check the actual program page.",
      "Relying on an unofficial deadline sourced from a third-party website.",
      "Starting the visa process before receiving official proof of admission acceptance.",
    ],
  },
};
