# Expert Ka Ba? (working title) — PH Racquet-Sport Rating PWA

> The gamechanger rating for Filipino racquet-sport players — **pickleball, table
> tennis, badminton**. "Are you the expert?" Web-first PWA.
> Stack: **Next.js + Firebase + Vercel**. Domains: `expertkaba.com` + `expertkaba.app`.
>
> Name/folder are placeholders — the build doesn't depend on them.

---

## The one-sentence product
Two people play → log it → both confirm → ratings move → leaderboard answers
**"sino'ng expert?"** — per sport, per city. That loop is the whole app.

## Positioning: broad name, narrow engine, narrow launch
The name is deliberately bigger than sports — optionality, so we never rebrand as we grow.
BUT what we can rate is bounded by the **engine, not the name**: Elo needs **confirmed
head-to-head matches with a winner**. Expandable universe = *1v1 competitive activities*
(racquet sports → chess/billiards/darts → esports/fighting games), NOT "rate any expert at
anything." Rating cooks/doctors/singers has no head-to-head → different product
(reviews/reputation), do NOT merge it in. **A broad name is free; a broad product is fatal.**

## Strategy: multi-sport BRAND, one-sport LAUNCH
- **Brand & architecture = multi-sport from day one.** The Elo engine is sport-agnostic;
  supporting more sports is nearly free (just a `sport` dimension + per-sport ratings).
- **Launch = ONE sport, ONE city, dominate, THEN expand.** Ratings do NOT transfer across
  sports, so "3 sports" = 3 separate empty leaderboards. Launching all at once = 3 ghost
  towns. Crack one first.
- **Launch wedge = pickleball @ SideOut Cebu.** We already own the venue + players (the
  Pickball booking app) and pickleball is booming with no PH rating incumbent. The thing
  that kills every competitor — getting the first 100 players — we already have.
  Roll the same engine to badminton + table tennis afterward.

---

## 1. Data model (Firestore)

Golden rule: **`matches` is the immutable source of truth.** Never overwrite a rating —
always append a match. This is what lets us swap Elo → Glicko-2 later by *replaying
history*. The numbers on `ratings` are a denormalized cache for fast leaderboard reads.

### `players/{playerId}` — identity, sport-agnostic
```
displayName  string
photoURL     string
city         string        // "Cebu", "Manila" — powers city leaderboards
homeVenueId  string|null
createdAt    timestamp
```

### `ratings/{playerId}_{sport}` — ONE rating per (player, sport)
```
playerId      string
sport         string        // "pickleball" | "tabletennis" | "badminton"
city          string        // denormalized for leaderboard filter
rating        number        // current Elo (starts 1000)
rd            number        // 350 default — reserved for Glicko-2
vol           number        // 0.06 default — reserved for Glicko-2
matchesPlayed number
wins          number
losses        number
provisional   boolean       // true until matchesPlayed >= 15 (faster K-factor)
lastPlayedAt  timestamp
```
Leaderboard = `ratings` where `sport==X` and `city==Y`, order by `rating` desc. Clean,
indexable, cheap.

### `venues/{venueId}`
```
name        string
city        string
sports      string[]    // which sports this venue hosts
geo         geopoint
ownerId     string
memberCount number
```

### `matches/{matchId}` — append-only source of truth
```
sport          string      // which sport this match counts toward
venueId        string|null
playerA        string      // reporter / winner side
playerB        string
scoreA         number      // winner final score, e.g. 11
scoreB         number      // loser final score, e.g. 7
winnerId       string
status         string      // "pending" | "confirmed" | "disputed"
reportedBy     string
confirmedBy    string|null
ratingBeforeA  number      // snapshot at confirm time
ratingBeforeB  number
ratingAfterA   number
ratingAfterB   number
delta          number      // points exchanged (for "▲ +18" UI)
playedAt       timestamp
confirmedAt    timestamp|null
```

---

## 2. The rating engine (Elo first, Glicko-ready) — sport-agnostic

Runs **server-side in a Cloud Function** on match-confirm. Server-side = nobody fakes a
rating from a hacked client. Same code for every sport.

```js
function expectedScore(ra, rb) {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}
// K = how hard a rating can swing. New players swing fast; pros swing slow.
function kFactor(r) {
  if (r.provisional) return 40;   // first 15 games: find your level fast
  if (r.rating > 2100) return 16; // elite: stable
  return 24;                      // everyone else
}
// result = 1 if this player won, 0 if lost
function newRating(player, opponent, result) {
  const expected = expectedScore(player.rating, opponent.rating);
  return Math.round(player.rating + kFactor(player) * (result - expected));
}
```
On confirm, in one transaction: read both `ratings/{player}_{sport}` docs → compute new
ratings → write `ratingAfter*` + `delta` onto the match → update both rating docs +
W/L + matchesPlayed → flip `provisional` off at 15 games.

**Starting rating:** 1000. ✅ LOCKED (climb-friendly).
**Score logged:** winner + final game score only (e.g. 11-7). ✅ LOCKED (~15s entry).

---

## 3. v1 screens (feed-first, like wdle)

Sport is a top-level toggle/context (default = launch sport, pickleball).

1. **Sign in** — Google login → display name, city, home venue. New `ratings` doc @ 1000
   created lazily the first time you log a match in a given sport.
2. **Home / Feed** — your rating card (number + ▲▼ trend) for the active sport, then a
   feed of recent matches at your venue/city. The dopamine surface.
3. **Log Match** — pick sport → pick opponent → tap winner → final score → submit.
   Creates a `pending` match. ~15s.
4. **Confirm** — opponent sees pending match → Confirm or Dispute. ← the trust gate.
   Rating only moves on confirm.
5. **Leaderboard** — filters: **Sport × (My Venue | My City | National)**. The hero
   "sino'ng expert?" screen.
6. **Player Profile** — per-sport rating, trend sparkline, W/L, head-to-head, recent
   matches. (A player can be #2 pickleball, #40 badminton — show both.)
7. **Venue page** — club ladder per sport + members.

**OUT of v1:** payments, doubles ratings (singles only — doubles math is messy),
age divisions, official sanctioning, push notifications. Launch with pickleball ONLY;
badminton + TT are post-validation expansions (same engine, just enable the sport).

---

## 4. Build order (vertical slices — each usable on its own)
1. **You exist** — auth + player profile.
2. **Log + confirm a match** — the trust gate (records only, no math yet).
3. **The engine** — Cloud Function computes Elo on confirm. ← the magic moment.
4. **Leaderboard** — the payoff. Loop is now closed + demoable to SideOut.
5. **Profile + trend** — head-to-head, sparkline.
6. **Venue pages** — club ladders, the cold-start vehicle.
7. **PWA polish** — manifest, service worker, Add-to-Home, offline match queue.

After step 4 you have a working flywheel to put in front of SideOut Cebu pickleball.

---

## 5. Anti-cheat (cheap but essential)
- **Both players confirm** — the foundation. No confirm, no rating change.
- **Rating math server-side only** — Firestore rules block clients writing `rating`.
- **Dispute path** — disputed matches don't count until resolved.
- **Soft flags** — same pair logging many matches fast → flag for review.

---

## 6. Cold start (the real hard part — already solved for us)
Anchor on **SideOut Cebu, pickleball**. We have the venue + players via the Pickball
booking app. Seed the first ~100 matches there, get the one leaderboard alive, let it
spread court by court. THEN flip on badminton + table tennis under the Expert Ka Ba brand.
Multi-sport is the brand; one-sport-dominance is the playbook.

---

## Open decisions (for Archimedes)
- [x] **Scope** — multi-sport platform (pickleball + badminton + TT), not TT-only. ✅
- [x] **Name** — "Expert Ka Ba?" working title. `expertkaba.com` + `.app` available. ✅
- [x] **Starting rating** — 1000 (climb-friendly). ✅
- [x] **Score** — winner + final game score only (11-7). ✅
- [ ] **Launch sport** — confirm pickleball-first (vs TT-first)?
- [ ] **First venue** — confirm SideOut Cebu as the anchor.
- [ ] **Buy domains?** — grab `expertkaba.com` + `.app` in Cloudflare.
