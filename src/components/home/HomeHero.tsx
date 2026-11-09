"use client";

// The home hero: Karolina finds her own way around a buoy course; scrolling
// closes in on her parts and who builds them. The WebGL scene lives in
// ./karolinaRun and loads after first paint; until then (and for reduced
// motion or no WebGL) the page shows still renders of the same scene.

import { useTranslation } from "@/hooks/useTranslation";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FrameInfo, Framing, KarolinaRun, PartId } from "./karolinaRun";

const MAX_DETECTIONS = 6;
const PARTS: { id: PartId; team: string }[] = [
  { id: "sensors", team: "development" },
  { id: "hulls", team: "engineering" },
  { id: "motors", team: "engineering" },
];

/** Where each label card wants to sit relative to its anchor (px) and which of its corners meets the leader line. */
const LABEL_OFFSET: Record<PartId, { dx: number; dy: number; align: "tl" | "tr" | "bl" | "br" }> = {
  sensors: { dx: -60, dy: -90, align: "br" },
  hulls: { dx: 70, dy: 60, align: "tl" },
  motors: { dx: -80, dy: 70, align: "tr" },
};
/** Navy scrim behind the hero text, so it stays legible whatever the scene puts behind it. */
const SCRIM =
  "bg-[linear-gradient(0deg,rgb(34_41_68/0.95)_0%,rgb(34_41_68/0.8)_42%,rgb(34_41_68/0)_64%)] md:bg-[linear-gradient(90deg,rgb(34_41_68/0.95)_0%,rgb(34_41_68/0.82)_36%,rgb(34_41_68/0)_60%)]";
/** Keep label cards clear of the navbar and the viewport edges. */
const SAFE = { top: 96, side: 16, bottom: 16 };

const FRAMING_WIDE: Framing = { run: { x: 0.68, y: 0.3 }, parts: { x: 0.66, y: 0.55 } };
const FRAMING_NARROW: Framing = { run: { x: 0.5, y: 0.2 }, parts: { x: 0.5, y: 0.42 } };
/** Course clock (s) the live run starts at: the same frames the posters in /public/home were rendered at, each with a buoy in the camera's view. */
const START_WIDE = 7.5;
const START_NARROW = 8;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type LabelEls = { dot: HTMLSpanElement | null; line: SVGLineElement | null; card: HTMLDivElement | null };

export type HomeHeroProps = {
  resultLine: string;
  resultHref: string;
  onJoin: () => void;
  onChooseTeam: (team: string) => void;
};

export default function HomeHero({ resultLine, resultHref, onJoin, onChooseTeam }: HomeHeroProps) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "live" | "still">("pending");
  const [ready, setReady] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runTextRef = useRef<HTMLDivElement>(null);
  const partsTextRef = useRef<HTMLDivElement>(null);
  const labelLayerRef = useRef<HTMLDivElement>(null);
  const detectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detectLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelEls = useRef<Record<PartId, LabelEls>>({
    sensors: { dot: null, line: null, card: null },
    hulls: { dot: null, line: null, card: null },
    motors: { dot: null, line: null, card: null },
  });
  const markerRefs = useRef<Partial<Record<PartId, HTMLSpanElement | null>>>({});
  const progressRef = useRef(0);
  // The scene effect must not re-run when t() changes identity on re-render; read the label through a ref.
  const buoyLabel = useRef("");
  buoyLabel.current = t("home.hero.buoy");

  useEffect(() => {
    if (reduceMotion === null) return;
    setMode(reduceMotion || !hasWebGL() ? "still" : "live");
  }, [reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (mode !== "live") return;
    const canvas = canvasRef.current, section = sectionRef.current;
    if (!canvas || !section) return;
    let run: KarolinaRun | null = null;
    let cancelled = false;
    let visible = true;
    const isNarrow = () => window.matchMedia("(max-width: 767px)").matches;

    const onFrame = (info: FrameInfo) => {
      const p = progressRef.current;
      const W = canvas.clientWidth, H = canvas.clientHeight;

      // Camera detections fade out as the view closes in
      const detectOpacity = 1 - smooth(0.06, 0.24, p);
      for (let i = 0; i < MAX_DETECTIONS; i++) {
        const el = detectRefs.current[i];
        const d = info.detections[i];
        if (!el) continue;
        if (!d || detectOpacity <= 0.01) {
          el.style.opacity = "0";
          continue;
        }
        const s = Math.round(d.size);
        el.style.opacity = String(detectOpacity);
        el.style.width = `${s}px`;
        el.style.height = `${s}px`;
        el.style.transform = `translate3d(${Math.round(d.x - s / 2)}px, ${Math.round(d.y - s / 2)}px, 0)`;
        const label = detectLabelRefs.current[i];
        if (label) label.textContent = `${buoyLabel.current} · ${Math.round(d.distance)} m`;
      }

      // Part labels fade in once the view has closed in
      const labelOpacity = smooth(0.62, 0.8, p);
      if (labelLayerRef.current) {
        labelLayerRef.current.style.opacity = String(labelOpacity);
        labelLayerRef.current.style.visibility = labelOpacity > 0.01 ? "visible" : "hidden";
      }
      if (labelOpacity <= 0.01) return;
      PARTS.forEach(({ id }) => {
        const a = info.parts[id];
        const marker = markerRefs.current[id];
        if (marker) {
          marker.style.opacity = a.visible ? "1" : "0";
          marker.style.transform = `translate3d(${Math.round(a.x)}px, ${Math.round(a.y)}px, 0)`;
        }
        const els = labelEls.current[id];
        if (!els.card || !els.dot || !els.line) return;
        const show = a.visible ? "1" : "0";
        els.dot.style.opacity = show;
        els.card.style.opacity = show;
        els.line.style.opacity = show;
        const o = LABEL_OFFSET[id];
        const w = els.card.offsetWidth, h = els.card.offsetHeight;
        let left = a.x + o.dx - (o.align === "tr" || o.align === "br" ? w : 0);
        let top = a.y + o.dy - (o.align === "bl" || o.align === "br" ? h : 0);
        left = Math.min(Math.max(left, SAFE.side), W - SAFE.side - w);
        top = Math.min(Math.max(top, SAFE.top), H - SAFE.bottom - h);
        els.card.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
        els.dot.style.transform = `translate3d(${Math.round(a.x)}px, ${Math.round(a.y)}px, 0)`;
        // the leader meets the card at its nearest edge point
        const ex = Math.min(Math.max(a.x, left), left + w), ey = Math.min(Math.max(a.y, top), top + h);
        els.line.setAttribute("x1", String(Math.round(a.x)));
        els.line.setAttribute("y1", String(Math.round(a.y)));
        els.line.setAttribute("x2", String(Math.round(ex)));
        els.line.setAttribute("y2", String(Math.round(ey)));
      });
    };

    const applyProgress = () => {
      const rect = section.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / span));
      progressRef.current = p;
      run?.setProgress(p);
      const a = 1 - smooth(0.08, 0.3, p);
      if (runTextRef.current) {
        runTextRef.current.style.opacity = String(a);
        runTextRef.current.style.transform = `translateY(${(-24 * (1 - a)).toFixed(1)}px)`;
        runTextRef.current.style.visibility = a < 0.01 ? "hidden" : "visible";
      }
      const b = smooth(0.5, 0.7, p);
      if (partsTextRef.current) {
        partsTextRef.current.style.opacity = String(b);
        partsTextRef.current.style.transform = `translateY(${(24 * (1 - b)).toFixed(1)}px)`;
        partsTextRef.current.style.visibility = b < 0.01 ? "hidden" : "visible";
      }
    };

    let scrollQueued = false;
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        applyProgress();
      });
    };
    const onResize = () => {
      run?.setFraming(isNarrow() ? FRAMING_NARROW : FRAMING_WIDE);
      run?.resize();
      applyProgress();
    };
    const syncRunning = () => run?.setRunning(visible && document.visibilityState === "visible");

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncRunning();
    });
    io.observe(section);

    // Load three.js after the poster has painted.
    const start = () =>
      import("./karolinaRun").then(({ createKarolinaRun }) => {
        if (cancelled) return;
        run = createKarolinaRun({
          canvas,
          modelUrl: "/models/karolina.glb",
          framing: isNarrow() ? FRAMING_NARROW : FRAMING_WIDE,
          startAt: isNarrow() ? START_NARROW : START_WIDE,
          onFrame,
          onReady: () => setReady(true),
        });
        // Development only: lets scripts render exact frames for the still images in /public/home.
        if (process.env.NODE_ENV !== "production") (window as Window & { __karolinaRun?: KarolinaRun }).__karolinaRun = run;
        applyProgress();
        syncRunning();
      });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const handle = idle ? idle(start, { timeout: 1200 }) : window.setTimeout(start, 300);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", syncRunning);
    applyProgress();
    return () => {
      cancelled = true;
      if (!idle) window.clearTimeout(handle as number);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", syncRunning);
      io.disconnect();
      run?.dispose();
    };
  }, [mode]);

  const scrollToParts = () => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const span = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * 0.82, behavior: "smooth" });
  };

  const join = (e: React.MouseEvent) => {
    e.preventDefault();
    onJoin();
  };

  const arrow = (d: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <path d={d} />
    </svg>
  );

  const runText = (
    <>
      <h1 id="home-title" className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {t("home.hero.title")}
      </h1>
      <p className="mt-4 max-w-xl text-base text-white/85 text-pretty sm:text-lg md:text-xl">{t("home.hero.subtitle")}</p>
      <a
        href={resultHref}
        className="mt-5 inline-flex max-w-full items-start gap-2 text-sm font-semibold text-blue-200 underline decoration-blue-200/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white sm:items-center sm:text-base"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0">
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 6h3a3 3 0 0 1-3 3M7 6H4a3 3 0 0 0 3 3" />
        </svg>
        <span className="text-pretty">{resultLine}</span>
      </a>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a href="#join" onClick={join} className="inline-flex h-12 items-center gap-2 rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-500">
          {t("home.hero.join")}
          {arrow("M5 12h14M13 6l6 6-6 6")}
        </a>
        {mode !== "still" && (
          <button
            type="button"
            onClick={scrollToParts}
            className="inline-flex h-12 items-center gap-1.5 rounded-full px-3 font-medium text-white/80 transition-colors hover:text-white"
          >
            {t("home.hero.seeParts")}
            {arrow("M12 5v14M6 13l6 6 6-6")}
          </button>
        )}
      </div>
    </>
  );

  const teamLink = (team: string, decorative = false) => (
    <button
      type="button"
      tabIndex={decorative ? -1 : undefined}
      onClick={() => onChooseTeam(team)}
      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-200 underline decoration-blue-200/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
    >
      {t("home.parts.joinTeam", { team: t(`join.divisions.${team}.title`) })}
    </button>
  );

  /** A floating label card: a visual copy of the parts list, hidden from assistive tech and the tab order. */
  const partCard = (id: PartId, team: string) => (
    <div aria-hidden="true" className="w-64 rounded-2xl border border-white/15 bg-gray-950/85 p-4 text-left shadow-xl shadow-black/30">
      <p className="font-semibold text-white">{t(`home.parts.${id}.title`)}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/80 text-pretty">{t(`home.parts.${id}.body`)}</p>
      {teamLink(team, true)}
    </div>
  );

  /** The parts as a plain numbered list: phones, reduced motion and no WebGL. */
  const partsList = (
    <ol className="grid gap-6 sm:grid-cols-3">
      {PARTS.map(({ id, team }, i) => (
        <li key={id} className="flex items-start gap-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white bg-blue-600 text-sm font-bold" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-white">{t(`home.parts.${id}.title`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80 text-pretty">{t(`home.parts.${id}.body`)}</p>
            {teamLink(team)}
          </div>
        </li>
      ))}
    </ol>
  );

  const partsHeading = (
    <>
      <h2 id="home-parts-title" className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {t("home.parts.title")}
      </h2>
      <p className="mt-3 max-w-md text-base text-white/85 text-pretty sm:mt-4 sm:text-lg">{t("home.parts.lead")}</p>
    </>
  );

  const caption = <p className="text-xs leading-snug text-white/60 text-pretty">{t("home.hero.caption")}</p>;

  // Reduced motion or no WebGL: two still renders of the same scene, in normal flow.
  if (mode === "still") {
    return (
      <>
        <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-[#222944] text-white">
          <picture>
            <source media="(max-width: 767px)" srcSet="/home/karolina-run-narrow.webp" />
            <img src="/home/karolina-run.webp" alt={t("home.hero.stillAlt")} className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
          </picture>
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${SCRIM}`} />
          <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:pb-20">
            <div className="max-w-2xl">{runText}</div>
            <div className="mt-8 max-w-md">{caption}</div>
          </div>
        </section>
        <section aria-labelledby="home-parts-title" className="bg-[#222944] text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            {partsHeading}
            {/* eslint-disable-next-line @next/next/no-img-element -- static render of the WebGL scene */}
            <img src="/home/karolina-parts.webp" alt={t("home.parts.stillAlt")} className="mt-10 w-full rounded-3xl" loading="lazy" />
            <div className="mt-10">{partsList}</div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section ref={sectionRef} aria-labelledby="home-title" className="relative h-[290svh] bg-[#222944] text-white">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Still render of the first frame: the LCP image, replaced by the live scene once it draws */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/home/karolina-run-narrow.webp" />
            <img
              src="/home/karolina-run.webp"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
            />
          </picture>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />

          {/* Keeps the text legible whatever the scene puts behind it */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${SCRIM}`}
          />

          {/* Camera detections */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {Array.from({ length: MAX_DETECTIONS }, (_, i) => (
              <div
                key={i}
                ref={(el) => {
                  detectRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 opacity-0"
              >
                <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />
                <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />
                <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />
                <span
                  ref={(el) => {
                    detectLabelRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide text-white"
                />
              </div>
            ))}
          </div>

          {/* Part labels, anchored to the model */}
          <div ref={labelLayerRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
            {narrow ? (
              PARTS.map(({ id }, i) => (
                <span
                  key={id}
                  ref={(el) => {
                    markerRefs.current[id] = el;
                  }}
                  aria-hidden="true"
                  className="absolute -left-3 -top-3 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-blue-600 text-xs font-bold"
                >
                  {i + 1}
                </span>
              ))
            ) : (
              <>
                <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                  {PARTS.map(({ id }) => (
                    <line
                      key={id}
                      ref={(el) => {
                        labelEls.current[id].line = el;
                      }}
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>
                {PARTS.map(({ id, team }) => (
                  <div key={id}>
                    <span
                      ref={(el) => {
                        labelEls.current[id].dot = el;
                      }}
                      aria-hidden="true"
                      className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-600"
                    />
                    <div
                      ref={(el) => {
                        labelEls.current[id].card = el;
                      }}
                      className="pointer-events-auto absolute left-0 top-0"
                    >
                      {partCard(id, team)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Run text */}
          <div ref={runTextRef} className="pointer-events-none absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10 sm:px-8 md:pb-16 lg:pb-20">
              <div className="pointer-events-auto max-w-2xl">{runText}</div>
              <div className="pointer-events-auto mt-6 max-w-sm md:absolute md:bottom-8 md:right-8 md:mt-0 md:text-right">{caption}</div>
            </div>
          </div>

          {/* Parts text */}
          <div ref={partsTextRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10 sm:px-8 md:justify-center md:pb-0">
              <div aria-hidden="true" className="max-w-md">
                <p className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">{t("home.parts.title")}</p>
                <p className="mt-3 max-w-md text-base text-white/85 text-pretty sm:mt-4 sm:text-lg">{t("home.parts.lead")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The parts and their teams as a real list: visible on phones once the scene scrolls away; on wide
          screens the floating cards show it, so it stays visually hidden until keyboard focus enters it. */}
      <section aria-labelledby="home-parts-title" className="relative z-10 bg-[#222944] text-white md:sr-only md:focus-within:not-sr-only">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-8 md:pt-12">
          <h2 id="home-parts-title" className="sr-only">
            {t("home.parts.title")}
          </h2>
          <p className="sr-only">{t("home.parts.lead")}</p>
          {partsList}
        </div>
      </section>
    </>
  );
}
