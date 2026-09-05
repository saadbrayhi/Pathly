import type { VisaApiItem } from "@/services/visa";

import VisaCountryCard from "./VisaCountryCard";

type VisaCountryListProps = {
  visas: VisaApiItem[];
};

export default function VisaCountryList({ visas }: VisaCountryListProps) {
  return (
    <section className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visas.map((country) => (
          <VisaCountryCard key={country.slug} country={country} />
        ))}
      </div>
    </section>
  );
}
