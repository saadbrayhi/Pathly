import { deadlines, type DeadlineGroup } from "../../data/deadlines";
import Card from "../shared/Card";

const dotColor: Record<DeadlineGroup, string> = {
  upcoming: "bg-primary",
  later: "bg-slate-300",
  verify: "bg-warning",
};

export default function UpcomingDeadlines() {
  return (
    <section className="bg-warm-surface py-16">
      <div className="page-container">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="section-heading-sm">
            Upcoming deadlines
          </h2>

          <span className="deadline-warning-badge">
            Demo — always verify official dates
          </span>
        </div>

        <Card className="divide-y divide-slate-100">
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
        </Card>
      </div>
    </section>
  );
}
