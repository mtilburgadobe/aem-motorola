# Dynamics parity check — https://main--0d32c52e--aemcoder.aem.live — 2026-11-03T21:23:51.900Z

Replayed 8 checks over 7 features · pass 8 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| header mega menu + mobile drawer | M | done | dom-count | PASS | 7 × header .hdr-nav .hdr-item (min 2) |  |
| product rails / carousels | L | done | dom-count | PASS | 3 × .hcar .hcar-slide (min 3) |  |
| product rails / carousels | L | done | dom-count | PASS | 4 × .reco .reco-card (min 4) |  |
| product rails / carousels | L | done | dom-count | PASS | 1 × .catchlist (min 1) | assets.motorola.com:206×5 |
| muted in-view loop videos (program pages) | V | done | video-plays | PASS | iframe/video: false · video playing (Δt 0.81s) | assets.motorola.com:206×9 |
| newsletter + lead/contest webforms | F | scaffolded-awaiting-owner | dom-count | PASS | 1 × .webform form (min 1) |  |
| tags / RUM / consent (GTM, Evidon, ad pixels) | T | scaffolded-awaiting-owner | consent-gate | PASS | no request to 3 gated host pattern(s) before consent |  |
| no uncaught script errors | X | done | no-page-errors | PASS | none on 10 page(s) |  |

## Features without checks

- prices, cart, account, sign-in (A) — interim · owner: decision D2: live commerce integration
