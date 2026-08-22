"use client";

import { useMemo, useState } from "react";
import { FileText, Search, X } from "lucide-react";

import Button from "@/app/components/shared/Button";
import Card from "@/app/components/shared/Card";
import Input from "@/app/components/shared/Input";
import {
  DOCUMENT_CATEGORIES,
  documents,
  type DocumentCategory,
  type StudyDocument,
} from "@/app/data/documents";

import DocumentCard from "./DocumentCard";

type GroupedDocuments = Partial<Record<DocumentCategory, StudyDocument[]>>;

export default function DocumentLibrary() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<DocumentCategory[]>([]);
  const [translationOnly, setTranslationOnly] = useState(false);

  const groupedDocuments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filteredDocuments = documents.filter((document) => {
      const matchesSearch = [
        document.name,
        document.category,
        document.description,
        document.neededFor,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(document.category);
      const matchesTranslation =
        !translationOnly || document.translationRequired;

      return matchesSearch && matchesCategory && matchesTranslation;
    });

    return DOCUMENT_CATEGORIES.reduce<GroupedDocuments>((groups, category) => {
      const categoryDocuments = filteredDocuments.filter(
        (document) => document.category === category,
      );

      if (categoryDocuments.length > 0) {
        groups[category] = categoryDocuments;
      }

      return groups;
    }, {});
  }, [search, selectedCategories, translationOnly]);

  const visibleCount = Object.values(groupedDocuments).reduce(
    (total, categoryDocuments) => total + (categoryDocuments?.length ?? 0),
    0,
  );
  const hasFilters =
    search.length > 0 || selectedCategories.length > 0 || translationOnly;

  const toggleCategory = (category: DocumentCategory) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setTranslationOnly(false);
  };

  return (
    <section aria-labelledby="document-results-title" className="mt-7">
      <div className="relative">
        <Search
          aria-hidden="true"
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          id="document-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search documents"
          aria-label="Search documents"
          aria-controls="document-results"
          className="bg-white pl-11 pr-11"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear document search"
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" size={15} />
          </button>
        )}
      </div>

      <fieldset className="mt-3 flex flex-wrap gap-2">
        <legend className="sr-only">Filter documents</legend>
        {DOCUMENT_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              aria-controls="document-results"
              onClick={() => toggleCategory(category)}
              className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 ${
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {category}
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={translationOnly}
          aria-controls="document-results"
          onClick={() => setTranslationOnly((currentValue) => !currentValue)}
          className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100 ${
            translationOnly
              ? "border-warning bg-warning text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          Translation required
        </button>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex min-h-9 items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            <X aria-hidden="true" size={11} />
            Clear
          </button>
        )}
      </fieldset>

      <div className="mt-4 flex items-center justify-between gap-4">
        <h2 id="document-results-title" className="sr-only">
          Document results
        </h2>
        <p aria-live="polite" className="text-xs text-slate-500">
          {visibleCount} {visibleCount === 1 ? "document" : "documents"}
        </p>
      </div>

      <div id="document-results">
        {visibleCount === 0 ? (
          <Card className="mt-4 flex flex-col items-center px-6 py-16 text-center">
            <FileText aria-hidden="true" size={32} className="text-slate-300" />
            <h3 className="mt-3 font-semibold text-heading">No documents found</h3>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Try another search term or clear your filters to see the complete library.
            </p>
            <Button onClick={clearFilters} variant="secondary" className="mt-5">
              Clear filters
            </Button>
          </Card>
        ) : (
          <div className="mt-4 space-y-8">
            {DOCUMENT_CATEGORIES.map((category) => {
              const categoryDocuments = groupedDocuments[category];
              if (!categoryDocuments) return null;

              return (
                <section key={category} aria-labelledby={`${category}-documents`}>
                  <h2
                    id={`${category}-documents`}
                    className="mb-4 text-lg font-bold text-heading"
                  >
                    {category} Documents
                  </h2>
                  <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryDocuments.map((document) => (
                      <DocumentCard key={document.slug} document={document} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
