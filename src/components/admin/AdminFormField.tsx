import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type SharedFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

type AdminInputProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "required">;

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-heading outline-none transition placeholder:text-subtle focus:border-primary focus:ring-3 focus:ring-focus-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted";

export function AdminInput({
  label,
  error,
  hint,
  id,
  required,
  className = "",
  ...props
}: AdminInputProps) {
  const detailId = id && (error || hint) ? `${id}-detail` : undefined;

  return (
    <label htmlFor={id} className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-content">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </span>
      <input
        {...props}
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={detailId}
        className={`${fieldClass} ${
          error ? "border-danger focus:border-danger focus:ring-danger-border" : ""
        } ${className}`}
      />
      {(error || hint) && (
        <span
          id={detailId}
          className={`mt-1.5 block text-xs leading-5 ${error ? "text-danger" : "text-muted"}`}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}

type AdminTextareaProps = SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "required">;

export function AdminTextarea({
  label,
  error,
  hint,
  id,
  required,
  className = "",
  ...props
}: AdminTextareaProps) {
  const detailId = id && (error || hint) ? `${id}-detail` : undefined;

  return (
    <label htmlFor={id} className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-content">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </span>
      <textarea
        {...props}
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={detailId}
        className={`${fieldClass} min-h-28 resize-y ${
          error ? "border-danger focus:border-danger focus:ring-danger-border" : ""
        } ${className}`}
      />
      {(error || hint) && (
        <span
          id={detailId}
          className={`mt-1.5 block text-xs leading-5 ${error ? "text-danger" : "text-muted"}`}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}

export function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-semibold text-heading">{title}</legend>
      {description && (
        <p className="-mt-2 text-xs leading-5 text-muted">{description}</p>
      )}
      {children}
    </fieldset>
  );
}

export const adminFieldClass = fieldClass;
