import { CheckCircle2, CircleAlert } from "lucide-react";

import { resultSummaryConfig } from "@/constant/constant";
import type { StudyPathResult } from "@/interfaces/studyPath";

type ResultSummaryProps = {
  result: StudyPathResult;
};

type SummaryValueKey =
  | "eligibility"
  | "language"
  | "documents"
  | "tuition"
  | "livingCost"
  | "scholarships"
  | "visa";

export default function ResultSummary({ result }: ResultSummaryProps) {
  const isEligible = result.eligibility.status === "LIKELY_ELIGIBLE";
  const StatusIcon = isEligible ? CheckCircle2 : CircleAlert;
  const summaryValues: Record<SummaryValueKey, string> = {
    eligibility: isEligible ? "Likely eligible" : "Review required",
    language:
      result.language.summary ??
      result.language.mainLanguage ??
      (result.language.options.join(", ") || "Varies by program"),
    documents: `${result.requiredDocuments.length} commonly required`,
    tuition:
      result.costs.tuition ??
      result.costs.tuitionRange ??
      "Varies by institution",
    livingCost:
      result.costs.livingCost ??
      result.costs.livingCostSummary ??
      "Varies by city",
    scholarships:
      result.scholarships.length > 0
        ? `${result.scholarships.length} matching opportunities`
        : "Check current opportunities",
    visa: result.visa.type ?? result.visa.summary ?? "Verify requirements",
  };

  return (
    <>
      <section className="card-surface p-5">
        <div className="flex flex-wrap items-center gap-2">
          {[
            result.selections.educationLabel,
            result.selections.degreeLabel,
            result.selections.fieldLabel,
            `${result.destination.flag ?? "🌍"} ${result.destination.name}`,
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-soft-blue px-3 py-1 text-[11px] font-medium text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-[22px] font-bold leading-tight text-heading">
          Your Path: {result.selections.degreeLabel} in {result.selections.fieldLabel} — {result.destination.name}
        </h1>

        {result.destination.recommended && (
          <p className="mt-2 text-sm font-medium text-primary">
            Pathly recommended this destination from the available database information.
          </p>
        )}

        <div
          className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-4 ${
            isEligible
              ? "border-green-200 bg-soft-success text-success"
              : "border-warning-border bg-soft-warning text-warning"
          }`}
        >
          <StatusIcon size={19} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              {result.eligibility.headline}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {result.eligibility.note}
            </p>
          </div>
        </div>
      </section>

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

      <section className="card-surface mt-4 p-5">
        <h2 className="text-lg font-bold text-heading">Relevant admission information</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {result.admission.whoCanApply ??
            result.admission.overview ??
            "Check the destination guide and official institution pages."}
        </p>
        {result.admission.requirements.length > 0 && (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {result.admission.requirements.map((requirement) => (
              <li key={requirement.id} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                {requirement.label} · {requirement.status.replaceAll("_", " ").toLowerCase()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
