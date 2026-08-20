import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type DestinationCardProps = {
  name: string;
  flag: string;
  image: string;
  languages: string[];
  levels: string[];
  href: string;
  scholarships?: boolean;
  visaRequired?: boolean;
};

export default function DestinationCard({
  name,
  flag,
  image,
  languages,
  levels,
  href,
  scholarships = true,
  visaRequired = true,
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className="card-surface group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(49,87,213,0.11)]"
    >
      {/* IMAGE */}
      <div className="relative h-36 overflow-hidden bg-slate-200">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient over image */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {/* Country name */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xl drop-shadow">{flag}</span>

          <h3 className="text-base font-bold text-white drop-shadow">{name}</h3>
        </div>

        {/* Arrow */}
        <div className="absolute right-3 top-3">
          <ArrowRight
            size={15}
            className="text-white/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 space-y-1.5">
          {/* Languages */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Language</span>

            <span className="text-right font-medium text-slate-700">
              {languages.join(", ")}
            </span>
          </div>

          {/* Levels */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Levels</span>

            <span className="text-right font-medium text-slate-700">
              {levels.slice(0, 2).join(", ")}
              {levels.length > 2 ? "…" : ""}
            </span>
          </div>
        </div>

        {/* TAGS */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
          {scholarships && (
            <span className="success-badge">
              Scholarships
            </span>
          )}

          {visaRequired && (
            <span className="neutral-badge border-0">
              Visa req.
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
