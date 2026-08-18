import { deadlines, type DeadlineGroup } from "../../data/deadlines";

const dotColor: Record<DeadlineGroup, string> = {
  upcoming: "bg-[#3157d5]",
  later: "bg-slate-300",
  verify: "bg-[#b76800]",
};

export default function UpcomingDeadlines() {
  return (
    <section className="bg-[#fafaf7] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#0f172a]">
            Upcoming deadlines
          </h2>

          <span className="rounded-full border border-[#f0d070] bg-[#fff5df] px-3 py-1.5 text-xs font-medium text-[#b76800]">
            Demo — always verify official dates
          </span>
        </div>

        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          {deadlines.map((deadline) => (
            <div
              key={deadline.label}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    dotColor[deadline.group]
                  }`}
                />

                <span className="text-sm text-slate-700">{deadline.label}</span>

                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  {deadline.type}
                </span>
              </div>

              <span className="ml-4 shrink-0 text-right text-xs text-slate-400">
                {deadline.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
