import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationCard from "./DestinationCard";
import { destinations } from "@/constant/constant";


export default function PopDestination() {
  return (
    <section className="section-spacing bg-warm-surface">
      <div className="page-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <h2 className="section-heading">
              Popular destinations
            </h2>

            <p className="section-description">
              Compare admission, costs, scholarships, and visa requirements.
            </p>
          </div>
          
          <Link
            href="/study-abroad"
            className="view-all-link"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.href}
              {...destination}
            />
          ))}
        </div>
      </div>
    </section>
  );
}