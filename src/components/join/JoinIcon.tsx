// Stroke icons shared by the join page and the join strip.

export type IconName = "check" | "arrowRight" | "arrowUp" | "arrowDown" | "plus";

export function JoinIcon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string> = {
    check: "M5 12.5l4.5 4.5L19 7.5",
    arrowRight: "M5 12h14M13 6l6 6-6 6",
    arrowUp: "M12 19V5M6 11l6-6 6 6",
    arrowDown: "M12 5v14M6 13l6 6 6-6",
    plus: "M12 5v14M5 12h14",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
