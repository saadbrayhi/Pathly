"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";

import {
  AdminFormSection,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/AdminFormField";
import type { Country } from "@/interfaces/country";
import type {
  CreateScholarshipPayload,
  ScholarshipApiItem,
} from "@/services/scholarship";

type ScholarshipFormProps = {
  scholarship?: ScholarshipApiItem | null;
  countries: Country[];
  isSaving: boolean;
  submitError?: string | null;
  onSubmit: (payload: CreateScholarshipPayload) => Promise<void>;
  onCancel: () => void;
};

type ScholarshipFormState = {
  title: string;
  slug: string;
  provider: string;
  scopeLabel: string;
  flag: string;
  level: string;
  field: string;
  funding: string;
  image: string;
  officialUrl: string;
  overview: string;
  whoCanApply: string;
  eligibilityNote: string;
  fundingCoverage: string;
  fundingNote: string;
  countryIds: string[];
};

type FormErrors = Partial<Record<keyof ScholarshipFormState, string>>;

function scholarshipToForm(
  scholarship?: ScholarshipApiItem | null,
): ScholarshipFormState {
  return {
    title: scholarship?.title ?? "",
    slug: scholarship?.slug ?? "",
    provider: scholarship?.provider ?? "",
    scopeLabel: scholarship?.scopeLabel ?? "",
    flag: scholarship?.flag ?? "",
    level: scholarship?.level ?? "",
    field: scholarship?.field ?? "",
    funding: scholarship?.funding ?? "",
    image: scholarship?.image ?? "",
    officialUrl: scholarship?.officialUrl ?? "",
    overview: scholarship?.overview ?? "",
    whoCanApply: scholarship?.whoCanApply ?? "",
    eligibilityNote: scholarship?.eligibilityNote ?? "",
    fundingCoverage: scholarship?.fundingCoverage ?? "",
    fundingNote: scholarship?.fundingNote ?? "",
    countryIds: scholarship?.countries.map((country) => country.id) ?? [],
  };
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function optional(value: string): string | null {
  return value.trim() || null;
}

export default function ScholarshipForm({
  scholarship,
  countries,
  isSaving,
  submitError,
  onSubmit,
  onCancel,
}: ScholarshipFormProps) {
  const [form, setForm] = useState<ScholarshipFormState>(() =>
    scholarshipToForm(scholarship),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(scholarship));

  function setField<K extends keyof ScholarshipFormState>(
    field: K,
    value: ScholarshipFormState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugWasEdited ? current.slug : toSlug(value),
    }));
    setErrors((current) => ({
      ...current,
      title: undefined,
      slug: undefined,
    }));
  }

  function toggleCountry(id: string) {
    setField(
      "countryIds",
      form.countryIds.includes(id)
        ? form.countryIds.filter((countryId) => countryId !== id)
        : [...form.countryIds, id],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.title.trim()) nextErrors.title = "Scholarship title is required.";
    if (!form.slug.trim()) {
      nextErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(form.slug.trim())) {
      nextErrors.slug = "Use lowercase letters, numbers, and hyphens only.";
    }

    if (form.officialUrl.trim()) {
      try {
        new URL(form.officialUrl.trim());
      } catch {
        nextErrors.officialUrl = "Enter a valid official URL.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      slug: form.slug.trim(),
      provider: optional(form.provider),
      scopeLabel: optional(form.scopeLabel),
      flag: optional(form.flag),
      level: optional(form.level),
      field: optional(form.field),
      funding: optional(form.funding),
      image: optional(form.image),
      officialUrl: optional(form.officialUrl),
      overview: optional(form.overview),
      whoCanApply: optional(form.whoCanApply),
      eligibilityNote: optional(form.eligibilityNote),
      fundingCoverage: optional(form.fundingCoverage),
      fundingNote: optional(form.fundingNote),
      countryIds: form.countryIds,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      {submitError && (
        <div
          role="alert"
          className="rounded-xl border border-danger-border bg-soft-danger px-4 py-3 text-sm text-danger"
        >
          {submitError}
        </div>
      )}

      <AdminFormSection
        title="Scholarship identity"
        description="Core information displayed in scholarship cards and results."
      >
        <AdminInput
          id="scholarship-title"
          label="Title"
          required
          autoFocus
          value={form.title}
          error={errors.title}
          placeholder="e.g. Eiffel Excellence Scholarship"
          onChange={(event) => handleTitleChange(event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem]">
          <AdminInput
            id="scholarship-slug"
            label="Slug"
            required
            value={form.slug}
            error={errors.slug}
            hint="Used in the public scholarship URL."
            placeholder="eiffel-excellence-scholarship"
            onChange={(event) => {
              setSlugWasEdited(true);
              setField("slug", event.target.value.toLowerCase());
            }}
          />
          <AdminInput
            id="scholarship-flag"
            label="Flag"
            maxLength={10}
            value={form.flag}
            placeholder="🇫🇷"
            onChange={(event) => setField("flag", event.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            id="scholarship-provider"
            label="Provider"
            value={form.provider}
            placeholder="Campus France"
            onChange={(event) => setField("provider", event.target.value)}
          />
          <AdminInput
            id="scholarship-scope"
            label="Destination label"
            value={form.scopeLabel}
            placeholder="France"
            onChange={(event) => setField("scopeLabel", event.target.value)}
          />
        </div>
      </AdminFormSection>

      <div className="border-t border-border" />

      <AdminFormSection title="Study and funding details">
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminInput
            id="scholarship-level"
            label="Degree / level"
            value={form.level}
            placeholder="Master, PhD"
            onChange={(event) => setField("level", event.target.value)}
          />
          <AdminInput
            id="scholarship-field"
            label="Field"
            value={form.field}
            placeholder="All fields"
            onChange={(event) => setField("field", event.target.value)}
          />
          <AdminInput
            id="scholarship-funding"
            label="Funding"
            value={form.funding}
            placeholder="Fully funded"
            onChange={(event) => setField("funding", event.target.value)}
          />
        </div>
        <AdminTextarea
          id="scholarship-funding-coverage"
          label="Funding coverage"
          rows={3}
          value={form.fundingCoverage}
          placeholder="Tuition, monthly stipend, travel allowance…"
          onChange={(event) =>
            setField("fundingCoverage", event.target.value)
          }
        />
        <AdminTextarea
          id="scholarship-funding-note"
          label="Funding note"
          rows={2}
          value={form.fundingNote}
          placeholder="Any important funding conditions."
          onChange={(event) => setField("fundingNote", event.target.value)}
        />
      </AdminFormSection>

      <div className="border-t border-border" />

      <AdminFormSection
        title="Destinations"
        description="Connect this scholarship to one or more existing countries."
      >
        {countries.length > 0 ? (
          <div className="grid max-h-52 gap-2 overflow-y-auto rounded-xl border border-border bg-surface-subtle p-3 sm:grid-cols-2">
            {countries.map((country) => {
              const isChecked = form.countryIds.includes(country.id);
              return (
                <label
                  key={country.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                    isChecked
                      ? "border-soft-blue-border bg-soft-blue text-primary"
                      : "border-transparent bg-surface text-content hover:border-border-strong"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCountry(country.id)}
                    className="sr-only"
                  />
                  <span
                    className={`flex size-5 items-center justify-center rounded-md border ${
                      isChecked
                        ? "border-primary bg-primary text-white"
                        : "border-border-strong bg-surface"
                    }`}
                  >
                    {isChecked && <Check aria-hidden="true" size={13} strokeWidth={3} />}
                  </span>
                  <span aria-hidden="true">{country.flag ?? "🌍"}</span>
                  <span className="truncate font-medium">{country.name}</span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-border bg-surface-subtle p-4 text-sm text-muted">
            No countries are available to connect yet.
          </p>
        )}
      </AdminFormSection>

      <div className="border-t border-border" />

      <AdminFormSection title="Public details">
        <AdminInput
          id="scholarship-image"
          label="Image URL"
          type="url"
          value={form.image}
          placeholder="https://images.example.com/scholarship.jpg"
          onChange={(event) => setField("image", event.target.value)}
        />
        <AdminInput
          id="scholarship-official-url"
          label="Official URL"
          type="url"
          value={form.officialUrl}
          error={errors.officialUrl}
          placeholder="https://provider.example.com/scholarship"
          onChange={(event) => setField("officialUrl", event.target.value)}
        />
        <AdminTextarea
          id="scholarship-overview"
          label="Overview"
          value={form.overview}
          placeholder="Describe the scholarship and its purpose."
          onChange={(event) => setField("overview", event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminTextarea
            id="scholarship-who-can-apply"
            label="Who can apply"
            rows={3}
            value={form.whoCanApply}
            placeholder="Summarize applicant eligibility."
            onChange={(event) => setField("whoCanApply", event.target.value)}
          />
          <AdminTextarea
            id="scholarship-eligibility-note"
            label="Eligibility note"
            rows={3}
            value={form.eligibilityNote}
            placeholder="Add any important eligibility caveat."
            onChange={(event) =>
              setField("eligibilityNote", event.target.value)
            }
          />
        </div>
      </AdminFormSection>

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-content transition hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-action px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving && <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />}
          {isSaving
            ? "Saving…"
            : scholarship
              ? "Save changes"
              : "Add scholarship"}
        </button>
      </div>
    </form>
  );
}
