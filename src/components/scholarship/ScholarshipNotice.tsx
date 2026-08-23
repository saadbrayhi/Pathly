import Card from "@/components/shared/Card";

export default function ScholarshipNotice() {
  return (
    <Card className="mt-8 border-[#bfd0ff] bg-[#eef3ff] px-5 py-4 shadow-none">
      <p className="text-sm leading-6 text-[#43597b]">
        <span className="font-semibold text-[#3157d5]">
          You may match criteria — confirm on the official page.
        </span>{" "}
        Pathly connects you to official scholarship providers. Final eligibility
        is determined by the provider, not by Pathly.
      </p>
    </Card>
  );
}
