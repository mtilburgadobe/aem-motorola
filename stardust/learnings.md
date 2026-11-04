# Learnings — motorola.com replica run (2026-11-03)

### Override reasons go stale when the live page changes after the gate
- failure class: capture-gap (live state drift masked by a documented override)
- evidence: `/at/de/homepage` 360 re-gated at 24.66% / Δh 60 while `all-360/overrides.json` still read "pixel 6.25%" and kept the row delivered. Cause: live now sets the reco rail art box to an inline 186px on phones (it rendered 130px when the archetype was gated). Fixed in `blocks/reco/reco.css` → 7.96%, Δh 4.
- proposed change: `skills/replica/scripts/gate-all.mjs` — an override whose recorded pixel/Δh differs from the current row by more than the bar re-opens the row (or the summary flags it `override-stale`) instead of silently delivering it; `done-check.mjs` reads that flag.
- status: pending

### Prototype table never written in a run that gated archetypes per breakpoint
- failure class: capture-gap (evidence of record missing)
- evidence: `stardust/replica/gates/prototypes-<w>/` absent at H-report although all 4 archetypes passed their gate.sh rounds; written retroactively with `gate-all.mjs --stage prototype`.
- proposed change: `skills/replica/SKILL.md` § Phase 4 — `ledger.mjs replica recreate end` refuses (under --strict) when `prototypes-<w>/summary.json` is missing for a gate width.
- status: pending

### Source JSON-LD dropped by the encoder
- failure class: dynamic-gap (head-level content not carried)
- evidence: optimize flagged 10 P2 `ai-search/jsonld`; the captures carry BreadcrumbList + WebSite/Organization. A `JSON-LD` metadata row renders server-side as `<script type="application/ld+json">` on aem.live — no code needed.
- proposed change: `skills/migrate/reference/content-preservation.md` + `skills/deploy` encoder — copy captured JSON-LD into a `JSON-LD` metadata row at render time; `autofix-aem.mjs` `eds-jsonld` gets a deterministic fixer from the capture when one exists.
- status: pending

### header_parity measured on .page, done-check wants the live host
- failure class: path-safety (right instrument, wrong origin)
- evidence: done-check gap `header_parity:compared on …aem.page, not the live host …aem.live` after the whole rollout ended; re-ran chrome-explore + chrome-compare against aem.live (0 errors).
- proposed change: `skills/replica/reference/handoff-contract.md` § 3 row C0 — run the header contract compare against the `.aem.live` host once the foundation is published.
- status: pending
