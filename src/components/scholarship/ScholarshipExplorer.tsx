"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

import Badge from "@/components/shared/Badge";
import EmptyState from "@/components/shared/states/EmptyState";

import ScholarshipCard from "./ScholarshipCard";
import ScholarshipFilters from "./ScholarshipFilters";
import ScholarshipSearch from "./ScholarshipSearch";

import {
  fetchScholarships,
  type ScholarshipApiItem,
} from "@/services/scholarship";

type ScholarshipListItem = {
  slug: string;
  title: string;
  image: string | null;
  flag: string | null;
  scopeLabel: string | null;
  provider: string | null;
  level: string | null;
  funding: string | null;

  countries: {
    name: string;
    flag: string | null;
  }[];

  deadlines: {
    displayText: string;
    state: string;
  }[];
};

type ScholarshipExplorerProps = {
  initialScholarships: ScholarshipListItem[];
};

export default function ScholarshipExplorer({
  initialScholarships,
}: ScholarshipExplorerProps) {
  const [search, setSearch] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [fullyFundedOnly, setFullyFundedOnly] = useState(false);

  const [scholarships, setScholarships] =
    useState<ScholarshipListItem[]>(initialScholarships);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // The first scholarship list already came from page.tsx.
    // Do not fetch it again.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data: ScholarshipApiItem[] = await fetchScholarships({
          search: search.trim() || undefined,
          destination: country || undefined,
          degree: level || undefined,
          funding: fullyFundedOnly ? "fully-funded" : undefined,
        });

        if (!cancelled) {
          setScholarships(data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load scholarships.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search, country, level, fullyFundedOnly]);

  function clearFilters() {
    setSearch("");
    setCountry("");
    setLevel("");
    setFullyFundedOnly(false);
  }

  return (
    <>
      <ScholarshipSearch
        value={search}
        onChange={setSearch}
        onFiltersClick={() =>
          setIsFiltersOpen((previousValue) => !previousValue)
        }
        isFiltersOpen={isFiltersOpen}
      />

      {isFiltersOpen && (
        <ScholarshipFilters
          level={level}
          country={country}
          fullyFundedOnly={fullyFundedOnly}
          onLevelChange={setLevel}
          onCountryChange={setCountry}
          onFullyFundedChange={setFullyFundedOnly}
          onClear={clearFilters}
        />
      )}

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[#7f94b4]">
          {isLoading
            ? "Loading scholarships..."
            : `${scholarships.length} ${
                scholarships.length === 1 ? "scholarship" : "scholarships"
              }`}
        </p>

        <Badge variant="warning" className="gap-2 px-3 py-1.5">
          <AlertTriangle size={14} />
          Always verify information on official pages
        </Badge>
      </div>

      {error ? (
        <EmptyState
          title="Unable to load scholarships"
          description={error}
          actionLabel="Clear filters"
          onAction={clearFilters}
          className="mt-5"
        />
      ) : scholarships.length > 0 ? (
        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {scholarships.map((scholarship) => {
            const countryName =
              scholarship.scopeLabel ??
              scholarship.countries[0]?.name ??
              "Multiple Countries";

            const flag =
              scholarship.flag ?? scholarship.countries[0]?.flag ?? "🌍";

            const deadline =
              scholarship.deadlines[0]?.displayText ??
              "Verify on official page";

            const status = scholarship.deadlines.some(
              (deadlineItem) => deadlineItem.state === "OPEN",
            )
              ? "Open"
              : "Verify";

            return (
              <ScholarshipCard
                key={scholarship.slug}
                slug={scholarship.slug}
                image={scholarship.image ?? ""}
                country={countryName}
                flag={flag}
                status={status}
                level={scholarship.level ?? "Not specified"}
                provider={scholarship.provider ?? "Unknown provider"}
                title={scholarship.title}
                funding={scholarship.funding ?? "Verify funding"}
                deadline={deadline}
              />
            );
          })}
        </section>
      ) : (
        <EmptyState
          title="No scholarships found"
          description="Try changing your search or filters."
          actionLabel="Clear filters"
          onAction={clearFilters}
          className="mt-5"
        />
      )}
    </>
  );
}
