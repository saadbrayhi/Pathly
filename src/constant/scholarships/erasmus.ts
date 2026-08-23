import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  requiredDocuments,
} from "./common";

export const erasmus: Scholarship = {
  slug: "erasmus-mundus",

  image:
    "https://images.unsplash.com/photo-1642612460433-a5d935c08d73?auto=format&fit=crop&w=1200&q=80",

  country: "Multiple European Countries",
  flag: "🇪🇺",
  status: "Verify",
  level: "Master",

  provider: "European Union / Participating Consortia",
  title: "Erasmus Mundus Joint Masters",

  funding: "Fully funded",

  deadline: "Varies by program (typically Nov–Jan)",

  field: "Various fields",

  deadlineStatus: "Verify current deadline",
  deadlineTone: "warning",
  officialUrl:
    "https://education.ec.europa.eu/study-in-europe/programmes-and-fields/programmes-by-theme",
  overview:
    "Erasmus Mundus Joint Masters are prestigious EU-funded programs delivered jointly by consortia of European universities. Each program is independently run by its consortium and has its own application process, requirements, and deadline. The scholarship covers tuition, a monthly living allowance, and a travel contribution. Selection is highly competitive and based on academic excellence.",

  whoCanApply:
    "Open to students worldwide. Selection based on academic excellence and program fit.",

  eligibilityNote,

  fundingCoverage: "Fully funded — tuition, living allowance, travel",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: [
    "Applying to a generic 'Erasmus Mundus' portal — each program has its own application.",
    "Missing a required consortium document specific to the program track.",
    "Submitting a generic motivation letter not tailored to the specific consortium.",
    "Missing the program deadline because deadlines differ between consortia.",
    "Assuming the scholarship includes all costs — some programs have partial funding models.",
  ],
};
