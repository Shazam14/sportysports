const LEADERBOARD = [
  { rank: 1, name: "J. Cruz", venue: "Taguig", rating: 1842, trend: "+18" },
  { rank: 2, name: "M. Santos", venue: "Cebu", rating: 1798, trend: "+7" },
  { rank: 3, name: "You", venue: "Mandaluyong", rating: 1771, trend: "+24", you: true },
  { rank: 4, name: "R. Dela Peña", venue: "Manila", rating: 1740, trend: "-12" },
  { rank: 5, name: "A. Lim", venue: "Siargao", rating: 1702, trend: "+3" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        {/* Left: pitch */}
        <section className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-medium tracking-wide text-lime-300">
            🏓 Soon sa Pilipinas
          </span>

          <h1 className="text-5xl font-black leading-none tracking-tight sm:text-6xl">
            Sports
            <br />
            Ka Ba?
          </h1>

          <p className="max-w-md text-lg text-neutral-300">
            Live skill ratings &amp; leaderboards for Filipino racquet sports —{" "}
            <span className="text-neutral-100">
              pickleball, table tennis, badminton.
            </span>{" "}
            Log a match, both players confirm, and watch your number climb.
          </p>

          <p className="text-2xl font-bold">
            <span className="text-lime-400">Pikon?</span>{" "}
            <span className="text-neutral-500">Talo.</span> 😤
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-lime-300"
            >
              Join the waitlist
            </a>
            <a
              href="#"
              className="rounded-lg border border-neutral-700 px-5 py-3 font-semibold text-neutral-200 transition hover:border-neutral-500"
            >
              For clubs &amp; venues
            </a>
          </div>
        </section>

        {/* Right: mock leaderboard */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-400">
              Sino&apos;ng pamato? 🇵🇭
            </p>
            <span className="rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-400">
              Pickleball · National
            </span>
          </div>

          <ul className="flex flex-col gap-1">
            {LEADERBOARD.map((p) => (
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
      </div>

      <footer className="mt-16 text-xs text-neutral-600">
        Sports Ka Ba? · a SKMC project · built for the Pinoy racquet community
      </footer>
    </main>
  );
}
