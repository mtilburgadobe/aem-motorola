/**
 * pcards — product card grid with hover image swap (live .icg_container interactive card grid,
 * .hdp_container hover display panel): each card shows a product picture, a name heading, a
 * colour line and a CTA pill. Hovering (or focusing) a card swaps its picture for the hover one
 * and reveals the CTA (desktop); ≤767px the CTA is always shown.
 *
 * Authoring: one card per row — media cell (resting picture, then the hover picture) | text
 * cell (heading, paragraph(s), CTA link paragraph). Cell order is free. A row holding only a
 * picture is the lead image (live hover display panel's large left image).
 *
 * @variants block: lead — one large lead image beside a single tall card (live .hdp_container)
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const pictureOf = (el) => (el.matches('picture, img') ? el : el.querySelector('picture') || el.querySelector('img'));
const isCta = (el) => el.tagName === 'P' && !!el.querySelector('a[href]') && !isMedia(el)
  && el.textContent.trim() === el.querySelector('a').textContent.trim();

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function buildRow(row) {
  const nodes = [...row.children].flatMap((c) => [...c.children]);
  const pics = [];
  const text = make('div', 'pcards-text');
  const cta = make('div', 'pcards-cta');
  nodes.forEach((n) => {
    if (isMedia(n) && !n.textContent.trim()) pics.push(pictureOf(n));
    else if (isCta(n)) cta.append(n);
    else text.append(n);
  });
  if (pics.length === 1 && !text.children.length && !cta.children.length) {
    return make('div', 'pcards-lead', pics[0]);
  }
  const media = make('div', 'pcards-media');
  pics.forEach((p, i) => media.append(make('div', i === 0 ? 'pcards-img' : 'pcards-img pcards-img-hover', p)));
  const card = make('div', 'pcards-card', media);
  const body = make('div', 'pcards-body');
  if (text.children.length) body.append(text);
  if (cta.children.length) body.append(cta);
  if (body.children.length) card.append(body);
  const on = (v) => card.classList.toggle('is-hovered', v);
  card.addEventListener('mouseenter', () => on(true));
  card.addEventListener('mouseleave', () => on(false));
  card.addEventListener('focusin', () => on(true));
  card.addEventListener('focusout', () => on(false));
  return card;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .pcards-grid')) return;
  const grid = make('div', 'pcards-grid', ...[...block.children].map(buildRow));
  block.replaceChildren(grid);
}
