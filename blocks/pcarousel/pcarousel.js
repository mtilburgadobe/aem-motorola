/**
 * pcarousel — product close-up carousel (live .product_carousel_wrapper): a wide image track with
 * the eyebrow, headline and copy below it, beside a narrow image track carrying the pagination.
 * One set of dots drives BOTH tracks in sync (live: a dot click slides the left and right
 * carousels together, track transform .3s; live region "Item n of N"). No autoplay.
 *
 * Authoring, one row each (rows are classified by content, not position):
 *   images-only row (first)  — the wide track slides, in order
 *   text row                 — eyebrow paragraph, heading, copy paragraph(s)
 *   images-only row (second) — the narrow track slides, in order
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isHeading = (el) => /^H[1-6]$/.test(el.tagName);

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function rowNodes(row) {
  return [...row.children].flatMap((cell) => [...cell.children]);
}

function buildTrack(pics, side) {
  const rail = make('ul', 'pcarousel-rail');
  pics.forEach((pic, i) => {
    const slide = make('li', `pcarousel-slide${i === 0 ? ' is-active' : ''}`, pic);
    rail.append(slide);
  });
  const live = make('p', 'sr-only');
  live.setAttribute('aria-live', 'polite');
  live.textContent = `Item 1 of ${pics.length}`;
  const track = make('section', 'pcarousel-track', rail, live);
  track.dataset.carousel = side;
  track.setAttribute('aria-label', 'Gallery');
  return track;
}

function buildText(nodes) {
  const text = make('div', 'pcarousel-text');
  let headed = false;
  nodes.forEach((node) => {
    if (isHeading(node)) {
      headed = true;
      text.append(make('div', 'pcarousel-headline', node));
    } else if (!headed) {
      text.append(make('div', 'pcarousel-title', node));
    } else {
      text.append(make('div', 'pcarousel-desc', node));
    }
  });
  return text;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .pcarousel-grid')) return;
  const tracks = [];
  const textNodes = [];
  [...block.children].forEach((row) => {
    const nodes = rowNodes(row);
    if (nodes.length && nodes.every((n) => isMedia(n) && !n.textContent.trim())) {
      tracks.push(nodes.map((n) => (n.matches('picture, img') ? n : n.querySelector('picture'))
        || n.querySelector('img')));
    } else {
      textNodes.push(...nodes);
    }
  });

  const main = make('div', 'pcarousel-main');
  const side = make('div', 'pcarousel-side');
  if (tracks[0]) main.append(buildTrack(tracks[0], 'left'));
  if (textNodes.length) main.append(buildText(textNodes));
  if (tracks[1]) side.append(buildTrack(tracks[1], 'right'));

  const count = Math.max(0, ...tracks.map((t) => t.length));
  const dots = make('div', 'pcarousel-dots');
  const go = (i) => {
    block.querySelectorAll('.pcarousel-track').forEach((t) => {
      const rail = t.querySelector('.pcarousel-rail');
      const n = rail.children.length;
      const k = Math.max(0, Math.min(i, n - 1));
      rail.style.transform = `translateX(${-100 * k}%)`;
      [...rail.children].forEach((s, j) => s.classList.toggle('is-active', j === k));
      t.querySelector('[aria-live]').textContent = `Item ${k + 1} of ${n}`;
    });
    [...dots.children].forEach((d, j) => {
      d.classList.toggle('is-active', j === i);
      if (j === i) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  };
  if (count > 1) {
    for (let i = 0; i < count; i += 1) {
      const dot = make('button', `pcarousel-dot${i === 0 ? ' is-active' : ''}`);
      dot.type = 'button';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', () => go(i));
      dots.append(dot);
    }
    (tracks[1] ? side : main).append(dots);
  }

  const grid = make('div', 'pcarousel-grid', main);
  if (side.children.length) grid.append(side);
  block.replaceChildren(grid);
}
