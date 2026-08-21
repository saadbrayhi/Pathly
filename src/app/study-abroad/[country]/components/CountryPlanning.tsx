import {
  Banknote,
  CheckCircle2,
  CircleDollarSign,
  Home,
} from "lucide-react";

import type { Country, CountryDetails } from "../../../../constant/countries";

type CountryPlanningProps = {
  country: Country;
  details: CountryDetails;
};

const applicationSteps = [
  "Choose a program and confirm its entry requirements and deadline.",
  "Check whether you must apply through a national portal or directly to the institution.",
  "Prepare the required documents, translations, and language certificates.",
  "Submit the application and keep copies of every confirmation and receipt.",
  "After admission, follow the official student visa and arrival instructions.",
];

export default function CountryPlanning({
  country,
  details,
}: CountryPlanningProps) {
  return (
    <div className="space-y-6">
      <section
        id="application-process"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Application Process
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#43597b]">
          The exact route depends on the institution and program. Use this
          sequence as a planning checklist, then confirm every step on the
          official application page.
        </p>

        <ol className="mt-5 space-y-3">
          {applicationSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl bg-[#f7f8f5] px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff] text-xs font-bold text-[#3157d5]">
                {index + 1}
              </span>

              <span className="text-sm leading-6 text-[#43597b]">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="tuition-fees"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5]">
            <CircleDollarSign size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">
              Tuition Fees
            </h2>
            <p className="mt-1 text-sm text-[#61779a]">
              Indicative range: {country.tuition}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {details.studyLevelDetails.map((level) => (
            <div key={level.level} className="rounded-xl bg-[#f7f8f5] p-4">
              <p className="text-sm font-semibold text-[#111827]">
                {level.level}
              </p>
              <p className="mt-1 text-sm text-[#43597b]">{level.tuition}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#8ba0c0]">
          <Banknote size={14} className="mt-0.5 shrink-0" />
          Fees can change by nationality, institution, program, and academic
          year. Verify the final amount with the institution before applying.
        </p>
      </section>

      <section
        id="living-costs"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f8f4] text-[#0f9f8f]">
            <Home size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#111827]">
              Living Costs
            </h2>
            <p className="mt-1 text-sm text-[#61779a]">
              {country.livingCost}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {["Housing and utilities", "Food and daily expenses", "Transport", "Health insurance and personal costs"].map(
            (cost) => (
              <div
                key={cost}
                className="flex items-center gap-3 rounded-xl bg-[#f7f8f5] px-4 py-3"
              >
                <CheckCircle2 size={15} className="shrink-0 text-[#0f9f8f]" />
                <span className="text-sm text-[#43597b]">{cost}</span>
              </div>
            ),
          )}
        </div>

        <p className="mt-4 text-xs leading-5 text-[#8ba0c0]">
          {details.livingCostSummary}. Build a personal budget for your city and
          confirm the current proof-of-funds requirement on the official visa
          website.
        </p>
      </section>
    </div>
  );
}
