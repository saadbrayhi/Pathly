"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "../shared/Button";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="page-container relative z-10 -mt-8">
      <div className="card-surface flex w-full items-center gap-3 rounded-xl p-3 shadow-sm">
        <div className="search-field">
          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-slate-400"
          />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search countries, study paths, scholarships, visas, or documents"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <Button
          type="button"
          onClick={handleSearch}
          className="shrink-0 rounded-lg px-7 py-3 text-sm"
        >
          Search
        </Button>
      </div>
    </div>
  );
}