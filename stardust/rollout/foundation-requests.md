# Foundation change requests (applied once at C-final)

- foundation-gate | header region position: live `fixed`, build `sticky`; region width Δw −5px (1440→1435, 360→355) | chrome-parity 1440/360 on /at/de/homepage shell (exit 2; icon-signature and Δy offset lines are DA media renames / shell height, not deltas) | all templates
- foundation-gate | footer "Standort ändern": live `<p>` no underline, build `<span>` underlined at 360 | chrome-parity 360 | all templates
- foundation | US chrome checked by .plain.html only: footer logo ~30px vs live ~34px; "software & support" columns panel unverified | C0 report | landing (index)
- campaign | stack (stackmain) has no headline variant: contest 'Die Aktion ist beendet' is a 45px bold centred stack_heading, stack only styles the grey legal stack | live /at/de/contest .stack_heading 48/45px 700 | campaign (worked around with copy.title)

## C-final disposition (2026-11-03)

- header fixed vs sticky / Δw −5px — NOT applied: all 10 pages pass the roster gate (gate-all 1440 + 360) with the sticky header; a fixed header removes it from flow on every template and would invalidate the whole roster gate for a delta the pixel gate does not see at rest. Logged as residual.
- footer "Standort ändern" underline at 360 — APPLIED (blocks/footer/footer.css, ≤767 underline removed); archetypes re-gated at both widths.
- US footer logo / software & support panel — no instrument evidence of a delta beyond .plain.html; index passes gate-all at both widths. Closed, no change.
- campaign stack headline variant — closed: worked around in-block (copy.title); contest passes gate-all.
