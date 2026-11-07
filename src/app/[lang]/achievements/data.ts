// Structured, language-neutral data for the UPTZ Achievements page.
//
// Translatable prose (section copy, briefs, missions, race + status labels)
// lives in the `achievements.*` namespace of the translation files and is
// resolved in the page via t(). Only language-neutral fields live here:
// ranks, dates, coordinates, proper nouns (events, locations, vessels),
// technical spec sheets, and image paths.
//
// Imported from the Claude Design "UPTZ design extension" project; grounded in
// uptz.hr vessel data, MEBC participant pages, and the UPTZ 2026 brochure.

// Real photos already in /public, mapped from the design's asset names.
export const IMAGES = {
  vilson: "/about_landing_images/vilson.jpg",
  karolina: "/about_landing_images/karolina.jpg",
  deltaOne: "/delta_one/delta_one_1.jpg",
  teredoNavalis: "/about_landing_images/teredo_navalis.jpg",
  hydrocontest: "/hydrocontest/hydrocontest_1.jpg",
} as const;

export type Rank = 1 | 2 | 3 | number | null;

export interface Trophy {
  id: string;
  rank: Rank;
  event: string;
  edition: string;
  vessel: string;
  vesselClass: string;
  image: string;
}

export interface ContestResult {
  raceKey: string;
  rank: Rank;
  total: number;
  /** Non-rank headline figure, e.g. "11.8 KTS" or the DEBUT marker. */
  value?: string;
}

export interface Contest {
  id: string;
  year: number;
  date: string;
  event: string;
  edition: string;
  location: string;
  coords: string;
  vessels: string[];
  vesselClass: string;
  image: string;
  /** Team members who travelled; not displayed. Left out where unknown. */
  crew?: number;
  results: ContestResult[];
}

export interface SystemSpec {
  k: string;
  v: string;
}

export interface UpcomingEntry {
  program: string;
  callsign: string;
  vessel: string;
  vesselClass: string;
  status: string; // status key (see achievements.status.*)
  systems: SystemSpec[];
}

export interface QueueEvent {
  id: string;
  date: string;
  event: string;
  location: string;
  coords: string;
  status: string; // status key
  vessel: string;
}

export interface AchievementsData {
  trophies: Trophy[];
  contests: Contest[];
  upcoming: {
    headline: {
      id: string;
      countdownTarget: string;
      /** When the event finishes; after this the page shows a concluded state instead of a countdown. */
      eventEnd: string;
      date: string;
      event: string;
      edition: string;
      location: string;
      coords: string;
      entries: UpcomingEntry[];
    };
    queue: QueueEvent[];
  };
  totals: {
    podiums: number;
    contests: number;
    vessels: number;
    years: number;
    topSpeed: string;
    bestRank: string;
  };
}

export const ACHIEVEMENTS_DATA: AchievementsData = {
  // Highest-tier proud moments — staged on the podium hero.
  // Order is the podium's: [0] left step, [1] centre (top) step, [2] right step.
  trophies: [
    {
      id: "sardinia-overall",
      rank: 2,
      event: "Sardinia Innovative Boat Week",
      edition: "Olbia · 2024",
      vessel: "Vilson",
      vesselClass: "Energy Class",
      image: IMAGES.vilson,
    },
    {
      id: "mebc26-ai",
      rank: 1,
      event: "Monaco Energy Boat Challenge",
      edition: "13th edition · 2026",
      vessel: "Karolina",
      vesselClass: "AI Class",
      image: IMAGES.karolina,
    },
    {
      id: "mebc25-overall",
      rank: 3,
      event: "Monaco Energy Boat Challenge",
      edition: "12th edition · 2025",
      vessel: "Vilson",
      vesselClass: "Energy Class",
      image: IMAGES.vilson,
    },
  ],

  // Full contest history — most recent first.
  contests: [
    {
      id: "mebc-2026",
      year: 2026,
      date: "08 — 11 JUL 2026",
      event: "Monaco Energy Boat Challenge",
      edition: "13th edition",
      location: "Port Hercule, Monaco",
      coords: "43.7333° N · 7.4167° E",
      vessels: ["Karolina", "Vilson"],
      vesselClass: "AI Class · Energy Class",
      image: IMAGES.karolina,
      // Totals are the teams listed in each official 2026 result sheet.
      results: [
        { raceKey: "aiOverall", rank: 1, total: 9 },
        { raceKey: "championship", rank: 2, total: 17 },
        { raceKey: "energyOverall", rank: 4, total: 21 },
      ],
    },
    {
      id: "mebc-2025",
      year: 2025,
      date: "02 — 06 JUL 2025",
      event: "Monaco Energy Boat Challenge",
      edition: "12th edition",
      location: "Port Hercule, Monaco",
      coords: "43.7333° N · 7.4167° E",
      vessels: ["Vilson", "Karolina"],
      vesselClass: "Energy Class · AI Class",
      image: IMAGES.vilson,
      crew: 22,
      results: [
        { raceKey: "energyOverall", rank: 3, total: 28 },
        { raceKey: "aiPioneer", rank: null, total: 10, value: "DEBUT" },
        { raceKey: "endurance", rank: 6, total: 28 },
      ],
    },
    {
      id: "sardinia-2024",
      year: 2024,
      date: "OCT 2024",
      event: "Sardinia Innovative Boat Week",
      edition: "Olbia, Italy",
      location: "Olbia, Sardinia",
      coords: "40.9234° N · 9.4983° E",
      vessels: ["Vilson"],
      vesselClass: "Energy Class",
      image: IMAGES.vilson,
      crew: 12,
      results: [
        { raceKey: "overall", rank: 2, total: 14 },
        { raceKey: "enduranceReliability", rank: 2, total: 14 },
      ],
    },
    {
      id: "mebc-2024",
      year: 2024,
      date: "03 — 07 JUL 2024",
      event: "Monaco Energy Boat Challenge",
      edition: "11th edition",
      location: "Port Hercule, Monaco",
      coords: "43.7333° N · 7.4167° E",
      vessels: ["Vilson"],
      vesselClass: "Energy Class",
      image: IMAGES.vilson,
      crew: 18,
      results: [
        { raceKey: "slalom", rank: 2, total: 22 },
        { raceKey: "elimination", rank: 2, total: 22 },
        { raceKey: "endurance", rank: 4, total: 22 },
      ],
    },
    {
      id: "adria-2023",
      year: 2023,
      date: "AUG 2023",
      event: "Adria Energy Boat Class",
      edition: "Regional regatta",
      location: "Rijeka, Croatia",
      coords: "45.3271° N · 14.4422° E",
      vessels: ["Malo Vitra"],
      vesselClass: "Solar Class",
      image: IMAGES.teredoNavalis,
      crew: 14,
      results: [
        { raceKey: "topSpeedSolar", rank: 1, total: 8, value: "11.8 KTS" },
        { raceKey: "dragRace", rank: 3, total: 8 },
      ],
    },
    {
      id: "mebc-2022",
      year: 2022,
      date: "05 — 09 JUL 2022",
      event: "Monaco Energy Boat Challenge",
      edition: "9th edition",
      location: "Port Hercule, Monaco",
      coords: "43.7333° N · 7.4167° E",
      vessels: ["Teredo Navalis"],
      vesselClass: "Solar Class",
      image: IMAGES.teredoNavalis,
      crew: 12,
      results: [
        { raceKey: "topSpeedSolar", rank: null, total: 19, value: "16 KTS" },
        { raceKey: "endurance", rank: 11, total: 19 },
      ],
    },
    {
      id: "hydro-2021",
      year: 2021,
      date: "SEP 2021",
      event: "HydroContest",
      edition: "Student edition",
      location: "Lake Geneva, Switzerland",
      coords: "46.2044° N · 6.1432° E",
      vessels: ["Delta One"],
      vesselClass: "Hydrofoil",
      image: IMAGES.deltaOne,
      crew: 9,
      results: [
        { raceKey: "massTransport", rank: 14, total: 24 },
        { raceKey: "lightweight", rank: 12, total: 24 },
      ],
    },
  ],

  // The 2026 season spread: the MEBC 2026 entries with their results, then the
  // season's other event. Results are from the organiser's official result
  // sheets (MEBC 2026 general rankings, Race Office, 12 July 2026).
  upcoming: {
    headline: {
      id: "mebc-2026",
      countdownTarget: "2026-07-08T07:00:00Z",
      eventEnd: "2026-07-11T18:00:00Z",
      date: "08 — 11 JUL 2026",
      event: "Monaco Energy Boat Challenge",
      edition: "13th edition",
      location: "Port Hercule, Monaco",
      coords: "43.7333° N · 7.4167° E",
      entries: [
        {
          program: "KAROLINA",
          callsign: "ADRIA AUTONOMOUS",
          vessel: "Karolina",
          vesselClass: "AI Class",
          status: "aiWinner",
          systems: [
            { k: "Compute", v: "NVIDIA Jetson" },
            { k: "Control", v: "Pixhawk · EKF" },
            { k: "Perception", v: "Livox Mid-360 · ZED ×2" },
            { k: "Stack", v: "ROS 2 · Gazebo" },
          ],
        },
        {
          program: "VILSON",
          callsign: "ADRIA RACING",
          vessel: "Vilson",
          vesselClass: "Energy Class",
          status: "energyFourth",
          systems: [
            { k: "Drive", v: "20 kW electric" },
            { k: "Pack", v: "10 kWh Li-Ion" },
          ],
        },
      ],
    },
    queue: [
      {
        id: "q-njord-26",
        date: "AUG 2026",
        event: "Njord Autonomous Ship Challenge",
        location: "Trondheim, Norway",
        coords: "63.4305° N · 10.3951° E",
        status: "raced",
        vessel: "Njord build (smaller ASV)",
      },
    ],
  },

  // Hand-kept counts. 2026 added: podiums +2 (AI Class win, championship race
  // 2nd), contests +2 (MEBC 2026, Njord 2026), years +1. Top speed is Vilson's
  // official timed kilometre at MEBC 2026 (26.90 kn average).
  totals: {
    podiums: 8,
    contests: 10,
    vessels: 5,
    years: 6,
    topSpeed: "26.9 KTS",
    bestRank: "1",
  },
};
