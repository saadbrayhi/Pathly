"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Badge from "@/components/shared/Badge";
import Card from "@/components/shared/Card";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import EmptyState from "@/components/shared/states/EmptyState";
import {countries}  from "@/constant/countries";

const languageOptions = [
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Italian", value: "Italian" },
  { label: "Turkish", value: "Turkish" },
  { label: "Dutch", value: "Dutch" },
  { label: "Spanish", value: "Spanish" },
];

export default function CountryExplorer() {
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const hasActiveFilters =
    normalizedSearch !== "" || language !== "";

  const filteredCountries = countries.filter((country) => {
    const searchableText = [
      country.name,
      country.languages,
      country.studyLevels,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchableText.includes(normalizedSearch);

    const matchesLanguage =
      language === "" || country.languages.includes(language);

    return matchesSearch && matchesLanguage;
  });

  function clearFilters() {
    setSearch("");
    setLanguage("");
  }

  return (
    <section className="py-12">
      <div className="card-surface grid gap-4 p-5 md:grid-cols-[1fr_220px_auto]">
        <Input
          aria-label="Search countries"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by country, language, or study level"
          className="bg-white text-slate-900 placeholder:text-slate-400"
        />

        <Select
          aria-label="Filter by language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          options={languageOptions}
          placeholder="All languages"
        />

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-heading">
          Study destinations
        </h2>

        <p
          className="mt-1 text-sm text-slate-500"
          aria-live="polite"
        >
          {filteredCountries.length}{" "}
          {filteredCountries.length === 1
            ? "country"
            : "countries"}{" "}
          found
        </p>
      </div>

      {filteredCountries.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCountries.map((country) => (
            <Link
              key={country.slug}
              href={`/study-abroad/${country.slug}`}
              className="group rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <Card className="card-interactive h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={`Study destination in ${country.name}`}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <span
                    className="absolute bottom-4 left-4 text-4xl"
                    aria-hidden="true"
                  >
                    {country.flag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-heading">
                    {country.name}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600">
                    Languages: {country.languages}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    
                      <Badge >{country.studyLevels}</Badge>
                  </div>

                  <p className="mt-6 font-semibold text-primary">
                    View country guide →
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No countries found"
          description="Try another country or language, or clear the filters."
          actionLabel="Clear filters"
          onAction={clearFilters}
          className="mt-6"
        />
      )}
    </section>
  );
}
