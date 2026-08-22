import Link from "next/link";

type ResultSidebarProps = {
  destination: string | null;
};

const nextSteps = [
  "Check admission eligibility",
  "Prepare academic documents",
  "Complete the language requirement",
  "Select universities and programs",
  "Apply to universities",
];

export default function ResultSidebar({
  destination,
}: ResultSidebarProps) {
  const admissionHref = destination
    ? `/study-abroad/${destination}`
    : "/study-abroad";

  return (
    <aside className="card-surface h-fit p-5 lg:sticky lg:top-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Your next steps
      </p>

      <div className="space-y-2">
        {nextSteps.map((step, index) => (
          <div
            key={step}
            className={`flex items-start gap-3 rounded-lg px-3 py-2.5 ${
              index === 0
                ? "border border-soft-blue-border bg-soft-blue"
                : ""
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                index === 0
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {index + 1}
            </span>

            <p
              className={`text-sm ${
                index === 0
                  ? "font-medium text-primary"
                  : "text-slate-500"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400">
        + 5 more stages
      </p>

      <div className="mt-6 space-y-2">
        <Link
          href={admissionHref}
          className="btn btn-primary flex w-full justify-between"
        >
          Admission Requirements
          <span>→</span>
        </Link>

        <Link
          href="/documents"
          className="btn btn-secondary flex w-full justify-center"
        >
          Review Documents
        </Link>

        <Link
          href="/scholarship"
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          Find Scholarships
        </Link>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-xs leading-relaxed text-slate-400">
          This path is a guide. Always confirm requirements on official
          university and embassy sources.
        </p>
      </div>
    </aside>
  );
}