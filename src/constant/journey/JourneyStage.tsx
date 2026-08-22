export type JourneyStageLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type JourneyStage = {
  id: number;
  title: string;
  timing: string;
  description: string;
  documents?: string[];
  estimatedCost?: string;
  note?: string;
  links?: JourneyStageLink[];
};

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    title: "Check admission eligibility",
    timing: "6–12 months before intended start",
    description:
      "Verify that your current qualification meets the entry requirements for your chosen program.",
    documents: ["BAC certificate", "Academic transcript"],
    estimatedCost: "Low (document preparation)",
    note: "Requirements vary by program and institution. Always verify on the official university page.",
    links: [
      {
        label: "View Admission Requirements",
        href: "/study-abroad/:country",
      },
    ],
  },

  {
    id: 2,
    title: "Prepare academic documents",
    timing: "5–10 months before start",
    description:
      "Prepare and organize the academic documents required for your applications.",
    documents: [
      "Academic transcript",
      "Degree certificate",
      "Passport copy",
      "Certified translations if required",
    ],
    estimatedCost: "Varies by translation and certification fees",
    note: "Some universities require officially certified or translated documents.",
    links: [
      {
        label: "View Document Guide",
        href: "/documents",
      },
    ],
  },

  {
    id: 3,
    title: "Complete the language requirement",
    timing: "6–8 months before application",
    description:
      "Check whether your program requires English, French, German, or another language certificate.",
    documents: [
      "IELTS / TOEFL",
      "French language certificate",
      "German language certificate",
    ],
    estimatedCost: "Varies by language test",
    note: "Required language level depends on the university, program, and language of instruction.",
    links: [
      {
        label: "View Language Documents",
        href: "/documents",
      },
    ],
  },

  {
    id: 4,
    title: "Select universities and programs",
    timing: "4–8 months before application deadline",
    description:
      "Compare universities, programs, tuition, entry requirements, deadlines, and available scholarships.",
    documents: [
      "Program shortlist",
      "Admission requirements",
      "Application deadlines",
    ],
    estimatedCost: "Free research stage",
    note: "Compare several institutions because requirements, tuition, and deadlines can vary significantly.",
    links: [
      {
        label: "Explore Country Guide",
        href: "/study-abroad/:country",
      },
    ],
  },

  {
    id: 5,
    title: "Apply to universities",
    timing: "1–4 months before deadline",
    description:
      "Submit your application through the university portal or the official application platform for your chosen programs.",
    documents: [
      "BAC certificate",
      "Transcript",
      "Motivation letter",
      "CV",
      "Language certificate",
      "Recommendation letters",
    ],
    estimatedCost: "€30–€100 per application",
    note: "Application procedures vary by country and university. Always confirm the official application method.",
    links: [
      {
        label: "View Required Documents",
        href: "/documents",
      },
    ],
  },

  {
    id: 6,
    title: "Search and apply for scholarships",
    timing: "Overlaps with university application period",
    description:
      "Search for scholarships that match your study level, field, destination, and financial situation.",
    documents: [
      "Academic transcript",
      "Motivation letter",
      "CV",
      "Proof of admission if required",
    ],
    estimatedCost: "Usually free to apply",
    note: "Scholarship deadlines may be earlier than university admission deadlines.",
    links: [
      {
        label: "Find Scholarships",
        href: "/scholarship",
      },
    ],
  },

  {
    id: 7,
    title: "Receive admission decision",
    timing: "2–4 months after application",
    description:
      "Track your application status and review the university decision once it is released.",
    documents: ["Admission letter", "Enrollment confirmation"],
    estimatedCost: "Possible enrollment or confirmation deposit",
    note: "Some institutions require you to confirm your place before a specific deadline.",
  },

  {
    id: 8,
    title: "Prepare visa documents",
    timing: "Before visa application",
    description:
      "Prepare the documents required before submitting your student visa application.",
    documents: [
      "Passport",
      "Admission letter",
      "Financial proof",
      "Health insurance",
      "Accommodation proof",
    ],
    estimatedCost: "Depends on destination requirements",
    note: "Visa document requirements vary by destination. Always verify them through the official embassy or immigration authority.",
    links: [
      {
        label: "View Student Visa Guide",
        href: "/student-visa",
      },
    ],
  },

  {
    id: 9,
    title: "Apply for your student visa",
    timing: "6–10 weeks before departure",
    description:
      "Submit your student visa application and attend any required embassy appointment or interview.",
    documents: [
      "Passport",
      "Admission letter",
      "Visa application form",
      "Financial proof",
      "Health insurance",
      "Accommodation proof",
    ],
    estimatedCost: "Varies by embassy and destination",
    note: "Visa requirements and processing times vary by country. Always verify with the official embassy or immigration authority.",
    links: [
      {
        label: "View Student Visa Guide",
        href: "/student-visa",
      },
    ],
  },

  {
    id: 10,
    title: "Prepare accommodation and travel",
    timing: "After visa confirmation",
    description:
      "Finalize your accommodation, travel arrangements, insurance, and arrival preparation.",
    documents: [
      "Visa",
      "Flight ticket",
      "Accommodation confirmation",
      "Insurance documents",
      "University enrollment documents",
    ],
    estimatedCost: "Depends on travel and accommodation",
    note: "Keep important documents with you during travel and prepare digital and paper copies.",
  },
];
