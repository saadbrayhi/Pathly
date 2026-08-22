import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "btn";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };
  const disabledStyles = disabled
    ? "cursor-not-allowed border-slate-200 bg-white text-slate-300 shadow-none hover:translate-y-0 hover:bg-white hover:shadow-none"
    : "";
  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} ${disabledStyles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
