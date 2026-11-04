/**
 * dualcar — dual-navigation image carousel (live .dualNavCarouselWrapper): a centred section
 * head over one wide image stage; each slide carries its own short copy overlaid on the left.
 * Pagination dots (and, in the `thumbs` variant, a thumbnail strip and prev / next arrows) move
 * the stage; it autoplays once in view after the first page interaction (live autoPlaySlide) and
 * holds while hovered or focused.
 *
 * Authoring: the section head above the block is default content; the block reabsorbs it
 * (EW8). One slide per row: picture cell | copy cell (paragraphs). Cell order is free.
 *
 * @variants block: thumbs — razr 70 shape: 80px thumbnail strip over the stage, dots left and
 *   arrows right below it, dark copy, square stage 1166px wide
 * @variants block: slow — 7 s autoplay interval (default 4 s, live autoplayDuration)
 */

// live dual-nav arrow glyphs (16px viewBox at 30px)
const NEXT = '<svg width="30" height="30" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/></svg>';
const PREV = '<svg width="30" height="30" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/></svg>';

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

// EW8: the default-content head moves in whole; the emptied wrapper is removed
function reabsorbHead(block) {
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (!prev || !prev.classList.contains('default-content-wrapper')) return null;
  const head = make('div', 'dualcar-heading', ...prev.children);
  prev.remove();
  return head;
}

function buildSlide(row) {
  const slide = make('div', 'dualcar-slide');
  const media = make('div', 'dualcar-media');
  const copy = make('div', 'dualcar-copy');
  [...row.children].flatMap((c) => [...c.children]).forEach((n) => {
    if (isMedia(n) && !n.textContent.trim()) media.append(pictureOf(n));
    else copy.append(n);
  });
  slide.append(media);
  if (copy.children.length) slide.append(copy);
  return slide;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .dualcar-stage')) return;
  const head = reabsorbHead(block);
  const slides = [...block.children].map(buildSlide);
  const stage = make('div', 'dualcar-stage', ...slides);
  stage.setAttribute('aria-roledescription', 'carousel');
  const status = make('p', 'sr-only');
  status.setAttribute('aria-live', 'polite');
  stage.append(status);

  const dots = make('div', 'dualcar-dots');
  const thumbs = make('div', 'dualcar-thumbs');
  const prev = make('button', 'dualcar-arrow dualcar-prev', svg(PREV));
  const next = make('button', 'dualcar-arrow dualcar-next', svg(NEXT));
  prev.type = 'button';
  next.type = 'button';
  prev.setAttribute('aria-label', 'Previous slide');
  next.setAttribute('aria-label', 'Next slide');

  let index = 0;
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === index);
      s.setAttribute('aria-hidden', n === index ? 'false' : 'true');
    });
    [...dots.children].forEach((d, n) => {
      d.classList.toggle('is-active', n === index);
      if (n === index) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    [...thumbs.children].forEach((t, n) => t.classList.toggle('is-active', n === index));
    prev.classList.toggle('is-disabled', index === 0);
    next.classList.toggle('is-disabled', index === slides.length - 1);
    status.textContent = `Item ${index + 1} of ${slides.length}`;
  };

  slides.forEach((s, n) => {
    const dot = make('button', 'dualcar-dot');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${n + 1}`);
    dot.addEventListener('click', () => go(n));
    dots.append(dot);
    const img = s.querySelector('img');
    if (img) {
      const thumb = make('button', 'dualcar-thumb');
      thumb.type = 'button';
      thumb.setAttribute('aria-label', `Slide ${n + 1}`);
      const t = document.createElement('img');
      t.src = img.currentSrc || img.src;
      t.alt = '';
      t.loading = 'lazy';
      thumb.append(t);
      thumb.addEventListener('click', () => go(n));
      thumbs.append(thumb);
    }
  });
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  const arrows = make('div', 'dualcar-arrows', prev, next);
  const controls = make('div', 'dualcar-controls', dots, arrows);
  const frame = make('div', 'dualcar-frame', stage, thumbs);
  block.replaceChildren(...(head ? [head] : []), frame, controls);
  go(0);

  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const interval = block.classList.contains('slow') ? 7000 : 4000;
    let held = false;
    block.addEventListener('mouseenter', () => { held = true; });
    block.addEventListener('mouseleave', () => { held = false; });
    block.addEventListener('focusin', () => { held = true; });
    block.addEventListener('focusout', () => { held = false; });
    // the rotation starts once the carousel is in view and the visitor has interacted with the
    // page (pointer, touch, wheel or key); it rests on slide 1 until then (live stitched captures)
    let inView = false;
    let engaged = false;
    let timer = 0;
    const start = () => {
      if (timer || !inView || !engaged) return;
      timer = setInterval(() => {
        if (!held && !document.hidden) go(index + 1);
      }, interval);
    };
    const engage = () => {
      engaged = true;
      ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'].forEach((t) => window.removeEventListener(t, engage));
      start();
    };
    ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'].forEach((t) => window.addEventListener(t, engage, { passive: true }));
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    }, { threshold: 0.5 }).observe(stage);
  }
}
