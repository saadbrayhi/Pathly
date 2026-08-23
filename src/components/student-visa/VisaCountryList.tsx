import { visaCountries } from "@/constant/visa/visaData";

import VisaCountryCard from "./VisaCountryCard";

export default function VisaCountryList() {
  return (
    <section className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visaCountries.map((country) => (
          <VisaCountryCard key={country.slug} country={country} />
        ))}
      </div>
    </section>
  );
}
