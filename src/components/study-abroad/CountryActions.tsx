import { ArrowRight, HeartHandshake } from "lucide-react";

import Button from "@/components/shared/Button";

type CountryActionsProps = {
  countryName: string;
};

export default function CountryActions({ countryName }: CountryActionsProps) {
  return (
    <div className="space-y-6">
      {/* Personal Support */}
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#dce5f0] bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0ff] text-[#3157d5]">
            <HeartHandshake size={20} />
          </div>

          <p className="text-sm leading-6 text-[#43597b]">
            <span className="font-semibold text-[#111827]">
              Need help completing this process?
            </span>{" "}
            The Pathly team can work with you personally.
          </p>
        </div>

        <Button
          href="/personal-support"
          className="shrink-0 rounded-xl px-5 py-2.5"
        >
          Get Help From Our Team
        </Button>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl bg-[#365bd8] p-8 text-white shadow-sm">
        <h2 className="text-xl font-semibold">
          Ready to build your {countryName} path?
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/85">
          Get a personalized step-by-step guide based on your current level and
          study goal.
        </p>

        <Button
          href="/find-my-path"
          variant="secondary"
          className="mt-5 bg-white px-5 py-3 text-[#3157d5]"
        >
          Find My Study Path
          <ArrowRight size={16} />
        </Button>
      </section>
    </div>
  );
}
