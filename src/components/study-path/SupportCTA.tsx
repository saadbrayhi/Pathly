import { HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function SupportCTA() {
  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-blue text-primary">
            <HeartHandshake size={17} />
          </div>

          <p className="text-sm leading-relaxed text-slate-500">
            <span className="font-semibold text-heading">
              Need help completing this process?
            </span>{" "}
            The Pathly team can work with you personally.
          </p>
        </div>

        <Link
          href="/personal-support"
          className="btn btn-primary shrink-0 px-5 py-2.5 text-sm"
        >
          Get Help From Our Team
        </Link>
      </div>
    </section>
  );
}