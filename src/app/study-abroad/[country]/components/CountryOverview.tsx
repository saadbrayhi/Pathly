import { ArrowRight, ShieldCheck } from "lucide-react";

import Button from "../../../components/shared/Button";

import type { Country, CountryDetails } from "../../../../constant/countries";

type CountryOverviewProps = {
  country: Country;
  details: CountryDetails;
};

export default function CountryOverview({
  country,
  details,
}: CountryOverviewProps) {
  return (
    <section className="mb-6 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <span className="text-4xl sm:text-5xl" aria-hidden="true">
            {country.flag}
          </span>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
              {country.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-[#0f9f8f]">
                <ShieldCheck size={14} />
                Official sources linked
              </span>

              <span className="text-slate-300">·</span>

              <span className="text-[#8ba0c0]">
                Last reviewed {details.lastReviewed}
              </span>
            </div>
          </div>
        </div>

        <Button
          href="/find-my-path"
          className="w-full shrink-0 rounded-xl px-6 py-3 sm:w-auto"
        >
          Find my {country.name} path
          <ArrowRight size={16} />
        </Button>
      </div>

      <p className="mt-5 max-w-5xl text-sm leading-6 text-[#61779a]">
        {details.overview}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <QuickInfo label="Study Levels" value={country.studyLevels} />

        <QuickInfo label="Main Language" value={details.mainLanguage} />

        <QuickInfo label="Tuition" value="Varies by institution" />

        <QuickInfo label="Living Costs" value={details.livingCostSummary} />

        <QuickInfo
          label="Scholarships"
          value={country.scholarshipAvailable ? "Available" : "Limited"}
        />

        <QuickInfo label="Visa" value={details.visaSummary} />
      </div>
    </section>
  );
}

type QuickInfoProps = {
  label: string;
  value: string;
};

function QuickInfo({ label, value }: QuickInfoProps) {
  return (
    <div className="rounded-xl bg-[#f5f6f2] p-3">
      <p className="text-xs text-[#8ba0c0]">{label}</p>

      <p className="mt-1 text-xs font-semibold text-[#263a5b]">{value}</p>
    </div>
  );
}
