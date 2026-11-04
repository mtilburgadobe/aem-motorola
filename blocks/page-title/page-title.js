/**
 * page-title — the page's one <h1>, kept in the DOM for assistive tech and
 * crawlers but visually hidden (the source ships a 0×0 hidden page-title h1).
 * Content: one cell holding an h1 (or plain text, promoted to an h1).
 * Authors may omit the cell or the text — an empty block renders nothing.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const text = block.textContent.replace(/\s+/g, ' ').trim();
  const authored = block.querySelector('h1');
  if (!text) {
    block.replaceChildren();
    return;
  }
  const h1 = authored || document.createElement('h1');
  if (!authored) h1.textContent = text;
  h1.classList.add('page-title-heading');
  block.replaceChildren(h1);
}
