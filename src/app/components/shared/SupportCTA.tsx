import { HeartHandshake } from "lucide-react";

import Button from "./Button";
import Card from "./Card";

export default function SupportCTA() {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-soft-blue text-primary">
          <HeartHandshake aria-hidden="true" size={17} />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-heading">
            Need help preparing this document?
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Pathly can help you organize the requirements and identify your next step.
          </p>
        </div>
      </div>
      <Button href="/personal-support" className="w-full shrink-0 text-sm sm:w-auto">
        Get personal support
      </Button>
    </Card>
  );
}
