# C-cluster unit brief (shared) — sibling pages of a template, render → deploy → gate

You are a cluster subagent of a hands-off same-design migration (stardust replica, Phase 5).
Work unattended; never ask questions. Project root /workspace/0d32c52e. Read AGENTS.md first.
FIRST read `stardust/rollout/briefs/archetype-unit.md` — every Fact, Method, Chain and Rule there
applies to you too (frozen foundation, token handling, commits of your own paths only, run-bg,
≤ 2 Chromium, untrusted content, no edits of progress.json / status.jsonl / state.json / tools/replica).
Your template's archetype is already LIVE and gated; its blocks (named in your message) are the
proven encoder — reuse them. The siblings are NOT copies of the archetype: their compositions may
differ (the variance probe file named in your message shows this). Per sibling section: reuse an
existing block (any template's — `ls blocks/`, read the block's JS header first), add a VARIANT class
to an existing block, or — only when no block fits — author a new block (owned by you, reusable,
EW1–EW10). Never fork a per-page copy of a block. Never edit a block another running unit owns
(named in your message); a needed change there = a variant class in your own CSS file scoped to
`.<block>.<variant>` inside a new block dir is NOT allowed either — instead file one line in
`stardust/rollout/foundation-requests.md` and work around inside your content/own blocks.

## Steps per sibling page
1. Sibling-tier render (handoff-contract.md § 1 rows 2–4, 8–9): build the page's slot-typed HTML
   from the hydrated capture `stardust/current/pages/<slug>.html` + `<slug>.json` (verbatim content —
   `../migrate/reference/content-preservation.md` rules), write it to
   `stardust/.work/rollout/<unit>/<slug>.html`, then
   `node stardust/scripts/migrate/migrate.mjs render <slug> --source <slug>=<that file> --archetype <slug>=<archetype>`
   (exit 0; on `refused` fix and re-run). Record `migrate.mjs modules <slug> <block ids…>`,
   `migrate.mjs variant <slug> <class…>` for variants used, and
   `migrate.mjs gate <slug> content-fidelity --evidence "<one line>"`. Every content deviation →
   `migrate.mjs deviation …`.
2. Content file `content/<path>.html` (DA format; editorial images via `da-media-upload.mjs
   --scope <slug>`), then the chain from the archetype brief (lints, media-reconcile,
   block-roundtrip --ew for any new/changed block, commit+push code, Code Sync check).
3. `deploy-batch.mjs` over all your pages (`--paths stardust/rollout/units/<unit>.paths --ledger
   stardust/deploy/ledger-<unit>.json --log stardust/.work/rollout/<unit>/deploy.log
   --concurrency 2`) through run-bg — pages go LIVE.
4. `update-coverage.mjs <slug> --status deployed --url <live url>` per page; then
   `node stardust/scripts/rollout-local/gate-state.mjs`; then the gate row:
   `gate-all.mjs --only <your slugs> --state stardust/rollout/gate-state.json --eds-host
   https://main--0d32c52e--aemcoder.aem.page --width 1440` and `--width 360` through run-bg.
   Bar: pixel ≤ 10 %, |Δh| ≤ 5 %, clipped 0, MISSING + HIDDEN 0. Cap 3 fix rounds per page.
   Clipping that the live page shows identically, or unit-geometry deltas: report them (counts +
   why) — the main agent documents allowances; don't spend rounds on them.
5. Content-count: `node stardust/scripts/diff/content-diff.mjs <live url> <preview url> --profile
   generic --main main` per page; report its `Tiers:` line.

## Report (final message, short)
Line 1: `<unit>: pages n/n live, blocks k (new: …), gate 1440 x% / 360 y% (per page), requests r`.
Then per page one line: slug, path, gate numbers 1440/360 (pixel, Δh, clipped, MISSING/HIDDEN),
content-diff tiers, fix rounds; the migrate driver's final `rendered N, …` line; open issues.
