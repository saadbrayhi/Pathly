import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "France",
    flag: "🇫🇷",
    image: "/images/home/destinations/france.jpg",
    languages: ["French", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/france",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    image: "/images/home/destinations/germany.jpg",
    languages: ["German", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/germany",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    image: "/images/home/destinations/italy.jpg",
    languages: ["Italian", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/italy",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    image: "/images/home/destinations/canada.jpg",
    languages: ["English", "French"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/canada",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    image: "/images/home/destinations/turkey.jpg",
    languages: ["Turkish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/turkey",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    image: "/images/home/destinations/netherlands.jpg",
    languages: ["Dutch", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/netherlands",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    image: "/images/home/destinations/spain.jpg",
    languages: ["Spanish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/spain",
    scholarships: true,
    visaRequired: true,
  },
];

export default function PopDestination() {
  return (
    <section className="bg-[#fafaf7] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="mb-1 text-3xl font-bold text-[#0f172a]">
              Popular destinations
            </h2>

            <p className="text-slate-500">
              Compare admission, costs, scholarships, and visa requirements.
            </p>
          </div>

          <Link
            href="/study-abroad"
            className="hidden items-center gap-1 rounded text-sm font-semibold text-[#3157d5] transition hover:text-[#2647b8] md:flex"
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