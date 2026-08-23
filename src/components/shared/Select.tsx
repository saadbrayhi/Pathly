import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

export default function Select({
  label,
  error,
  options,
  placeholder = "Select an option",
  id,
  required,
  className = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  const errorId = id && error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        {...props}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200 focus:border-[#3157d5] focus:ring-blue-100"
        } ${className}`}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
