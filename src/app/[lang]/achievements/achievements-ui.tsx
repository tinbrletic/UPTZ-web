"use client";

// UPTZ Achievements — design-system primitives.
// Ported from the imported Claude Design project to typed TSX. Components bind
// to the --uptz-* custom properties declared in globals.css.

import { CSSProperties, ReactNode, useEffect, useState } from "react";

/* ---------- RESPONSIVE HOOK ---------- */
// Mirrors the homepage pattern: default to desktop on the server + first client
// render (no hydration mismatch), then refine on mount via matchMedia.
export function useBreakpoint() {
  const [bp, setBp] = useState({ isNarrow: false, isMobile: false });

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 900px)");
    const mobile = window.matchMedia("(max-width: 600px)");
    const update = () =>
      setBp({ isNarrow: narrow.matches, isMobile: mobile.matches });
    update();
    narrow.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      narrow.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return bp;
}

/* ---------- ICONS ---------- */
const ICONS: Record<string, string> = {
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  "map-pin":
    '<path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  trophy:
    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
};

export type IconName = keyof typeof ICONS | string;

export function Icon({
  name,
  size = 18,
  stroke = 2,
  color = "currentColor",
  style,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle", ...style }}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
      aria-hidden="true"
    />
  );
}

/* ---------- TYPOGRAPHY ---------- */
export function Eyebrow({
  children,
  color = "var(--uptz-primary)",
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--uptz-font-sans)",
        fontWeight: "var(--uptz-weight-medium)" as unknown as number,
        fontSize: "var(--uptz-text-xs)",
        letterSpacing: "var(--uptz-track-wide)",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Heading({
  level = 2,
  children,
  light,
  style,
}: {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  light?: boolean;
  style?: CSSProperties;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const sizes = {
    1: { fontSize: "var(--uptz-text-hero)", weight: "var(--uptz-weight-bold)", lh: "var(--uptz-lh-tight)", track: "var(--uptz-track-tight)" },
    2: { fontSize: "var(--uptz-text-4xl)", weight: "var(--uptz-weight-bold)", lh: "var(--uptz-lh-tight)", track: "var(--uptz-track-tight)" },
    3: { fontSize: "var(--uptz-text-2xl)", weight: "var(--uptz-weight-semibold)", lh: "var(--uptz-lh-snug)", track: "var(--uptz-track-normal)" },
    4: { fontSize: "var(--uptz-text-lg)", weight: "var(--uptz-weight-semibold)", lh: "var(--uptz-lh-snug)", track: "var(--uptz-track-normal)" },
  }[level];
  return (
    <Tag
      style={{
        fontFamily: "var(--uptz-font-sans)",
        fontWeight: sizes.weight as unknown as number,
        fontSize: sizes.fontSize,
        lineHeight: sizes.lh,
        letterSpacing: sizes.track,
        color: light ? "var(--uptz-fg-on-dark)" : "var(--uptz-fg)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------- CTA / BUTTON ---------- */
type CTAKind = "primary" | "ghost" | "onDark" | "onDarkGhost";

export function CTA({
  children,
  icon,
  kind = "primary",
  size = "md",
  href = "#",
  onClick,
  style,
}: {
  children: ReactNode;
  icon?: IconName;
  kind?: CTAKind;
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const pad = size === "sm" ? "8px 16px" : "12px 24px";
  const sizes = {
    sm: { padding: pad, fontSize: "var(--uptz-text-xs)" },
    md: { padding: pad, fontSize: "var(--uptz-text-sm)" },
    lg: { padding: "16px 32px", fontSize: "var(--uptz-text-base)" },
  }[size];

  const kinds: Record<CTAKind, CSSProperties> = {
    primary: {
      background: hover ? "var(--uptz-primary-hover)" : "var(--uptz-primary)",
      color: "var(--uptz-fg-on-dark)",
      boxShadow: hover ? "var(--uptz-shadow-lg)" : "none",
    },
    ghost: {
      background: hover ? "rgba(37,99,235,0.10)" : "transparent",
      color: "var(--uptz-primary)",
      border: "1px solid var(--uptz-marine-200)",
    },
    onDark: {
      background: hover ? "#fff" : "rgba(255,255,255,0.95)",
      color: "var(--uptz-primary-deep)",
      boxShadow: hover ? "var(--uptz-shadow-lg)" : "none",
    },
    onDarkGhost: {
      background: hover ? "rgba(255,255,255,0.12)" : "transparent",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.35)",
    },
  };

  const shared: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--uptz-space-2)",
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    fontFamily: "var(--uptz-font-sans)",
    fontWeight: "var(--uptz-weight-medium)" as unknown as number,
    borderRadius: "var(--uptz-radius-pill)",
    textDecoration: "none",
    transition:
      "background var(--uptz-dur-base) var(--uptz-ease), box-shadow var(--uptz-dur-base) var(--uptz-ease), transform var(--uptz-dur-base) var(--uptz-ease)",
    transform: hover ? "scale(1.04)" : "scale(1)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    ...kinds[kind],
    ...style,
  };

  const inner = (
    <>
      {children}
      {icon ? (
        <Icon
          name={icon}
          size={14}
          style={{
            transition: "transform var(--uptz-dur-base) var(--uptz-ease)",
            transform: hover ? "translateX(4px)" : "translateX(0)",
          }}
        />
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={shared}
      >
        {inner}
      </button>
    );
  }
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={shared}
    >
      {inner}
    </a>
  );
}

/* ---------- STATUS CHIP ---------- */
type ChipTone = "default" | "success" | "warning" | "pioneer" | "onDark";

export function Chip({
  tone = "default",
  pulse,
  children,
}: {
  tone?: ChipTone;
  pulse?: boolean;
  children: ReactNode;
}) {
  const palette: Record<ChipTone, { bg: string; fg: string; dot: string }> = {
    default: { bg: "var(--uptz-marine-50)", fg: "var(--uptz-primary)", dot: "var(--uptz-primary)" },
    success: { bg: "#dcfce7", fg: "#166534", dot: "#16a34a" },
    warning: { bg: "#fef3c7", fg: "#854d0e", dot: "#ca8a04" },
    pioneer: { bg: "#fae8ff", fg: "#86198f", dot: "#a21caf" },
    onDark: { bg: "rgba(255,255,255,0.12)", fg: "#fff", dot: "var(--uptz-marine-300)" },
  };
  const p = palette[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--uptz-space-2)",
        background: p.bg,
        color: p.fg,
        padding: "6px 12px",
        borderRadius: "var(--uptz-radius-pill)",
        fontFamily: "var(--uptz-font-sans)",
        fontSize: "var(--uptz-text-xs)",
        fontWeight: "var(--uptz-weight-medium)" as unknown as number,
        letterSpacing: "var(--uptz-track-wide)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="uptz-chip-dot"
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: p.dot,
          color: p.dot,
          boxShadow: pulse ? `0 0 0 0 ${p.dot}` : "none",
          animation: pulse ? "uptzpulse 2s var(--uptz-ease-out) infinite" : "none",
        }}
      />
      {children}
    </span>
  );
}

/* ---------- EVENT PHASE ---------- */
export type EventPhase = "upcoming" | "live" | "done";

/**
 * Where we are relative to an event. Returns null until mounted, so the server
 * render and the first client render agree (same gate as Countdown).
 */
export function useEventPhase(startIso: string, endIso: string): EventPhase | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  if (now < new Date(startIso).getTime()) return "upcoming";
  if (now < new Date(endIso).getTime()) return "live";
  return "done";
}

/* ---------- LIVE COUNTDOWN ---------- */
export function Countdown({
  targetIso,
  light = false,
  compact = false,
  labels,
}: {
  targetIso: string;
  light?: boolean;
  compact?: boolean;
  labels: { days: string; hours: string; min: string; sec: string };
}) {
  // mounted-gate avoids a server/client hydration mismatch on the ticking values.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  let d = "--";
  let h = "--";
  let m = "--";
  let s = "--";
  if (now !== null) {
    const diff = Math.max(0, new Date(targetIso).getTime() - now);
    d = pad(Math.floor(diff / 86400000));
    h = pad(Math.floor((diff % 86400000) / 3600000));
    m = pad(Math.floor((diff % 3600000) / 60000));
    s = pad(Math.floor((diff % 60000) / 1000));
  }

  const valColor = light ? "var(--uptz-fg-on-dark)" : "var(--uptz-ink)";
  const lblColor = light ? "rgba(255,255,255,0.65)" : "var(--uptz-text-2)";

  const Cell = ({ v, label }: { v: string; label: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div
        style={{
          fontFamily: "var(--uptz-font-sans)",
          fontWeight: "var(--uptz-weight-bold)" as unknown as number,
          fontSize: compact ? "var(--uptz-text-3xl)" : "var(--uptz-text-5xl)",
          lineHeight: 1,
          color: valColor,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "var(--uptz-track-tight)",
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontFamily: "var(--uptz-font-sans)",
          fontSize: "var(--uptz-text-xs)",
          fontWeight: "var(--uptz-weight-medium)" as unknown as number,
          letterSpacing: "var(--uptz-track-wide)",
          textTransform: "uppercase",
          color: lblColor,
          marginTop: compact ? 6 : 10,
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div style={{ display: "inline-flex", alignItems: "flex-start", gap: compact ? 18 : 36 }}>
      <Cell v={d} label={labels.days} />
      <Cell v={h} label={labels.hours} />
      <Cell v={m} label={labels.min} />
      <Cell v={s} label={labels.sec} />
    </div>
  );
}

/* ---------- BIG STAT NUMBER ---------- */
export function StatBlock({
  value,
  unit,
  label,
  light = false,
}: {
  value: ReactNode;
  unit?: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--uptz-font-sans)",
            fontWeight: "var(--uptz-weight-bold)" as unknown as number,
            fontSize: "var(--uptz-text-5xl)",
            color: light ? "var(--uptz-fg-on-dark)" : "var(--uptz-ink)",
            lineHeight: 1,
            letterSpacing: "var(--uptz-track-tight)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
        {unit ? (
          <span
            style={{
              fontFamily: "var(--uptz-font-sans)",
              fontWeight: "var(--uptz-weight-medium)" as unknown as number,
              fontSize: "var(--uptz-text-base)",
              color: light ? "rgba(255,255,255,0.75)" : "var(--uptz-text-2)",
              letterSpacing: "var(--uptz-track-wide)",
              textTransform: "uppercase",
            }}
          >
            {unit}
          </span>
        ) : null}
      </div>
      <div
        style={{
          fontFamily: "var(--uptz-font-sans)",
          fontSize: "var(--uptz-text-xs)",
          fontWeight: "var(--uptz-weight-medium)" as unknown as number,
          letterSpacing: "var(--uptz-track-wide)",
          textTransform: "uppercase",
          color: light ? "rgba(255,255,255,0.65)" : "var(--uptz-text-2)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ---------- SECTION HEADING (blue-underline accent) ---------- */
export function SectionHead({
  eyebrow,
  title,
  lead,
  light,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--uptz-space-4)",
        maxWidth: align === "center" ? 720 : 900,
        margin: align === "center" ? "0 auto" : 0,
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      {eyebrow ? (
        <Eyebrow color={light ? "var(--uptz-marine-300)" : "var(--uptz-primary)"}>{eyebrow}</Eyebrow>
      ) : null}
      <Heading
        level={2}
        light={light}
        style={{
          borderBottom: "3px solid var(--uptz-primary)",
          paddingBottom: "var(--uptz-space-2)",
          display: "inline-block",
          alignSelf: align === "center" ? "center" : "flex-start",
        }}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          style={{
            fontFamily: "var(--uptz-font-sans)",
            fontSize: "var(--uptz-text-lg)",
            lineHeight: "var(--uptz-lh-relaxed)",
            color: light ? "rgba(255,255,255,0.80)" : "var(--uptz-text-2)",
            margin: 0,
          }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
