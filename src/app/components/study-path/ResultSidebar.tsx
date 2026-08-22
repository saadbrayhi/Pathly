import Link from "next/link";
import { Award } from "lucide-react";

import { resultNextSteps } from "@/constant/constant";

type ResultSidebarProps = {
  destination: string | null;
};

export default function ResultSidebar({ destination }: ResultSidebarProps) {
  const admissionHref = destination
    ? `/study-abroad/${destination}`
    : "/study-abroad";

  return (
    <aside className="h-fit self-start rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Your next steps
      </p>

      <div className="space-y-2">
        {resultNextSteps.map((step, index) => {
          const isFirstStep = index === 0;

          return (
            <div
              key={step}
              className={`flex items-start gap-3 rounded-lg px-3 py-2.5 ${
                isFirstStep ? "border border-soft-blue-border bg-soft-blue" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  isFirstStep
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {index + 1}
              </span>

              <p
                className={`text-sm leading-snug ${
                  isFirstStep ? "font-medium text-primary" : "text-slate-500"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">+ 5 more stages</p>

      <div className="mt-5 space-y-2">
        <Link
          href={admissionHref}
          className="btn btn-primary flex w-full items-center justify-between px-4 py-3 text-sm"
        >
          <span>Admission Requirements</span>
          <span>→</span>
        </Link>

        <Link
          href="/documents"
          className="btn btn-secondary flex w-full justify-center px-4 py-3 text-sm"
        >
          Review Documents
        </Link>

        <Link
          href="/scholarship"
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          <Award size={15} />
          Find Scholarships
        </Link>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[11px] leading-relaxed text-slate-400">
          This path is a guide. Always confirm requirements on official
          university and embassy sources.
        </p>
      </div>
    </aside>
  );
}
