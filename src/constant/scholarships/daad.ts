import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  genericCommonMistakes,
  requiredDocuments,
} from "./common";

export const daad: Scholarship = {
  slug: "daad-epos",

  image:
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80",

  country: "Germany",
  flag: "🇩🇪",
  status: "Verify",
  level: "Master / PhD",

  provider: "German Academic Exchange Service (DAAD)",
  title: "DAAD EPOS",

  funding: "Monthly stipend + travel",

  deadline: "Varies by course (check DAAD portal)",

  field: "Development-related fields",

  deadlineStatus: "Verify current deadline",
  deadlineTone: "warning",
  officialUrl:
    "https://www.daad.de/en/information-services-for-higher-education-institutions/further-information-on-daad-programmes/epos/",
  overview:
    "The DAAD EPOS is offered by German Academic Exchange Service (DAAD) and provides financial support for eligible students at the Master / PhD level. Review all requirements on the official page before applying.",

  whoCanApply:
    "Professionals with work experience from developing countries. Field-specific criteria apply.",

  eligibilityNote,

  fundingCoverage: "Monthly stipend + travel — coverage varies by program",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: genericCommonMistakes,
};
