import { FileText } from "lucide-react";

import Card from "../../../components/shared/Card";

import type { Scholarship } from "../../../../constant/scholarships";

type ScholarshipDocumentsProps = {
  scholarship: Scholarship;
};

export default function ScholarshipDocuments({
  scholarship,
}: ScholarshipDocumentsProps) {
  return (
    <div id="required-documents" className="scroll-mt-24">
      <Card className="border-[#dce5f0] bg-white p-6 shadow-none">
        <h2 className="text-xl font-semibold text-[#111827]">
          Required Documents
        </h2>

        <div className="mt-5 space-y-2.5">
          {scholarship.requiredDocuments.map((document) => (
            <div
              key={document}
              className="flex items-center gap-3 rounded-xl bg-[#f7f8f5] px-4 py-3"
            >
              <FileText size={15} className="shrink-0 text-[#8ba0c0]" />

              <p className="text-sm text-[#344968]">{document}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
