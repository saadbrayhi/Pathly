import { CheckCircle2 } from "lucide-react";

import { resultSummaryConfig } from "@/constant/constant";

type ResultSummaryProps = {
  education: string | null;
  degree: string | null;
  field: string | null;
  destination: string | null;
};

type SummaryValueKey =
  | "eligibility"
  | "language"
  | "documents"
  | "tuition"
  | "livingCost"
  | "scholarships"
  | "visa";

export default function ResultSummary({
  education,
  degree,
  field,
  destination,
}: ResultSummaryProps) {
  const educationLabel = formatValue(education);
  const degreeLabel = formatValue(degree);
  const fieldLabel = formatValue(field);
  const destinationLabel = formatValue(destination);

  const summaryValues: Record<SummaryValueKey, string> = {
    eligibility: "Likely eligible",

    language:
      destination === "germany"
        ? "German or English"
        : destination === "france"
          ? "French or English"
          : "Varies by program",

    documents: "8 commonly required",
    tuition: "Varies by institution",
    livingCost: "Varies by city",
    scholarships: "Opportunities available",
    visa: "Long-stay required",
  };

  return (
    <>
      {/* Main result card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        {/* Selected answers */}
        <div className="flex flex-wrap items-center gap-2">
          {[educationLabel, degreeLabel, fieldLabel, destinationLabel].map(
            (item) => (
              <span
                key={item}
                className="rounded-full bg-soft-blue px-3 py-1 text-[11px] font-medium text-primary"
              >
                {item}
              </span>
            ),
          )}
        </div>

        {/* Result title */}
        <h1 className="mt-4 text-[22px] font-bold leading-tight text-heading">
          Your Path: {degreeLabel} in {fieldLabel} — {destinationLabel}
        </h1>

        {/* Eligibility */}
        <div className="mt-4 flex items-start justify-between gap-5 rounded-xl border border-green-200 bg-soft-success px-4 py-4">
          <div className="flex min-w-0 gap-3">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-success" />

            <div>
              <p className="text-sm font-semibold text-success">
                Likely eligible to begin this path
              </p>

              <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Final eligibility depends on the selected institution and
                program. Always verify on the official university page.
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 text-right text-[11px] leading-tight text-slate-400 sm:block">
            <p>Last reviewed</p>
            <p className="mt-1 font-medium text-slate-600">January 2025</p>
          </div>
        </div>
      </section>

      {/* Quick information */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {resultSummaryConfig.map((item) => (
          <div
            key={item.key}
            className={`min-h-16.5 rounded-xl border border-slate-200 px-3 py-3 ${item.style}`}
          >
            <p className="text-[11px] opacity-60">{item.label}</p>

            <p className="mt-2 text-xs font-semibold sm:text-sm">
              {summaryValues[item.key as SummaryValueKey]}
            </p>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="mt-4 rounded-xl border border-warning-border bg-soft-warning px-4 py-3 text-xs leading-relaxed text-warning sm:text-sm">
        Requirements that vary by institution should always be verified on the
        official university or program page. Cost estimates are indicative only.
      </div>
    </>
  );
}

function formatValue(value: string | null) {
  if (!value) {
    return "Not selected";
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
