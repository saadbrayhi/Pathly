import { AlertTriangle, CheckCircle2 } from "lucide-react";

import Badge from "../../../components/shared/Badge";

import type {
  CountryDetails,
  RequirementStatus,
} from "../../../../constant/countries";

type CountryAdmissionsProps = {
  details: CountryDetails;
};

function getRequirementVariant(
  status: RequirementStatus,
): "success" | "warning" | "primary" {
  if (status === "Required") {
    return "success";
  }

  if (status === "May be required") {
    return "warning";
  }

  return "primary";
}

export default function CountryAdmissions({ details }: CountryAdmissionsProps) {
  return (
    <div className="space-y-6">
      {/* Education System */}
      <section
        id="education-system"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Education System
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#43597b]">
          {details.educationSystem}
        </p>
      </section>

      {/* Who Can Apply */}
      <section
        id="who-can-apply"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">Who Can Apply?</h2>

        <p className="mt-4 text-sm leading-6 text-[#43597b]">
          {details.whoCanApply}
        </p>

        <div className="mt-5 flex gap-3 rounded-xl bg-[#fff4d9] p-4">
          <AlertTriangle size={17} className="mt-0.5 shrink-0 text-[#b76800]" />

          <p className="text-sm leading-6 text-[#8a5a00]">
            {details.eligibilityWarning}
          </p>
        </div>
      </section>

      {/* Admission Requirements */}
      <section
        id="admission-requirements"
        className="scroll-mt-24 rounded-2xl border border-[#dce5f0] bg-white p-6"
      >
        <h2 className="text-xl font-semibold text-[#111827]">
          Admission Requirements
        </h2>

        <div className="mt-5 space-y-2.5">
          {details.admissionRequirements.map((requirement) => (
            <div
              key={requirement.label}
              className="flex flex-col justify-between gap-3 rounded-xl bg-[#f7f8f5] px-4 py-3 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 size={15} className="shrink-0 text-[#8ba0c0]" />

                <span className="text-sm text-[#344968]">
                  {requirement.label}
                </span>
              </div>

              <Badge variant={getRequirementVariant(requirement.status)}>
                {requirement.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
