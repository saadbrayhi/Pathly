import { TriangleAlert } from "lucide-react";

export default function VisaHero() {
  return (
    <section>
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
        <span>Home</span>
        <span>›</span>
        <span className="font-semibold text-heading">Student Visa</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-heading">Student visa guides</h1>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
        Country-by-country visa and permit guides with official steps, required
        documents, and key warnings.
      </p>

      {/* Warning */}
      <div className="mt-6 flex gap-2 rounded-xl border border-warning-border bg-soft-warning px-4 py-3 text-sm text-warning">
        <TriangleAlert size={17} className="mt-0.5 shrink-0" />

        <p>
          Visa fees and processing times change. Always verify current
          requirements directly with the official embassy or immigration
          authority before applying.
        </p>
      </div>
    </section>
  );
}
