import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck } from "lucide-react";

type ScholarshipCardProps = {
  name: string;
  country: string;
  flag: string;
  level: string;
  funding: string;
  deadline: string;
  image: string;
  href: string;
};

export default function ScholarshipCard({
  name,
  country,
  flag,
  level,
  funding,
  deadline,
  image,
  href,
}: ScholarshipCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-72 flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />

      {/* TOP */}
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center gap-1.5">
          <span className="text-base drop-shadow">{flag}</span>

          <span className="text-xs font-medium text-white/80 drop-shadow">
            {country}
          </span>
        </div>

        <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {level}
        </span>
      </div>

      {/* BOTTOM */}
      <div className="relative mt-auto p-4">
        <h3 className="mb-2.5 text-sm font-bold leading-snug text-white">
          {name}
        </h3>

        <p className="mb-3 text-xs leading-relaxed text-white/70">
          {funding}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-white/55">
            <Clock size={10} />
            {deadline}
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-official">
            <ShieldCheck size={11} />
            Official source
          </div>
        </div>
      </div>
    </Link>
  );
}