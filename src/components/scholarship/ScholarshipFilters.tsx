type ScholarshipFiltersProps = {
  level: string;
  country: string;
  fullyFundedOnly: boolean;
  onLevelChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onFullyFundedChange: (value: boolean) => void;
  onClear: () => void;
};

const studyLevels = ["Bachelor", "Master", "PhD"];

const countries = [
  {
    value: "France",
    label: "France",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Italy",
    label: "Italy",
  },
  {
    value: "Turkey",
    label: "Turkey",
  },
  {
    value: "Netherlands",
    label: "Netherlands",
  },
  {
    value: "Multiple European Countries",
    label: "Multiple",
  },
];

export default function ScholarshipFilters({
  level,
  country,
  fullyFundedOnly,
  onLevelChange,
  onCountryChange,
  onFullyFundedChange,
  onClear,
}: ScholarshipFiltersProps) {
  function chipClass(isActive: boolean) {
    return `filter-chip ${
      isActive
        ? "border-[#3157d5] bg-[#eef3ff] text-[#3157d5]"
        : "border-[#dce5f0] bg-white text-[#344968] hover:border-[#3157d5] hover:text-[#3157d5]"
    }`;
  }

  return (
    <div className="mt-4 rounded-2xl border border-[#dce5f0] bg-white px-5 py-5">
      <div className="grid grid-cols-1 gap-7 md:grid-cols-[1fr_1fr_0.9fr]">
        {/* Study Level */}
        <div>
          <p className="filter-label">
            Study Level
          </p>

          <div className="flex flex-wrap gap-2">
            {studyLevels.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLevelChange(level === item ? "" : item)}
                className={chipClass(level === item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <p className="filter-label">
            Country
          </p>

          <div className="flex flex-wrap gap-2">
            {countries.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  onCountryChange(country === item.value ? "" : item.value)
                }
                className={chipClass(country === item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Funding */}
        <div>
          <p className="filter-label">
            Funding
          </p>

          <button
            type="button"
            onClick={() => onFullyFundedChange(!fullyFundedOnly)}
            className={chipClass(fullyFundedOnly)}
          >
            Fully Funded Only
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 text-xs font-medium text-[#8aa0c1] transition hover:text-[#3157d5]"
      >
        × Clear all
      </button>
    </div>
  );
}
