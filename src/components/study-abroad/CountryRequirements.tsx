import Link from "next/link";
import { AlertTriangle, ArrowRight, Award } from "lucide-react";

import type { CountryDetails } from "@/constant/countries";

type CountryRequirementsProps = {
  details: CountryDetails;
  countryName: string;
};

export default function CountryRequirements({
  details,
  countryName,
}: CountryRequirementsProps) {
  return (
    <div className="space-y-6">
      {/* Language Requirements */}
      <section
        id="language-requirements"
        className="card-surface content-card scroll-mt-24"
      >
        <h2 className="content-heading">
          Language Requirements
        </h2>

        {details.languageDescription && (
          <p className="mt-4 text-sm leading-6 text-[#43597b]">
            {details.languageDescription}
          </p>
        )}

        {details.languageRequirements.length > 0 && (
          <div className="mt-5 space-y-3">
            {details.languageRequirements.map((requirement) => (
              <div
                key={requirement.title}
                className="rounded-xl bg-[#f7f8f5] p-4"
              >
                <h3 className="font-semibold text-[#111827]">
                  {requirement.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#61779a]">
                  {requirement.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {details.languageWarning && (
          <div className="warning-note mt-4">
            <AlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-[#b76800]"
            />

            <p className="text-sm leading-6 text-[#8a5a00]">
              {details.languageWarning}
            </p>
          </div>
        )}
      </section>

      {/* Scholarships */}
      <section
        id="scholarships"
        className="card-surface content-card scroll-mt-24"
      >
        <h2 className="content-heading">Scholarships</h2>

        <div className="mt-5 space-y-2.5">
          {details.scholarships.map((scholarship) => (
            <div
              key={scholarship}
              className="content-list-row"
            >
              <Award size={16} className="shrink-0 text-[#c88719]" />

              <span className="text-sm text-[#43597b]">{scholarship}</span>
            </div>
          ))}
        </div>

        <Link
          href="/scholarship"
          className="action-link mt-5"
        >
          Explore all scholarships
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Student Visa */}
      <section
        id="student-visa"
        className="card-surface content-card scroll-mt-24"
      >
        <h2 className="content-heading">Student Visa</h2>

        <p className="mt-4 text-sm text-[#43597b]">
          Visa type:{" "}
          <span className="font-semibold text-[#111827]">
            {details.visaType}
          </span>
        </p>

        <div className="warning-note mt-5">
          <AlertTriangle size={17} className="mt-0.5 shrink-0 text-[#b76800]" />

          <p className="text-sm leading-6 text-[#8a5a00]">
            {details.visaWarning}
          </p>
        </div>

        <Link
          href="/student-visa"
          className="action-link mt-5"
        >
          View {countryName} visa guide
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
