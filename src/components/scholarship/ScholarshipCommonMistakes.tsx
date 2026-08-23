import { AlertTriangle } from "lucide-react";

import Card from "@/components/shared/Card";

import type { Scholarship } from "@/constant/scholarships";

type ScholarshipCommonMistakesProps = {
  scholarship: Scholarship;
};

export default function ScholarshipCommonMistakes({
  scholarship,
}: ScholarshipCommonMistakesProps) {
  return (
    <Card className="border-[#dce5f0] bg-white p-6 shadow-none">
      <h2 className="text-xl font-semibold text-[#111827]">Common Mistakes</h2>

      <div className="mt-5 space-y-3">
        {scholarship.commonMistakes.map((mistake) => (
          <div
            key={mistake}
            className="flex gap-3 rounded-xl border border-[#f0d070] bg-[#fff7e5] px-4 py-3"
          >
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0 text-[#b76800]"
            />

            <p className="text-sm leading-6 text-[#43597b]">{mistake}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
