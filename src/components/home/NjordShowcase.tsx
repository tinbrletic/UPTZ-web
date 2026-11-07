"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { NjordViewer } from "./njordViewer";

export default function NjordShowcase() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current, canvas = canvasRef.current;
    if (!section || !canvas || reduceMotion === null) return;
    let viewer: NjordViewer | null = null;
    let loading = false;
    let onScreen = false;
    let cancelled = false;
    const sync = () => viewer?.setRunning(onScreen && document.visibilityState === "visible");

    // Start three.js when the section comes within a screen of the viewport; run only while visible.
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || loading) return;
        loading = true;
        import("./njordViewer").then(({ createNjordViewer }) => {
          if (cancelled) return;
          viewer = createNjordViewer({ canvas, modelUrl: "/models/njord.glb", reduceMotion: !!reduceMotion, onReady: () => setReady(true) });
          sync();
        });
      },
      { rootMargin: "100% 0px" }
    );
    const seen = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    near.observe(section);
    seen.observe(section);
    const onResize = () => viewer?.resize();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelled = true;
      near.disconnect();
      seen.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      viewer?.dispose();
    };
  }, [reduceMotion]);

  // Only facts the owner confirmed or the team's own model plainly shows; dimensions wait on the owner.
  const facts: [string, string][] = [
    [t("home.njord.factSensors"), t("home.njord.factSensorsValue")],
    [t("home.njord.factDrive"), t("home.njord.factDriveValue")],
    [t("home.njord.factRaced"), t("home.njord.factRacedValue")],
  ];

  return (
    <section ref={sectionRef} id="njord" aria-labelledby="home-njord-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
        <div>
          <h2 id="home-njord-title" className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {t("home.njord.title")}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-gray-700 text-pretty">{t("home.njord.body")}</p>
          <dl className="mt-8 grid max-w-md gap-x-8 gap-y-5 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-gray-300 pt-3">
                <dt className="text-sm text-gray-600">{k}</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-gray-600">{t("home.njord.note")}</p>
        </div>
        <figure className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#222944]">
            {/* eslint-disable-next-line @next/next/no-img-element -- still render of the 3D view, shown until it loads */}
            <img
              src="/home/njord.webp"
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
            />
            <canvas
              ref={canvasRef}
              aria-label={t("home.njord.canvasLabel")}
              role="img"
              className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-700 active:cursor-grabbing ${ready ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-600">{t("home.njord.dragHint")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
