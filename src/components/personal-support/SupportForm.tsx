"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/Textarea";
import {
  COUNTRY_OPTIONS,
  DEGREE_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  EMPTY_SUPPORT_REQUEST,
  HELP_TYPE_OPTIONS,
  type SupportRequestValues,
} from "@/data/personalSupport";
import { submitPersonalSupportRequest } from "@/services/personalSupport";

type FormErrors = Partial<Record<keyof SupportRequestValues, string>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{7,20}$/;

function validateSupportRequest(values: SupportRequestValues) {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone or WhatsApp number.";
  }
  if (!values.currentCountry.trim()) {
    errors.currentCountry = "Enter your current country.";
  }
  if (!values.educationLevel) {
    errors.educationLevel = "Select your current education level.";
  }
  if (!values.helpType) {
    errors.helpType = "Select the type of help you need.";
  }
  if (values.description.trim().length < 20) {
    errors.description = "Describe your request using at least 20 characters.";
  }

  return errors;
}

export default function SupportForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<SupportRequestValues>(
    EMPTY_SUPPORT_REQUEST,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  function handleChange(field: keyof SupportRequestValues, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    setSubmissionStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionStatus === "submitting") return;

    const validationErrors = validateSupportRequest(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionStatus("idle");
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(
            "[aria-invalid='true'], [data-invalid='true']",
          )
          ?.focus();
      });
      return;
    }

    setErrors({});
    setSubmissionStatus("submitting");

    try {
      await submitPersonalSupportRequest(values);
      setValues(EMPTY_SUPPORT_REQUEST);
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  }

  return (
    <Card className="mt-10 p-5 sm:p-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-busy={submissionStatus === "submitting"}
        noValidate
      >
        <header>
          <h2 className="text-2xl font-bold text-heading">
            Request Personal Support
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            No payment is required now. The team will review your request and
            contact you with the service scope, timeline, and price.
          </p>
        </header>

        <div className="mt-6 grid gap-x-5 gap-y-4 md:grid-cols-2">
          <Input
            id="support-full-name"
            label="Full Name"
            autoComplete="name"
            placeholder="Your full name"
            value={values.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            error={errors.fullName}
            required
          />
          <Input
            id="support-email"
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            error={errors.email}
            required
          />
          <Input
            id="support-phone"
            label="Phone Number or WhatsApp"
            type="tel"
            autoComplete="tel"
            placeholder="+961 70 123 456"
            value={values.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            error={errors.phone}
            required
          />
          <Input
            id="support-current-country"
            label="Current Country"
            autoComplete="country-name"
            placeholder="e.g. Lebanon"
            value={values.currentCountry}
            onChange={(event) =>
              handleChange("currentCountry", event.target.value)
            }
            error={errors.currentCountry}
            required
          />
          <Select
            id="support-education-level"
            label="Current Education Level"
            placeholder="Select level"
            value={values.educationLevel}
            onChange={(event) =>
              handleChange("educationLevel", event.target.value)
            }
            options={[...EDUCATION_LEVEL_OPTIONS]}
            error={errors.educationLevel}
            required
          />
          <Select
            id="support-desired-degree"
            label="Desired Degree"
            placeholder="Select degree"
            value={values.desiredDegree}
            onChange={(event) =>
              handleChange("desiredDegree", event.target.value)
            }
            options={[...DEGREE_OPTIONS]}
          />
          <Select
            id="support-preferred-country"
            label="Preferred Country"
            placeholder="Select country"
            value={values.preferredCountry}
            onChange={(event) =>
              handleChange("preferredCountry", event.target.value)
            }
            options={[...COUNTRY_OPTIONS]}
          />
          <Input
            id="support-field"
            label="Field of Study"
            placeholder="e.g. Computer Science"
            value={values.fieldOfStudy}
            onChange={(event) =>
              handleChange("fieldOfStudy", event.target.value)
            }
          />
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-slate-700">
            Type of Help Needed <span className="text-red-500">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {HELP_TYPE_OPTIONS.map((option) => {
              const isSelected = values.helpType === option.value;

              return (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="support-help-type"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange("helpType", option.value)}
                    data-invalid={errors.helpType ? "true" : undefined}
                    aria-describedby={
                      errors.helpType ? "support-help-type-error" : undefined
                    }
                    className="peer sr-only"
                  />
                  <span
                    className={`inline-flex min-h-10 items-center rounded-xl border px-4 py-2 text-sm font-medium transition peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-100 ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-soft-blue-border hover:text-primary"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.helpType && (
            <p
              id="support-help-type-error"
              className="mt-1 text-xs text-red-600"
            >
              {errors.helpType}
            </p>
          )}
        </fieldset>

        <div className="mt-5 grid gap-x-5 gap-y-4 md:grid-cols-2">
          <Input
            id="support-target"
            label="Target University or Scholarship (if known)"
            placeholder="e.g. Sorbonne University"
            value={values.target}
            onChange={(event) => handleChange("target", event.target.value)}
          />
          <Input
            id="support-deadline"
            label="Important Deadline (if known)"
            placeholder="e.g. March 15, 2027"
            value={values.deadline}
            onChange={(event) => handleChange("deadline", event.target.value)}
          />
        </div>

        <div className="mt-5">
          <Textarea
            id="support-description"
            label="Short Description of Your Request"
            rows={5}
            value={values.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="Briefly describe what you need help with, your current situation, and any specific questions."
            error={errors.description}
            className="min-h-32"
            required
          />
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning-border bg-soft-warning p-4 text-warning">
          <AlertTriangle
            aria-hidden="true"
            size={16}
            className="mt-0.5 shrink-0"
          />
          <p className="text-xs leading-5">
            <strong className="font-semibold">
              No payment is required now.
            </strong>{" "}
            The Pathly team will first review your request, confirm the service,
            define the scope and timeline, and then share the price with you.
          </p>
        </div>

        <Button
          type="submit"
          className="mt-5 w-full gap-2"
          disabled={submissionStatus === "submitting"}
        >
          {submissionStatus === "submitting" ? (
            <LoaderCircle
              aria-hidden="true"
              size={16}
              className="animate-spin"
            />
          ) : (
            <Send aria-hidden="true" size={16} />
          )}
          {submissionStatus === "submitting"
            ? "Sending Request..."
            : "Send My Request"}
        </Button>

        {submissionStatus === "success" && (
          <div
            role="status"
            className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-soft-success p-4 text-success"
          >
            <CheckCircle2
              aria-hidden="true"
              size={17}
              className="mt-0.5 shrink-0"
            />
            <p className="text-sm leading-6">
              Your request was received. The Pathly team will review it and
              contact you before any paid work begins.
            </p>
          </div>
        )}

        {submissionStatus === "error" && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <AlertCircle
              aria-hidden="true"
              size={17}
              className="mt-0.5 shrink-0"
            />
            <p className="text-sm leading-6">
              We could not send your request. Your answers are still available,
              so you can try again.
            </p>
          </div>
        )}
      </form>
    </Card>
  );
}
