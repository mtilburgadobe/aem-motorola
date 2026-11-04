/**
 * stack — centred content stack (live .stackmain). Reusable: any authored
 * prose (paragraphs, headings, lists) or a media-only stack (a partner logo).
 *
 * Authoring: one cell (or several rows) of flat content; everything is moved,
 * in order, into one body wrapper. A block holding only images gets the
 * `stack-media` class (logo stack); otherwise it is the grey legal-text stack.
 * A paragraph carrying a footnote return link (#fnN-ref) becomes the footnote
 * target (id fnN), as the live page does.
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

export default function decorate(block) {
  if (block.querySelector(':scope > .stack-body')) return;
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    nodes.push(...cell.children);
  });

  const body = document.createElement('div');
  body.className = 'stack-body';
  body.append(...nodes);

  if (nodes.length && nodes.every((n) => isMedia(n) && !n.textContent.trim())) {
    block.classList.add('stack-media');
  }

  body.querySelectorAll('a[href^="#"][href$="-ref"]').forEach((a) => {
    const id = a.getAttribute('href').slice(1, -4);
    const p = a.closest('p');
    if (id && p && !p.id && !document.getElementById(id)) p.id = id;
  });

  block.replaceChildren(body);
}
