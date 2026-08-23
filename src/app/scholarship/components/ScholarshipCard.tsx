import Link from "next/link";
import { Clock3, ShieldCheck } from "lucide-react";

type ScholarshipCardProps = {
  slug: string;
  image: string;
  country: string;
  flag: string;
  status: string;
  level: string;
  provider: string;
  title: string;
  funding: string;
  deadline: string;
};

export default function ScholarshipCard({
  slug,
  image,
  country,
  flag,
  status,
  level,
  provider,
  title,
  funding,
  deadline,
}: ScholarshipCardProps) {
  return (
    <Link
      href={`/scholarship/${slug}`}
      className="group relative block min-h-68 overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/35" />

      {/* Content */}
      <div className="relative z-10 flex min-h-68 flex-col justify-between p-4 text-white">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span>{flag}</span>

            <span>{country}</span>

            <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs">
              {status}
            </span>
          </div>

          <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium">
            {level}
          </span>
        </div>

        {/* Bottom */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/70">
            {provider}
          </p>

          <h2 className="mt-1 text-base font-semibold">{title}</h2>

          <div className="mt-2 flex items-end justify-between gap-4 text-xs text-white/75">
            <p className="max-w-60">{funding}</p>

            <div className="flex shrink-0 items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {deadline}
              </span>

              <span className="flex items-center gap-1 text-[#5eead4]">
                <ShieldCheck size={13} />
                Official
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
