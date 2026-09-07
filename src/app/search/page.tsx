import type { Metadata } from "next";
import Link from "next/link";
import { Award, FileText, Globe2, Plane, Search } from "lucide-react";

import Card from "@/components/shared/Card";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/states/EmptyState";
import { searchAll } from "@/server/services/searchService";

export const metadata: Metadata = {
  title: "Search | Pathly",
  description:
    "Search Pathly countries, scholarships, documents, and visa guides.",
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

type SearchResult = {
  title: string;
  description: string;
  href: string;
  category: "Country" | "Scholarship" | "Document" | "Student visa";
  icon: typeof Globe2;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawQuery = (await searchParams).q;

  const query = (
    Array.isArray(rawQuery) ? rawQuery[0] : (rawQuery ?? "")
  ).trim();

  const apiResults = query ? await searchAll(query) : [];

  const results: SearchResult[] = apiResults.map((result) => {
    switch (result.type) {
      case "country":
        return {
          title: result.title,
          description: result.description,
          href: result.href,
          category: "Country",
          icon: Globe2,
        };

      case "scholarship":
        return {
          title: result.title,
          description: result.description,
          href: result.href,
          category: "Scholarship",
          icon: Award,
        };

      case "document":
        return {
          title: result.title,
          description: result.description,
          href: result.href,
          category: "Document",
          icon: FileText,
        };

      case "visa":
        return {
          title: result.title,
          description: result.description,
          href: result.href,
          category: "Student visa",
          icon: Plane,
        };
    }
  });

  return (
    <main className="warm-page py-10 sm:py-14">
      <Container className="max-w-225">
        <p className="text-sm font-semibold text-primary">Pathly search</p>

        <h1 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">
          Search results
        </h1>

        <form action="/search" className="card-surface mt-7 flex gap-3 p-3">
          <div className="search-field min-w-0">
            <Search
              aria-hidden="true"
              size={18}
              className="shrink-0 text-slate-400"
            />

            <label htmlFor="site-search" className="sr-only">
              Search Pathly
            </label>

            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search countries, scholarships, visas, or documents"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary shrink-0 rounded-lg px-5 py-3 text-sm"
          >
            Search
          </button>
        </form>

        {!query ? (
          <Card className="mt-6 p-8 text-center">
            <p className="text-slate-600">
              Enter a country, scholarship, visa, or document to start
              searching.
            </p>
          </Card>
        ) : results.length > 0 ? (
          <section className="mt-7" aria-labelledby="results-heading">
            <h2
              id="results-heading"
              className="text-sm font-medium text-slate-500"
            >
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              &quot;{query}&quot;
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {results.map((result) => {
                const Icon = result.icon;

                return (
                  <Link
                    key={`${result.category}-${result.href}`}
                    href={result.href}
                    className="group rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                  >
                    <Card className="card-interactive flex h-full gap-4 p-5 group-hover:border-soft-blue-border">
                      <span className="icon-tile shrink-0">
                        <Icon aria-hidden="true" size={18} />
                      </span>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-primary">
                          {result.category}
                        </p>

                        <h3 className="mt-1 font-bold text-heading">
                          {result.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {result.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : (
          <EmptyState
            title="No results found"
            description="Try a country name, scholarship provider, visa type, or document name."
            className="mt-6"
          />
        )}
      </Container>
    </main>
  );
}
