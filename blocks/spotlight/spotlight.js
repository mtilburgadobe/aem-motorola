/**
 * spotlight — full-background image with a white logo badge on its lower right, followed by
 * an offset copy panel (live full_background_display + moto-flex-content, motoverse).
 *
 * Authoring (one cell, flat siblings; rows also accepted):
 *   1. <picture> background image (first image of the block)
 *   2. optional logo <picture> (any further image) — shown in the white badge
 *   3. heading (h1–h6) and paragraphs — the copy panel below the image
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

function make(className, ...nodes) {
  const d = document.createElement('div');
  d.className = className;
  d.append(...nodes);
  return d;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .spotlight-media')) return;
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => nodes.push(...cell.children));

  let bg = null;
  const logos = [];
  const copy = [];
  nodes.forEach((node) => {
    if (isMedia(node) && !node.textContent.trim()) {
      const media = node.matches('picture, img') ? node : node.querySelector('picture, img');
      if (!bg) bg = media;
      else logos.push(media);
      return;
    }
    copy.push(node);
  });

  const media = make('spotlight-media');
  if (bg) media.append(make('spotlight-bg', bg));
  if (logos.length) media.append(make('spotlight-badge', make('spotlight-logo', ...logos)));

  const children = [media];
  if (copy.length) {
    children.push(make('spotlight-copy', make('spotlight-body', make('spotlight-text', ...copy))));
  }
  block.replaceChildren(...children);
}
