<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-03T15:15:03.773Z · input stardust/current/_dynamics.json (4 pages, 71 findings) · target probe https://main--0d32c52e--aemcoder.aem.page · reconciled against stardust/migrated -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-digitalfeedback-us-confirmit-com | A | unknown third-party host digitalfeedback.us.confirmit.com | 4/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-first-party-api-post-9qtlu9-y-wl-dqn-i2d-msdxsirc-ov5t0m4p | A | first-party API POST /9qTLU9/Y_wL/dqN/I2d/MSdXSiRc/OV5t0m4p1XbbrpV3/EltsWg/NzohY30/FPAg | 4/4 (reach 10/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 3 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 4/4 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 4 | a-cms-app-settings-object-utag-data | A | CMS / app settings object utag_data | 4/4 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 5 | a-unknown-third-party-host-trial-eum-clientnsv4-s-akamaihd-n | A | unknown third-party host trial-eum-clientnsv4-s.akamaihd.net | 3/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 6 | a-unknown-third-party-host-trial-eum-clienttons-s-akamaihd-n | A | unknown third-party host trial-eum-clienttons-s.akamaihd.net | 3/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 7 | a-first-party-api-get-at-de-auth-assign-cookie | A | first-party API GET /at/de/auth/assign_cookie | 3/4 (reach 9/10) | data-fed | — | needs-backend | pending | decided-out | none (session-bound off-origin) | **dead on target (404)** |
| 8 | a-first-party-api-get-at-de-api-cart-count | A | first-party API GET /at/de/api/cart/count | 3/4 (reach 2/10) | data-fed | — | needs-backend | pending | decided-out | none (session-bound off-origin) | **dead on target (404)** |
| 9 | a-unknown-third-party-host-c-amazon-adsystem-com | A | unknown third-party host c.amazon-adsystem.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 10 | a-unknown-third-party-host-cdn-equalweb-com | A | unknown third-party host cdn.equalweb.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 11 | a-unknown-third-party-host-www-google-com | A | unknown third-party host www.google.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 12 | a-unknown-third-party-host-pixel-config-reddit-com | A | unknown third-party host pixel-config.reddit.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 13 | a-unknown-third-party-host-alb-reddit-com | A | unknown third-party host alb.reddit.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 14 | a-unknown-third-party-host-p-tvpixel-com | A | unknown third-party host p.tvpixel.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 15 | a-unknown-third-party-host-s-amazon-adsystem-com | A | unknown third-party host s.amazon-adsystem.com | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 16 | a-unknown-third-party-host-naojrgixhbw4i2xj7jaa-pyb1bt-e5692 | A | unknown third-party host naojrgixhbw4i2xj7jaa-pyb1bt-e56927f7c-clientnsv4-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 17 | a-unknown-third-party-host-fie3vrlcjiiyojqacqde4aaaczvot6sa- | A | unknown third-party host fie3vrlcjiiyojqacqde4aaaczvot6sa-pyb1bt-977e5aa8f-clienttons-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 18 | a-first-party-api-get-us-en-auth-assign-cookie | A | first-party API GET /us/en/auth/assign_cookie | 1/4 (reach 1/10) | data-fed | — | needs-backend | pending | decided-out | none (session-bound off-origin) | **dead on target (404)** |
| 19 | a-first-party-api-get-us-en-api-cart-count | A | first-party API GET /us/en/api/cart/count | 1/4 (reach 1/10) | data-fed | — | needs-backend | pending | decided-out | none (session-bound off-origin) | **dead on target (404)** |
| 20 | a-first-party-api-get-us-en-online-moto-getmotopictureswitch | A | first-party API GET /us/en/online/moto/getMotoPictureSwitch | 1/4 (reach 1/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 21 | a-first-party-api-get-us-en-detail-price-batch-get | A | first-party API GET /us/en/detail/price/batch/get | 1/4 (reach 1/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 22 | a-first-party-api-post-us-en-marketing-webformcomponent-getw | A | first-party API POST /us/en/marketing/webformComponent/getWrbforms | 1/4 (reach 1/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 23 | a-first-party-api-get-us-en-online-moto-getaccessorybindsfor | A | first-party API GET /us/en/online/moto/getAccessoryBindsForList | 1/4 (reach 1/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 24 | a-unknown-third-party-host-naojrgixhbw4i2xj7jgq-pj04tx-f6b44 | A | unknown third-party host naojrgixhbw4i2xj7jgq-pj04tx-f6b444eb4-clientnsv4-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 25 | a-unknown-third-party-host-fie3vrlcjmiyojqacqde4aaaczvot6sn- | A | unknown third-party host fie3vrlcjmiyojqacqde4aaaczvot6sn-pj04tx-1e5880e14-clienttons-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 26 | a-unknown-third-party-host-naojrgixhbw4i2xj7jsq-pj1pm7-5bcaa | A | unknown third-party host naojrgixhbw4i2xj7jsq-pj1pm7-5bcaab5db-clientnsv4-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 27 | a-unknown-third-party-host-fie3vrlcjiiyojqacqde4aaaczvot6tf- | A | unknown third-party host fie3vrlcjiiyojqacqde4aaaczvot6tf-pj1pm7-081f6a8a5-clienttons-s.akamaihd.net | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 28 | a-first-party-api-get-at-de-online-moto-getmotopictureswitch | A | first-party API GET /at/de/online/moto/getMotoPictureSwitch | 1/4 (reach 3/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 29 | a-first-party-api-get-at-de-detail-price-batch-get | A | first-party API GET /at/de/detail/price/batch/get | 1/4 (reach 3/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 30 | cr-main-empty-at-load-filled-after-client-rendered-page | CR | main empty at load, filled after (client-rendered page) | 1/4 | static-snapshot | content | needs-human-capture | pending | client-rendered-page | human-browser capture; never migrate blank |  |
| 31 | f-form-form-no-action-js-wired-2-fields | F | form "form" → no action (JS-wired) (2 fields) | 1/4 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 32 | f-form-text-moto-first-name-text-moto-last-name-no-action-js | F | form "text:moto.first.name+text:moto.last.name" → no action (JS-wired) (6 fields) | 1/4 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 33 | i18n-locale-variants-hc-hc | I18N | locale variants hc,hc | 1/4 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 34 | i18n-locale-variants-gb | I18N | locale variants gb | 1/4 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 35 | i18n-locale-variants-gb-gb | I18N | locale variants gb,gb | 1/4 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 36 | i18n-locale-variants-qr-qr-qr-qr-qr | I18N | locale variants qr,qr,qr,qr,qr | 1/4 | rebuild-native | runtime | needs-business-decision | delivered-by-capture | locale-tree | scope of the locale trees | output already carries "https://eprel.ec.europa.eu/qr/2650792" |
| 37 | l-listing-candidate-carousel-track-9-cards | L | listing candidate carousel__track (9 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 38 | m-modal-trigger-modal-item-chrome-only-target-outside-dom-at | M | modal trigger modal-item (chrome only) → target outside DOM at capture | 4/4 (reach 10/10) | rebuild-native | runtime | self | delivered-by-capture | chrome-interaction | none (the header contract is the spec) | output already carries "https://account.motorola.com/at/de/accou" |
| 39 | t-unknown-third-party-host-c1-ofp-static-pub | T | unknown third-party host c1-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 40 | t-unknown-third-party-host-p1-ofp-static-pub | T | unknown third-party host p1-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "p1-ofp.static.pub" |
| 41 | t-unknown-third-party-host-p2-ofp-static-pub | T | unknown third-party host p2-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "p2-ofp.static.pub" |
| 42 | t-unknown-third-party-host-p4-ofp-static-pub | T | unknown third-party host p4-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "p4-ofp.static.pub" |
| 43 | t-unknown-third-party-host-p3-ofp-static-pub | T | unknown third-party host p3-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "p3-ofp.static.pub" |
| 44 | t-unknown-third-party-host-j1-ofp-static-pub | T | unknown third-party host j1-ofp.static.pub | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 45 | t-rum-akamai-mpulse | T | RUM: Akamai mPulse | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 46 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 47 | t-unknown-third-party-host-c-evidon-com | T | unknown third-party host c.evidon.com | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 48 | t-unknown-third-party-host-l-evidon-com | T | unknown third-party host l.evidon.com | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 49 | t-unknown-third-party-host-acef42ba-akstat-io | T | unknown third-party host acef42ba.akstat.io | 3/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 50 | t-unknown-third-party-host-www-redditstatic-com | T | unknown third-party host www.redditstatic.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 51 | t-unknown-third-party-host-static-narrativ-com | T | unknown third-party host static.narrativ.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 52 | t-unknown-third-party-host-sc-static-net | T | unknown third-party host sc-static.net | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 53 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 54 | t-unknown-third-party-host-motorolaus500z-btttag-com | T | unknown third-party host motorolaus500z.btttag.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 55 | t-unknown-third-party-host-www-upsellit-com | T | unknown third-party host www.upsellit.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 56 | t-analytics-session-replay | T | analytics: session replay | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 57 | t-unknown-third-party-host-c-tvpixel-com | T | unknown third-party host c.tvpixel.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 58 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 59 | t-unknown-third-party-host-tr-snapchat-com | T | unknown third-party host tr.snapchat.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 60 | t-unknown-third-party-host-pixel-tapad-com | T | unknown third-party host pixel.tapad.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 61 | t-unknown-third-party-host-adservice-google-com | T | unknown third-party host adservice.google.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 62 | t-unknown-third-party-host-tr6-snapchat-com | T | unknown third-party host tr6.snapchat.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 63 | t-unknown-third-party-host-analytics-ipv6-tiktokw-us | T | unknown third-party host analytics-ipv6.tiktokw.us | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 64 | t-unknown-third-party-host-c-bing-com | T | unknown third-party host c.bing.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 65 | t-unknown-third-party-host-app-upsellit-com | T | unknown third-party host app.upsellit.com | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 66 | t-unknown-third-party-host-ace99add-akstat-io | T | unknown third-party host ace99add.akstat.io | 1/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 67 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 1/4 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |
| 68 | x-sign-in-account-links | X | sign-in / account links | 4/4 | decided-out | — | needs-backend | delivered-by-capture | decided-out | auth / commerce on the new host? | output already carries "https://account.motorola.com/at/de/accou" |
| 69 | x-commerce-signals-cart-true-prices-0 | X | commerce signals (cart: true, prices: 0) | 2/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 70 | x-commerce-signals-cart-true-prices-6 | X | commerce signals (cart: true, prices: 6) | 1/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 71 | x-commerce-signals-cart-true-prices-80 | X | commerce signals (cart: true, prices: 80) | 1/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 2 row(s) — read-settings.
- **One owner decision batch:** 59 row(s) — inspect the XHR, add a vendor row · which tier for the target host; consumer on the migrated pages? · none (session-bound off-origin) · human-browser capture; never migrate blank · production endpoint; interim capture ships now · scope of the locale trees.
- **Already delivered by the capture pipeline:** 7 row(s) — no work.
- **Host-bound on the target:** 11 of 11 probed API paths — the off-origin data work.

## Phases

- **tags** — 28
- **detect** — 18
- **register** — 8
- **off-origin data** — 7
- **locale wave** — 4
- **forms** — 2
- **capture** — 1
- **listings** — 1
- **interactive** — 1
- **embeds** — 1
