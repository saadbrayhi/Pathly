"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import {
  AdminFormSection,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/AdminFormField";
import type { Country } from "@/interfaces/country";
import type { CreateCountryPayload } from "@/services/countryApi";

type CountryFormProps = {
  country?: Country | null;
  isSaving: boolean;
  submitError?: string | null;
  onSubmit: (payload: CreateCountryPayload) => Promise<void>;
  onCancel: () => void;
};

type CountryFormState = {
  name: string;
  slug: string;
  flag: string;
  image: string;
  description: string;
  languages: string;
  languageOptions: string;
  studyLevelOptions: string;
  tuition: string;
  tuitionRange: string;
  livingCost: string;
};

type FormErrors = Partial<Record<keyof CountryFormState, string>>;

function countryToForm(country?: Country | null): CountryFormState {
  return {
    name: country?.name ?? "",
    slug: country?.slug ?? "",
    flag: country?.flag ?? "",
    image: country?.image ?? "",
    description: country?.description ?? "",
    languages: country?.languages ?? "",
    languageOptions: country?.languageOptions.join(", ") ?? "",
    studyLevelOptions: country?.studyLevelOptions.join(", ") ?? "",
    tuition: country?.tuition ?? "",
    tuitionRange: country?.tuitionRange ?? "",
    livingCost: country?.livingCost ?? "",
  };
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toStringArray(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function optional(value: string): string | null {
  return value.trim() || null;
}

export default function CountryForm({
  country,
  isSaving,
  submitError,
  onSubmit,
  onCancel,
}: CountryFormProps) {
  const [form, setForm] = useState<CountryFormState>(() =>
    countryToForm(country),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(country));

  function setField<K extends keyof CountryFormState>(
    field: K,
    value: CountryFormState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: slugWasEdited ? current.slug : toSlug(value),
    }));
    setErrors((current) => ({
      ...current,
      name: undefined,
      slug: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Country name is required.";
    if (!form.slug.trim()) {
      nextErrors.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(form.slug.trim())) {
      nextErrors.slug = "Use lowercase letters, numbers, and hyphens only.";
    }

    if (form.image.trim()) {
      try {
        new URL(form.image.trim());
      } catch {
        nextErrors.image = "Enter a valid image URL.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim(),
      flag: optional(form.flag),
      image: optional(form.image),
      description: optional(form.description),
      languages: optional(form.languages),
      languageOptions: toStringArray(form.languageOptions),
      studyLevelOptions: toStringArray(form.studyLevelOptions),
      tuition: optional(form.tuition),
      tuitionRange: optional(form.tuitionRange),
      livingCost: optional(form.livingCost),
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
        title="Country identity"
        description="Core information used across the study-abroad directory."
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem]">
          <AdminInput
            id="country-name"
            label="Country name"
            required
            autoFocus
            value={form.name}
            error={errors.name}
            placeholder="e.g. France"
            onChange={(event) => handleNameChange(event.target.value)}
          />
          <AdminInput
            id="country-flag"
            label="Flag"
            value={form.flag}
            maxLength={10}
            placeholder="🇫🇷"
            onChange={(event) => setField("flag", event.target.value)}
          />
        </div>
        <AdminInput
          id="country-slug"
          label="Slug"
          required
          value={form.slug}
          error={errors.slug}
          hint="Used in the public country URL."
          placeholder="france"
          onChange={(event) => {
            setSlugWasEdited(true);
            setField("slug", event.target.value.toLowerCase());
          }}
        />
        <AdminInput
          id="country-image"
          label="Image URL"
          type="url"
          value={form.image}
          error={errors.image}
          placeholder="https://images.example.com/france.jpg"
          onChange={(event) => setField("image", event.target.value)}
        />
        <AdminTextarea
          id="country-description"
          label="Short description"
          rows={3}
          value={form.description}
          placeholder="A concise description shown on country cards."
          onChange={(event) => setField("description", event.target.value)}
        />
      </AdminFormSection>

      <div className="border-t border-border" />

      <AdminFormSection
        title="Study information"
        description="Use comma-separated lists for filterable language and study-level options."
      >
        <AdminInput
          id="country-languages"
          label="Language summary"
          value={form.languages}
          placeholder="French, English"
          onChange={(event) => setField("languages", event.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            id="country-language-options"
            label="Language options"
            value={form.languageOptions}
            hint="Separate each language with a comma."
            placeholder="French, English"
            onChange={(event) =>
              setField("languageOptions", event.target.value)
            }
          />
          <AdminInput
            id="country-study-levels"
            label="Study levels"
            value={form.studyLevelOptions}
            hint="Separate each level with a comma."
            placeholder="Bachelor, Master, PhD"
            onChange={(event) =>
              setField("studyLevelOptions", event.target.value)
            }
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminInput
            id="country-tuition"
            label="Tuition summary"
            value={form.tuition}
            placeholder="From €2,770/year"
            onChange={(event) => setField("tuition", event.target.value)}
          />
          <AdminInput
            id="country-tuition-range"
            label="Tuition range"
            value={form.tuitionRange}
            placeholder="€2,770–€15,000"
            onChange={(event) => setField("tuitionRange", event.target.value)}
          />
          <AdminInput
            id="country-living-cost"
            label="Living cost"
            value={form.livingCost}
            placeholder="€800–€1,200/month"
            onChange={(event) => setField("livingCost", event.target.value)}
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
            : country
              ? "Save changes"
              : "Add country"}
        </button>
      </div>
    </form>
  );
}
