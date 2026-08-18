import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScholarshipCard from "./ScolarshipCard";

const scholarships = [
  {
    name: "Erasmus Mundus Joint Masters",
    country: "Europe",
    flag: "🇪🇺",
    level: "Master",
    funding: "Fully funded scholarship for international students.",
    deadline: "January 2027",
    image: "/images/home/scholarships/erasmus-mundus.jpg",
    href: "/scholarships/erasmus-mundus",
  },
  {
    name: "DAAD EPOS",
    country: "Germany",
    flag: "🇩🇪",
    level: "Master",
    funding: "Funding for development-related postgraduate programs.",
    deadline: "Varies by program",
    image: "/images/home/scholarships/daad-epos.jpg",
    href: "/scholarships/daad-epos",
  },
  {
    name: "Eiffel Excellence Scholarship",
    country: "France",
    flag: "🇫🇷",
    level: "Master",
    funding: "French government scholarship for international students.",
    deadline: "January 2027",
    image: "/images/home/scholarships/eiffel.jpg",
    href: "/scholarships/eiffel",
  },
];

export default function FeaturedScholarships() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
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
            <ScholarshipCard
              key={scholarship.href}
              {...scholarship}
            />
          ))}
        </div>
      </div>
    </section>
  );
}