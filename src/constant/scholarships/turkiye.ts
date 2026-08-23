import type { Scholarship } from "./types";

import {
  applicationSteps,
  eligibilityNote,
  fundingNote,
  genericCommonMistakes,
  requiredDocuments,
} from "./common";

export const turkiye: Scholarship = {
  slug: "turkiye-scholarships",

  image:
    "https://images.unsplash.com/photo-1621013094255-8937af5b9f8d?auto=format&fit=crop&w=1200&q=80",

  country: "Turkey",
  flag: "🇹🇷",
  status: "Open",
  level: "Bachelor / Master / PhD",

  provider: "Republic of Turkey / YTB",

  title: "Türkiye Scholarships",

  funding: "Full tuition + monthly stipend + accommodation + health insurance",

  deadline: "Typically February–March — verify official portal",

  field: "All fields",

  deadlineStatus: "Open",
  deadlineTone: "success",
  officialUrl:
    "https://turkiyeburslari.gov.tr/en/page/prospective-students/how-to-apply",
  overview:
    "The Türkiye Scholarships is offered by Republic of Turkey / YTB and provides financial support for eligible students at the Bachelor / Master / PhD level. Review all requirements on the official page before applying.",

  whoCanApply: "Open to non-Turkish nationals. Competitive academic selection.",

  eligibilityNote,

  fundingCoverage:
    "Full tuition + monthly stipend + accommodation + health insurance",

  fundingNote,

  requiredDocuments,

  applicationSteps,

  commonMistakes: genericCommonMistakes,
};
