"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

import type { StudyPathJourneyStage } from "@/interfaces/studyPath";

type JourneyTimelineProps = {
  stages: StudyPathJourneyStage[];
};

export default function JourneyTimeline({ stages }: JourneyTimelineProps) {
  const [openStage, setOpenStage] = useState<number | null>(1);

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-[21px] font-bold leading-tight text-heading">
        Your recommended journey — {stages.length} stages
      </h2>

      <div className="space-y-3">
        {stages.map((stage) => {
          const isOpen = openStage === stage.id;

          return (
            <article
              key={stage.id}
              className={`overflow-hidden rounded-xl border bg-white transition-all ${
                isOpen ? "border-primary shadow-sm" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenStage(isOpen ? null : stage.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  isOpen ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-400"
                }`}>
                  {stage.id}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-heading">{stage.title}</h3>
                  <p className="mt-1 text-[11px] text-slate-400">{stage.timing}</p>
                </div>
                {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-slate-600">{stage.description}</p>
                  {stage.documents.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stage.documents.map((document) => (
                        <span key={document} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600">
                          {document}
                        </span>
                      ))}
                    </div>
                  )}
                  {stage.estimatedCost && (
                    <p className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-xs text-heading">
                      Estimated cost: {stage.estimatedCost}
                    </p>
                  )}
                  {stage.note && (
                    <div className="mt-4 flex gap-2 rounded-xl bg-soft-warning px-3 py-3 text-xs text-warning">
                      <Info size={15} className="shrink-0" /> {stage.note}
                    </div>
                  )}
                  {stage.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {stage.links.map((link) =>
                        link.external ? (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary">
                            {link.label} ↗
                          </a>
                        ) : (
                          <Link key={link.href} href={link.href} className="text-xs font-semibold text-primary">
                            {link.label} →
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
