import { AlertTriangle, ExternalLink } from "lucide-react";

import type { CountryDetails } from "../../../../constant/countries";

type CountrySourcesProps = {
  details: CountryDetails;
};

export default function CountrySources({ details }: CountrySourcesProps) {
  return (
    <div className="space-y-6">
      {/* Official Sources */}
      <section
        id="official-sources"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Official Sources
        </h2>

        <div className="mt-5 space-y-3">
          {details.officialSources.map((source) => (
            <div
              key={source.name}
              className="flex flex-col justify-between gap-3 rounded-xl bg-[#f7f8f5] px-4 py-4 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-[#111827]">{source.name}</h3>

                <p className="mt-1 text-xs leading-5 text-[#61779a]">
                  {source.description}
                </p>
              </div>

              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0f9f8f]"
                >
                  Open
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      <section
        id="common-mistakes"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Common Mistakes
        </h2>

        <div className="mt-5 space-y-3">
          {details.commonMistakes.map((mistake) => (
            <div
              key={mistake}
              className="flex gap-3 rounded-xl border border-[#f0d070] bg-[#fff7e5] px-4 py-3"
            >
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-[#b76800]"
              />

              <p className="text-sm leading-6 text-[#43597b]">{mistake}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
