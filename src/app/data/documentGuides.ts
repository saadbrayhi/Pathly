import type { StudyDocument } from "./documents";

export type DocumentStructureStep = {
  title: string;
  description: string;
};

export type DocumentGuide = {
  whatItIs: string;
  whyItIsNeeded: string;
  structure: DocumentStructureStep[];
  structureNote?: string;
  mistakes: string[];
};

const motivationLetterGuide: DocumentGuide = {
  whatItIs:
    "A motivation letter, also called a personal statement or letter of motivation, explains why you are applying for a specific program, what makes you a strong candidate, and what you plan to do after your studies.",
  whyItIsNeeded:
    "Universities and scholarship committees use motivation letters to evaluate applicants beyond grades. A strong letter demonstrates clarity of purpose, academic maturity, and genuine fit with the program.",
  structure: [
    {
      title: "Opening and study goal",
      description:
        "State what you want to study, why this program interests you, and what motivates your goal.",
    },
    {
      title: "Academic background",
      description:
        "Summarize relevant coursework, projects, and academic achievements connected to the program.",
    },
    {
      title: "Why this program and institution",
      description:
        "Mention specific faculty, research areas, or curriculum modules that match your goals.",
    },
    {
      title: "Relevant experience and strengths",
      description:
        "Include internships, research, competitions, or skills that strengthen your application.",
    },
    {
      title: "Future plan and closing",
      description:
        "Explain how the degree supports your longer-term goals and finish with a concise conclusion.",
    },
  ],
  structureNote:
    "Recommended length: 400–600 words unless the program specifies another limit. Use the program language unless instructed otherwise.",
  mistakes: [
    "Using one generic letter for every program and institution.",
    "Repeating the CV instead of adding context and personal insight.",
    "Exceeding the stated word limit or ignoring the requested format.",
    "Failing to mention the specific program or institution.",
    "Submitting without proofreading for clarity, spelling, and grammar.",
  ],
};

const categoryPurpose = {
  Academic: "academic history and eligibility",
  Personal: "identity and personal information",
  Application: "experience, motivation, and program fit",
  Language: "language proficiency for the chosen program",
  Financial: "ability to meet tuition and living-cost requirements",
} as const;

export function getDocumentGuide(document: StudyDocument): DocumentGuide {
  if (document.slug === "motivation-letter") {
    return motivationLetterGuide;
  }

  const mistakes = [
    "Submitting a copy when an original or certified copy is required.",
    "Missing an official seal, signature, valid date, or required page.",
  ];

  if (document.translationRequired) {
    mistakes.push("Using a translation that is not completed by an accepted certified translator.");
  }

  if (document.authenticationRequired) {
    mistakes.push("Submitting the document without the required authentication or apostille.");
  }

  mistakes.push("Relying on general guidance without checking the institution's current requirements.");

  return {
    whatItIs: document.description,
    whyItIsNeeded: `Universities, scholarship providers, or visa authorities may request the ${document.name} to verify your ${categoryPurpose[document.category]} and confirm that your application meets their requirements.`,
    structure: [],
    mistakes,
  };
}
