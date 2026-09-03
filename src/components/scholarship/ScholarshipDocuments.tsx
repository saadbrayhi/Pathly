import { FileText } from "lucide-react";

import Card from "@/components/shared/Card";

import type { ScholarshipViewModel } from "@/services/scholarship";
type ScholarshipDocumentsProps = {
  scholarship: ScholarshipViewModel;
};

export default function ScholarshipDocuments({
  scholarship,
}: ScholarshipDocumentsProps) {
  return (
    <div id="required-documents" className="scroll-mt-24">
      <Card className="content-card">
        <h2 className="content-heading">Required Documents</h2>

        <div className="mt-5 space-y-2.5">
          {scholarship.requiredDocuments.map((document) => (
            <div key={document} className="content-list-row">
              <FileText size={15} className="shrink-0 text-[#8ba0c0]" />

              <p className="text-sm text-[#344968]">{document}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
