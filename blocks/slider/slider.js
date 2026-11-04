/**
 * slider — feature card carousel on a grey band (live catch-all v3, business edition):
 * centred section title and intro, a track of cards (picture, title, copy) showing two and
 * a half cards on desktop, pagination dots and prev / next arrows. The arrows and dots move
 * the track one card at a time; the live carousel does not autoplay.
 *
 * Authoring: the section title (heading) and intro paragraph above the block are default
 * content; the block reabsorbs them. One card per row (cells read in order): picture,
 * title paragraph (or heading), copy paragraph(s).
 */

const ARROW_PREV = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/></svg>';
const ARROW_NEXT = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/></svg>';

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

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
  const head = make('div', 'slider-head');
  [...prev.children].forEach((node) => {
    head.append(make('div', /^H[1-6]$/.test(node.tagName) ? 'slider-title' : 'slider-desc', node));
  });
  prev.remove();
  return head;
}

function buildCard(nodes) {
  const card = make('li', 'slider-slide');
  const media = make('div', 'slider-media');
  const text = make('div', 'slider-text');
  let named = false;
  nodes.forEach((node) => {
    if (isMedia(node) && !node.textContent.trim()) {
      media.append(node.matches('picture, img') ? node : node.querySelector('picture, img'));
      return;
    }
    if (!named) {
      named = true;
      const name = make('div', 'slider-name', node);
      if (!/^H[1-6]$/.test(node.tagName)) {
        name.setAttribute('role', 'heading');
        name.setAttribute('aria-level', '3');
      }
      text.append(name);
      return;
    }
    let copy = text.querySelector('.slider-copy');
    if (!copy) {
      copy = make('div', 'slider-copy');
      text.append(copy);
    }
    copy.append(node);
  });
  card.append(media, text);
  return card;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .slider-frame')) return;
  const head = reabsorbHead(block);
  const track = make('ul', 'slider-track');
  [...block.children].forEach((row) => {
    const nodes = [];
    [...row.children].forEach((cell) => nodes.push(...cell.children));
    if (nodes.length) track.append(buildCard(nodes));
  });
  const slides = [...track.children];

  const dots = make('ol', 'slider-dots');
  const prev = make('button', 'slider-prev');
  const next = make('button', 'slider-next');
  prev.type = 'button';
  next.type = 'button';
  prev.setAttribute('aria-label', 'Previous slide');
  next.setAttribute('aria-label', 'Next slide');
  prev.innerHTML = ARROW_PREV;
  next.innerHTML = ARROW_NEXT;

  let index = 0;
  const go = (i) => {
    index = Math.max(0, Math.min(slides.length - 1, i));
    const offset = slides[index] ? slides[index].offsetLeft - slides[0].offsetLeft : 0;
    track.style.transform = `translateX(${-offset}px)`;
    [...dots.children].forEach((li, k) => {
      li.firstElementChild.classList.toggle('active', k === index);
      if (k === index) li.firstElementChild.setAttribute('aria-current', 'true');
      else li.firstElementChild.removeAttribute('aria-current');
    });
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  };

  slides.forEach((slide, k) => {
    const name = slide.querySelector('.slider-name');
    const b = make('button', 'slider-dot');
    b.type = 'button';
    b.setAttribute('aria-label', `Slide, ${name ? name.textContent.trim() : k + 1}`);
    b.addEventListener('click', () => go(k));
    dots.append(make('li', 'slider-dot-item', b));
  });
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  const viewport = make('div', 'slider-viewport', track);
  const controls = make('div', 'slider-controls', dots, make('div', 'slider-arrows', prev, next));
  const frame = make('div', 'slider-frame', viewport, controls);
  frame.setAttribute('role', 'region');
  frame.setAttribute('aria-roledescription', 'carousel');
  frame.setAttribute('aria-label', 'Gallery');

  block.replaceChildren(...(head ? [head] : []), frame);
  go(0);
}
