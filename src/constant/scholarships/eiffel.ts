import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  genericCommonMistakes,
  requiredDocuments,
} from "./common";

export const eiffel: Scholarship = {
  slug: "eiffel-excellence",

  image:
    "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=1200&q=80",

  country: "France",
  flag: "🇫🇷",
  status: "Verify",
  level: "Master / PhD",

  provider: "Campus France / French Ministry of Foreign Affairs",

  title: "Eiffel Excellence Scholarship",

  funding: "Monthly stipend + health coverage + cultural activities",

  deadline: "Institutional nomination required — verify current cycle",

  field: "Law, economics, political science, engineering, life sciences",

  deadlineStatus: "Verify current deadline",
  deadlineTone: "warning",
  officialUrl:
    "https://www.campusfrance.org/en/the-france-excellence-eiffel-scholarship-program",
  overview:
    "The Eiffel Excellence Scholarship is offered by Campus France / French Ministry of Foreign Affairs and provides financial support for eligible students at the Master / PhD level. Review all requirements on the official page before applying.",

  whoCanApply:
    "Nominated by a French higher education institution. Based on academic merit.",

  eligibilityNote,

  fundingCoverage: "Monthly stipend + health coverage + cultural activities",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: genericCommonMistakes,
};
