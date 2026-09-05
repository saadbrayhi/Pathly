export type VisaDetailsData = {
  slug: string;
  country: string;
  flag: string;
  visaType: string;
  appointment: string;
  lastReviewed: string;
  processingTime: string;
  estimatedFee: string;
  financialProof: string;
  description: string;
  documents: string[];
  steps: string[];
  warning: string;
  officialSource: {
    label: string;
    href: string;
  };
  commonMistakes: string[];
};

export const visaDetails: VisaDetailsData[] = [
  {
    slug: "france",
    country: "France",
    flag: "🇫🇷",
    visaType: "Long-Stay Student Visa (VLS-TS)",
    appointment: "Typically required",
    lastReviewed: "Jan 2025",
    processingTime: "Varies — verify with embassy",
    estimatedFee: "Verify current fee",
    financialProof:
      "Required — verify the current minimum amount with the embassy",
    description:
      "Prepare the required documents and follow the official long-stay student visa process before traveling to France.",

    documents: [
      "Valid passport (check required validity period)",
      "Official university admission proof",
      "Proof of sufficient funds",
      "Accommodation evidence",
      "Health insurance documentation when required",
      "Completed visa application form",
      "Passport-format photographs",
    ],

    steps: [
      "Receive official university admission",
      "Prepare all required visa documents",
      "Book the required appointment with the embassy or visa center",
      "Submit the complete visa application dossier",
      "Attend an interview if required by the embassy",
      "Wait for the official visa decision",
      "Collect your passport and carefully review the decision",
    ],

    commonMistakes: [
      "Booking non-refundable travel or accommodation before receiving a confirmed visa.",
      "Missing required translations or submitting uncertified copies.",
      "Applying too close to the intended departure date — allow for delays.",
      "Not verifying the exact funds requirement with the embassy before the appointment.",
      "Starting the process before receiving official admission proof.",
    ],

    warning:
      "Requirements can vary by nationality and consulate. Always verify the latest information on the official visa website.",

    officialSource: {
      label: "France-Visas",
      href: "https://france-visas.gouv.fr/",
    },
  },

  {
    slug: "germany",
    country: "Germany",
    flag: "🇩🇪",
    visaType: "National Visa (Student)",
    appointment: "Typically required",
    lastReviewed: "Jan 2025",
    processingTime: "4–12 weeks (estimate — varies)",
    estimatedFee: "Verify current fee",
    financialProof:
      "Blocked account or another accepted form of financial proof may be required",
    description:
      "Review the German student visa process and prepare the financial, academic, and identification documents required for your application.",
    documents: [
      "Valid passport",
      "University admission letter",
      "Completed visa application form",
      "Proof of financial resources",
      "Health insurance",
      "Academic certificates and transcripts",
      "Passport photographs",
    ],
    steps: [
      "Receive admission from a German institution",
      "Prepare the required financial proof",
      "Collect all required visa documents",
      "Book an embassy or consulate appointment",
      "Submit the complete visa application",
      "Attend the appointment or interview",
      "Wait for the official visa decision",
    ],
    warning:
      "Processing times and document requirements vary by embassy and nationality. Verify all requirements before applying.",
    officialSource: {
      label: "German Federal Foreign Office",
      href: "https://www.auswaertiges-amt.de/en",
    },
    commonMistakes: [
      "Opening or preparing financial proof too late.",
      "Submitting incomplete or outdated academic documents.",
      "Booking travel before the visa has been approved.",
      "Not checking embassy-specific document requirements.",
      "Applying too close to the intended study start date.",
    ],
  },

  {
    slug: "italy",
    country: "Italy",
    flag: "🇮🇹",
    visaType: "Type D Student Visa",
    appointment: "Typically required",
    lastReviewed: "Jan 2025",
    processingTime: "3–8 weeks (estimate — varies)",
    estimatedFee: "Verify current fee",
    financialProof:
      "Required — verify the current amount with the responsible consulate",
    description:
      "Prepare your admission, financial, accommodation, and identity documents before submitting your Italian study visa application.",
    documents: [
      "Valid passport",
      "University admission letter",
      "Pre-enrollment confirmation",
      "Proof of financial resources",
      "Accommodation evidence",
      "Health insurance",
      "Completed visa application form",
    ],
    steps: [
      "Complete university admission and pre-enrollment",
      "Prepare all required visa documents",
      "Book an appointment with the responsible consulate",
      "Submit the complete visa application",
      "Attend the visa appointment",
      "Provide additional documents if requested",
      "Wait for the final visa decision",
    ],
    warning:
      "Always verify current requirements with the Italian consulate responsible for your application.",
    officialSource: {
      label: "Visa for Italy",
      href: "https://vistoperitalia.esteri.it/home/en",
    },
    commonMistakes: [
      "Starting the visa process before completing pre-enrollment requirements.",
      "Submitting accommodation proof that does not meet consular requirements.",
      "Using uncertified or untranslated documents when certification is required.",
      "Not confirming the required financial amount with the consulate.",
      "Booking travel before receiving the visa.",
    ],
  },

  {
    slug: "canada",
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Study Permit",
    appointment: "Via online process / biometrics if required",
    lastReviewed: "Jan 2025",
    processingTime: "8–16 weeks (estimate — varies significantly)",
    estimatedFee: "Verify current fee on IRCC",
    financialProof: "Proof of sufficient funds is required",
    description:
      "Review the Canadian study permit process, required financial proof, admission documents, and application requirements.",
    documents: [
      "Valid passport",
      "Letter of acceptance",
      "Proof of financial support",
      "Completed application forms",
      "Passport photographs if required",
      "Biometrics if required",
      "Additional documents requested by immigration authorities",
    ],
    steps: [
      "Receive a letter of acceptance",
      "Prepare proof of financial support",
      "Create and complete the study permit application",
      "Upload all required supporting documents",
      "Pay the required application fees",
      "Complete biometrics if required",
      "Wait for the official decision",
    ],
    warning:
      "Requirements and processing times may vary depending on nationality and where the application is submitted.",
    officialSource: {
      label: "Government of Canada — IRCC",
      href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    },
    commonMistakes: [
      "Submitting incomplete proof of financial support.",
      "Using an invalid or incomplete letter of acceptance.",
      "Forgetting required biometrics or additional requested documents.",
      "Booking non-refundable travel before receiving a decision.",
      "Not checking the latest IRCC application requirements.",
    ],
  },

  {
    slug: "turkey",
    country: "Turkey",
    flag: "🇹🇷",
    visaType: "Student Visa",
    appointment: "Typically required",
    lastReviewed: "Jan 2025",
    processingTime: "2–6 weeks (estimate — varies)",
    estimatedFee: "Verify current fee with the embassy",
    financialProof:
      "Financial evidence may be required depending on the application",
    description:
      "Prepare your admission and travel documents and follow the student visa process required for studying in Turkey.",
    documents: [
      "Valid passport",
      "University admission letter",
      "Completed visa application form",
      "Passport photographs",
      "Financial documents if required",
      "Accommodation information",
      "Additional consular documents if requested",
    ],
    steps: [
      "Receive official university admission",
      "Check visa requirements for your nationality",
      "Prepare all supporting documents",
      "Book the required consular appointment",
      "Submit the complete application",
      "Attend the appointment if required",
      "Wait for the visa decision",
    ],
    warning:
      "Student visa requirements can differ depending on nationality and consular office.",
    officialSource: {
      label: "Republic of Türkiye Ministry of Foreign Affairs",
      href: "https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa",
    },
    commonMistakes: [
      "Not checking nationality-specific visa requirements.",
      "Submitting incomplete accommodation or financial information.",
      "Missing required consular documents.",
      "Applying too close to the intended travel date.",
      "Booking travel before receiving visa approval.",
    ],
  },

  {
    slug: "netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    visaType: "MVV + Residence Permit",
    appointment: "Via institution / immigration process",
    lastReviewed: "Jan 2025",
    processingTime: "2–4 weeks after enrollment (estimate)",
    estimatedFee: "Verify current fee on IND portal",
    financialProof: "Proof of sufficient funds is required",
    description:
      "Review the entry visa and residence permit process for international students studying in the Netherlands.",
    documents: [
      "Valid passport",
      "University admission confirmation",
      "Proof of sufficient financial resources",
      "Health insurance documentation",
      "Required immigration forms",
      "Additional documents requested by the institution",
    ],
    steps: [
      "Receive admission from a recognized institution",
      "Provide the required documents to the institution",
      "Complete the immigration application process",
      "Pay the required immigration fees",
      "Wait for immigration approval",
      "Complete any required appointment or biometrics",
      "Prepare for arrival and local registration",
    ],
    warning:
      "In many cases, the educational institution manages part of the immigration process. Follow both institutional and official immigration guidance.",
    officialSource: {
      label: "Netherlands Immigration and Naturalisation Service",
      href: "https://ind.nl/en/residence-permits/study",
    },
    commonMistakes: [
      "Not following the immigration instructions provided by the university.",
      "Submitting incomplete financial proof.",
      "Missing required immigration forms or deadlines.",
      "Assuming the university handles every step automatically.",
      "Booking travel before immigration approval is confirmed.",
    ],
  },
  {
    slug: "spain",
    country: "Spain",
    flag: "🇪🇸",
    visaType: "Study Visa (National Visa)",
    appointment: "Appointment required",
    lastReviewed: "Sep 2026",
    processingTime: "Up to 1 month in standard cases",
    estimatedFee: "Verify current fee with the responsible consulate",
    financialProof:
      "Proof of sufficient financial means is required. Verify the current required amount with the responsible Spanish consulate.",
    description:
      "Prepare your admission, financial, passport, health insurance, and supporting documents before applying for a Spanish study visa.",

    documents: [
      "Completed national visa application form",
      "Recent passport-size photograph",
      "Valid passport",
      "Proof of acceptance from the educational institution",
      "Proof of sufficient financial means",
      "Health insurance",
      "Additional documents requested by the responsible consulate",
    ],

    steps: [
      "Receive official acceptance from the educational institution",
      "Prepare all required visa documents",
      "Book the required visa appointment",
      "Submit the application and supporting documents",
      "Provide additional documents or attend an interview if requested",
      "Wait for the official visa decision",
      "Collect the visa and verify its details before traveling",
    ],

    warning:
      "Visa requirements can vary depending on nationality, length of study, and the responsible consular office. Always verify the latest official requirements before applying.",

    officialSource: {
      label: "Spanish Ministry of Foreign Affairs — Study Visa",
      href: "https://www.exteriores.gob.es/Embajadas/beirut/en/ServiciosConsulares/Paginas/Consular/Visado-de-estudios.aspx",
    },

    commonMistakes: [
      "Applying too close to the beginning of the study program.",
      "Submitting incomplete proof of financial means.",
      "Using a passport that does not meet the required validity conditions.",
      "Submitting documents without the required legalization or official Spanish translation.",
      "Not checking the latest requirements of the responsible consular office.",
    ],
  },
];
