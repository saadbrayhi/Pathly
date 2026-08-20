import Link from "next/link";
import {quickCategories} from "@/constant/constant";


export default function StartSection() {
  return (
    <section className="section-spacing border-b border-slate-100 bg-white">
      <div className="page-container">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 section-heading-sm">
            Where do you want to start?
          </h2>

          <p className="section-description text-base">
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
                className="card-surface card-interactive group flex flex-col items-center p-4 text-center hover:border-soft-blue-border"
              >
                {/* Icon */}
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${cat.accent} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={22} />
                </div>

                {/* Title */}
                <div className="mb-1 text-sm font-semibold leading-tight text-heading">
                  {cat.label}
                </div>

                {/* Description */}
                <p className="hidden text-xs leading-snug text-slate-500 sm:block">
                  {cat.desc}
                </p>

                {/* AI badge */}
                {cat.badge && (
                  <span className="neutral-badge mt-2">
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
