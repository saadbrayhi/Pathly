import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import type { VisaApiItem } from "@/services/visa";

type VisaCountryCardProps = {
  country: VisaApiItem;
};

export default function VisaCountryCard({ country }: VisaCountryCardProps) {
  return (
    <Link
      href={`/student-visa/${country.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      {/* Country image */}
      <div className="relative h-36.25 overflow-hidden">
        {country.image ? (
          <Image
            src={country.image}
            alt={`${country.name} student visa`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Country info over image */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <div className="text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flag}</span>

              <h2 className="font-semibold">{country.name}</h2>
            </div>

            <p className="mt-0.5 text-[11px] text-white/80">
              {country.visaType ?? "Visa information"}
            </p>
          </div>

          <ArrowRight
            size={17}
            className="mb-1 text-white/80 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>

      {/* Visa details */}
      <div className="p-4">
        <VisaRow
          label="Fee"
          value={country.visaEstimatedFee ?? "Not available"}
        />

        <VisaRow
          label="Processing time"
          value={country.visaProcessingTime ?? "Not available"}
        />

        <VisaRow
          label="Appointment"
          value={country.visaAppointment ?? "Not available"}
        />

        <VisaRow
          label="Proof of funds"
          value={country.visaFinancialProof ?? "Not available"}
        />

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-accent">
          <ShieldCheck size={14} />
          Official source linked in guide
        </div>
      </div>
    </Link>
  );
}

type VisaRowProps = {
  label: string;
  value: string;
};

function VisaRow({ label, value }: VisaRowProps) {
  return (
    <div className="mb-2 flex items-start justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2 text-xs">
      <span className="shrink-0 text-slate-400">{label}</span>

      <span className="text-right font-medium text-slate-600">{value}</span>
    </div>
  );
}
