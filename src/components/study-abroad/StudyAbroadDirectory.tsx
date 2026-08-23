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
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [scholarshipsOnly, setScholarshipsOnly] = useState(false);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesLevel =
      selectedLevels.length === 0 ||
      selectedLevels.some((level) =>
        country.studyLevelOptions.includes(
          level as (typeof country.studyLevelOptions)[number],
        ),
      );
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((language) =>
        country.languageOptions.includes(language),
      );
    const matchesScholarships =
      !scholarshipsOnly || country.scholarshipAvailable;

    return (
      matchesSearch &&
      matchesLevel &&
      matchesLanguage &&
      matchesScholarships
    );
  });

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedLevels.length > 0 ||
    selectedLanguages.length > 0 ||
    scholarshipsOnly;

  function toggleValue(
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    setter((currentValues) =>
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setScholarshipsOnly(false);
  }

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
                    aria-pressed={selectedLevels.includes(level)}
                    onClick={() => toggleValue(level, setSelectedLevels)}
                    className={`filter-chip ${
                      selectedLevels.includes(level)
                        ? "border-[#4468df] bg-[#eef3ff] text-[#3157d5]"
                        : "border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
                    }`}
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
                    aria-pressed={selectedLanguages.includes(language)}
                    onClick={() => toggleValue(language, setSelectedLanguages)}
                    className={`filter-chip ${
                      selectedLanguages.includes(language)
                        ? "border-[#4468df] bg-[#eef3ff] text-[#3157d5]"
                        : "border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
                    }`}
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
                aria-pressed={scholarshipsOnly}
                onClick={() => setScholarshipsOnly((current) => !current)}
                className={`filter-chip ${
                  scholarshipsOnly
                    ? "border-[#4468df] bg-[#eef3ff] text-[#3157d5]"
                    : "border-[#dce5f0] bg-white text-[#344968] hover:border-[#4468df] hover:text-[#3157d5]"
                }`}
              >
                Scholarships available
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-semibold text-[#3157d5] transition hover:text-[#2647b8]"
            >
              Clear all filters
            </button>
          )}
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

          {hasActiveFilters && (
            <Button
              type="button"
              variant="secondary"
              onClick={clearFilters}
              className="mt-5"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
