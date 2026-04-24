"use client";

import { Check } from "lucide-react";

/**
 * CountryChip — a single selectable chip in the target-markets picker.
 *
 * The chip's mount/unmount animation (mb-chip-entering / mb-chip-leaving) is
 * driven by globals.css keyframes; the parent controls whether a chip is
 * visible at all via conditional rendering (origin country is removed from
 * the list entirely rather than disabled).
 *
 * Note: `label` comes from COUNTRY_LABELS which already includes the flag
 * emoji (e.g. "🇺🇸 United States"), so we don't render a separate flag here.
 */
interface CountryChipProps {
  code: string;
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function CountryChip({
  label,
  selected,
  disabled = false,
  onClick,
}: CountryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={
        "group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-2.5 text-[13.5px] font-medium transition-all duration-200 select-none " +
        (selected
          ? "border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-100"
          : "border-border bg-background text-foreground hover:border-border/80 hover:bg-muted/60 hover:-translate-y-px") +
        (disabled ? " opacity-50 cursor-not-allowed" : " cursor-pointer")
      }
    >
      <span
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent transition-opacity duration-300 " +
          (selected ? "opacity-100" : "opacity-0")
        }
      />

      <span className="relative z-10 flex-1 text-left">{label}</span>
      <Check
        className={
          "relative z-10 h-4 w-4 shrink-0 text-blue-600 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] " +
          (selected
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 -rotate-45")
        }
      />
    </button>
  );
}
