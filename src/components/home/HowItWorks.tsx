import Button from "../shared/Button";

const steps = [
  {
    number: "01",
    title: "Tell us your current level",
    description:
      "Share where you are in your studies and what you want to achieve abroad.",
  },
  {
    number: "02",
    title: "Choose your goal and destination",
    description:
      "Select your target degree, field of study, and preferred country.",
  },
  {
    number: "03",
    title: "Review your complete study path",
    description:
      "Receive a clear, step-by-step guide covering every stage of the journey.",
  },
  {
    number: "04",
    title: "Verify through official sources",
    description:
      "Every requirement links back to official university, embassy, and government pages.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-spacing bg-white">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 section-heading">
            How Pathly works
          </h2>

          <p className="section-description mx-auto max-w-md">
            Four clear steps from your current situation to a verified
            study-abroad plan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="absolute top-8 z-0 hidden h-px border-t-2 border-dashed border-slate-200 lg:block"
                  style={{
                    width: "calc(100% - 4rem)",
                    left: "3.5rem",
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-soft-blue-border bg-soft-blue">
                  <span className="text-lg font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-2 font-bold text-heading">{step.title}</h3>

                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/find-my-path" className="gap-2 px-7 py-3.5 shadow-sm">
            Start Your Study Path
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
