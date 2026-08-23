"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import Input from "@/components/shared/Input";

type ScholarshipSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onFiltersClick: () => void;
  isFiltersOpen: boolean;
};

export default function ScholarshipSearch({
  value,
  onChange,
  onFiltersClick,
  isFiltersOpen,
}: ScholarshipSearchProps) {
  return (
    <div className="mt-8 flex gap-3">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8ca0bf]"
        />

        <Input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by scholarship, provider, country, or field"
          className="h-12 pl-11 text-[#263a5b] placeholder:text-[#91a3bf]"
        />
      </div>

      <button
        type="button"
        onClick={onFiltersClick}
        className={`flex h-12 shrink-0 items-center gap-2 rounded-xl border px-5 text-sm font-medium transition ${
          isFiltersOpen
            ? "border-[#3157d5] bg-[#eef3ff] text-[#3157d5]"
            : "border-[#3157d5] bg-white text-[#3157d5] hover:bg-[#f7f9ff]"
        }`}
      >
        <SlidersHorizontal size={17} />
        Filters
      </button>
    </div>
  );
}
