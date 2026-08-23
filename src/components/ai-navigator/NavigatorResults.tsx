import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FileText,
  Globe2,
  Languages,
  Plane,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import Card from "@/components/shared/Card";

import { demoGuidance } from "@/data/aiNavigator";

type NavigatorResultsProps = {
  onReset: () => void;
};

export default function NavigatorResults({ onReset }: NavigatorResultsProps) {
  return (
    <section aria-labelledby="guidance-title" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3157d5]">
            Recommended path
          </p>
          <h2
            id="guidance-title"
            tabIndex={-1}
            className="mt-1 text-2xl font-bold text-[#0f172a] outline-none sm:text-3xl"
          >
            {demoGuidance.path}
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          <RotateCcw aria-hidden="true" size={15} />
          Start over
        </button>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#f0d070] bg-[#fff5df] p-4">
        <TriangleAlert
          aria-hidden="true"
          size={16}
          className="mt-0.5 shrink-0 text-[#b76800]"
        />
        <p className="text-xs leading-5 text-[#8a5200]">
          <strong>AI guidance is informational.</strong> Verify important
          requirements using official university, embassy and government
          sources before making decisions.
        </p>
      </div>

      <Card className="card-padding">
        <div className="flex flex-wrap gap-2">
          {demoGuidance.levels.map((level) => (
            <span
              key={level}
              className="rounded-full border border-[#c2d3ff] bg-[#eaf0ff] px-3 py-1 text-xs font-medium text-[#3157d5]"
            >
              {level}
            </span>
          ))}
        </div>
      </Card>

      <Card className="card-padding">
        <SectionTitle icon={Globe2} title="Recommended destinations" />
        <div className="mt-4 space-y-3">
          {demoGuidance.destinations.map((destination) => (
            <article
              key={destination.name}
              className="flex items-start gap-3 rounded-xl bg-[#f6f7f3] px-4 py-3"
            >
              <span aria-hidden="true" className="text-xl">
                {destination.flag}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[#0f172a]">
                  {destination.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {destination.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Card className="card-padding">
        <SectionTitle icon={CheckCircle2} title="Admission summary" />
        <ul className="mt-4 space-y-2">
          {demoGuidance.admission.map((requirement) => (
            <li
              key={requirement}
              className="flex items-start gap-3 rounded-xl bg-[#f6f7f3] px-4 py-3 text-sm text-slate-600"
            >
              <CheckCircle2
                aria-hidden="true"
                size={15}
                className="mt-0.5 shrink-0 text-[#0f9f8f]"
              />
              {requirement}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs italic text-slate-400">
          Requirements vary by institution and program.
        </p>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="card-padding">
          <SectionTitle icon={FileText} title="Documents summary" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
            {demoGuidance.documents.map((document) => (
              <li
                key={document}
                className="rounded-lg bg-[#f6f7f3] px-3 py-2 text-xs text-slate-600"
              >
                {document}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="card-padding">
          <SectionTitle icon={Award} title="Scholarship recommendations" />
          <ul className="mt-4 space-y-2">
            {demoGuidance.scholarships.map((scholarship) => (
              <li
                key={scholarship}
                className="rounded-lg bg-[#f6f7f3] px-3 py-2 text-xs text-slate-600"
              >
                {scholarship}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="card-padding">
          <SectionTitle icon={Languages} title="Language requirements" />
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {demoGuidance.language}
          </p>
        </Card>

        <Card className="card-padding">
          <SectionTitle icon={Plane} title="Student visa recommendation" />
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {demoGuidance.visa}
          </p>
        </Card>
      </div>

      <section className="rounded-2xl bg-[#3157d5] p-5 text-white sm:p-6">
        <h3 className="text-lg font-bold">Recommended next steps</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {demoGuidance.nextSteps.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <ArrowRight aria-hidden="true" size={15} className="shrink-0" />
              {step.label}
            </Link>
          ))}
        </div>
      </section>

      <Card className="flex items-start gap-3 p-5">
        <ShieldCheck
          aria-hidden="true"
          size={18}
          className="mt-0.5 shrink-0 text-[#0f9f8f]"
        />
        <p className="text-sm leading-6 text-slate-600">
          <strong className="text-[#0f9f8f]">Use this as a starting point.</strong>{" "}
          Pathly organizes general public information; it does not assess your
          individual application, guarantee admission or replace official
          guidance.
        </p>
      </Card>
    </section>
  );
}

type SectionTitleProps = {
  icon: typeof Globe2;
  title: string;
};

function SectionTitle({ icon: Icon, title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon aria-hidden="true" size={17} className="text-[#3157d5]" />
      <h3 className="font-bold text-[#0f172a]">{title}</h3>
    </div>
  );
}
