import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-slate-200 focus:border-[#3157d5]"
        } ${className}`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
