import LeaderboardPreview from "./leaderboard-preview";

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
              pickleball, badminton, ping pong.
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

        {/* Right: interactive multi-sport leaderboard */}
        <LeaderboardPreview />
      </div>

      <footer className="mt-16 text-xs text-neutral-600">
        Sports Ka Ba? · a SKMC project · built for the Pinoy racquet community
      </footer>
    </main>
  );
}
