"use client";

import { useState } from "react";

const OPPONENT = 1800;

// Elo expectation: chance `a` beats `b`
function expected(a: number, b: number) {
  return 1 / (1 + Math.pow(10, (b - a) / 400));
}

type Contestant = {
  key: string;
  label: string;
  sub: string;
  start: number;
  k: number; // how hard the rating swings — proxy for "how unsure we are"
  band: number; // uncertainty range (±points) — the "width of the hill"
};

const CONTESTANTS: Contestant[] = [
  { key: "new", label: "Bagong player", sub: "3 games played", start: 1500, k: 40, band: 220 },
  { key: "vet", label: "Beterano", sub: "200+ games played", start: 1500, k: 14, band: 45 },
];

const MAX_BAND = 240; // for scaling the uncertainty bar

export default function RatingDemo() {
  const [played, setPlayed] = useState(false);
  const e = expected(1500, OPPONENT); // ~0.15 — an upset win

  return (
    <section className="mt-20 w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      <h2 className="text-2xl font-bold text-neutral-100">
        Bakit gumagalaw ang number mo? 🤔
      </h2>
      <p className="mt-2 max-w-xl text-sm text-neutral-400">
        Pareho silang <span className="text-neutral-200">nag-1500</span> at parehong{" "}
        <span className="text-neutral-200">tinalo ang isang 1800 player</span> — same win.
        Pero ibang-iba ang galaw. Bakit? Kasi mas <em>sigurado</em> ang system sa beterano,
        at hindi pa sa bagong player. Mas malabo = mas malaki ang galaw.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CONTESTANTS.map((c) => {
          const delta = Math.round(c.k * (1 - e)); // win → result = 1
          const after = c.start + delta;
          const band = played ? Math.round(c.band * 0.85) : c.band;
          const barWidth = Math.round((band / MAX_BAND) * 100);

          return (
            <div
              key={c.key}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-100">{c.label}</p>
                  <p className="text-xs text-neutral-500">{c.sub}</p>
                </div>
                {played && (
                  <span className="rounded-md bg-lime-400/15 px-2 py-1 font-mono text-xs font-bold text-lime-300">
                    +{delta}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-black tabular-nums text-neutral-100">
                  {played ? after : c.start}
                </span>
                <span className="font-mono text-xs text-neutral-500">± {band}</span>
              </div>

              {/* the "hill" — wider = less sure */}
              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-neutral-800">
                  <div
                    className="mx-auto h-2 rounded-full bg-lime-400/50 transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <p className="mt-1 text-center text-[10px] uppercase tracking-wide text-neutral-600">
                  {c.k >= 30 ? "malabo pa (wide hill)" : "sigurado na (narrow hill)"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPlayed(true)}
          disabled={played}
          className="rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ▶︎ Parehong tinalo ang 1800
        </button>
        <button
          type="button"
          onClick={() => setPlayed(false)}
          className="rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500"
        >
          Reset
        </button>
        {played && (
          <p className="text-sm text-neutral-400">
            Same win — pero <span className="text-lime-300">+34</span> ang bago,{" "}
            <span className="text-neutral-300">+12</span> lang ang beterano. Yan ang
            &ldquo;wide hill moves more.&rdquo;
          </p>
        )}
      </div>
    </section>
  );
}
