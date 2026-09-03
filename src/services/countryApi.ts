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