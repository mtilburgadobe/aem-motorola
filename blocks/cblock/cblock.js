/**
 * cblock — content block, image + copy (live .contentBlockContainer): a square image column
 * beside a text column with a headline, copy and an optional pill action.
 *
 * Authoring: one row, two cells — media cell (picture) | text cell (heading, copy paragraphs,
 * then an optional action paragraph: a link, or emphasised words for a non-link action pill).
 * Cell order is free; the image column always renders first.
 *
 * @variants block: card — grey text card beside a 583×500 picture: eyebrow heading, large title,
 *   copy and a borderless action (live content-block1, razr 70 page)
 */

const ARROW = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
// an action = a paragraph that is entirely one link or one <em>/<strong> run
const isAction = (el) => {
  if (el.tagName !== 'P' || el.children.length !== 1) return false;
  const only = el.firstElementChild;
  return only.matches('a, em, strong') && el.textContent.trim() === only.textContent.trim();
};

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

export default function decorate(block) {
  if (block.querySelector(':scope > .cblock-media')) return;
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap((c) => [...c.children]);
  const media = make('div', 'cblock-col cblock-media');
  const text = make('div', 'cblock-col cblock-text');
  nodes.forEach((node) => {
    if (isMedia(node) && !node.textContent.trim()) {
      media.append(node.matches('picture, img') ? node : node.querySelector('picture') || node);
    } else if (/^H[1-6]$/.test(node.tagName)) {
      text.append(make('div', 'cblock-headline', node));
    } else if (isAction(node)) {
      // EW7: the authored paragraph stays the text host inside a div control
      const action = make('div', 'cblock-action', node, svg(ARROW));
      if (!node.querySelector('a')) {
        action.setAttribute('role', 'button');
        action.tabIndex = 0;
      }
      text.append(action);
    } else {
      text.append(make('div', 'cblock-desc', node));
    }
  });
  block.replaceChildren(media, text);
}
