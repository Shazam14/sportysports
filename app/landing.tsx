"use client";

import { useState } from "react";
import LeaderboardPreview from "./leaderboard-preview";
import RatingDemo from "./rating-demo";

export type Lang = "en" | "tl";

const T = {
  en: {
    badge: "🏓 Coming soon to the Philippines",
    pitchPre: "Live skill ratings & leaderboards for Filipino racquet sports —",
    sports: "pickleball, badminton, ping pong.",
    pitchPost:
      "Log a match, both players confirm, and watch your number climb.",
    pikon: "Sore loser?",
    talo: "You lose.",
    waitlist: "Join the waitlist",
    clubs: "For clubs & venues",
    footer: "Sports Ka Ba? · a SKMC project · built for the Pinoy racquet community",
  },
  tl: {
    badge: "🏓 Soon sa Pilipinas",
    pitchPre: "Live na skill ratings at leaderboards para sa Pinoy racquet sports —",
    sports: "pickleball, badminton, ping pong.",
    pitchPost:
      "Mag-log ng laro, mag-confirm kayong dalawa, at panoorin tumaas ang number mo.",
    pikon: "Pikon?",
    talo: "Talo.",
    waitlist: "Sumali sa waitlist",
    clubs: "Para sa clubs & venues",
    footer: "Sports Ka Ba? · proyekto ng SKMC · para sa Pinoy racquet community",
  },
};

export default function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  return (
    <main className="flex flex-1 flex-col items-center bg-neutral-950 px-6 py-10 text-neutral-100">
      {/* Language toggle */}
      <div className="mb-8 flex w-full max-w-5xl justify-end">
        <div className="inline-flex rounded-full border border-neutral-800 p-0.5 text-xs font-semibold">
          {(["en", "tl"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 transition ${
                lang === l
                  ? "bg-lime-400 text-neutral-950"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        {/* Left: pitch */}
        <section className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-medium tracking-wide text-lime-300">
            {t.badge}
          </span>

          <h1 className="text-5xl font-black leading-none tracking-tight sm:text-6xl">
            Sports
            <br />
            Ka Ba?
          </h1>

          <p className="max-w-md text-lg text-neutral-300">
            {t.pitchPre} <span className="text-neutral-100">{t.sports}</span>{" "}
            {t.pitchPost}
          </p>

          <p className="text-2xl font-bold">
            <span className="text-lime-400">{t.pikon}</span>{" "}
            <span className="text-neutral-500">{t.talo}</span> 😤
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-lime-300"
            >
              {t.waitlist}
            </a>
            <a
              href="#"
              className="rounded-lg border border-neutral-700 px-5 py-3 font-semibold text-neutral-200 transition hover:border-neutral-500"
            >
              {t.clubs}
            </a>
          </div>
        </section>

        {/* Right: interactive multi-sport leaderboard */}
        <LeaderboardPreview lang={lang} />
      </div>

      {/* Interactive "why your rating moves" demo */}
      <RatingDemo lang={lang} />

      <footer className="mt-16 text-xs text-neutral-600">{t.footer}</footer>
    </main>
  );
}
