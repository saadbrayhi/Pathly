import { axiosGet } from "@/lib/axios";

export type SearchApiResult = {
  type: "country" | "scholarship" | "document" | "visa";
  title: string;
  description: string;
  href: string;
};

export async function fetchSearchResults(
  query: string,
): Promise<SearchApiResult[]> {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("q", query.trim());
  }

  const queryString = params.toString();

  const response = await axiosGet<SearchApiResult[]>(
    `search${queryString ? `?${queryString}` : ""}`,
  );

  return response.data ?? [];
}
