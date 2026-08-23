import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  genericCommonMistakes,
  requiredDocuments,
} from "./common";

export const italy: Scholarship = {
  slug: "invest-your-talent-italy",

  image:
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",

  country: "Italy",
  flag: "🇮🇹",
  status: "Verify",
  level: "Master",

  provider: "Italian Ministry of Foreign Affairs",

  title: "Invest Your Talent in Italy",

  funding: "Full tuition + monthly allowance for select programs",

  deadline: "Varies by program — verify official portal",

  field: "Engineering, economics, design, architecture",

  deadlineStatus: "Verify current deadline",
  deadlineTone: "warning",
  officialUrl:
    "https://investyourtalent.esteri.it/SitoIYT/EN/invest-your-talent-in-italy",
  overview:
    "The Invest Your Talent in Italy is offered by Italian Ministry of Foreign Affairs and provides financial support for eligible students at the Master level. Review all requirements on the official page before applying.",

  whoCanApply:
    "Students from participating countries. Program-specific criteria apply.",

  eligibilityNote,

  fundingCoverage: "Full tuition + monthly allowance for select programs",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: genericCommonMistakes,
};
