"use client";

import { useState } from "react";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";
import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

type FormValues = {
  name: string;
  email: string;
  destination: string;
  level: string;
};
const emptyForm: FormValues = {
  name: "",
  email: "",
  destination: "",
  level: "",
};
export default function SupportForm() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(values);

    setSubmitted(true);
    setValues(emptyForm);
  }
  return (
    <Card className="mx-auto max-w-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Request Study Guidance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tell us a little about your study goal.
          </p>
        </div>

        <Input
          label="Full name"
          placeholder="Saad Brayhi"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="saad@example.com"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          required
        />

        <Select
          label="Destination"
          value={values.destination}
          onChange={(event) => handleChange("destination", event.target.value)}
          options={[
            { label: "France", value: "france" },
            { label: "Germany", value: "germany" },
            { label: "Italy", value: "italy" },
            { label: "Canada", value: "canada" },
          ]}
        />

        <Select
          label="Study level"
          value={values.level}
          onChange={(event) => handleChange("level", event.target.value)}
          options={[
            { label: "Bachelor", value: "bachelor" },
            { label: "Master", value: "master" },
            { label: "PhD", value: "phd" },
          ]}
        />

        <Button type="submit">Submit request</Button>

        {submitted && (
          <p className="text-sm font-medium text-emerald-600">
            Request submitted successfully.
          </p>
        )}
      </form>
    </Card>
  );
}
