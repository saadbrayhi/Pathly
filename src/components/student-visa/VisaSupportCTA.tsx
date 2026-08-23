import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function VisaSupportCTA() {
  return (
    <section className="card-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="icon-circle">
            <HeartHandshake size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-heading">
              Need help completing this process?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The Pathly team can work with you personally through your visa
              and study-abroad preparation.
            </p>
          </div>
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
