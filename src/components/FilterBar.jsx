import { cn } from "@/lib/utils";

export default function FilterBar({ filters, active, onChange }) {
  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Filter collections"
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          aria-pressed={active === filter.id}
          className={cn(
            "px-6 py-2 text-sm tracking-wide font-semibold transition-all duration-300 focus:outline-none",
            "rounded-full uppercase",
            "hover:scale-105 hover:shadow-lg hover:text-black",
            active === filter.id
              ? "bg-crimson text-black shadow-md"
              : "bg-white h text-zinc-700 border border-zinc-300 hover:bg-crimson hover:text-black"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}