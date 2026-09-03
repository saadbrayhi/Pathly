import Card from "@/components/shared/Card";

import type { ScholarshipViewModel } from "@/services/scholarship";

type ScholarshipApplicationStepsProps = {
  scholarship: ScholarshipViewModel;
};

export default function ScholarshipApplicationSteps({
  scholarship,
}: ScholarshipApplicationStepsProps) {
  return (
    <Card className="content-card">
      <h2 className="content-heading">Application Steps</h2>

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
