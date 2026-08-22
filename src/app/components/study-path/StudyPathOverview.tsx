import Link from "next/link";
import {
  GraduationCap,
  FileText,
  Award,
  Plane,
  type LucideIcon,
} from "lucide-react";

import {
  studyPathSteps,
  type StudyPathStepKey,
} from "@/constant/constant";

type StudyPathOverviewProps = {
  degree: string | null;
  field: string | null;
  destination: string | null;
};

export default function StudyPathOverview({
  degree,
  field,
  destination,
}: StudyPathOverviewProps) {
  const degreeLabel = formatValue(degree);
  const fieldLabel = formatValue(field);
  const destinationLabel = formatValue(destination);

  const icons: Record<StudyPathStepKey, LucideIcon> = {
    admission: GraduationCap,
    documents: FileText,
    scholarships: Award,
    visa: Plane,
  };

  function getStepDescription(key: StudyPathStepKey) {
    switch (key) {
      case "admission":
        return `Review the requirements for ${degreeLabel} programs in ${destinationLabel}.`;

      case "documents":
        return "Organize your academic records, identification, language certificates, and other required documents.";

      case "scholarships":
        return `Find scholarships that match your ${fieldLabel} study path.`;

      case "visa":
        return `Review the student visa process for ${destinationLabel}.`;
    }
  }

  function getStepHref(key: StudyPathStepKey, href: string) {
    if (key === "admission") {
      return destination
        ? `/study-abroad/${destination}`
        : "/study-abroad";
    }

    return href.startsWith("/") ? href : `/${href}`;
  }

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-primary">
          RECOMMENDED JOURNEY
        </p>

        <h2 className="mt-1 text-2xl font-bold text-heading">
          {degreeLabel} in {fieldLabel} — {destinationLabel}
        </h2>

        <p className="mt-2 text-slate-500">
          Follow these main steps to prepare your study-abroad journey.
        </p>
      </div>

      {/* Journey steps */}
      <div className="space-y-4">
        {studyPathSteps.map((step, index) => {
          const Icon = icons[step.key];

          return (
            <Link
              key={step.key}
              href={getStepHref(step.key, step.href)}
              className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-blue text-primary">
                <Icon size={19} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Step {index + 1}
                </p>

                <h3 className="mt-1 font-semibold text-heading transition-colors group-hover:text-primary">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {getStepDescription(step.key)}
                </p>
              </div>

              {/* Arrow */}
              <span className="self-center text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </Link>
          );
        })}
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