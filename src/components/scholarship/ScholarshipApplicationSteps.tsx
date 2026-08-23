import Card from "@/components/shared/Card";

import type { Scholarship } from "@/constant/scholarships";

type ScholarshipApplicationStepsProps = {
  scholarship: Scholarship;
};

export default function ScholarshipApplicationSteps({
  scholarship,
}: ScholarshipApplicationStepsProps) {
  return (
    <Card className="border-[#dce5f0] bg-white p-6 shadow-none">
      <h2 className="text-xl font-semibold text-[#111827]">
        Application Steps
      </h2>

      <div className="mt-5 space-y-4">
        {scholarship.applicationSteps.map((step, index) => (
          <div key={step} className="flex items-start gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#bfd0ff] bg-[#eef3ff] text-xs font-semibold text-[#3157d5]">
              {index + 1}
            </span>

            <p className="pt-1 text-sm leading-6 text-[#344968]">{step}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
