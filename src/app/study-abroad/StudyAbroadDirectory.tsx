"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import Input from "../components/shared/Input";

import CountryCard from "./CountryCard";
import type { Country, StudyLevel } from "../../constant/countries";

type StudyAbroadDirectoryProps = {
  countries: Country[];
};

const studyLevels: StudyLevel[] = ["Bachelor", "Master", "PhD", "Exchange"];

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
  const [selectedLevels, setSelectedLevels] = useState<StudyLevel[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();
  const filterCount =
    selectedLevels.length +
    selectedLanguages.length +
    (scholarshipOnly ? 1 : 0);
  const hasActiveFilters = normalizedSearch !== "" || filterCount > 0;

  const filteredCountries = countries.filter((country) => {
    const searchableText = [
      country.name,
      country.description,
      ...country.languageOptions,
      ...country.studyLevelOptions,
      ...country.fields,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearch);
    const matchesLevel =
      selectedLevels.length === 0 ||
      selectedLevels.some((level) =>
        country.studyLevelOptions.includes(level),
      );
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((language) =>
        country.languageOptions.includes(language),
      );
    const matchesScholarship =
      !scholarshipOnly || country.scholarshipAvailable;

    return (
      matchesSearch &&
      matchesLevel &&
      matchesLanguage &&
      matchesScholarship
    );
  });

  function toggleLevel(level: StudyLevel) {
    setSelectedLevels((currentLevels) =>
      currentLevels.includes(level)
        ? currentLevels.filter((item) => item !== level)
        : [...currentLevels, level],
    );
  }

  function toggleLanguage(language: string) {
    setSelectedLanguages((currentLanguages) =>
      currentLanguages.includes(language)
        ? currentLanguages.filter((item) => item !== language)
        : [...currentLanguages, language],
    );
  }

  function clearAllFilters() {
    setSearch("");
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setScholarshipOnly(false);
  }

  return (
    <section>
      {/* Search + Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#8da2c2]"
          />

          <Input
            aria-label="Search study destinations"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a country"
            className="h-12.5 pl-11 pr-10 text-[#243858] placeholder:text-[#91a3bf] focus:border-[#4468df]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md p-1 text-[#8da2c2] transition hover:bg-slate-100 hover:text-[#3157d5] focus:outline-none focus:ring-2 focus:ring-[#3157d5]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((previousValue) => !previousValue)}
          aria-expanded={showFilters}
          aria-controls="study-abroad-filters"
          className={`inline-flex h-12.5 w-full shrink-0 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#3157d5]/30 sm:w-auto ${
            showFilters
              ? "border-[#3157d5] bg-[#eaf0ff] text-[#3157d5]"
              : "border-[#4468df] bg-white text-[#3157d5]"
          }`}
        >
          <SlidersHorizontal size={17} strokeWidth={1.8} />
          Filters{filterCount > 0 ? ` (${filterCount})` : ""}
        </button>
      </div>

      {/* Filter details */}
      {showFilters && (
        <div
          id="study-abroad-filters"
          className="mb-5 rounded-xl border border-[#dce5f0] bg-white px-5 py-5"
        >
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[1.1fr_1.1fr_1fr]">
            {/* Study Level */}
            <div>
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8ba0c0]">
                Study Level
              </p>

              <div className="flex flex-wrap gap-2">
                {studyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => toggleLevel(level)}
                    aria-pressed={selectedLevels.includes(level)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#3157d5]/30 ${
                      selectedLevels.includes(level)
                        ? "border-[#3157d5] bg-[#3157d5] text-white"
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
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8ba0c0]">
                Language
              </p>

              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    aria-pressed={selectedLanguages.includes(language)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#3157d5]/30 ${
                      selectedLanguages.includes(language)
                        ? "border-[#3157d5] bg-[#3157d5] text-white"
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
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8ba0c0]">
                Scholarships
              </p>

              <button
                type="button"
                onClick={() => setScholarshipOnly((currentValue) => !currentValue)}
                aria-pressed={scholarshipOnly}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#0f9f8f]/30 ${
                  scholarshipOnly
                    ? "border-[#0f9f8f] bg-[#0f9f8f] text-white"
                    : "border-[#dce5f0] bg-white text-[#344968] hover:border-[#0f9f8f] hover:text-[#0f9f8f]"
                }`}
              >
                Scholarships available
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-[#7f94b4] transition hover:text-[#3157d5] focus:outline-none focus:ring-2 focus:ring-[#3157d5]/30"
            >
              <X size={13} />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {filterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">
          {selectedLevels.map((level) => (
            <ActiveFilter
              key={level}
              label={level}
              onRemove={() => toggleLevel(level)}
            />
          ))}

          {selectedLanguages.map((language) => (
            <ActiveFilter
              key={language}
              label={language}
              onRemove={() => toggleLanguage(language)}
            />
          ))}

          {scholarshipOnly && (
            <ActiveFilter
              label="Scholarships only"
              onRemove={() => setScholarshipOnly(false)}
              success
            />
          )}
        </div>
      )}

      {/* Result count */}
      <p className="mb-5 text-sm text-[#8aa0c1]" aria-live="polite">
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
          <Search size={22} className="mx-auto mb-3 text-[#8aa0c1]" />

          <h3 className="font-semibold text-[#233858]">
            No destinations match
          </h3>

          <p className="mt-2 text-sm text-[#8aa0c1]">
            Remove one filter or clear all to see more options.
          </p>

          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-4 rounded-md text-sm font-semibold text-[#3157d5] hover:text-[#2647b8] focus:outline-none focus:ring-2 focus:ring-[#3157d5]/30"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}

type ActiveFilterProps = {
  label: string;
  onRemove: () => void;
  success?: boolean;
};

function ActiveFilter({ label, onRemove, success = false }: ActiveFilterProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
        success
          ? "border-[#bde9df] bg-[#e7f8f4] text-[#0f9f8f]"
          : "border-[#c2d3ff] bg-[#eaf0ff] text-[#3157d5]"
      }`}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-current"
      >
        <X size={12} />
      </button>
    </span>
  );
}
