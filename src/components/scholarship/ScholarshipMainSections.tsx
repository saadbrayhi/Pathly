import Card from "@/components/shared/Card";

import type { Scholarship } from "@/constant/scholarships";

type ScholarshipMainSectionsProps = {
  scholarship: Scholarship;
};

export default function ScholarshipMainSections({
  scholarship,
}: ScholarshipMainSectionsProps) {
  return (
    <div className="space-y-5">
      {/* Overview */}
      <Card className="content-card">
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111827]">
          Overview
        </h2>

        <p className="mt-3 text-[14px] font-normal leading-6 text-[#43597b]">
          {scholarship.overview}
        </p>
      </Card>

      {/* Who Can Apply */}
      <Card className="content-card">
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111827]">
          Who Can Apply?
        </h2>

        <p className="mt-3 text-[14px] font-normal leading-6 text-[#43597b]">
          {scholarship.whoCanApply}
        </p>

        <div className="mt-4 rounded-xl bg-[#eaf0ff] px-4 py-3">
          <p className="text-[12px] font-medium leading-5 text-[#3157d5]">
            {scholarship.eligibilityNote}
          </p>
        </div>
      </Card>

      {/* Funding Coverage */}
      <Card className="content-card">
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111827]">
          Funding Coverage
        </h2>

        <p className="mt-3 text-[14px] font-normal leading-6 text-[#43597b]">
          {scholarship.fundingCoverage}
        </p>

        <p className="mt-2 text-[12px] font-normal italic leading-5 text-[#91a3bf]">
          {scholarship.fundingNote}
        </p>
      </Card>
    </div>
  );
}
