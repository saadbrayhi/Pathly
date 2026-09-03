import { api, axiosGet } from "@/lib/axios";

export type ScholarshipDeadline = {
  id: string;
  label: string | null;
  displayText: string;
  deadlineDate: string | null;
  state: string;
  verificationStatus: string;
  sourceUrl: string | null;
  sortOrder: number;
};

export type ScholarshipCountry = {
  id: string;
  name: string;
  slug: string;
  flag: string | null;
};

export type ScholarshipApiItem = {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  flag: string | null;
  scopeLabel: string | null;

  provider: string | null;
  level: string | null;
  field: string | null;
  funding: string | null;

  overview: string | null;
  whoCanApply: string | null;
  eligibilityNote: string | null;

  fundingCoverage: string | null;
  fundingNote: string | null;

  officialUrl: string | null;
  verificationStatus: string;

  requiredDocuments: string[];
  applicationSteps: string[];
  commonMistakes: string[];

  countries: ScholarshipCountry[];
  deadlines: ScholarshipDeadline[];
};

export type ScholarshipFilters = {
  search?: string;
  destination?: string;
  degree?: string;
  field?: string;
  funding?: string;
};

export async function fetchScholarships(
  filters: ScholarshipFilters = {},
): Promise<ScholarshipApiItem[]> {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.destination) params.set("destination", filters.destination);
  if (filters.degree) params.set("degree", filters.degree);
  if (filters.field) params.set("field", filters.field);
  if (filters.funding) params.set("funding", filters.funding);

  const query = params.toString();

  const response = await axiosGet<ScholarshipApiItem[]>(
    `scholarships${query ? `?${query}` : ""}`,
  );

  return response.data ?? [];
}

export async function fetchScholarshipBySlug(
  slug: string,
): Promise<ScholarshipApiItem> {
  const response = await axiosGet<ScholarshipApiItem>(
    `scholarships/${encodeURIComponent(slug)}`,
  );

  if (!response.data) {
    throw new Error("Scholarship data was not returned by the API.");
  }

  return response.data;
}

export type CreateScholarshipPayload = {
  title: string;
  slug: string;
  image?: string | null;
  flag?: string | null;
  scopeLabel?: string | null;
  provider?: string | null;
  level?: string | null;
  field?: string | null;
  funding?: string | null;
  overview?: string | null;
  whoCanApply?: string | null;
  eligibilityNote?: string | null;
  fundingCoverage?: string | null;
  fundingNote?: string | null;
  officialUrl?: string | null;
  countryIds?: string[];
};

export type UpdateScholarshipPayload = Partial<CreateScholarshipPayload>;

type ApiSuccess<T> = { success: true; data: T };

export async function adminCreateScholarship(
  payload: CreateScholarshipPayload,
): Promise<ScholarshipApiItem> {
  const response = await api.post<ApiSuccess<ScholarshipApiItem>>(
    "/scholarships",
    payload,
  );
  return response.data.data;
}

export async function adminUpdateScholarship(
  slug: string,
  payload: UpdateScholarshipPayload,
): Promise<ScholarshipApiItem> {
  const response = await api.put<ApiSuccess<ScholarshipApiItem>>(
    `/scholarships/${slug}`,
    payload,
  );
  return response.data.data;
}

export async function adminDeleteScholarship(slug: string): Promise<void> {
  await api.delete(`/scholarships/${slug}`);
}

export type ScholarshipViewModel = {
  slug: string;
  image: string;
  country: string;
  flag: string;
  status: "Verify" | "Open";
  level: string;
  provider: string;
  title: string;
  funding: string;
  deadline: string;
  field: string;
  deadlineStatus: string;
  deadlineTone: "warning" | "success";
  overview: string;
  whoCanApply: string;
  eligibilityNote: string;
  fundingCoverage: string;
  fundingNote: string;
  officialUrl: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  commonMistakes: string[];
};

export function mapScholarshipToViewModel(
  scholarship: ScholarshipApiItem,
): ScholarshipViewModel {
  const deadline = scholarship.deadlines[0];

  const isOpen = scholarship.deadlines.some((item) => item.state === "OPEN");

  return {
    slug: scholarship.slug,

    image: scholarship.image ?? "",

    country:
      scholarship.scopeLabel ??
      scholarship.countries[0]?.name ??
      "Multiple Countries",

    flag: scholarship.flag ?? scholarship.countries[0]?.flag ?? "🌍",

    status: isOpen ? "Open" : "Verify",

    level: scholarship.level ?? "Not specified",

    provider: scholarship.provider ?? "Unknown provider",

    title: scholarship.title,

    funding: scholarship.funding ?? "Verify funding",

    deadline: deadline?.displayText ?? "Verify deadline on official page",

    field: scholarship.field ?? "Not specified",

    deadlineStatus: isOpen ? "Open" : "Verify",

    deadlineTone: isOpen ? "success" : "warning",

    overview: scholarship.overview ?? "",

    whoCanApply: scholarship.whoCanApply ?? "",

    eligibilityNote: scholarship.eligibilityNote ?? "",

    fundingCoverage: scholarship.fundingCoverage ?? "",

    fundingNote: scholarship.fundingNote ?? "",

    officialUrl: scholarship.officialUrl ?? "",

    requiredDocuments: scholarship.requiredDocuments,

    applicationSteps: scholarship.applicationSteps,

    commonMistakes: scholarship.commonMistakes,
  };
}
