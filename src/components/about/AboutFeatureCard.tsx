import type { LucideIcon } from "lucide-react";

import Card from "@/components/shared/Card";

type AboutFeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function AboutFeatureCard({
  title,
  description,
  icon: Icon,
}: AboutFeatureCardProps) {
  return (
    <Card className="p-5 shadow-none">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5]">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <h2 className="mt-4 text-base font-semibold text-[#111827]">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-[#61779a]">{description}</p>
    </Card>
  );
}
