import { AlertTriangle } from "lucide-react";

import Card from "@/components/shared/Card";

import type { ScholarshipViewModel } from "@/services/scholarship";
type ScholarshipCommonMistakesProps = {
  scholarship: ScholarshipViewModel;
};

export default function ScholarshipCommonMistakes({
  scholarship,
}: ScholarshipCommonMistakesProps) {
  return (
    <Card className="content-card">
      <h2 className="content-heading">Common Mistakes</h2>

      <div className="mt-5 space-y-3">
        {scholarship.commonMistakes.map((mistake) => (
          <div key={mistake} className="warning-panel">
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
