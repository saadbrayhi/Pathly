"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="relative z-10 mx-auto -mt-8 w-full max-w-[1200px] px-6">
      <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-1 items-center gap-3 rounded-lg bg-[#f7f7f4] px-4 py-3">
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

        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 rounded-lg bg-[#3157d5] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#2647b8]"
        >
          Search
        </button>
      </div>
    </div>
  );
}