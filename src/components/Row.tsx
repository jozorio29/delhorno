"use client";
export default function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={
          muted ? "text-[var(--muted)]" : "text-zinc-800 dark:text-zinc-200"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "text-base font-semibold text-zinc-900 dark:text-zinc-100"
            : "text-zinc-900 dark:text-zinc-100"
        }
      >
        {value}
      </span>
    </div>
  );
}
