interface Option {
  value: string;
  label: string;
  sub: string;
}

interface MultiSectionProps {
  title: string;
  options: Option[];
  selected: string[];
  onToggle: (val: string) => void;
}

export function MultiSection({ title, options, selected, onToggle }: MultiSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">{title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={[
                "rounded-lg border p-3 text-left transition-all",
                "hover:border-violet-400 hover:bg-violet-50",
                isSelected
                  ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
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
