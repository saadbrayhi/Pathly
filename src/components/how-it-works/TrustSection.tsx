import { ShieldCheck } from "lucide-react";

import Card from "@/components/shared/Card";

const trustItems = [
  {
    title: "Official sources",
    description:
      "Every major guide links to official university, embassy, or government sources. Pathly explains the process — official sources confirm it.",
  },
  {
    title: "Last-reviewed dates",
    description:
      "Guides include last-reviewed labels so you know how recently the information was checked.",
  },
  {
    title: "Variable requirements",
    description:
      "When a requirement varies by institution, Pathly explicitly says so and directs you to the official program page.",
  },
  {
    title: "AI limitations",
    description:
      "The AI Study Navigator organizes publicly available information into a structured overview. It does not assess individual applications or predict outcomes.",
  },
];

export default function TrustSection() {
  return (
    <Card className="mt-12 p-8 shadow-none">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f8f5] text-[#20a99a]">
          <ShieldCheck size={21} strokeWidth={1.8} />
        </div>

        <h2 className="content-heading">
          How Pathly handles trust
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {trustItems.map((item) => (
          <div key={item.title} className="rounded-xl bg-[#f7f8f5] p-5">
            <h3 className="text-sm font-semibold text-[#111827]">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#61779a]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
