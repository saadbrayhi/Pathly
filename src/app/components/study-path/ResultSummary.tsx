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
    <section>
      {/* Selected path */}
      <div className="card-surface p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {[
            educationLabel,
            degreeLabel,
            fieldLabel,
            destinationLabel,
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-soft-blue px-3 py-1 text-xs font-medium text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-heading">
          Your Path: {degreeLabel} in {fieldLabel} — {destinationLabel}
        </h1>

        {/* Eligibility status */}
        <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-green-200 bg-soft-success p-4">
          <div className="flex gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-success"
            />

            <div>
              <p className="font-semibold text-success">
                Likely eligible to begin this path
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Final eligibility depends on the selected institution and
                program. Always verify on the official university page.
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 text-right text-xs text-slate-400 sm:block">
            <p>Last reviewed</p>
            <p className="font-medium text-slate-600">
              January 2025
            </p>
          </div>
        </div>
      </div>

      {/* Quick information */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {resultSummaryConfig.map((item) => (
          <div
            key={item.key}
            className={`rounded-xl border border-slate-200 p-4 ${item.style}`}
          >
            <p className="text-xs opacity-70">
              {item.label}
            </p>

            <p className="mt-2 text-sm font-semibold">
              {summaryValues[item.key as SummaryValueKey]}
            </p>
          </div>
        ))}
      </div>

      {/* Verification warning */}
      <div className="mt-4 rounded-xl border border-warning-border bg-soft-warning p-4 text-sm text-warning">
        Requirements that vary by institution should always be verified on the
        official university or program page. Cost estimates are indicative
        only.
      </div>
    </section>
  );
}

function formatValue(value: string | null) {
  if (!value) {
    return "Not selected";
  }

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}