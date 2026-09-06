import Link from "next/link";
import { Award, ExternalLink } from "lucide-react";

import type { StudyPathResult } from "@/interfaces/studyPath";

type ResultSidebarProps = {
  result: StudyPathResult;
};

export default function ResultSidebar({ result }: ResultSidebarProps) {
  return (
    <aside className="card-surface h-fit self-start p-5 lg:sticky lg:top-24">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Your next steps
      </p>

      <div className="space-y-2">
        {result.journeyStages.slice(0, 5).map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 rounded-lg px-3 py-2.5 ${
              index === 0 ? "border border-soft-blue-border bg-soft-blue" : ""
            }`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
              index === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {index + 1}
            </span>
            <p className={`text-sm leading-snug ${
              index === 0 ? "font-medium text-primary" : "text-slate-500"
            }`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        + {Math.max(result.journeyStages.length - 5, 0)} more stages
      </p>

      <div className="mt-5 space-y-2">
        <Link
          href={`/study-abroad/${result.destination.slug}`}
          className="btn btn-primary flex w-full items-center justify-between px-4 py-3 text-sm"
        >
          <span>Admission Requirements</span>
          <span>→</span>
        </Link>
        <Link href="/documents" className="btn btn-secondary flex w-full justify-center px-4 py-3 text-sm">
          Review {result.requiredDocuments.length} Documents
        </Link>
        <Link href="/scholarship" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-primary">
          <Award size={15} />
          {result.scholarships.length} Matching Scholarships
        </Link>
      </div>

      {result.officialSources.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Official sources
          </p>
          <div className="space-y-2">
            {result.officialSources.slice(0, 3).map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-primary"
              >
                {source.name} <ExternalLink size={11} />
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
