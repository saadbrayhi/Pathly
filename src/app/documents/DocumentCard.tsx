import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import Badge from "@/app/components/shared/Badge";
import Card from "@/app/components/shared/Card";
import type { StudyDocument } from "@/app/data/documents";

type DocumentCardProps = {
  document: StudyDocument;
};

const preparationVariant = {
  Low: "success",
  Medium: "warning",
  High: "danger",
} as const;

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link
      href={`/documents/${document.slug}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
      aria-label={`Open ${document.name} guide`}
    >
      <Card className="card-interactive flex h-full min-w-0 flex-col p-5 group-hover:border-soft-blue-border">
        <div className="mb-3 flex items-start justify-between">
          <span className="flex size-10 items-center justify-center rounded-xl bg-soft-blue text-primary">
            <FileText aria-hidden="true" size={18} />
          </span>
          <ArrowRight
            aria-hidden="true"
            size={15}
            className="mt-0.5 text-slate-300 transition-colors group-hover:text-primary"
          />
        </div>

        <h3 className="wrap-break-words text-sm font-bold text-heading">{document.name}</h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">
          {document.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant={preparationVariant[document.preparation]}>
            {document.preparation} prep
          </Badge>
          {document.translationRequired && (
            <Badge variant="primary">Translation may be needed</Badge>
          )}
          {document.authenticationRequired && <Badge>Authentication</Badge>}
        </div>
      </Card>
    </Link>
  );
}
