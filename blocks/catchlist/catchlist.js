/**
 * catchlist — catch-all list slider (live .catch-all-list-slider swiper): a horizontally
 * scrollable track of slides, each a rounded picture with its caption beside it and a
 * redirect arrow under the caption. The track scrolls (wheel / touch / drag-free scroll snap);
 * a caption link, when authored, makes the arrow a link to it.
 *
 * Like the live swiper loop, the slide set is followed by one presentational copy (aria-hidden,
 * inert). Phones rest on the LAST authored slide (then the copies of the first slides); desktop
 * rests on the slide before it, so the last two authored captions are in view (the live track is
 * a 20 s continuous swiper transition — its rest is a moment, these are the probed states).
 *
 * Authoring: one slide per row — picture cell | caption cell (a heading or paragraph, optional
 * link paragraph). Cell order is free.
 */

const ARROW = '<svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true" focusable="false"><path d="M1 10h21M14 2l8 8-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const pictureOf = (el) => (el.matches('picture, img') ? el : el.querySelector('picture') || el.querySelector('img'));

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function svg(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.firstElementChild;
}

function buildSlide(row) {
  const media = make('div', 'catchlist-media');
  const text = make('div', 'catchlist-text');
  let href = '';
  [...row.children].flatMap((c) => [...c.children]).forEach((n) => {
    if (isMedia(n) && !n.textContent.trim()) {
      media.append(pictureOf(n));
      return;
    }
    const a = n.querySelector && n.querySelector('a[href]');
    if (a && !href && n.textContent.trim() === a.textContent.trim() && n.tagName === 'P') {
      href = a.href;
      n.hidden = true;
    }
    text.append(n);
  });
  const arrow = href ? make('a', 'catchlist-arrow', svg(ARROW)) : make('span', 'catchlist-arrow', svg(ARROW));
  if (href) {
    arrow.href = href;
    arrow.setAttribute('aria-label', text.textContent.trim());
  }
  return make('div', 'catchlist-slide', media, make('div', 'catchlist-side', text, arrow));
}

// presentational loop copy: no authoring hooks, hidden from assistive tech and focus
function loopCopy(slide) {
  const copy = slide.cloneNode(true);
  [copy, ...copy.querySelectorAll('*')].forEach((el) => {
    [...el.attributes].forEach((a) => {
      if (a.name.startsWith('data-') || a.name === 'id') el.removeAttribute(a.name);
    });
  });
  copy.classList.add('catchlist-copy');
  copy.setAttribute('aria-hidden', 'true');
  copy.inert = true;
  return copy;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .catchlist-track')) return;
  const slides = [...block.children].map(buildSlide);
  const track = make('div', 'catchlist-track', ...slides);
  if (slides.length > 1) track.append(...slides.map(loopCopy));
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Gallery');
  track.tabIndex = 0;
  block.replaceChildren(track);
  if (slides.length > 1) {
    const rest = () => {
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      // phones rest on the last slide; desktop on the one before it, so the two captions the
      // live marquee shows in its probed state (slides 2 and 3) are both in view (1440 gate)
      const mobile = window.matchMedia('(width <= 767px)').matches;
      const anchor = slides[mobile ? slides.length - 1 : Math.max(0, slides.length - 2)];
      track.scrollLeft = anchor.offsetLeft - track.offsetLeft - pad;
    };
    requestAnimationFrame(rest);
    window.addEventListener('load', rest, { once: true });
    // the section may still be hidden when the block decorates (all offsets 0); rest again once
    // the track is first laid out
    const ro = new ResizeObserver(() => {
      if (!track.clientWidth) return;
      ro.disconnect();
      rest();
    });
    ro.observe(track);
    window.matchMedia('(width <= 767px)').addEventListener('change', rest);
  }
}
