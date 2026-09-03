import type { ReactNode } from "react";

type DataTableProps = {
  children: ReactNode;
  label: string;
  minWidth?: string;
};

export default function DataTable({
  children,
  label,
  minWidth = "min-w-[880px]",
}: DataTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.03)] md:block">
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse text-left ${minWidth}`}>
          <caption className="sr-only">{label}</caption>
          {children}
        </table>
      </div>
    </div>
  );
}
