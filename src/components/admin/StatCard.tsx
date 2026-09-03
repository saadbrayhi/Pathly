import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
};

export default function StatCard({
  label,
  value,
  icon,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
      <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-soft-blue text-primary">
        {icon}
      </div>
      <div className="text-3xl font-bold tracking-[-0.03em] text-heading">{value}</div>
      <div className="mt-1.5 text-sm font-semibold text-content">
        {label}
      </div>
      {description && (
        <div className="mt-1.5 text-xs leading-5 text-muted">
          {description}
        </div>
      )}
    </div>
  );
}
