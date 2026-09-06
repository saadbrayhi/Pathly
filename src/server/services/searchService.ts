import "server-only";

import {
  searchCountries,
  searchDocuments,
  searchScholarships,
  searchVisaGuides,
} from "@/server/repositories/searchRepository";

export type SearchResult = {
  type: "country" | "scholarship" | "document" | "visa";
  title: string;
  description: string;
  href: string;
};

export async function searchAll(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const [countries, scholarships, documents, visas] = await Promise.all([
    searchCountries(normalizedQuery),
    searchScholarships(normalizedQuery),
    searchDocuments(normalizedQuery),
    searchVisaGuides(normalizedQuery),
  ]);

  return [
    ...countries.map((country) => ({
      type: "country" as const,
      title: country.name,
      description: country.description ?? "No description available",
      href: `/study-abroad/${country.slug}`,
    })),

    ...scholarships.map((scholarship) => ({
      type: "scholarship" as const,
      title: scholarship.title,
      description: `${
        scholarship.provider ?? "Unknown provider"
      } - ${scholarship.funding ?? "Funding details unavailable"}`,
      href: `/scholarship/${scholarship.slug}`,
    })),

    ...documents.map((document) => ({
      type: "document" as const,
      title: document.name,
      description: document.description ?? document.neededFor,
      href: `/documents/${document.slug}`,
    })),

    ...visas.map((visa) => ({
      type: "visa" as const,
      title: `${visa.name} student visa`,
      description: `${visa.visaType ?? "Student visa"} - ${
        visa.visaDescription ?? "Visa guide available"
      }`,
      href: `/student-visa/${visa.slug}`,
    })),
  ];
}
