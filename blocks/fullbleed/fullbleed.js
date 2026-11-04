/**
 * fullbleed — full-bleed image with overlaid copy and CTA (live .full_bleed_image_container).
 *
 * Authoring (one cell, flat siblings; rows also accepted):
 *   1. <picture> background image (first image of the block)
 *   2. optional logo <picture> (any further image before the copy)
 *   3. optional heading (h1–h6) — the overlay title
 *   4. paragraphs — with no heading, the first paragraph is the lead line
 *   5. CTA — a link alone in its paragraph (<strong><a> = primary)
 *
 * @variants block: dark (default light) — white copy on a dark image (live dark banner)
 * @variants block: left — copy held in the left column with a 40px bold headline
 *   (live business-edition hero: full_component_text padding-right 829px / 899px)
 * @variants block: program — white copy over a dark image, 56px headline, outline pill CTA
 *   (live razr-fold FIFA full_bleed_image_container: body inset 137px)
 * @variants block: top — white copy centred at the top of the image, 40px headline (live razr 70
 *   full-bleed-image: horizontalText center, verticalText flex-start); dark copy ≤767px
 * @variants block: luxe — eyebrow heading, title heading and small copy held left and centred
 *   vertically in white (live brilliant collection swarovski-luxury)
 * @variants block: side — the heading sits centred above the image and the copy is held at the
 *   left over it (live full_background_display, razr 70 collection)
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isCta = (el) => {
  if (!el.matches('p')) return false;
  const a = el.querySelector('a');
  return !!a && !isMedia(el) && el.textContent.trim() === a.textContent.trim();
};

// Cell-level collector (DA delivers one cell holding flat siblings); a media-led
// cell folded into one <p> by wrapTextNodes is expanded back.
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    let kids = [...cell.children];
    if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].children.length
      && kids[0].querySelector('picture, img')) {
      kids = [...kids[0].childNodes].map((n) => {
        if (n.nodeType === 1) return n;
        // harness-only fallback: move a bare text node into a fresh <p>
        if (n.textContent.trim()) {
          const p = document.createElement('p');
          p.append(n);
          return p;
        }
        return null;
      }).filter(Boolean);
    }
    out.push(...kids);
  });
  return out;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .fullbleed-media, :scope > .fullbleed-overlay')) return;
  const nodes = collectNodes(block);

  const body = document.createElement('div');
  body.className = 'fullbleed-body';
  const text = document.createElement('div');
  text.className = 'fullbleed-text';
  const actions = document.createElement('div');
  actions.className = 'fullbleed-actions';

  let bg = null;
  let hasHeading = false;
  let leadDone = false;
  nodes.forEach((node) => {
    if (isMedia(node)) {
      const media = node.matches('picture, img') ? node : node.querySelector('picture, img');
      if (!bg) {
        bg = media;
      } else {
        body.append(wrapNode(media, 'fullbleed-logo'));
      }
      return;
    }
    if (isCta(node)) {
      actions.append(node);
      return;
    }
    if (/^H[1-6]$/.test(node.tagName)) {
      hasHeading = true;
      text.append(wrapNode(node, 'fullbleed-title'));
      return;
    }
    if (!hasHeading && !leadDone && node.tagName === 'P') {
      leadDone = true;
      const lead = wrapNode(node, 'fullbleed-lead');
      lead.setAttribute('role', 'heading');
      lead.setAttribute('aria-level', '2');
      text.append(lead);
      return;
    }
    text.append(node);
  });

  if (text.children.length) {
    // live: the copy container is announced as a level-2 heading (not the side variant: its
    // live heading stands alone above the image)
    if (!block.classList.contains('side')) {
      text.setAttribute('role', 'heading');
      text.setAttribute('aria-level', '2');
    }
    body.append(text);
  }
  if (actions.children.length) body.append(actions);
  else body.classList.add('fullbleed-body-bare');

  const overlay = document.createElement('div');
  overlay.className = 'fullbleed-overlay';
  overlay.append(body);

  const children = [];
  if (bg) children.push(wrapNode(bg, 'fullbleed-media'));
  children.push(overlay);
  block.replaceChildren(...children);
}
