import { CheckCircle2, ShieldCheck } from "lucide-react";

const trustPoints = [
  "Official source links",
  "Last-reviewed dates",
  "Country-specific warnings",
  "Clear 'verify' states",
];

export default function TrustSection() {
  return (
    <section className="bg-[#e7f8f4] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0f9f8f]/20 bg-[#0f9f8f]/10">
            <ShieldCheck size={24} className="text-[#0f9f8f]" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-[#0f172a]">
            Important decisions deserve reliable sources.
          </h2>

          <p className="mb-6 leading-relaxed text-slate-600">
            Pathly explains the process, then connects you to the official page
            that confirms it. Official source links, last-reviewed dates, and
            clear warnings where requirements vary.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-1.5 rounded-full border border-[#0f9f8f]/20 bg-white/70 px-3 py-1.5 text-sm text-[#0f9f8f]"
              >
                <CheckCircle2 size={13} />
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
