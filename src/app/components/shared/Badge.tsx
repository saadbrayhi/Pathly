import { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default:
      "border-slate-200 bg-slate-100 text-slate-600",

    primary:
      "border-[#c2d3ff] bg-[#eaf0ff] text-[#3157d5]",

    success:
      "border-[#bde9df] bg-[#e7f8f4] text-[#0f9f8f]",

    warning:
      "border-[#f0d070] bg-[#fff5df] text-[#b76800]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}