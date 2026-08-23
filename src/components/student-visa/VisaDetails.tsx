import { ExternalLink, ShieldCheck, TriangleAlert } from "lucide-react";

import type { VisaDetailsData } from "@/constant/visa/visaDetails";

type VisaDetailsProps = {
  visa: VisaDetailsData;
};

type VisaInfoProps = {
  label: string;
  value: string;
};

function VisaInfo({ label, value }: VisaInfoProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-semibold text-heading">{value}</p>
    </div>
  );
}

export default function VisaDetails({ visa }: VisaDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Visa summary */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{visa.flag}</span>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-heading">
              {visa.country} — {visa.visaType}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-4 text-xs">
              <span className="font-medium text-accent">
                ✓ Official sources linked
              </span>

              <span className="text-slate-400">
                Last reviewed {visa.lastReviewed}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <VisaInfo label="Visa type" value={visa.visaType} />

          <VisaInfo label="Appointment" value={visa.appointment} />

          <VisaInfo label="Processing time" value={visa.processingTime} />

          <VisaInfo label="Fee" value={visa.estimatedFee} />
        </div>
      </section>

      {/* Visa warnings */}
      <section className="space-y-3">
        <div className="flex gap-3 rounded-xl border border-warning-border bg-soft-warning p-4 text-sm text-warning">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" />

          <p>
            <span className="font-semibold">
              Admission does not guarantee a visa.
            </span>{" "}
            The visa decision is made independently by the embassy or
            immigration authority based on your complete application.
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border border-soft-blue-border bg-soft-blue p-4 text-sm text-slate-600">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" />

          <p>
            <span className="font-semibold text-primary">
              Requirements can change.
            </span>{" "}
            The information in this guide was last reviewed in{" "}
            {visa.lastReviewed}. Always verify current requirements on the
            official embassy or immigration portal before you apply.
          </p>
        </div>
      </section>

      {/* Required documents checklist */}
      <section className="card-surface p-5">
        <h2 className="text-xl font-bold text-heading">
          Required documents checklist
        </h2>

        <div className="mt-4 space-y-2">
          {visa.documents.map((document) => (
            <div
              key={document}
              className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
            >
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-soft-blue-border bg-white" />

              <p className="text-sm text-slate-600">{document}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs italic text-slate-400">
          This is a general checklist. Verify the exact document list with the{" "}
          {visa.country} embassy or official immigration portal.
        </p>
      </section>

      {/* Visa application timeline */}
      <section className="card-surface p-5">
        <h2 className="text-xl font-bold text-heading">
          Visa application timeline
        </h2>

        <div className="mt-5">
          {visa.steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === visa.steps.length - 1;

            return (
              <div key={step} className="relative flex gap-4 pb-5 last:pb-0">
                {!isLast && (
                  <div className="absolute left-3.25 top-7 h-full w-px bg-slate-200" />
                )}

                <span
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    isFirst
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>

                <p className="pt-1 text-sm text-slate-600">{step}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="card-surface p-5">
        <h2 className="text-xl font-bold text-heading">Common mistakes</h2>

        <div className="mt-4 space-y-2">
          {visa.commonMistakes.map((mistake) => (
            <div
              key={mistake}
              className="flex gap-3 rounded-xl border border-warning-border bg-soft-warning px-4 py-3"
            >
              <TriangleAlert
                size={16}
                className="mt-0.5 shrink-0 text-warning"
              />

              <p className="text-sm text-slate-600">{mistake}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Official source */}
      <section className="rounded-2xl border border-emerald-200 bg-soft-mint p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-accent" />

          <h2 className="text-xl font-bold text-heading">Official source</h2>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          The requirements and current fees on the official portal are the final
          reference. Always verify before applying.
        </p>

        <a
          href={visa.officialSource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Open {visa.officialSource.label}
          <ExternalLink size={15} />
        </a>
      </section>
    </div>
  );
}
