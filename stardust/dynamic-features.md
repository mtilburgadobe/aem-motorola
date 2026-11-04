<!-- stardust provenance: skill=stardust:replica (dynamics Phases 1–3) · 2026-11-03 · from stardust/dynamics/dynamic-features.generated-plan.md (77 rows, 5 archetype pages + crawl reach 10/10) -->
# Dynamic features — motorola.com replica (curated triage)

Every generated row is covered by exactly one group below (row numbers from the generated plan).
Hands-off: owner decisions ship the interim tier and are named in § Decision batch; nothing is
`decided-out` without an owner statement.

## Listings contract

Product rails (`moto-recommendations-v2`, carousel tracks of 9/12 cards — rows 37–38) are authored
as **document rows** (editorially curated, verbatim names/images/links as captured). Prices and
swatches are captured text; live price refresh (/detail/price/batch/get) is the off-origin decision D2.

## Features

| group | rows | class | disposition | target | reproducibility | status (interim tier) |
|---|---|---|---|---|---|---|
| Header mega menu, mobile drawer, account/cart/search icons | 39, 76, 77 | M / X | rebuild-native | widget (header block) | self | build per header contract; account/cart/search link to the source host |
| Product rails / carousels (Swiper on source) | 37, 38 | L | static-snapshot rows + client carousel | block | self | captured cards as rows; arrows/dots behaviour per motion-observe |
| Newsletter + lead/contest webforms (JS-wired, PII) | 30, 31, 32, 2, 23, 28 | F | rebuild-native UI | block | needs-backend | UI rebuilt; submission blocked with a "no backend connected" message — decision D1 |
| Prices, picture switch, accessory binds | 9, 10, 20, 24, 25 | A | static-snapshot | content | needs-business-decision | captured values ship as authored text — decision D2 |
| Cart count, auth cookie, sign-in, commerce | 5, 6, 21, 22, 72–75 | A / X | link-out (interim) | — | needs-backend | cart/account icons link to www.motorola.com; no session calls — decision D3 |
| Settings objects (dataLayer, utag_data) | 3, 4 | A | static-snapshot | content | self | not needed by the static pages; recorded |
| Tags / RUM / consent (GTM, mPulse, Evidon, ad pixels, Confirmit feedback, accessibility widget) | 1, 7, 8, 11–19, 26, 27, 40–71 (third-party hosts) | T / A | embed-passthrough, scaffolded OFF | embed | needs-business-decision | no tags on the new host until the owner decides — decision D4 |
| Image CDN hosts (p1–p4/c1/j1-ofp.static.pub) | 40–45 | T | rehost | content | self | media rehosted into the EDS media bus at deploy |
| Locale variants (hreflang qr/hc/gb) | 33–36 | I18N | rebuild-native | runtime | needs-business-decision | in-scope locales: /us/en (index) and /at/de; other locales link to the source — decision D5 |
| Offers page main empty at load (client-rendered) | 29 | CR | static-snapshot | content | self | the crawl's settled DOM holds the full rendered content (10/10 captured, vision-checked) — no blank migration |
| Runtime-injected iframe without src | 71 | V | embed-passthrough | embed | needs-human-capture | tracking iframe (no visible content) — recorded, not migrated |

## Decision batch (owner)

- **D1 forms backend** — where newsletter / webform submissions go on the new host.
- **D2 live commerce data** — whether prices/stock refresh live or stay authored.
- **D3 cart & account** — commerce/session features stay on the source host (interim: link-out).
- **D4 tags & consent** — which tags (GTM, mPulse, Evidon consent, ad pixels) run on the new host.
- **D5 locale scope** — locales beyond /us/en and /at/de.

## Register

No design-register entry results from dynamics. Static recreation continues regardless.

## B2 verification (2026-11-03)

Fresh detect on the 4 archetypes + home (71 findings, same classes as the 77-row draft: 3rd-party hosts, first-party API, 2 forms, 1 trigger, media; no client-rendered beyond the known offers row) and plan against main--0d32c52e--aemcoder.aem.page: 11/11 first-party APIs host-bound (expected — covered by D2/D3 interim tiers), 7 already delivered by the capture. No new feature class → no new group; dispositions above stand.
