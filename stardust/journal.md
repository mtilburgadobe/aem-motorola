# Journal — motorola.com replica

## Extract — 10 plan pages captured live, Evidon consent handled (2026-11-03)

- `crawl.mjs --pages <10 plan URLs> --dynamics`: 10/10 live (playwright, 200, waitMs>0). `/` redirects to `/us/en/homepage` (slug `index`).
- Vision check: 3 AT pages (homepage, brilliant-collection, brilliant-collection-2026) captured only the first viewport — the Evidon consent barrier appears ~2 s after DOMContentLoaded and sets `aria-hidden` on the page + `overflow:hidden`, so the crawler's visibility filter dropped every heading. Instrument fix (documented, run-local, flagged for upstreaming): `stardust/scripts/crawl-evidon.mjs` = crawl.mjs + `#_evidon-banner-acceptbutton` first in the selector list + a second consent pass after the settle wait. Recaptured → 17/10/12 headings.
- Instruments without a `--consent` flag (chrome-explore) run with `node --import ./stardust/scripts/consent-shim.mjs …`, which prepends the Evidon selector to live-session's shared `CONSENT_CANDIDATES` (no script edited). Gate rounds pass `--consent "#_evidon-banner-acceptbutton"`.
- Census (1440+360), brand surface, PRODUCT/DESIGN (descriptive), brand-review.html, fonts (Montserrat OFL, 5 subsets; icomoon site icon font; Gotham/MotoSans declared but never loaded), logo.
- Header contract: AT `stardust/chrome/header-contract.json` (1440: 5 controls/15 states; 390: 3/3), US `header-contract-us.json` (6/17; 3/3). Hover mega menu.
- cap-probe on archetypes: contentMaxWidth 1920 (home/offers) vs fluid (razr/motocare), shell fluid, probeWidth 2560.
- Page types: landing (index, at-de-homepage), program (brilliant ×2, razr-fold-fifa), campaign (offers, contest), static (motocare, business-edition, motoverse). Archetypes: at-de-homepage, at-de-razr-fold-fifa-world-cup-edition, at-de-offers, at-de-motocare (AT archetypes share one chrome; US index is a locale-chrome sibling).
- Ran linearly (not the first-page-first two-track opening): a 10-page pages-scoped run; one sequential pass keeps one writer per path.

## Preserve direction — verbatim promotion, empty register, dynamics triaged (2026-11-03)

- current/PRODUCT.md, DESIGN.md, DESIGN.json promoted verbatim to the project root (DESIGN.json added to .hlxignore; *.md already ignored). `stardust/direction.md` records PRESERVE mode.
- Inconsistency register: empty — pure replica. cap-probe's single-module caps are replicated as captured.
- No --target-breakpoints: source breakpoints kept.
- Dynamics: detect on 5 pages (archetypes + US home) → 77 findings; plan drafted with --target-origin (12/12 first-party APIs host-bound) and curated into `stardust/dynamic-features.md`: 11 groups, every row dispositioned; owner decision batch D1–D5 (forms backend, live commerce data, cart/account, tags/consent, locale scope) — interim tiers ship.

## Recreate — landing archetype at-de-homepage gated (2026-11-03)

- Canon authored: `stardust/prototypes/canon.css` (fonts, tokens, AT bar/header/footer, banner, recommendations, carousel, trending, newsletter, legal) + `chrome.js`; page layer `at-de-homepage.css/.js`.
- 1440: 2.62% · Δh 1 · content-diff 0/0 · clipped 0 (iter3). 360: iter3 10.67% → fixes → recorded `confirm --full` round 5.15% · Δh 5 · 0/0 · clipped 0. cap-probe PASS.
- Residuals: see progress.json (gallery autoplay band, API-fed trending tabs, signup modal, live newsletter overflow at 360, font-face advisory, unit inner-element noise → reco/trending families advisory).
- Note: at 360 with a desktop UA the live site serves the squeezed desktop header (no drawer) — the canon replicates that.

## Source-fidelity-gate — at-de-homepage passes 1440 and 360 (2026-11-03)

- Numbers above (Recreate section); approved hands-off.

## Recreate — static archetype at-de-motocare gated (2026-11-03)

- 1440 0.45% Δh1 0/0 clip0; 360 1.70% Δh5 0/0, clip 6 = live-identical clipping replicated as captured; cap PASS after 1980px row cap fix. Footer variant on this template (no 20px container padding, 15% columns) lives in the page CSS — back-port at C0.

## Recreate — campaign archetype at-de-offers gated (2026-11-03)

- 1440 0.34% Δh0 0/0 clip0; 360 1.06% Δh-1 0/0 clip0 (iter3b re-run after a reverted guess); cap PASS. Modules .banner--static, .reco--deal; footer variant in page CSS — back-port at C0.

## Recreate — program archetype at-de-razr-fold-fifa-world-cup-edition, all four archetypes done (2026-11-03)

- 1440 5.50% · Δh −61 (sticky-nav capture artefact, in-flow footer within 1px) · 🟡2 (carousel mid-slide) · clip 0; 360 6.67% · Δh 2 · 🟡2 · clip 0 against a frozen --vh 640 baseline (live capture stalls). cap PASS. Iteration cap reached → residuals logged in progress.json, approved hands-off.
- Canon back-port queue for C0: per-template footer variant (no 20px row padding, 176px/15% columns, 16/50 link row, #ccc mobile dividers, 300px social block) appears on motocare, offers AND program pages → it is the AT footer; homepage canon footer to be re-verified. `sup { font-size: smaller }`. Heading-face advisory comes from canon font stack.

## Plan — migrate plan: archetypes rendered, siblings queued (2026-11-03)

- Phase 5 handoff opened. Migrate plan: 4 approved archetypes rendered Path A into stardust/migrated/ (rendered 4, refused 0); modules[] declared from prototype section classes.
- 6 siblings (index→landing; brilliant-collection-2026, brilliant-collection→program; motoverse, business-edition→static; contest→campaign) render Path A′ only after their archetype unit is live and gated (#126). "Broken" links = out-of-scope targets, repointed to source at E2.

## A-inventory — 10 pages inventoried (2026-11-03)

- inventory.mjs: 10 pages · 4 pending (archetypes) · 6 content-pending (siblings). DA org aemcoder, site 0d32c52e, ref main; live host main--0d32c52e--aemcoder.aem.live.

## B-block — 19 distinct blocks, representative-first plan (2026-11-03)

- blocks.mjs: 19 module blocks, 23 instances. plan.mjs: homepage, motocare, razr archetypes convert; offers reuses banner+reco (as variants banner--static, reco--deal); stack and legal shared across templates. Archetype units run in the order landing → campaign → static → program so shared blocks are authored once and extended by variant.

## B2-dynamic — inventory re-verified, no new classes (2026-11-03)

- detect (71 findings) + plan --target-origin: host-bound 11/11 first-party APIs (interim tiers D2/D3), 7 delivered by capture; groups and decisions D1–D5 unchanged.

## C-deliver foundation — chrome live, foundation frozen (2026-11-03)

- C0 subagent: Montserrat self-hosted + icomoon, real favicon, header/footer blocks, nav resolution (metadata → /<cc>/<ll>/nav → /nav), 4 chrome docs live with Robots noindex; shell /at/de/homepage preview-only. chrome-compare exit 0 at 1440/390 (4 fix rounds).
- Footer: program/AT footer default; `Footer Variant | padded` metadata restores the homepage's padded footer — the landing unit must keep that row.
- Main-agent chrome-parity: header fixed vs sticky + Δw −5, footer link underline at 360 → foundation-requests.md. Frozen.

## C-deliver archetypes — landing and static live and gated (2026-11-03)

- archetype-static: motocare live; 1440 0.4% Δh0; 360 1.65% Δh14, clip 6 = live (clip-allow), units residual = prototype (overrides.json). Blocks fullbleed, media-row, compare, stack.
- archetype-landing: homepage live; 1440 3.77% Δh0; 360 6.25%, clip 1 = live (allow), MISSING 4 = nested-link double count (override). Blocks banner(+static), reco(+deal), hcar, tiles, trend, gallery, news, legal.
- gate-all needs `deployed` rows: `stardust/scripts/rollout-local/gate-state.mjs` builds stardust/rollout/gate-state.json from coverage; pass `--state` it and a full https `--eds-host`.
- Static cluster (motoverse, business-edition) started and was stopped at the session boundary: unit `static` still `running` in both ledgers — re-run it from the brief stardust/rollout/briefs/cluster-unit.md (variance: siblings share no archetype sections).

## C-deliver archetype — campaign (offers) live and gated (2026-11-03)

- archetype-campaign: /at/de/offers live; 1440 2.3% Δh 10px; 360 5.3% Δh 24px; clipped 0. MISSING 12/6 + HIDDEN 3 = live `a > div > a` nested buy-link double count (+ one prototype-identical button spill per rail at 360) — overrides in gates/all-<w>/overrides.json, same policy as homepage.
- Reused banner (+`static`) and reco (+`deal`: paging, swatches, was/now price); homepage path unchanged. 1 fix round.

## C-deliver cluster — static siblings motoverse and business-edition live (2026-11-03)

- motoverse 1440 0.62% Δh0 / 360 1.73% Δh14 (clip 6 live-identical); business-edition 1440 3.44% Δh50 / 360 7.43% Δh57 (clip 2 live-identical). Content MISSING/HIDDEN 0.
- New blocks spotlight, hub, slider, webform (no backend, D1), faq; fullbleed `left` variant. 2 fix rounds each.
- Allowances: clip-allow (360) + overrides (units: motocare families absent on siblings; footer accordion = foundation). New blocks not in rollout plan.json → coverage --block refused; register at C-final.

## C-deliver cluster — campaign sibling contest live (2026-11-03)

- contest 1440 1.76% Δh2 (MISSING 3 = nested buy-link double count, override) / 360 6.37% Δh31 PASS. 3 fix rounds.
- New block copy (title/fine/partners); banner `solo`, reco `flush` + deal out-of-stock state; offers re-gated unchanged (2.3/5.3%). 1 foundation request (stack headline variant).

## C-deliver archetype — program (razr-fold FIFA edition) live and gated (2026-11-03)

- 1440 5.64% Δh+1 / 360 3.34% Δh+14; clip 0, MISSING/HIDDEN 0 — PASS both. 1 fix round (removed prototype body-padding workaround; live leaves sticky bar fixed at ≤767).
- New blocks subnav, pchero(+warm), pcarousel, dexp, vhero, cblock, flexview; variants fullbleed `program`, legal `plain`. Videos: muted in-view loops (restoreAtDelivery).
- Residuals: live sticky-bar timing flips 1440 Δh (−62 artefact, known); hero video frame vs poster; HLS CORS limits non-Safari/Chrome browsers to the poster; unit-geometry advisory unreliable here.

## C-deliver cluster — program siblings live, three rows over the pixel bar (2026-11-03)

- brilliant-collection-2026: 1440 2.53% PASS; 360 30.25% Δh−55 FAIL — live mobile sticky bar flips in-flow/fixed between captures (≈66px shift), plus product-card captions visible where live stacks images over them.
- brilliant-collection: 1440 14.82% (HIDDEN 1 = autoplaying catchlist slide state) / 360 13.03% FAIL — live autoplay slide state, making-of video frame vs poster (CORS-blocked HLS).
- New blocks dualcar, pcards, catchlist. Fix cap exceeded at 360 (6 rounds) and stopped. Not overridden: card-caption delta is a real difference, left open for gate-all.

## C-deliver — session boundary with landing cluster in flight (2026-11-03)

- US home (index) is live; latest rows 1440 5.88% / 360 10.6% Δh−3, MISSING 5 — FAIL at 360 by 0.6 pt. Unit `landing` left `running`; resume from its last pushed state (reco crop at 360 was next), then gate-all → final.
- Open rows for gate-all: brilliant-collection-2026 360, brilliant-collection 1440/360 (see program cluster section).

## C-deliver cluster — landing sibling (US home) delivered (2026-11-03)

- 360 10.6% → 6.26% Δh−7, clip 0; 1440 4.61% Δh−5. Fixes: US rail 120px product art + 21/50px card padding on phones, hcar landscape copy gap 26px and next button at 219px, trend tabs and hcar next as real buttons (live semantics).
- Residuals (overrides.json, both widths): nested live Buy now links count twice (×4), hero slide link JOIN/SPLIT; unit families match in count, inner geometry off on squeezed rail cards.

## C-deliver gate-all — 10/10 delivered at 1440 and 360 (2026-11-03)

- Program fix round (pcards hover picture, fullbleed side, flexview tall, cblock card, vhero duo, catchlist rest slide): bc26 2.90/8.51%, bc 7.67/4.91% — all PASS; bc26 360 live-identical clip allowance 2. Archetype razr-fold re-gated 8.86/9.09% PASS.
- Roster: 4 PASS + 6 documented overrides per width; coverage updated (`update-coverage --gate`). Live capture-state residuals (sticky-bar flip, autoplay slides, video frame) noted, not chased.

## C-deliver final — foundation requests applied once, C-deliver closed (2026-11-03)

- freeze check clean; footer locale link underline removed ≤767 (applied), header fixed-vs-sticky not applied (roster passes; would shift every template); foundation re-frozen (18 files).
- Archetype re-gate: 1440 all 4 delivered (razr 8.77%); 360 homepage 6.95% (one run caught the live rail's loaded state, 24.66%), razr-fold live stitch now stalls (window scroll stuck at 7153 of 8159px — scroll-jacked live layout, instrument limit) → its row stands at the 20:55 stitched 9.09% PASS, content 0/0.

## D-site — sitemap served 10 = assembled 10, root 200, no redirects needed (2026-11-03)

- `assemble.mjs --verify-origin` aem.live: served 10 = assembled 10, extra 0, missing 0. `/` 200 on aem.page (index document = US home).
- Chrome documents /nav, /footer, /at/de/nav, /at/de/footer are published live with robots noindex.
- Redirects: none. Every page keeps its source path; the source root's 301 to /us/en/homepage points outside the plan (stardust/redirects.tsv records it).

## D2-dynamic — 8/8 parity checks pass on aem.live (2026-11-03)

- stardust/dynamics/parity.json covers 7 features. All 8 checks pass when replayed on aem.live:
  - header nav has 7 items;
  - carousels: hcar 3 slides, reco 4 cards, catchlist present;
  - the razr-fold video plays (Δt 0.81 s);
  - the webform UI is present;
  - consent gate: nothing calls GTM or Evidon before consent;
  - no page errors on any of the 10 pages.
- Waiting on the owner: webform backend (D1), tag/consent IDs, live commerce (D2). These were scaffolded or left interim and stay listed as decisions.

## E-full-site — 10/10 verified on aem.live (2026-11-03)

- verify.mjs at first: 4 pages 404, because the check added a trailing slash to the archetypes kept as `dir/index.html`. Coverage `source.migratedHtml` now points at the flat delivered path.
- Pages had no h1. Register entry 1 adds a hidden page-title h1 with verbatim text: the source h1 where it has text, otherwise the captured title. New block `page-title` (sr-only, zero height) on 8 pages, which were redeployed and published; the 2 pages that already had an authored h1 were left alone.
- Roster re-gated: no visual change, EDS heights identical. bc 1440 needed one re-run after the live sticky-bar flip (7.72% PASS). Both widths: 4 PASS + 6 overrides, 10/10 delivered.
- verify --all: 10 verified / 0 failed; coverage updated from both gate tables.

## E2-link-audit — every href checked, internal 7/7 live, scope-extension links stay on source (2026-11-03)

- localize-links --check exit 0: no source-host link resolves inside the delivered tree that is not already root-relative.
- href audit over 14 documents, 333 distinct hrefs: internal 7/7 → 200 on aem.live; 230 out-of-plan motorola.com targets kept absolute (scope extension, plan fixed at 10 pages); 65 external 200.
- Non-200s are outside the tree: support.motorola.com 401/403 and facebook 400 to non-browser fetch; one US-nav product link 404s on the live source as well — kept verbatim, recorded in direction.md.

## F-optimize — gate clean: 0 P1, 10 P2 (JSON-LD dropped), 5 parity P3 (2026-11-03)

- optimize --all on aem.live: 10 pages, health 50, seo 100. Gate passes with no open P1.
- 10 P2 ai-search/jsonld findings: the source pages carry JSON-LD (BreadcrumbList + WebSite on the /at/de pages, BreadcrumbList + Organization on the US home) and the delivered pages had none. This is content the migration lost, fixed in G verbatim from the capture (stardust/.work/rollout/jsonld/).
- 5 P3 title-length findings are source parity (the source has the same titles): informational, kept as captured.

## G-aem — source JSON-LD restored on all 10 pages, optimize 0 open (2026-11-03)

- autofix-aem dry run: 10 eds-jsonld candidates, all manual (no deterministic fixer).
- Restored verbatim from the capture as a `JSON-LD` metadata row per page (one `@graph` of the source's blocks: BreadcrumbList + WebSite on /at/de, BreadcrumbList + Organization on the US home). The EDS pipeline renders it server-side as `<script type="application/ld+json">` in the head, so crawlers see it without JS.
- Redeployed and published 10/10 (deploy-batch, ledger stardust/deploy/ledger-jsonld.json). optimize run-2: health 100, open P1/P2/P3 0, 10 P2 fixed; 5 P3 source-parity titles stay informational. verify --all: 10/10 verified.
- Head-only change: nothing in the body moved, so no re-gate was needed.

## H-report — report written; homepage 360 rail fixed, prototype table and live-host header check added (2026-11-03)

- Gathering the report found three record gaps, all closed: (1) `/at/de/homepage` 360 re-gated at 24.66%/Δh 60 behind a stale override; live now gives the reco art box 186px on phones. reco.css mobile height 130→186 pushed, homepage 360 → 7.96% Δh 4 (index/offers/contest unchanged); all-360 recomputed: pixel-only 10/10. (2) The prototype tables were missing; `gate-all --stage prototype` wrote them (pixel 4/4 at both widths; 2 unit-family FAILs as in the published table). (3) done-check wanted the header contract on the live host; chrome-compare on aem.live: 0 errors.
- stardust/rollout/report.md holds the summary block + dynamic parity table; stardust/learnings.md has 4 pending entries.

## I-dashboard — dashboard rendered, 10/10 pages optimised (2026-11-03)

- dashboard.mjs → stardust/rollout/dashboard/{index.html,data.json}: identified 10 · prototyped 10 · deployed 10 · optimised 10.
- The 5 source-parity title-length P3s were accepted (the source carries the same titles; replica keeps content verbatim), so no page shows an open finding.

## Handoff — run complete: 10/10 pages live on aem.live, done-check clean (2026-11-03)

- migrate → deploy → rollout A…I all ended. 10/10 pages verified and published, nav/footer (+ /at/de) published, sitemap served 10, / answers 200.
- Gates: deployed pixel-only 10/10 at 1440 and 360 (+6 documented overrides per width); header contract on the live host 0 errors; optimize health 100, nothing open; dynamics parity 8/8.
- Runner done-check: complete, no gaps. Owner decisions left open (not delivery gaps): D1 form endpoints, D2 commerce, tag go-live.
