"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import Link from "next/link";

import { journeyStages } from "@/constant/journey/JourneyStage";

type JourneyTimelineProps = {
  destination?: string | null;
};

export default function JourneyTimeline({ destination }: JourneyTimelineProps) {
  const [openStage, setOpenStage] = useState<number | null>(1);

  function toggleStage(id: number) {
    setOpenStage((current) => (current === id ? null : id));
  }

  function getOfficialLinks(stageId: number) {
    if (!destination) return [];

    const officialSources: Record<
      string,
      Partial<
        Record<
          number,
          {
            label: string;
            href: string;
          }[]
        >
      >
    > = {
      france: {
        1: [
          {
            label: "Campus France",
            href: "https://www.campusfrance.org/",
          },
        ],
        4: [
          {
            label: "French University Guide",
            href: "https://www.letudiant.fr/",
          },
        ],
        5: [
          {
            label: "Campus France",
            href: "https://www.campusfrance.org/",
          },
        ],
        9: [
          {
            label: "France-Visas",
            href: "https://france-visas.gouv.fr/",
          },
        ],
      },

      germany: {
        1: [
          {
            label: "DAAD",
            href: "https://www.daad.de/en/",
          },
        ],
        4: [
          {
            label: "Study in Germany",
            href: "https://www.study-in-germany.de/en/",
          },
        ],
        9: [
          {
            label: "German Federal Foreign Office",
            href: "https://www.auswaertiges-amt.de/en",
          },
        ],
      },

      italy: {
        1: [
          {
            label: "Universitaly",
            href: "https://www.universitaly.it/",
          },
        ],
        4: [
          {
            label: "Universitaly",
            href: "https://www.universitaly.it/",
          },
        ],
        9: [
          {
            label: "Visa for Italy",
            href: "https://vistoperitalia.esteri.it/home/en",
          },
        ],
      },
    };

    return officialSources[destination]?.[stageId] ?? [];
  }

  function resolveHref(href: string) {
    if (!href.includes(":country")) {
      return href;
    }

    return href.replace(":country", destination || "");
  }

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-[21px] font-bold leading-tight text-heading">
        Your complete journey — {journeyStages.length} stages
      </h2>

      <div className="space-y-3">
        {journeyStages.map((stage) => {
          const isOpen = openStage === stage.id;
          const officialLinks = getOfficialLinks(stage.id);
          const internalLinks = stage.links ?? [];

          return (
            <article
              key={stage.id}
              className={`overflow-hidden rounded-xl border bg-white transition-all ${
                isOpen
                  ? "border-primary shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => toggleStage(stage.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    isOpen
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {stage.id}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-tight text-heading">
                    {stage.title}
                  </h3>

                  <p className="mt-1 text-[11px] leading-none text-slate-400">
                    {stage.timing}
                  </p>
                </div>

                {isOpen ? (
                  <ChevronUp size={15} className="shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown size={15} className="shrink-0 text-slate-400" />
                )}
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {stage.description}
                  </p>

                  {/* Documents */}
                  {stage.documents && stage.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Required documents
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {stage.documents.map((document) => (
                          <span
                            key={document}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600"
                          >
                            {document}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timing + cost */}
                  {stage.estimatedCost && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 px-3 py-3">
                        <p className="text-[11px] text-slate-400">Timing</p>

                        <p className="mt-1 text-xs font-medium text-heading">
                          {stage.timing}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-3 py-3">
                        <p className="text-[11px] text-slate-400">
                          Estimated cost
                        </p>

                        <p className="mt-1 text-xs font-medium text-heading">
                          {stage.estimatedCost}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Note */}
                  {stage.note && (
                    <div className="mt-4 flex gap-2 rounded-xl bg-soft-warning px-3 py-3 text-xs leading-relaxed text-warning">
                      <Info size={15} className="mt-0.5 shrink-0" />

                      <p>{stage.note}</p>
                    </div>
                  )}

                  {/* Links */}
                  {(officialLinks.length > 0 || internalLinks.length > 0) && (
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {officialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-accent transition-opacity hover:opacity-70"
                        >
                          {link.label} ↗
                        </a>
                      ))}

                      {internalLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={resolveHref(link.href)}
                          className="text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                        >
                          {link.label} →
                        </Link>
                      ))}
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
