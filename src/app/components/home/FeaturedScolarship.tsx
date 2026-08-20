import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScholarshipCard from "./ScolarshipCard";
import { scholarships } from "@/constant/constant";

export default function FeaturedScholarships() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-300 px-6">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="mb-1 text-3xl font-bold text-[#0f172a]">
              Featured scholarships
            </h2>

            <p className="text-slate-500">
              Explore funding opportunities connected to official provider
              pages.
            </p>
          </div>

          <Link
            href="/scholarships"
            className="hidden items-center gap-1 rounded text-sm font-semibold text-[#3157d5] transition hover:text-[#2647b8] md:flex"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.href} {...scholarship} />
          ))}
        </div>
      </div>
    </section>
  );
}
