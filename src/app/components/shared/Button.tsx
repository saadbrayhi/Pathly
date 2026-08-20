import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-200";

  const variants = {
    primary:
      "bg-[#3157d5] text-white hover:bg-[#2647b8] hover:-translate-y-0.5 hover:shadow-md",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}