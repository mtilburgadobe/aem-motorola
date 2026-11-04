---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-03T13:54:51Z
  againstInput: https://www.motorola.com/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://www.motorola.com/
(10 plan pages: the US home and nine /at/de pages), promoted verbatim (no direct invocation,
no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-11-03T13:54:51Z).

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(empty — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Roster caps (cap-probe): contentMaxWidth 1920 on home/offers, fluid on program/static; shell fluid; probeWidth 2560.

## Link audit decision — E2 (2026-11-03)

Every `<a href>` in the delivered tree (14 documents, 333 distinct hrefs) was GET-checked.
- Internal: 7 root-relative targets (the plan pages), all 200 on aem.live; `localize-links --check` exits 0 (no source-host link left that resolves in the tree).
- In-scope captured pages: all 10 are delivered; none repointed. `site.captureGaps` is empty.
- SCOPE EXTENSION → repointed to the source site (kept absolute, verbatim): 230 www.motorola.com targets outside the fixed 10-page plan (product, family, compare, specials, other-locale pages) — the page scope is fixed for this run, so they stay on the source origin regardless of count.
- External: 65 hosts answer 200; facebook.com/MotoInDEAT answers 400 to a non-browser fetch (social host behaviour).
- *.support.motorola.com (24 hrefs) answer 401/403 to a non-browser fetch: the support host's own access control, carried verbatim from the source.
- One source-side broken link carried verbatim from the US nav: `https://www.motorola.com/us/en/p/motoaccessories/motohome/modems---routers/mnq1525` is 404 on the live source too. Content preservation keeps it as captured; owner to fix at the source/nav document.
Evidence: stardust/.work/rollout/probes/href-audit.json.
