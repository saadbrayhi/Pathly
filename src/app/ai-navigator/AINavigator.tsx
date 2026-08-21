"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";

import Card from "@/app/components/shared/Card";

import NavigatorResults from "./NavigatorResults";

type ProfileField = "country" | "educationLevel" | "desiredDegree" | "field";

type StudentProfile = Record<ProfileField, string>;

const exampleQuestions = [
  "I am a second-year Computer Science student from Lebanon and want to continue my studies in Germany.",
  "I completed a Business degree and want a funded Master's program in France.",
  "I want to study Engineering in Canada and need help with documents and a student visa.",
];

const profileFields: Array<{
  id: ProfileField;
  label: string;
  placeholder: string;
}> = [
  { id: "country", label: "Current country", placeholder: "e.g. Lebanon" },
  {
    id: "educationLevel",
    label: "Education level",
    placeholder: "e.g. Bachelor student",
  },
  {
    id: "desiredDegree",
    label: "Desired degree",
    placeholder: "e.g. Master",
  },
  {
    id: "field",
    label: "Field of study",
    placeholder: "e.g. Computer Science",
  },
];

const emptyProfile: StudentProfile = {
  country: "",
  educationLevel: "",
  desiredDegree: "",
  field: "",
};

export default function AINavigator() {
  const [prompt, setPrompt] = useState("");
  const [profile, setProfile] = useState<StudentProfile>(emptyProfile);
  const [showResults, setShowResults] = useState(false);

  const updateProfile = (field: ProfileField, value: string) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setShowResults(true);
  };

  const handleReset = () => {
    setPrompt("");
    setProfile(emptyProfile);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="mt-10">
        <NavigatorResults onReset={handleReset} />
      </div>
    );
  }

  return (
    <section aria-labelledby="navigator-form-title" className="mt-10">
      <Card className="p-5 sm:p-7">
        <form onSubmit={handleSubmit}>
          <h2 id="navigator-form-title" className="text-base font-semibold text-[#0f172a]">
            Tell us your current education level and what you want to study
            abroad.
          </h2>

          <label htmlFor="study-goal" className="sr-only">
            Describe your study goal
          </label>
          <textarea
            id="study-goal"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="I am a second-year Computer Science student from Lebanon and want to continue my studies in Germany."
            rows={5}
            className="mt-3 w-full resize-y rounded-xl border border-transparent bg-[#f6f7f3] px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Try an example</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setPrompt(question)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-slate-600 transition hover:border-[#c2d3ff] hover:bg-[#eaf0ff] hover:text-[#3157d5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileFields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block text-xs font-medium text-slate-500"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="text"
                  value={profile[field.id]}
                  onChange={(event) => updateProfile(field.id, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-transparent bg-[#f6f7f3] px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!prompt.trim()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2647b8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            <Sparkles aria-hidden="true" size={17} />
            Generate My Study Path
          </button>
        </form>
      </Card>
    </section>
  );
}
