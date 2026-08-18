import Link from "next/link";
import {
  TrendingUp,
  Globe,
  BookOpen,
  FileText,
  Award,
  Plane,
  Bot,
} from "lucide-react";

const quickCategories = [
  {
    icon: TrendingUp,
    label: "Find My Study Path",
    desc: "Get a personalized step-by-step path for your goal.",
    href: "/find-my-path",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: Globe,
    label: "Explore Countries",
    desc: "Compare admission, costs, and visas by destination.",
    href: "/study-abroad",
    accent: "bg-[#e7f8f4] text-[#0f9f8f]",
  },
  {
    icon: BookOpen,
    label: "Admission Requirements",
    desc: "Know exactly what each country requires for your level.",
    href: "/admission-requirements",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: FileText,
    label: "Required Documents",
    desc: "Every document explained, with prep guidance.",
    href: "/documents",
    accent: "bg-[#f0fdf4] text-[#16803a]",
  },
  {
    icon: Award,
    label: "Scholarships",
    desc: "Find funding that fits your path, level, and field.",
    href: "/scholarships",
    accent: "bg-[#fff5df] text-[#b76800]",
  },
  {
    icon: Plane,
    label: "Student Visa",
    desc: "Country-by-country visa guides with official steps.",
    href: "/student-visa",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: Bot,
    label: "AI Study Navigator",
    desc: "Describe your situation — we'll organize your path.",
    href: "/ai-navigator",
    accent: "bg-slate-100 text-slate-600",
    badge: "AI-assisted",
  },
];

export default function StartSection() {
  return (
    <section className="border-b border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-2xl font-bold text-[#0f172a]">
            Where do you want to start?
          </h2>

          <p className="text-base text-slate-500">
            Every part of the study-abroad journey, organized in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#c2d3ff] hover:shadow-md"
              >
                {/* Icon */}
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${cat.accent} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={22} />
                </div>

                {/* Title */}
                <div className="mb-1 text-sm font-semibold leading-tight text-[#0f172a]">
                  {cat.label}
                </div>

                {/* Description */}
                <p className="hidden text-xs leading-snug text-slate-500 sm:block">
                  {cat.desc}
                </p>

                {/* AI badge */}
                {cat.badge && (
                  <span className="mt-2 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {cat.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
