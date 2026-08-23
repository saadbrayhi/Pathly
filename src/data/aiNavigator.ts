export const demoGuidance = {
  path: "Master's in Computer Science — Germany",
  levels: ["Master's (2 years)", "Research-focused", "Industry-focused"],
  destinations: [
    {
      name: "Germany",
      flag: "🇩🇪",
      note: "Strong computer science programs, many English-taught options and generally low tuition at public universities.",
    },
    {
      name: "France",
      flag: "🇫🇷",
      note: "A broad university network, scholarship opportunities and programs taught in French or English.",
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      note: "Many English-taught degrees with close links to international technology companies.",
    },
  ],
  admission: [
    "Bachelor's degree in Computer Science or a closely related field",
    "Academic transcripts showing relevant coursework",
    "English language certificate for English-taught programs",
    "Current CV and a focused motivation letter",
    "Recommendation letters when requested by the institution",
  ],
  documents: [
    "Valid passport",
    "Bachelor's degree certificate",
    "Academic transcripts",
    "Language certificate",
    "CV and motivation letter",
    "Recommendation letters",
  ],
  scholarships: [
    "DAAD postgraduate scholarships",
    "Erasmus Mundus Joint Masters",
    "University-specific merit awards",
  ],
  visa:
    "You will normally need a German national study visa. Start early and confirm the current checklist with the German mission responsible for your place of residence.",
  language:
    "English-taught programs commonly request IELTS or TOEFL. German-taught programs may require TestDaF or DSH. Exact scores vary by program.",
  nextSteps: [
    { label: "Explore Germany", href: "/study-abroad/germany" },
    { label: "Find scholarships", href: "/scholarship" },
    { label: "Review documents", href: "/documents" },
    { label: "Check student visas", href: "/student-visa" },
  ],
} as const;
