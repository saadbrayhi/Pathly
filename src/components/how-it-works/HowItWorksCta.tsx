import { ArrowRight } from "lucide-react";

import Button from "@/components/shared/Button";

export default function HowItWorksCta() {
  return (
    <div className="mt-8 flex justify-center">
      <Button href="/find-my-path" className="gap-2 px-7 py-3">
        Start Your Study Path
        <ArrowRight size={17} />
      </Button>
    </div>
  );
}
