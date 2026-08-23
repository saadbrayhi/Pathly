import type { Metadata } from "next";
import {
  Award,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  Plane,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";

import Badge from "../components/shared/Badge";
import Breadcrumb from "../components/shared/Breadcrumb";
import Card from "../components/shared/Card";
import Container from "../components/shared/Container";
import { SUPPORT_SERVICES, SUPPORT_STEPS } from "../data/personalSupport";
import SupportForm from "./SupportForm";

export const metadata: Metadata = {
  title: "Personal Support | Pathly",
  description:
    "Request personal help organizing university, scholarship, document, and student-visa applications.",
};

const stepIcons = [Send, Users, ClipboardList];

const serviceIcons = {
  university: GraduationCap,
  scholarship: Award,
  documents: FileText,
  visa: Plane,
  complete: ClipboardList,
};

const serviceStyles = {
  university: "bg-soft-blue text-primary",
  scholarship: "bg-soft-warning text-warning",
  documents: "bg-soft-success text-success",
  visa: "bg-soft-blue text-primary",
  complete: "bg-soft-mint text-accent",
};

export default function PersonalSupportPage() {
  return (
    <main className="min-h-screen bg-warm-surface py-8 sm:py-12">
      <Container>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Personal Support" }]}
        />

        <header className="mt-6 max-w-3xl">
          <Badge variant="primary" className="gap-1.5">
            <HeartHandshake aria-hidden="true" size={13} />
            Pathly Personal Support
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Need personal help with your study-abroad process?
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Work directly with the Pathly team to organize your university,
            scholarship, document, or visa application process.
          </p>
        </header>

        <section aria-labelledby="support-process-title" className="mt-8 sm:mt-10">
          <h2 id="support-process-title" className="text-xl font-bold text-heading">
            How it works
          </h2>
          <div className="mt-4 grid items-stretch gap-4 md:grid-cols-3">
            {SUPPORT_STEPS.map((step, index) => {
              const Icon = stepIcons[index];

              return (
                <Card key={step.number} className="h-full p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-soft-blue text-primary">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-heading">{step.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="support-services-title" className="mt-8 sm:mt-10">
          <h2 id="support-services-title" className="text-xl font-bold text-heading">
            What we can help with
          </h2>
          <div className="mt-4 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_SERVICES.map((service) => {
              const Icon = serviceIcons[service.icon];

              return (
                <Card key={service.title} className="h-full p-5">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ${serviceStyles[service.icon]}`}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-heading">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="support-terms-title"
          className="mt-10 flex items-start gap-3 rounded-2xl border border-[#9be5dc] bg-soft-mint p-5"
        >
          <ShieldCheck aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <h2 id="support-terms-title" className="text-sm font-bold text-heading">
              How Pathly Personal Support works
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Pathly provides personal administrative and application support.
              <strong className="font-semibold text-slate-700">
                {" "}Final decisions are made by universities, scholarship providers,
                embassies, and official authorities.
              </strong>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-5 text-slate-600 marker:text-accent">
              <li>Pathly does not guarantee admission, scholarships, or visa approval.</li>
              <li>The student must provide correct information and review important documents before submission.</li>
              <li>External university, embassy, translation, authentication, or visa fees are separate.</li>
            </ul>
          </div>
        </section>

        <SupportForm />
      </Container>
    </main>
  );
}
