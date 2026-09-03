import { api } from "@/lib/axios";
import type { Country, CountryDetails } from "@/interfaces/country";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type CountryFilters = {
  search?: string;
  language?: string;
};

export type CreateCountryPayload = {
  name: string;
  slug: string;
  flag?: string | null;
  image?: string | null;
  description?: string | null;
  languages?: string | null;
  tuition?: string | null;
  livingCost?: string | null;
  tuitionRange?: string | null;
  overview?: string | null;
  mainLanguage?: string | null;
  livingCostSummary?: string | null;
  educationSystem?: string | null;
  whoCanApply?: string | null;
  eligibilityWarning?: string | null;
  languageWarning?: string | null;
  languageOptions?: string[];
  studyLevelOptions?: string[];
};

export type UpdateCountryPayload = Partial<CreateCountryPayload>;

export async function fetchCountries(
  filters: CountryFilters = {},
): Promise<Country[]> {
  const response = await api.get<ApiSuccess<Country[]>>("/countries", {
    params: filters,
  });

  return response.data.data;
}

export async function fetchCountryBySlug(
  slug: string,
): Promise<CountryDetails> {
  const response = await api.get<ApiSuccess<CountryDetails>>(
    `/countries/${slug}`,
  );

  return response.data.data;
}

export async function adminCreateCountry(
  payload: CreateCountryPayload,
): Promise<Country> {
  const response = await api.post<ApiSuccess<Country>>("/countries", payload);
  return response.data.data;
}

export async function adminUpdateCountry(
  slug: string,
  payload: UpdateCountryPayload,
): Promise<Country> {
  const response = await api.put<ApiSuccess<Country>>(
    `/countries/${slug}`,
    payload,
  );
  return response.data.data;
}

export async function adminDeleteCountry(slug: string): Promise<void> {
  await api.delete(`/countries/${slug}`);
}