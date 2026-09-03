import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, Info } from "lucide-react";

import Badge from "@/components/shared/Badge";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Card from "@/components/shared/Card";
import Container from "@/components/shared/Container";
import SupportCTA from "@/components/shared/SupportCTA";
import type { DocumentDetails } from "@/types/document";

type DocumentGuideProps = {
  document: DocumentDetails;
};

const preparationVariant = {
  Low: "success",
  Medium: "warning",
  High: "danger",
} as const;

export default function DocumentGuide({ document }: DocumentGuideProps) {
  return (
    <main className="warm-page overflow-x-hidden py-8 sm:py-12">
      <Container className="max-w-[948px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Documents", href: "/documents" },
            { label: document.name },
          ]}
        />

        <Card className="mt-6 p-5 sm:p-7">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-soft-blue text-primary sm:size-14">
              <FileText aria-hidden="true" size={25} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400">
                {document.category} Document
              </p>
              <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                {document.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Needed for: {document.neededFor}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant={preparationVariant[document.preparation]}>
              {document.preparation} preparation
            </Badge>
            {document.translationRequired && (
              <Badge variant="primary">Translation may be required</Badge>
            )}
            {document.authenticationRequired && (
              <Badge variant="warning">Authentication may be required</Badge>
            )}
            <Badge variant="warning">Verify the official requirements</Badge>
          </div>
        </Card>

        <div className="mt-5 space-y-5">
          <GuideSection title="What it is">
            <p className="text-sm leading-7 text-slate-600">
              {document.whatItIs}
            </p>
          </GuideSection>

          <GuideSection title="Why universities ask for it">
            <p className="text-sm leading-7 text-slate-600">
              {document.whyItIsNeeded}
            </p>
          </GuideSection>

          {document.structureSteps.length > 0 && (
            <GuideSection title="Recommended structure">
              <ol className="space-y-3">
                {document.structureSteps.map((step, index) => (
                  <li
                    key={step.id}
                    className="flex items-start gap-4 rounded-xl bg-[#f6f7f3] p-4"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-heading">{step.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {document.structureNote && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-soft-mint p-3 text-accent">
                  <Info aria-hidden="true" size={14} className="mt-0.5 shrink-0" />
                  <p className="text-xs leading-5">
                    {document.structureNote}
                  </p>
                </div>
              )}
            </GuideSection>
          )}

          <GuideSection title="Translation & authentication">
            <div className="grid gap-3 sm:grid-cols-2">
              <RequirementCard
                title="Translation"
                required={document.translationRequired}
                requiredText="May be required when the original is not in the program language. Use an accepted certified translator."
                optionalText="Generally not required unless the university, scholarship provider, or embassy requests it."
              />
              <RequirementCard
                title="Authentication"
                required={document.authenticationRequired}
                requiredText="May require notarization, legalization, or an apostille depending on the destination and institution."
                optionalText="Generally not required for this document type, but always confirm with the receiving authority."
              />
            </div>
          </GuideSection>

          <GuideSection title="Common mistakes">
            <ul className="space-y-3">
              {document.mistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="flex items-start gap-3 rounded-xl border border-warning-border/60 bg-soft-warning px-4 py-3"
                >
                  <AlertTriangle
                    aria-hidden="true"
                    size={14}
                    className="mt-0.5 shrink-0 text-warning"
                  />
                  <span className="text-sm leading-6 text-slate-700">{mistake}</span>
                </li>
              ))}
            </ul>
          </GuideSection>

          <SupportCTA />

          <section aria-labelledby="related-guides" className="rounded-2xl border border-soft-blue-border bg-soft-blue p-5">
            <h2 id="related-guides" className="text-sm font-bold text-heading">
              Related guides
            </h2>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
              {[
                { label: "All Documents", href: "/documents" },
                { label: "Find Scholarships", href: "/scholarship" },
                { label: "Build Your Study Path", href: "/find-my-path" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                  <ArrowRight aria-hidden="true" size={13} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

type GuideSectionProps = {
  title: string;
  children: React.ReactNode;
};

function GuideSection({ title, children }: GuideSectionProps) {
  return (
    <Card className="card-padding">
      <h2 className="mb-3 text-lg font-bold text-heading">{title}</h2>
      {children}
    </Card>
  );
}

type RequirementCardProps = {
  title: string;
  required: boolean;
  requiredText: string;
  optionalText: string;
};

function RequirementCard({
  title,
  required,
  requiredText,
  optionalText,
}: RequirementCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        required
          ? "border-warning-border bg-soft-warning"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <h3 className="text-sm font-semibold text-heading">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-600">
        {required ? requiredText : optionalText}
      </p>
    </div>
  );
}
