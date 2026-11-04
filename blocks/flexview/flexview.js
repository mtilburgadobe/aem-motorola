/**
 * flexview — flex view, two-up image tiles (live .flex-view--wrapper): a centred section
 * heading over a row of tall image tiles, each with a caption at the top. Hovering (or focusing)
 * a tile swaps its image for the alternate one and reveals the tile's CTA pill.
 *
 * Authoring: the section heading above the block is default content; the block reabsorbs it
 * (EW8). One tile per row: text cell (caption paragraph, CTA link paragraph, optional marker
 * word) | media cell (resting picture, then the hover picture).
 *
 * @variants block: tall — no heading, 882px edge-to-edge tiles (live brilliant collection flex
 *   view); ≤767px two 200px tiles side by side
 * @variants tile marker: light — white caption (dark image)
 * @ew-exempt metadata — tile marker words (light) are never displayed
 */

const MARKERS = ['light'];

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isCta = (el) => el.tagName === 'P' && !!el.querySelector('a[href]') && !isMedia(el)
  && el.textContent.trim() === el.querySelector('a').textContent.trim();
const marker = (el) => {
  const t = el.tagName === 'P' && !el.children.length ? el.textContent.trim().toLowerCase() : '';
  return MARKERS.includes(t) ? t : '';
};
const pictureOf = (el) => (el.matches('picture, img') ? el : el.querySelector('picture') || el.querySelector('img'));

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

// EW8: the default-content head moves in whole; the emptied wrapper is removed
function reabsorbHead(block) {
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (!prev || !prev.classList.contains('default-content-wrapper')) return null;
  const head = make('div', 'flexview-heading', ...prev.children);
  prev.remove();
  return head;
}

function buildTile(row) {
  const item = make('article', 'flexview-item');
  const desc = make('div', 'flexview-desc');
  const cta = make('div', 'flexview-cta');
  cta.hidden = true;
  const media = make('div', 'flexview-media');
  const pics = [];
  [...row.children].flatMap((c) => [...c.children]).forEach((n) => {
    const m = marker(n);
    if (m) {
      item.classList.add(m);
      n.hidden = true;
      item.append(n);
    } else if (isMedia(n) && !n.textContent.trim()) {
      pics.push(pictureOf(n));
    } else if (isCta(n)) {
      cta.append(n);
    } else {
      desc.append(n);
    }
  });
  // resting picture on top of the hover picture (live imgDisplay over imgHide)
  pics.forEach((p, i) => media.append(make('div', i === 0 ? 'flexview-img' : 'flexview-img flexview-img-hover', p)));
  [...media.children].reverse().forEach((c) => media.append(c));
  item.prepend(desc, cta, media);
  const on = (v) => {
    item.classList.toggle('is-hovered', v);
    cta.hidden = !v;
  };
  item.addEventListener('mouseenter', () => on(true));
  item.addEventListener('mouseleave', () => on(false));
  item.addEventListener('focusin', () => on(true));
  item.addEventListener('focusout', () => on(false));
  return item;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .flexview-gallery')) return;
  const head = reabsorbHead(block);
  const gallery = make('div', 'flexview-gallery', ...[...block.children].map(buildTile));
  block.replaceChildren(...(head ? [head] : []), gallery);
}
