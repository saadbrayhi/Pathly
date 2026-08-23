import Link from "next/link";
import {
  ArrowRight,
  Award,
  FileText,
  Route,
} from "lucide-react";

const relatedLinks = [
  {
    label: "Required Documents",
    description: "Review the documents commonly needed for your applications.",
    href: "/documents",
    icon: FileText,
  },
  {
    label: "Find Scholarships",
    description: "Explore funding opportunities for your study destination.",
    href: "/scholarship",
    icon: Award,
  },
  {
    label: "Build Your Study Path",
    description: "Create a personalized step-by-step study-abroad journey.",
    href: "/find-my-path",
    icon: Route,
  },
];

export default function VisaRelatedLinks() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-heading">
        Continue your journey
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        {relatedLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-blue text-primary">
                  <Icon size={17} />
                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-heading group-hover:text-primary">
                {item.label}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}