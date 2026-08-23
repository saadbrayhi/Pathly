"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import Badge from "../../components/shared/Badge";

import ScholarshipCard from "./ScholarshipCard";
import ScholarshipFilters from "./ScholarshipFilters";
import ScholarshipSearch from "./ScholarshipSearch";
import { scholarships } from "../../../constant/scholarships";

export default function ScholarshipExplorer() {
  const [search, setSearch] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [fullyFundedOnly, setFullyFundedOnly] = useState(false);

  const filteredScholarships = scholarships.filter((scholarship) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      scholarship.title.toLowerCase().includes(query) ||
      scholarship.provider.toLowerCase().includes(query) ||
      scholarship.country.toLowerCase().includes(query) ||
      scholarship.level.toLowerCase().includes(query);

    const matchesCountry = country === "" || scholarship.country === country;

    const matchesLevel =
      level === "" ||
      scholarship.level.toLowerCase().includes(level.toLowerCase());

    const funding = scholarship.funding.toLowerCase();

    const matchesFunding =
      !fullyFundedOnly ||
      funding.includes("fully funded") ||
      funding.includes("full tuition");

    return matchesSearch && matchesCountry && matchesLevel && matchesFunding;
  });
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
          {filteredScholarships.length}{" "}
          {filteredScholarships.length === 1 ? "scholarship" : "scholarships"}
        </p>

        <Badge variant="warning" className="gap-2 px-3 py-1.5">
          <AlertTriangle size={14} />
          Demo data — always verify on official pages
        </Badge>
      </div>

      {filteredScholarships.length > 0 ? (
        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.slug}
              slug={scholarship.slug}
              image={scholarship.image}
              country={scholarship.country}
              flag={scholarship.flag}
              status={scholarship.status}
              level={scholarship.level}
              provider={scholarship.provider}
              title={scholarship.title}
              funding={scholarship.funding}
              deadline={scholarship.deadline}
            />
          ))}
        </section>
      ) : (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
          <h3 className="font-semibold text-[#263a5b]">
            No scholarships found
          </h3>

          <p className="mt-2 text-sm text-[#7f94b4]">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </>
  );
}
