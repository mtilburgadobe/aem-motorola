/**
 * copy — centred rich-text panel (live moto-flex-content without media, stackmain headline,
 * html_upload partner list). Reusable for any prose a campaign page carries between modules.
 *
 * Authoring: one cell (or several rows) of flat content — paragraphs (bold runs, line
 * breaks, inline links), headings, lists; everything is moved, in order, into one body.
 *
 * Variants (block classes):
 *   (none)   centred body copy, 16px / 1.8 (contest rules text)
 *   title    one-line headline stack, 45px bold, centred (live stackmain heading)
 *   fine     fine print, 12px grey, left-aligned in a 1020px column (legal notice)
 *   partners heading over a dark gradient band; every paragraph after the heading is one
 *            grid cell (6 / 3 / 2 columns) — retailer list
 *   seo      offer fine print in the live moto-cms-legal seoText row (US home): 16px navy copy,
 *            left-aligned in a 1200px column
 */

function cellNodes(cell) {
  const kids = [...cell.children];
  if (!kids.length && cell.textContent.trim()) {
    // harness-only fallback: bare text cell — wrap the existing text nodes
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    return [p];
  }
  return kids;
}

function div(className, ...nodes) {
  const d = document.createElement('div');
  d.className = className;
  d.append(...nodes);
  return d;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .copy-body')) return; // re-entrant
  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  if (block.classList.contains('partners')) {
    const at = nodes.findIndex((el) => /^H[1-6]$/.test(el.tagName));
    const head = at < 0 ? [] : nodes.slice(0, at + 1);
    const items = at < 0 ? nodes : nodes.slice(at + 1);
    block.replaceChildren(div('copy-body', div('copy-head', ...head), div('copy-band', div('copy-grid', ...items))));
    return;
  }
  block.replaceChildren(div('copy-body', ...nodes));
}
