# Rollout report — https://www.motorola.com/ → aem-eds (2026-11-03)

```
rollout — https://www.motorola.com/ → aem-eds
==================================================
Pages       10 total · 10 verified · 0 deployed · 0 pending · 0 content-pending · 0 stale
Templates   4 (landing 2/2 · campaign 2/2 · static 3/3 · program 3/3)
Blocks      19 total · 19 converted · 0 pending
Quality     health 100/100 · open P1 0 / P2 0 / P3 0 (5 P3 source-parity titles, informational)
Pixel table prototypes 1440 2/4 PASS (pixel-only 4/4) · 360 2/4 PASS (pixel-only 4/4) — gates/prototypes-<w>/summary.md
            deployed 1440 4/10 PASS (pixel-only 10/10, +6 documented overrides → 10/10 delivered)
            deployed 360  4/10 PASS (pixel-only 10/10, +6 documented overrides → 10/10 delivered) — gates/all-<w>/summary.md
To deliver  none
Content     0 pages awaiting content track
```

Live origin: https://main--0d32c52e--aemcoder.aem.live/ — every page, nav/footer (+ /at/de variants) published.
Header contract: chrome-compare on the live host, 0 errors / 6 warnings (profile replica, 390 + 1440).
Links: 333 distinct hrefs; internal 7/7 live; 230 out-of-plan motorola.com targets stay on the source (fixed scope).
Structured data: source JSON-LD restored verbatim on all 10 pages (server-rendered).

The 6 overrides (per width) are documented residuals in `stardust/replica/gates/all-<w>/overrides.json`:
instrument artefacts (live nests "Jetzt kaufen" link-in-link so content-presence counts it twice; static
template unit families that do not occur on siblings; footer accordion family = foundation). The two
prototype-table FAILs are the same unit-family class; no page fails pixel, height or clip.

## Dynamic parity (stardust/qa/dynamics-report.md)

| feature | class | status | check | result |
|---|---|---|---|---|
| header mega menu + mobile drawer | M | done | dom-count | PASS |
| product rails / carousels | L | done | dom-count ×3 | PASS |
| muted in-view loop videos (program pages) | V | done | video-plays | PASS |
| newsletter + lead/contest webforms | F | scaffolded-awaiting-owner (D1) | dom-count | PASS |
| tags / RUM / consent (GTM, Evidon, ad pixels) | T | scaffolded-awaiting-owner | consent-gate | PASS |
| no uncaught script errors | X | done | no-page-errors | PASS |
| prices, cart, account, sign-in | A | interim — owner decision D2 (live commerce integration) | — | — |

## What's missing

Nothing in scope. Owner decisions open (not delivery gaps): D1 form endpoints, D2 commerce integration,
tag-manager container go-live. One source-side broken link (US nav, `/us/en/p/…/mnq1525`) is carried
verbatim — fix at the source.
