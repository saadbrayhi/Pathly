import { HeartHandshake } from "lucide-react";

import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";

export default function ScholarshipHelpCta() {
  return (
    <Card className="border-[#dce5f0] bg-white px-5 py-4 shadow-none">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef3ff]">
            <HeartHandshake
              size={17}
              strokeWidth={1.8}
              className="text-[#3157d5]"
            />
          </div>

          <p className="text-[14px] leading-5 text-[#43597b]">
            <span className="font-semibold text-[#111827]">
              Need help completing this process?
            </span>{" "}
            The Pathly team can work with you personally.
          </p>
        </div>

        <Button
          href="/personal-support"
          className="h-10 shrink-0 whitespace-nowrap rounded-xl px-5 text-[13px] font-semibold"
        >
          Get Help From Our Team
        </Button>
      </div>
    </Card>
  );
}
