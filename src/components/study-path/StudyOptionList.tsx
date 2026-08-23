type Option = {
  value: string;
  title: string;
  description: string;
};

type StudyOptionListProps = {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

export default function StudyOptionList({
  title,
  options,
  selectedValue,
  onSelect,
}: StudyOptionListProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-heading">{title}</h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-soft-blue shadow-sm"
                  : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
              }`}
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-primary" : "border-slate-300"
                }`}
              >
                {isSelected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </span>

              <div className="min-w-0">
                <p className="font-semibold text-heading">{option.title}</p>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
