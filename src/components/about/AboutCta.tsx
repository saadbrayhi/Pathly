import { ArrowRight } from "lucide-react";

import Button from "@/components/shared/Button";

export default function AboutCta() {
  return (
    <section className="mt-8 rounded-2xl border border-[#b9ccff] bg-[#eaf0ff] px-6 py-7 text-center">
      <h2 className="text-lg font-semibold text-[#111827]">
        &quot;Know every step before you apply.&quot;
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#61779a]">
        That is Pathly&apos;s purpose — a clear, trustworthy guide for every
        student planning to study abroad.
      </p>

      <Button href="/find-my-path" className="mt-5 gap-2 px-6 py-3">
        Find My Study Path
        <ArrowRight size={16} />
      </Button>
    </section>
  );
}
