"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  educationOptions,
  degreeOptions,
  fieldOptions,
  destinationOptions,
} from "@/constant/constant";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Container from "../shared/Container";
import StudyOptionList from "./StudyOptionList";

type StudyPathForm = {
  educationLevel: string;
  desiredDegree: string;
  field: string;
  destination: string;
};

const initialForm: StudyPathForm = {
  educationLevel: "",
  desiredDegree: "",
  field: "",
  destination: "",
};

export default function StudyPathFinder() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState<StudyPathForm>(initialForm);

  const currentValue =
    step === 1
      ? form.educationLevel
      : step === 2
        ? form.desiredDegree
        : step === 3
          ? form.field
          : form.destination;

  const canContinue = Boolean(currentValue);

  function updateField(field: keyof StudyPathForm, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleNext() {
    if (step < 4) {
      setStep((prev) => prev + 1);
      return;
    }
    const params = new URLSearchParams({
      education: form.educationLevel,
      degree: form.desiredDegree,
      field: form.field,
      destination: form.destination,
    });

    router.push(`/find-my-path/result?${params.toString()}`);
  }

  function handleBack() {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }

  function handleReset() {
    setStep(1);
    setForm(initialForm);
  }

  return (
    <main className="min-h-screen bg-warm-surface py-10">
      <Container>
        <div className="mx-auto max-w-180">
          {" "}
          <div className="mb-8">
            <p className="mb-6 text-sm text-slate-500">
              Home <span className="mx-2">›</span>
              <span className="font-medium text-slate-700">
                Study Path Finder
              </span>
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              Study Path Finder
            </h1>

            <p className="mt-2 text-slate-500">
              Answer four questions to get your personalized study-abroad path.
            </p>
          </div>
          {/* PROGRESS */}
          <div className="mb-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-500">Step {step} of 4</span>

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-slate-400 transition hover:text-primary"
                >
                  ↻ Start over
                </button>
              )}
            </div>

            <div className="relative">
              <div className="h-1 rounded-full bg-slate-200">
                <div
                  className="h-1 rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between">
                {[1, 2, 3, 4].map((item) => {
                  const completed = item < step;
                  const active = item === step;

                  return (
                    <div
                      key={item}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium ${
                          completed
                            ? "border-primary bg-primary text-white"
                            : active
                              ? "border-primary bg-white text-primary"
                              : "border-slate-200 bg-white text-slate-400"
                        }`}
                      >
                        {completed ? "✓" : item}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Card className="p-7 shadow-sm md:p-8">
            {step === 1 && (
              <StudyOptionList
                title="Where are you in your studies now?"
                options={educationOptions}
                selectedValue={form.educationLevel}
                onSelect={(value) => updateField("educationLevel", value)}
              />
            )}

            {step === 2 && (
              <StudyOptionList
                title="What would you like to study abroad?"
                options={degreeOptions}
                selectedValue={form.desiredDegree}
                onSelect={(value) => updateField("desiredDegree", value)}
              />
            )}

            {step === 3 && (
              <StudyOptionList
                title="Which field are you interested in?"
                options={fieldOptions}
                selectedValue={form.field}
                onSelect={(value) => updateField("field", value)}
              />
            )}

            {step === 4 && (
              <StudyOptionList
                title="Where would you like to study?"
                options={destinationOptions}
                selectedValue={form.destination}
                onSelect={(value) => updateField("destination", value)}
              />
            )}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={step === 1}
                className="min-w-22,5 px-5 py-3"
              >
                ← Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canContinue}
                className="min-w-27,5 px-5 py-3"
              >
                {step === 4 ? "See My Path" : "Next →"}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
