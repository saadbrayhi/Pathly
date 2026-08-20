import Link from "next/link";
import {quickCategories} from "@/constant/constant";


export default function StartSection() {
  return (
    <section className="border-b border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-300 px-6">
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
