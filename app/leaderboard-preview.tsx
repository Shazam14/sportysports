"use client";

import { useState } from "react";

type Row = {
  rank: number;
  name: string;
  venue: string;
  rating: number;
  trend: string;
  you?: boolean;
};

const SPORTS = ["Pickleball", "Badminton", "Ping Pong"] as const;
type Sport = (typeof SPORTS)[number];

const DATA: Record<Sport, Row[]> = {
  Pickleball: [
    { rank: 1, name: "J. Cruz", venue: "Taguig", rating: 1842, trend: "+18" },
    { rank: 2, name: "M. Santos", venue: "Cebu", rating: 1798, trend: "+7" },
    { rank: 3, name: "You", venue: "Mandaluyong", rating: 1771, trend: "+24", you: true },
    { rank: 4, name: "R. Dela Peña", venue: "Manila", rating: 1740, trend: "-12" },
    { rank: 5, name: "A. Lim", venue: "Siargao", rating: 1702, trend: "+3" },
  ],
  Badminton: [
    { rank: 1, name: "K. Reyes", venue: "Quezon City", rating: 1905, trend: "+11" },
    { rank: 2, name: "P. Tan", venue: "Iloilo", rating: 1860, trend: "+5" },
    { rank: 3, name: "D. Gomez", venue: "Davao", rating: 1812, trend: "-8" },
    { rank: 4, name: "You", venue: "Mandaluyong", rating: 1788, trend: "+15", you: true },
    { rank: 5, name: "N. Bautista", venue: "Pasig", rating: 1750, trend: "+2" },
  ],
  "Ping Pong": [
    { rank: 1, name: "V. Ramos", venue: "Manila", rating: 1888, trend: "+9" },
    { rank: 2, name: "You", venue: "Mandaluyong", rating: 1834, trend: "+21", you: true },
    { rank: 3, name: "L. Chua", venue: "Cebu", rating: 1799, trend: "-4" },
    { rank: 4, name: "E. Flores", venue: "Baguio", rating: 1765, trend: "+6" },
    { rank: 5, name: "G. Uy", venue: "Cagayan de Oro", rating: 1721, trend: "+1" },
  ],
};

export default function LeaderboardPreview() {
  const [sport, setSport] = useState<Sport>("Pickleball");
  const rows = DATA[sport];

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-400">
          Sino&apos;ng pamato? 🇵🇭
        </p>
        <span className="rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-400">
          National
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SPORTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSport(s)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              s === sport
                ? "bg-lime-400 text-neutral-950"
                : "border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-1">
        {rows.map((p) => (
          <li
            key={p.rank}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
              p.you ? "bg-lime-400/10 ring-1 ring-lime-400/40" : ""
            }`}
          >
            <span className="w-5 text-center text-sm font-bold text-neutral-500">
              {p.rank}
            </span>
            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  p.you ? "text-lime-300" : "text-neutral-100"
                }`}
              >
                {p.name}
              </p>
              <p className="text-xs text-neutral-500">{p.venue}</p>
            </div>
            <span className="font-mono text-sm font-bold tabular-nums">
              {p.rating}
            </span>
            <span
              className={`w-10 text-right font-mono text-xs ${
                p.trend.startsWith("-") ? "text-red-400" : "text-lime-400"
              }`}
            >
              {p.trend}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-xs text-neutral-600">
        Sample leaderboard · ratings update after every confirmed match
      </p>
    </section>
  );
}
