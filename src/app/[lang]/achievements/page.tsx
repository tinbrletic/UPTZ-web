"use client";

// UPTZ — Achievements page (imported "Trophy Cinema" design).
// Navigation + Footer are provided by src/app/[lang]/layout.tsx, so this file
// renders content sections only. All visible prose comes from the
// `achievements.*` translation namespace; structural data from ./data.

import { useTranslation } from "@/hooks/useTranslation";
import {
  ACHIEVEMENTS_DATA as DATA,
  Contest,
  ContestResult,
  IMAGES,
  QueueEvent,
  Trophy,
  UpcomingEntry,
} from "./data";
import {
  Chip,
  Countdown,
  CTA,
  Eyebrow,
  Heading,
  Icon,
  SectionHead,
  StatBlock,
  useBreakpoint,
} from "./achievements-ui";

type BP = { isNarrow: boolean; isMobile: boolean };

const RANK_SUFFIX: Record<number, string> = { 1: "st", 2: "nd", 3: "rd", 4: "th" };

const medalGradient = (rank: number | null) =>
  rank === 1
    ? "linear-gradient(140deg, #fbbf24, #d97706)"
    : rank === 2
    ? "linear-gradient(140deg, #e2e8f0, #64748b)"
    : rank === 3
    ? "linear-gradient(140deg, #fb923c, #92400e)"
    : "var(--uptz-marine-600)";

const bestResult = (results: ContestResult[]) =>
  results.reduce<ContestResult>(
    (a, b) => (!a.rank ? b : b.rank && b.rank < a.rank ? b : a),
    { raceKey: "", rank: 99, total: 0 }
  );

export default function Achievements() {
  const bp = useBreakpoint();
  return (
    <div
      style={{
        background: "var(--uptz-bg-base)",
        color: "var(--uptz-fg)",
        fontFamily: "var(--uptz-font-sans)",
      }}
    >
      <CinemaHero bp={bp} />
      <ProudMomentsRow bp={bp} />
      <NextEventSpread bp={bp} />
      <PastZigzag bp={bp} />
      <ClosingCTA bp={bp} />
    </div>
  );
}

/* ===========================================================
   CINEMA HERO — giant numeric "03" over a photo
   =========================================================== */
function CinemaHero({ bp }: { bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow, isMobile } = bp;
  const numeral = isMobile ? 132 : isNarrow ? 220 : 320;

  return (
    <header style={{ position: "relative", minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${IMAGES.vilson}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg, rgba(17,24,39,0.92) 0%, rgba(30,58,138,0.78) 45%, rgba(30,58,138,0.18) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          flex: 1,
          padding: isMobile ? "120px 20px 56px" : "150px 48px 80px",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          color: "#fff",
          display: "grid",
          gridTemplateColumns: isNarrow ? "1fr" : "1.2fr 1fr",
          gap: isNarrow ? 40 : 56,
          alignItems: "center",
        }}
      >
        {/* Left — proud-moment numeric */}
        <div>
          <Chip tone="onDark" pulse>
            {t("achievements.hero.flagshipChip")}
          </Chip>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 24 }}>
            <span
              style={{
                fontFamily: "var(--uptz-font-sans)",
                fontWeight: 700,
                fontSize: numeral,
                lineHeight: 0.82,
                letterSpacing: "-0.05em",
                color: "#fff",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 8px 32px rgba(0,0,0,0.30)",
              }}
            >
              03
            </span>
            <span
              style={{
                fontFamily: "var(--uptz-font-sans)",
                fontWeight: 600,
                fontSize: isMobile ? 28 : isNarrow ? 40 : 56,
                color: "var(--uptz-marine-300)",
                marginTop: isMobile ? 10 : 22,
              }}
            >
              {t("achievements.hero.rankSuffix")}
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--uptz-font-sans)",
              fontWeight: 700,
              fontSize: isMobile ? "var(--uptz-text-2xl)" : "var(--uptz-text-4xl)",
              color: "var(--uptz-marine-200)",
              letterSpacing: "var(--uptz-track-tight)",
              marginTop: -8,
              marginBottom: 24,
            }}
          >
            {t("achievements.hero.overallEnergyClass")}
          </div>
          <p
            style={{
              fontFamily: "var(--uptz-font-sans)",
              fontSize: "var(--uptz-text-xl)",
              lineHeight: "var(--uptz-lh-relaxed)",
              color: "rgba(255,255,255,0.85)",
              margin: 0,
              maxWidth: 540,
            }}
          >
            {t("achievements.hero.lead")}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <CTA kind="onDark" icon="arrow-up-right">
              {t("achievements.hero.readWriteup")}
            </CTA>
            <CTA kind="onDarkGhost" icon="arrow-down" href="#next">
              {t("achievements.hero.seeNext")}
            </CTA>
          </div>
        </div>

        {/* Right — info card */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "var(--uptz-radius-md)",
            padding: isMobile ? 24 : 32,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Eyebrow color="var(--uptz-marine-300)">{t("achievements.hero.cardEyebrow")}</Eyebrow>
          <Heading level={2} light style={{ fontSize: "var(--uptz-text-3xl)" }}>
            {t("achievements.hero.cardTitle")}
          </Heading>
          <p
            style={{
              fontFamily: "var(--uptz-font-sans)",
              fontSize: "var(--uptz-text-base)",
              lineHeight: "var(--uptz-lh-relaxed)",
              color: "rgba(255,255,255,0.80)",
              margin: 0,
            }}
          >
            {t("achievements.hero.cardBody")}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <StatBlock light value={DATA.totals.podiums} label={t("achievements.hero.statPodiums")} />
            <StatBlock light value={DATA.totals.contests} label={t("achievements.hero.statContests")} />
            <StatBlock light value="25" unit="KTS" label={t("achievements.hero.statTopSpeed")} />
            <StatBlock light value="2026" label={t("achievements.hero.statNextEntry")} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ===========================================================
   PROUD MOMENTS — 1st/2nd/3rd staged on a podium
   =========================================================== */
function ProudMomentsRow({ bp }: { bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow, isMobile } = bp;
  return (
    <section
      style={{
        padding: `${isMobile ? 56 : 80}px ${isMobile ? 20 : 48}px ${isMobile ? 48 : 64}px`,
        background: "var(--uptz-surface)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          align="center"
          eyebrow={t("achievements.proud.eyebrow")}
          title={t("achievements.proud.title")}
          lead={t("achievements.proud.lead")}
        />
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "1fr 1.15fr 1fr",
            gap: 20,
            alignItems: "end",
          }}
        >
          <ProudCard t={DATA.trophies[0]} variant="side" bp={bp} />
          <ProudCard t={DATA.trophies[1]} variant="center" bp={bp} />
          <ProudCard t={DATA.trophies[2]} variant="side" bp={bp} />
        </div>
      </div>
    </section>
  );
}

function ProudCard({ t: trophy, variant, bp }: { t: Trophy; variant: "side" | "center"; bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow } = bp;
  const isCenter = variant === "center";
  const lifted = isCenter && !isNarrow;
  const rank = trophy.rank as number;

  return (
    <article
      style={{
        position: "relative",
        background: "#000",
        borderRadius: "var(--uptz-radius-md)",
        overflow: "hidden",
        height: isNarrow ? 380 : isCenter ? 540 : 460,
        boxShadow: isCenter ? "var(--uptz-shadow-xl)" : "var(--uptz-shadow-lg)",
        transform: lifted ? "translateY(-20px)" : "translateY(0)",
        transition: "transform var(--uptz-dur-base) var(--uptz-ease), box-shadow var(--uptz-dur-base) var(--uptz-ease)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${trophy.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(17,24,39,0.30) 0%, rgba(17,24,39,0.85) 100%)",
        }}
      />

      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          width: isCenter ? 92 : 76,
          height: isCenter ? 92 : 76,
          borderRadius: "50%",
          background: medalGradient(rank),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.35), inset 0 -2px 6px rgba(0,0,0,0.25), inset 0 2px 6px rgba(255,255,255,0.35)",
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: "var(--uptz-font-sans)", fontWeight: 700, fontSize: isCenter ? 40 : 32, lineHeight: 1 }}>
          {rank}
          <sup style={{ fontSize: isCenter ? 18 : 14 }}>{RANK_SUFFIX[rank]}</sup>
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 28, color: "#fff", zIndex: 2 }}>
        <Eyebrow color="var(--uptz-marine-300)">{trophy.event}</Eyebrow>
        <Heading
          level={3}
          light
          style={{ fontSize: isCenter ? "var(--uptz-text-3xl)" : "var(--uptz-text-2xl)", marginTop: 8 }}
        >
          {t(`achievements.trophies.${trophy.id}.label`)}
        </Heading>
        <div
          style={{
            marginTop: 10,
            fontFamily: "var(--uptz-font-sans)",
            fontSize: "var(--uptz-text-sm)",
            color: "rgba(255,255,255,0.80)",
          }}
        >
          {trophy.edition} · {trophy.vessel}
        </div>
      </div>
    </article>
  );
}

/* ===========================================================
   NEXT EVENT — magazine spread for MEBC 2026
   =========================================================== */
function NextEventSpread({ bp }: { bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow, isMobile } = bp;
  const u = DATA.upcoming;
  return (
    <section
      id="next"
      style={{
        padding: `${isMobile ? 56 : 72}px ${isMobile ? 20 : 48}px`,
        background: "linear-gradient(180deg, var(--uptz-surface) 0%, var(--uptz-marine-50) 100%)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          eyebrow={t("achievements.nextEvent.eyebrow")}
          title={t("achievements.nextEvent.title")}
          lead={t("achievements.nextEvent.lead")}
        />

        {/* Counter strip */}
        <div
          style={{
            marginTop: 36,
            padding: isMobile ? "28px 24px" : "32px 48px",
            background: "linear-gradient(135deg, var(--uptz-marine-900), var(--uptz-marine-700))",
            borderRadius: "var(--uptz-radius-md)",
            boxShadow: "var(--uptz-shadow-xl)",
            color: "#fff",
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "1fr 2fr",
            gap: isNarrow ? 28 : 56,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background:
                "radial-gradient(circle at 20% 0%, var(--uptz-ocean-400) 0, transparent 40%), radial-gradient(circle at 95% 100%, var(--uptz-marine-300) 0, transparent 50%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <Eyebrow color="var(--uptz-marine-300)">{u.headline.date}</Eyebrow>
            <Heading level={2} light style={{ fontSize: "var(--uptz-text-4xl)", marginTop: 12 }}>
              {u.headline.event} <span style={{ color: "var(--uptz-marine-300)" }}>&rsquo;26</span>
            </Heading>
            <div
              style={{
                fontFamily: "var(--uptz-font-sans)",
                fontSize: "var(--uptz-text-sm)",
                color: "rgba(255,255,255,0.65)",
                marginTop: 8,
              }}
            >
              {u.headline.edition} · {u.headline.location} · {u.headline.coords}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Eyebrow color="rgba(255,255,255,0.55)" style={{ marginBottom: 14 }}>
              {t("achievements.nextEvent.countdownLabel")}
            </Eyebrow>
            <Countdown
              targetIso={u.headline.countdownTarget}
              light
              compact={isMobile}
              labels={{
                days: t("achievements.countdown.days"),
                hours: t("achievements.countdown.hours"),
                min: t("achievements.countdown.min"),
                sec: t("achievements.countdown.sec"),
              }}
            />
          </div>
        </div>

        {/* Boat spreads */}
        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 20 }}>
          {u.headline.entries.map((e, i) => (
            <BoatSpread key={e.program} entry={e} flipped={i === 1} bp={bp} />
          ))}
        </div>

        {/* Queue */}
        <div style={{ marginTop: 40 }}>
          <Eyebrow style={{ marginBottom: 16 }}>{t("achievements.nextEvent.alsoBooked")}</Eyebrow>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isNarrow ? "1fr" : "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {u.queue.map((q) => (
              <QueueCard key={q.id} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BoatSpread({ entry, flipped, bp }: { entry: UpcomingEntry; flipped: boolean; bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow } = bp;
  const isVilson = /vilson/i.test(entry.vessel);
  const photo = isVilson ? IMAGES.vilson : IMAGES.karolina;
  const cols = isNarrow ? "1fr" : flipped ? "1fr 1.1fr" : "1.1fr 1fr";

  const content = (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
      <div>
        <Chip tone={entry.status === "inBuild" ? "default" : "pioneer"} pulse>
          {t(`achievements.status.${entry.status}`)}
        </Chip>
      </div>
      <div>
        <Eyebrow>{entry.vesselClass}</Eyebrow>
        <Heading level={2} style={{ fontSize: "var(--uptz-text-4xl)", marginTop: 8 }}>
          {entry.program}
        </Heading>
        <div
          style={{
            fontFamily: "var(--uptz-font-sans)",
            fontSize: "var(--uptz-text-base)",
            color: "var(--uptz-text-2)",
            marginTop: 6,
          }}
        >
          {t("achievements.misc.vessel")} · <strong style={{ color: "var(--uptz-ink)" }}>{entry.vessel}</strong>
        </div>
      </div>
      <p
        style={{
          fontFamily: "var(--uptz-font-sans)",
          fontSize: "var(--uptz-text-lg)",
          lineHeight: "var(--uptz-lh-relaxed)",
          color: "var(--uptz-text-2)",
          margin: 0,
        }}
      >
        {t(`achievements.entries.${entry.program}.mission`)}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        {entry.systems.map((s) => (
          <div
            key={s.k}
            style={{
              padding: "10px 14px",
              background: "var(--uptz-marine-50)",
              borderRadius: "var(--uptz-radius-sm)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: "var(--uptz-font-sans)",
                fontSize: 10,
                fontWeight: 500,
                color: "var(--uptz-primary)",
                letterSpacing: "var(--uptz-track-wide)",
                textTransform: "uppercase",
              }}
            >
              {s.k}
            </div>
            <div
              style={{
                fontFamily: "var(--uptz-font-sans)",
                fontSize: "var(--uptz-text-sm)",
                fontWeight: 600,
                color: "var(--uptz-ink)",
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const image = (
    <div
      style={{
        backgroundImage: `url('${photo}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: isNarrow ? 240 : 480,
      }}
    />
  );

  return (
    <article
      style={{
        background: "var(--uptz-bg-elevated)",
        borderRadius: "var(--uptz-radius-md)",
        overflow: "hidden",
        boxShadow: "var(--uptz-shadow-lg)",
        display: "grid",
        gridTemplateColumns: cols,
      }}
    >
      {isNarrow ? (
        <>
          {image}
          {content}
        </>
      ) : flipped ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </article>
  );
}

function QueueCard({ q }: { q: QueueEvent }) {
  const { t } = useTranslation();
  const tone = q.status === "confirmed" ? "success" : "default";
  return (
    <article
      style={{
        background: "var(--uptz-bg-elevated)",
        borderRadius: "var(--uptz-radius-md)",
        padding: 28,
        boxShadow: "var(--uptz-shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <Eyebrow>{q.date}</Eyebrow>
        <Chip tone={tone}>{t(`achievements.status.${q.status}`)}</Chip>
      </div>
      <Heading level={4}>{q.event}</Heading>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--uptz-font-sans)",
          fontSize: "var(--uptz-text-sm)",
          color: "var(--uptz-text-2)",
        }}
      >
        <Icon name="map-pin" size={14} color="var(--uptz-primary)" />
        {q.location}
      </div>
      <div
        style={{
          marginTop: 4,
          paddingTop: 14,
          borderTop: "1px solid var(--uptz-divider)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--uptz-text-3)",
              letterSpacing: "var(--uptz-track-wide)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {t("achievements.nextEvent.focus")}
          </div>
          <div style={{ fontSize: 13, color: "var(--uptz-ink-soft)", marginTop: 4 }}>
            {t(`achievements.queue.${q.id}.focus`)}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--uptz-text-3)",
              letterSpacing: "var(--uptz-track-wide)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {t("achievements.misc.vessel")}
          </div>
          <div style={{ fontSize: 13, color: "var(--uptz-ink-soft)", marginTop: 4 }}>{q.vessel}</div>
        </div>
      </div>
    </article>
  );
}

/* ===========================================================
   PAST CONTESTS — zig-zag timeline
   =========================================================== */
function PastZigzag({ bp }: { bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow, isMobile } = bp;
  return (
    <section style={{ padding: `${isMobile ? 56 : 80}px ${isMobile ? 20 : 48}px ${isMobile ? 48 : 64}px` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          eyebrow={t("achievements.past.eyebrow")}
          title={t("achievements.past.title")}
          lead={t("achievements.past.lead")}
        />
        <div data-tl-section style={{ marginTop: 40, position: "relative" }}>
          {!isNarrow && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "calc(50% - 1px)",
                width: 2,
                background: "var(--uptz-divider)",
              }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: isNarrow ? 24 : 32 }}>
            {DATA.contests.map((c, i) => (
              <TimelineRow key={c.id} c={c} flipped={i % 2 === 1} bp={bp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultPills({ results }: { results: ContestResult[] }) {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
      {results.map((r) => {
        const podium = !!r.rank && r.rank <= 3;
        const figure = r.rank ? `#${r.rank}` : r.value === "DEBUT" ? t("achievements.misc.debut") : r.value || "—";
        return (
          <span
            key={r.raceKey + (r.value ?? "")}
            style={{
              padding: "4px 10px",
              background: podium ? "#dcfce7" : "var(--uptz-marine-50)",
              color: podium ? "#166534" : "var(--uptz-primary)",
              borderRadius: "var(--uptz-radius-pill)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "var(--uptz-track-wide)",
              textTransform: "uppercase",
            }}
          >
            {figure} · {t(`achievements.race.${r.raceKey}`)}
          </span>
        );
      })}
    </div>
  );
}

function TimelineRow({ c, flipped, bp }: { c: Contest; flipped: boolean; bp: BP }) {
  const { t } = useTranslation();
  const { isNarrow } = bp;
  const best = bestResult(c.results);
  const isPodium = !!best.rank && best.rank <= 3;

  const card = (
    <article
      data-tl-card={c.id}
      style={{
        background: "var(--uptz-bg-elevated)",
        borderRadius: "var(--uptz-radius-md)",
        overflow: "hidden",
        boxShadow: "var(--uptz-shadow-md)",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.20)), url('${c.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        <Eyebrow>{c.edition}</Eyebrow>
        <Heading level={3}>{c.event}</Heading>
        <div style={{ fontSize: 13, color: "var(--uptz-text-2)" }}>
          {c.location} · {c.vessels.join(", ")}
        </div>
        <p
          style={{
            fontFamily: "var(--uptz-font-sans)",
            fontSize: "var(--uptz-text-sm)",
            lineHeight: "var(--uptz-lh-relaxed)",
            color: "var(--uptz-text-2)",
            margin: "4px 0 0",
          }}
        >
          {t(`achievements.contests.${c.id}.brief`)}
        </p>
        <ResultPills results={c.results} />
      </div>
    </article>
  );

  const yearStamp = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isNarrow ? "flex-start" : flipped ? "flex-start" : "flex-end",
        padding: isNarrow ? "0 0 8px" : "4px 0 0",
      }}
    >
      <div
        data-tl-year={String(c.year)}
        style={{
          fontFamily: "var(--uptz-font-sans)",
          fontWeight: 700,
          fontSize: isNarrow ? 56 : 96,
          lineHeight: 1,
          color: "var(--uptz-primary)",
          letterSpacing: "var(--uptz-track-tight)",
        }}
      >
        {c.year}
      </div>
      <div style={{ fontFamily: "var(--uptz-font-sans)", fontSize: "var(--uptz-text-sm)", color: "var(--uptz-text-2)", marginTop: 8 }}>
        {c.date}
      </div>
      {isPodium ? (
        <div
          style={{
            marginTop: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: "#dcfce7",
            color: "#166534",
            borderRadius: "var(--uptz-radius-pill)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "var(--uptz-track-wide)",
            textTransform: "uppercase",
          }}
        >
          <Icon name="trophy" size={14} /> {t("achievements.past.podium")} · #{best.rank}
        </div>
      ) : null}
    </div>
  );

  if (isNarrow) {
    return (
      <div>
        {yearStamp}
        {card}
      </div>
    );
  }

  return (
    <div data-tl-row={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 24, alignItems: "start", position: "relative" }}>
      <div style={{ gridColumn: flipped ? 3 : 1, gridRow: 1 }}>{card}</div>
      <div style={{ gridColumn: 2, gridRow: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative" }}>
        <div
          style={{
            width: 16,
            height: 16,
            marginTop: 44,
            borderRadius: "50%",
            background: isPodium ? "var(--uptz-primary)" : "var(--uptz-line-2)",
            border: "3px solid var(--uptz-bg-base)",
            boxShadow: isPodium ? "0 0 0 4px rgba(37,99,235,0.20)" : "none",
            zIndex: 1,
          }}
        />
      </div>
      <div style={{ gridColumn: flipped ? 1 : 3, gridRow: 1 }}>{yearStamp}</div>
    </div>
  );
}

/* ===========================================================
   CLOSING CTA
   =========================================================== */
function ClosingCTA({ bp }: { bp: BP }) {
  const { t } = useTranslation();
  const { isMobile } = bp;
  return (
    <section
      style={{
        padding: `${isMobile ? 64 : 80}px ${isMobile ? 20 : 48}px`,
        background: "var(--uptz-bg-dark)",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          background:
            "radial-gradient(circle at 50% 0%, var(--uptz-marine-500) 0, transparent 50%), radial-gradient(circle at 50% 100%, var(--uptz-ocean-500) 0, transparent 50%)",
        }}
      />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <Eyebrow color="var(--uptz-marine-300)">{t("achievements.closing.eyebrow")}</Eyebrow>
        <Heading
          level={2}
          light
          style={{ marginTop: 16, fontSize: isMobile ? "var(--uptz-text-4xl)" : "var(--uptz-text-5xl)" }}
        >
          {t("achievements.closing.title")}
        </Heading>
        <p
          style={{
            fontFamily: "var(--uptz-font-sans)",
            fontSize: "var(--uptz-text-lg)",
            color: "rgba(255,255,255,0.78)",
            lineHeight: "var(--uptz-lh-relaxed)",
            marginTop: 20,
          }}
        >
          {t("achievements.closing.body")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          <CTA kind="onDark" size="lg" icon="arrow-up-right">
            {t("achievements.closing.sponsor")}
          </CTA>
          <CTA kind="onDarkGhost" size="lg" icon="arrow-right">
            {t("achievements.closing.donate")}
          </CTA>
        </div>
      </div>
    </section>
  );
}
