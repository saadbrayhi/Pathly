import { AlertTriangle } from "lucide-react";

import type { CountryDetails } from "../../../../constant/countries";

type CountryRequirementsProps = {
  details: CountryDetails;
};

export default function CountryRequirements({
  details,
}: CountryRequirementsProps) {
  return (
    <section
      id="language-requirements"
      className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:p-6"
    >
      <h2 className="text-xl font-semibold text-[#111827]">
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
        <div className="mt-4 flex gap-3 rounded-xl bg-[#fff4d9] p-4">
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
  );
}
