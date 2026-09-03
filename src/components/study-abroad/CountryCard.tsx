import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Badge from "@/components/shared/Badge";

import type { Country } from "@/interfaces/country";

type CountryCardProps = {
  country: Country;
};

const rowBackground: Record<string, string> = {
  france: "bg-[#f4f4ff]",
  germany: "bg-[#fff9e9]",
  italy: "bg-[#fff2f3]",
  canada: "bg-[#fff2f3]",
  turkey: "bg-[#fff1f5]",
  netherlands: "bg-[#fff5eb]",
  spain: "bg-[#fff8eb]",
};

export default function CountryCard({ country }: CountryCardProps) {
  const infoRowClass = rowBackground[country.slug] ?? "bg-slate-50";

  return (
    <Link
      href={`/study-abroad/${country.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b8caf8] hover:shadow-xl"
    >
      <div className="relative h-32 w-full overflow-hidden">
        {country.image ? (
          <Image
            src={country.image}
            alt={`${country.name} study destination`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="text-xl">{country.flag}</span>

          <h2 className="text-sm font-semibold text-white">{country.name}</h2>
        </div>

        <ArrowUpRight
          size={17}
          className="absolute right-4 top-4 text-white transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <div className="p-4">
        <p className="mb-5 min-h-16.5 text-[13px] leading-5 text-[#5f7395]">
          {country.description}
        </p>

        <div className="space-y-2">
          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 ${infoRowClass}`}
          >
            <span className="text-xs text-[#8ca0bf]">Languages</span>

            <span className="ml-4 text-right text-xs font-semibold text-[#344969]">
              {country.languages}
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 ${infoRowClass}`}
          >
            <span className="text-xs text-[#8ca0bf]">Tuition</span>

            <span className="ml-4 text-right text-xs font-semibold text-[#344969]">
              {country.tuition}
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 ${infoRowClass}`}
          >
            <span className="text-xs text-[#8ca0bf]">Living cost</span>

            <span className="ml-4 text-right text-xs font-semibold text-[#344969]">
              {country.livingCost}
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 ${infoRowClass}`}
          >
            <span className="text-xs text-[#8ca0bf]">Study levels</span>

            <span className="ml-4 text-right text-xs font-semibold text-[#344969]">
              {country.studyLevelOptions.join(", ")}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#edf1f6] pt-3">
          {country.scholarshipAvailable && (
            <Badge variant="success">Scholarships available</Badge>
          )}

          <Badge variant="default">Visa required</Badge>
        </div>
      </div>
    </Link>
  );
}
