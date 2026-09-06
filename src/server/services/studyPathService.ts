import "server-only";

import { ApiError } from "@/server/api/errors";
import {
  createStudyPathRequestRecord,
  findStudyPathCountries,
} from "@/server/repositories/studyPathRepository";
import type { CreateStudyPathInput } from "@/server/validation/studyPath";
import type {
  StudyPathJourneyStage,
  StudyPathResult,
} from "@/interfaces/studyPath";

const educationLabels: Record<CreateStudyPathInput["educationLevel"], string> = {
  "bac-high-school": "BAC / High School",
  "bachelor-student": "Bachelor Student",
  "bachelor-graduate": "Bachelor Graduate",
  "master-student": "Master Student",
  "master-graduate": "Master Graduate",
};

const degreeLabels: Record<CreateStudyPathInput["desiredDegree"], string> = {
  bachelor: "Bachelor",
  master: "Master",
  phd: "PhD",
  exchange: "Exchange Program",
};

const fieldLabels: Record<CreateStudyPathInput["fieldOfStudy"], string> = {
  "computer-science": "Computer Science",
  engineering: "Engineering",
  business: "Business",
  medicine: "Medicine",
  architecture: "Architecture",
  sciences: "Sciences",
  "arts-humanities": "Arts & Humanities",
};

const supportedDegrees: Record<
  CreateStudyPathInput["educationLevel"],
  CreateStudyPathInput["desiredDegree"][]
> = {
  "bac-high-school": ["bachelor"],
  "bachelor-student": ["bachelor", "master", "exchange"],
  "bachelor-graduate": ["master", "exchange"],
  "master-student": ["master", "phd", "exchange"],
  "master-graduate": ["phd", "exchange"],
};

export async function generateStudyPath(
  input: CreateStudyPathInput,
): Promise<StudyPathResult> {
  ensureSupportedCombination(input);

  const isRecommendation = input.destination === "not-sure";
  const countries = await findStudyPathCountries(
    isRecommendation ? undefined : input.destination,
  );

  if (countries.length === 0) {
    throw new ApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "The selected destination is not available.",
    });
  }

  const country = isRecommendation
    ? [...countries].sort(
        (left, right) =>
          scoreCountry(right, input) - scoreCountry(left, input),
      )[0]
    : countries[0];

  const degreeLabel = degreeLabels[input.desiredDegree];
  const fieldLabel = fieldLabels[input.fieldOfStudy];
  const studyLevel = country.studyLevelDetails.find((item) =>
    includesNormalized(item.level, degreeLabel),
  );
  const exactScholarshipMatches = country.scholarships.filter(
      (scholarship) =>
        matchesScholarshipValue(scholarship.level, degreeLabel) &&
        matchesScholarshipValue(scholarship.field, fieldLabel),
    );
  const scholarshipRecords =
    exactScholarshipMatches.length > 0
      ? exactScholarshipMatches
      : country.scholarships.filter((scholarship) =>
          matchesScholarshipValue(scholarship.level, degreeLabel),
        );
  const scholarships = scholarshipRecords
    .map((scholarship) => ({
      id: scholarship.id,
      slug: scholarship.slug,
      title: scholarship.title,
      provider: scholarship.provider,
      level: scholarship.level,
      field: scholarship.field,
      funding: scholarship.funding,
      deadline: scholarship.deadlines[0]?.displayText ?? null,
      officialUrl: scholarship.officialUrl,
    }));

  const requiredDocuments =
    country.requiredDocuments.length > 0
      ? country.requiredDocuments
      : [
          "Passport copy",
          "Academic transcript",
          "Degree or school certificate",
          "Language certificate when required",
          "Motivation letter",
        ];

  const savedRequest = await createStudyPathRequestRecord({
    educationLevel: input.educationLevel,
    desiredDegree: input.desiredDegree,
    fieldOfStudy: input.fieldOfStudy,
    destinationValue: input.destination,
    countryId: country.id,
  });

  const eligibilityStatus = studyLevel
    ? "LIKELY_ELIGIBLE"
    : "REVIEW_REQUIRED";
  const eligibilityHeadline = studyLevel
    ? `Your background can lead toward a ${degreeLabel} path in ${country.name}.`
    : `${country.name} is worth exploring, but program-level eligibility needs confirmation.`;

  return {
    requestId: savedRequest.id,
    generatedAt: savedRequest.createdAt.toISOString(),
    selections: {
      educationLevel: input.educationLevel,
      educationLabel: educationLabels[input.educationLevel],
      desiredDegree: input.desiredDegree,
      degreeLabel,
      fieldOfStudy: input.fieldOfStudy,
      fieldLabel,
    },
    destination: {
      id: country.id,
      slug: country.slug,
      name: country.name,
      flag: country.flag,
      recommended: isRecommendation,
    },
    eligibility: {
      status: eligibilityStatus,
      headline: eligibilityHeadline,
      note:
        country.eligibilityWarning ??
        "Final eligibility depends on the institution and program. Verify all requirements on official pages.",
    },
    admission: {
      overview: country.overview,
      educationSystem: country.educationSystem,
      whoCanApply: country.whoCanApply,
      warning: country.eligibilityWarning,
      requirements: country.admissionRequirements.map((requirement) => ({
        id: requirement.id,
        label: requirement.label,
        status: requirement.status,
      })),
      studyLevel: studyLevel
        ? {
            level: studyLevel.level,
            duration: studyLevel.duration,
            language: studyLevel.language,
            tuition: studyLevel.tuition,
            note: studyLevel.note,
          }
        : null,
    },
    requiredDocuments,
    scholarships,
    visa: {
      type: country.visaType,
      summary: country.visaSummary,
      description: country.visaDescription,
      processingTime: country.visaProcessingTime,
      appointment: country.visaAppointment,
      estimatedFee: country.visaEstimatedFee,
      financialProof: country.visaFinancialProof,
      warning: country.visaWarning,
      documents: country.visaDocuments,
      steps: country.visaSteps,
    },
    language: {
      summary: country.languages,
      mainLanguage: country.mainLanguage,
      options: country.languageOptions,
      warning: country.languageWarning,
      requirements: country.languageRequirements.map((requirement) => ({
        id: requirement.id,
        title: requirement.title,
        description: requirement.description,
      })),
    },
    costs: {
      tuition: studyLevel?.tuition ?? country.tuition,
      tuitionRange: country.tuitionRange,
      livingCost: country.livingCost,
      livingCostSummary: country.livingCostSummary,
    },
    journeyStages: buildJourneyStages(
      country.slug,
      country.name,
      degreeLabel,
      requiredDocuments,
      country.visaDocuments,
      country.visaEstimatedFee,
    ),
    officialSources: buildOfficialSources(country, scholarships),
  };
}

function ensureSupportedCombination(input: CreateStudyPathInput) {
  if (supportedDegrees[input.educationLevel].includes(input.desiredDegree)) {
    return;
  }

  throw new ApiError({
    status: 422,
    code: "VALIDATION_ERROR",
    message: "This education level and desired degree combination is not supported.",
    details: {
      formErrors: [],
      fieldErrors: {
        desiredDegree: [
          `Choose one of: ${supportedDegrees[input.educationLevel]
            .map((degree) => degreeLabels[degree])
            .join(", ")}.`,
        ],
      },
    },
  });
}

function scoreCountry(
  country: Awaited<ReturnType<typeof findStudyPathCountries>>[number],
  input: CreateStudyPathInput,
) {
  const degreeLabel = degreeLabels[input.desiredDegree];
  const fieldLabel = fieldLabels[input.fieldOfStudy];
  const hasStudyLevel = country.studyLevelDetails.some((item) =>
    includesNormalized(item.level, degreeLabel),
  );
  const scholarshipMatches = country.scholarships.filter(
    (scholarship) =>
      matchesScholarshipValue(scholarship.level, degreeLabel) &&
      matchesScholarshipValue(scholarship.field, fieldLabel),
  ).length;

  return (hasStudyLevel ? 10 : 0) + scholarshipMatches * 3;
}

function matchesScholarshipValue(value: string | null, selected: string) {
  if (!value) return true;

  const normalized = value.toLowerCase();
  return (
    normalized.includes("all") ||
    normalized.includes(selected.toLowerCase()) ||
    selected.toLowerCase().includes(normalized)
  );
}

function includesNormalized(value: string, selected: string) {
  return value.toLowerCase().includes(selected.toLowerCase());
}

function buildJourneyStages(
  countrySlug: string,
  countryName: string,
  degreeLabel: string,
  requiredDocuments: string[],
  visaDocuments: string[],
  visaFee: string | null,
): StudyPathJourneyStage[] {
  return [
    {
      id: 1,
      title: "Confirm admission eligibility",
      timing: "6–12 months before the intended start",
      description: `Verify the entry requirements for ${degreeLabel} programs in ${countryName}.`,
      documents: requiredDocuments.slice(0, 2),
      estimatedCost: null,
      note: "Requirements vary by institution and program.",
      links: [
        {
          label: "Admission requirements",
          href: `/study-abroad/${countrySlug}`,
          external: false,
        },
      ],
    },
    {
      id: 2,
      title: "Prepare required documents",
      timing: "5–10 months before the start",
      description: "Collect, translate, and authenticate the documents needed for applications.",
      documents: requiredDocuments,
      estimatedCost: "Varies by translation and certification fees",
      note: "Use the document guide to check preparation requirements.",
      links: [{ label: "Document guide", href: "/documents", external: false }],
    },
    {
      id: 3,
      title: "Complete the language requirement",
      timing: "6–8 months before applying",
      description: `Confirm the accepted language tests and required scores for programs in ${countryName}.`,
      documents: ["Language certificate when required"],
      estimatedCost: "Varies by language test",
      note: "Language requirements differ by program.",
      links: [],
    },
    {
      id: 4,
      title: "Select universities and programs",
      timing: "4–8 months before the deadline",
      description: "Compare programs, tuition, requirements, and application deadlines.",
      documents: ["Program shortlist", "Deadline checklist"],
      estimatedCost: null,
      note: null,
      links: [
        {
          label: `${countryName} study guide`,
          href: `/study-abroad/${countrySlug}`,
          external: false,
        },
      ],
    },
    {
      id: 5,
      title: "Apply to universities",
      timing: "Before each program deadline",
      description: "Submit complete applications through each official university platform.",
      documents: requiredDocuments,
      estimatedCost: "Varies by institution",
      note: "Always confirm the official submission method.",
      links: [],
    },
    {
      id: 6,
      title: "Apply for scholarships",
      timing: "Alongside university applications",
      description: "Apply for opportunities matching your destination, degree, and field.",
      documents: requiredDocuments.slice(0, 4),
      estimatedCost: "Usually free to apply",
      note: "Scholarship deadlines may be earlier than admission deadlines.",
      links: [{ label: "Find scholarships", href: "/scholarship", external: false }],
    },
    {
      id: 7,
      title: "Prepare the student visa",
      timing: "After receiving admission",
      description: `Prepare and submit the student visa application for ${countryName}.`,
      documents: visaDocuments,
      estimatedCost: visaFee,
      note: "Confirm the latest requirements with the official authority.",
      links: [
        {
          label: "Student visa guide",
          href: `/student-visa/${countrySlug}`,
          external: false,
        },
      ],
    },
    {
      id: 8,
      title: "Prepare accommodation and travel",
      timing: "After visa approval",
      description: "Finalize accommodation, insurance, travel, and arrival preparation.",
      documents: ["Visa", "Accommodation confirmation", "Insurance", "Travel documents"],
      estimatedCost: "Depends on travel and accommodation",
      note: "Keep paper and digital copies of important documents.",
      links: [],
    },
  ];
}

function buildOfficialSources(
  country: Awaited<ReturnType<typeof findStudyPathCountries>>[number],
  scholarships: StudyPathResult["scholarships"],
): StudyPathResult["officialSources"] {
  const sources: StudyPathResult["officialSources"] =
    country.officialSources.map((source) => ({
      id: source.id,
      name: source.name,
      description: source.description,
      url: source.url,
    }));

  if (country.visaOfficialSourceUrl) {
    sources.push({
      id: `visa-${country.id}`,
      name: country.visaOfficialSourceLabel ?? `${country.name} visa authority`,
      description: "Official student visa information.",
      url: country.visaOfficialSourceUrl,
    });
  }

  for (const scholarship of scholarships) {
    if (scholarship.officialUrl) {
      sources.push({
        id: `scholarship-${scholarship.id}`,
        name: `${scholarship.title} official page`,
        description: "Official scholarship information.",
        url: scholarship.officialUrl,
      });
    }
  }

  return sources.filter(
    (source, index) =>
      sources.findIndex((candidate) => candidate.url === source.url) === index,
  );
}
