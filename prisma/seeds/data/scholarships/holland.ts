import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  genericCommonMistakes,
  requiredDocuments,
} from "./common";

export const holland: Scholarship = {
  slug: "holland-scholarship",

  image:
    "https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&w=1200&q=80",

  country: "Netherlands",
  flag: "🇳🇱",
  status: "Verify",
  level: "Bachelor / Master",

  provider: "Dutch Ministry of Education, Culture and Science",

  title: "Holland Scholarship",

  funding: "€5,000 one-time grant",

  deadline: "Typically February–May — verify university portal",

  field: "All fields",

  deadlineStatus: "Verify current deadline",
  deadlineTone: "warning",
  officialUrl: "https://www.studyinnl.org/finances/nl-scholarship",
  overview:
    "The Holland Scholarship is offered by Dutch Ministry of Education, Culture and Science and provides financial support for eligible students at the Bachelor / Master level. Review all requirements on the official page before applying.",

  whoCanApply:
    "Non-EEA students accepted to a Dutch higher education institution.",

  eligibilityNote,

  fundingCoverage: "€5,000 one-time grant",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: genericCommonMistakes,
};
