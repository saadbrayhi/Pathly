import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScholarshipCard from "./ScolarshipCard";
import { scholarships } from "@/constant/constant";

export default function FeaturedScholarships() {
  return (
    <section className="section-spacing bg-white">
      <div className="page-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <h2 className="section-heading">
              Featured scholarships
            </h2>

            <p className="section-description">
              Explore funding opportunities connected to official provider
              pages.
            </p>
          </div>

          <Link
            href="/scholarship"
            className="view-all-link"
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
