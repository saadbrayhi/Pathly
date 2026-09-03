"use client";

import { useEffect, useState } from "react";
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

export default function ScholarshipExplorer() {
  const [search, setSearch] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [fullyFundedOnly, setFullyFundedOnly] = useState(false);

  const [scholarships, setScholarships] = useState<ScholarshipApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchScholarships({
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

      {isLoading ? (
        <p className="mt-5 text-sm text-[#7f94b4]">Loading scholarships...</p>
      ) : error ? (
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
