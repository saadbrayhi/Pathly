import Card from "../../components/shared/Card";

const points = [
  "Pathly does not accept applications or process documents.",
  "Pathly does not guarantee visa approval or university admission.",
  "Pathly is not affiliated with any university, scholarship provider, or embassy.",
  "Pathly does not provide legal immigration advice.",
  "Pathly requires no account, login, or payment.",
];

export default function AboutNotSection() {
  return (
    <Card className="mt-11 p-7 shadow-none">
      <h2 className="text-xl font-semibold text-[#111827]">
        What Pathly is not
      </h2>

      <ul className="mt-4 space-y-2.5">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 text-sm leading-6 text-[#43597b]"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7d4e8]" />

            <span>{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
