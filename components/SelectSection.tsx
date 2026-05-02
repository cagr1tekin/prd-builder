interface Option {
  value: string;
  label: string;
  sub: string;
}

interface SelectSectionProps {
  title: string;
  options: Option[];
  selected: string | null;
  onSelect: (val: string) => void;
}

export function SelectSection({ title, options, selected, onSelect }: SelectSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">{title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={[
                "rounded-lg border p-3 text-left transition-all",
                "hover:border-teal-400 hover:bg-teal-50",
                isSelected
                  ? "border-teal-500 bg-teal-50 ring-1 ring-teal-500"
                  : "border-zinc-200 bg-white",
              ].join(" ")}
            >
              <p className="text-sm font-medium text-zinc-900">{opt.label}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{opt.sub}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
