"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";

import CountryCard from "./CountryCard";
import type { Country } from "@/constant/countries";

type StudyAbroadDirectoryProps = {
  countries: Country[];
};

const studyLevels = ["Bachelor", "Master", "PhD", "Exchange"];

const languages = [
  "English",
  "French",
  "German",
  "Italian",
  "Spanish",
  "Turkish",
  "Dutch",
];

export default function StudyAbroadDirectory({
  countries,
}: StudyAbroadDirectoryProps) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <section>
      {/* Search + Filters */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#8da2c2]"
          />

          <Input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a country"
            className="h-12.5 pl-11 pr-4 text-[#243858] placeholder:text-[#91a3bf] focus:border-[#4468df]"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowFilters((previousValue) => !previousValue)}
          className="flex h-12.5 shrink-0 items-center gap-2 rounded-xl border border-[#4468df] bg-white px-5 text-sm font-semibold text-[#3157d5]"
        >
          <SlidersHorizontal size={17} strokeWidth={1.8} />
          Filters
        </Button>
      </div>

      {/* Filter details */}
      {showFilters && (
        <div className="mb-5 rounded-xl border border-[#dce5f0] bg-white px-5 py-5">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[1.1fr_1.1fr_1fr]">
            {/* Study Level */}
            <div>
              <p className="filter-label">
                Study Level
              </p>

              <div className="flex flex-wrap gap-2">
                {studyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className="filter-chip border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="filter-label">
                Language
              </p>

              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    className="filter-chip border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <p className="filter-label">
                Scholarships
              </p>

              <button
                type="button"
                className="filter-chip border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
              >
                Scholarships available
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result count */}
      <p className="mb-5 text-sm text-[#8aa0c1]">
        {filteredCountries.length}{" "}
        {filteredCountries.length === 1 ? "destination" : "destinations"}
      </p>

      {/* Country cards */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#dce5f0] bg-white px-6 py-14 text-center">
          <h3 className="font-semibold text-[#233858]">No country found</h3>

          <p className="mt-2 text-sm text-[#8aa0c1]">
            Try another country name.
          </p>
        </div>
      )}
    </section>
  );
}
