import Card from "@/components/shared/Card";

type HowItWorksStepProps = {
  number: string;
  title: string;
  description: string;
};

export default function HowItWorksStep({
  number,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <Card className="flex items-center gap-5 p-6 shadow-none">
      <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl border border-[#bfd0ff] bg-[#edf2ff] text-xl font-semibold text-[#3157d5]">
        {number}
      </div>

      <div>
        <h2 className="text-base font-semibold text-[#111827]">{title}</h2>

        <p className="mt-1.5 text-sm leading-6 text-[#536b91]">{description}</p>
      </div>
    </Card>
  );
}
