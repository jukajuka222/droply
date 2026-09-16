# Droply.digital

Dark, Apple/visionOS-inspired crypto drop tracker with live airdrop ingestion.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Live data

Droply now combines two public sources:

- CryptoRank Drophunting API v2 — requires `CRYPTORANK_API_KEY`.
- Airdrops.io latest public listing — parsed server-side from its public page.

The application normalizes source records, deduplicates by slug, maps statuses/events, preserves source URLs, and falls back to demo data when a source is unavailable.

CryptoRank documents `GET /v2/drophunting/activities`, with `X-Api-Key` authentication and limits of 100/200/300 activities per request depending on the selected limit. Keep the key server-side and never commit it. urlCryptoRank API documentationhttps://api.cryptorank.io/v2/docs

Airdrops.io publishes its latest listings publicly and states that listings are reviewed and updated daily. urlAirdrops.io Latest Airdropshttps://airdrops.io/latest/

## Automated sync

`npm run sync` updates `data/projects.generated.ts` from both sources.

GitHub Actions runs the sync hourly. Add a repository secret named `CRYPTORANK_API_KEY` before the scheduled workflow can populate CryptoRank data.

## Environment

```text
CRYPTORANK_API_KEY=...
SYNC_SECRET=...
NEXT_PUBLIC_SITE_URL=https://droply.digital
```

`SYNC_SECRET` protects `/api/sync` when configured.

## Project structure

- `app/airdrops` — live discovery page
- `app/project/[slug]` — dynamic project pages
- `app/api/sync` — protected source sync endpoint
- `app/api/projects` — JSON project endpoint
- `lib/sync.ts` — normalization, source adapters and deduplication
- `lib/projects.ts` — live project loading and fallback
- `scripts/sync.js` — scheduled/static data refresh
- `data/projects.ts` — demo fallback
- `data/projects.generated.ts` — generated source data
