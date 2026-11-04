/**
 * vhero — centred video hero (live .hero_container, single-video navigation_v2): a heading, a
 * rounded 16:9 media frame (poster picture with a muted looping video that plays while in
 * view) and a centred detail paragraph.
 *
 * Authoring (one cell, flat siblings; rows also accepted): heading, poster picture, video links
 * (first = desktop, second optional = ≤767px), detail paragraph(s).
 *
 * @variants block: duo — static picture frame with the detail paragraphs in two columns (live
 *   display-card, brilliant collection)
 * @variants block: bare — media frame only, no heading (live moto-flex-content video)
 * @ew-exempt config — the video link paragraphs are media sources, never displayed
 */

const HLS_LIB = 'https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js';
const MOBILE = '(width <= 767px)';

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const videoLink = (el) => {
  const a = el.querySelector && el.querySelector('a[href]');
  return a && /\.(m3u8|mp4|webm)(\?|$)/i.test(a.getAttribute('href')) ? a : null;
};

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

let hlsPromise;
function loadHls() {
  if (!hlsPromise) {
    hlsPromise = new Promise((resolve) => {
      if (window.Hls) {
        resolve(window.Hls);
        return;
      }
      const s = document.createElement('script');
      s.src = HLS_LIB;
      s.onload = () => resolve(window.Hls);
      s.onerror = () => resolve(null);
      document.head.append(s);
    });
  }
  return hlsPromise;
}

/* Muted looping video over the poster: plays while ≥ 25 % visible, transparent until playing. */
function attachVideo(frame, sources) {
  if (!sources.length) return;
  const video = document.createElement('video');
  video.className = 'vhero-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'none';
  video.setAttribute('aria-hidden', 'true');
  frame.append(video);

  const mq = window.matchMedia(MOBILE);
  let loaded = '';
  let hls;
  const pick = () => (mq.matches && sources[1]) || sources[0];
  const load = async () => {
    const url = pick();
    if (loaded === url) return;
    loaded = url;
    if (hls) hls.destroy();
    hls = null;
    if (/\.m3u8/i.test(url) && !video.canPlayType('application/vnd.apple.mpegurl')) {
      const Hls = await loadHls();
      if (!Hls || !Hls.isSupported()) return;
      hls = new Hls({ enableWorker: false });
      hls.loadSource(url);
      hls.attachMedia(video);
    } else {
      video.src = url;
    }
  };
  video.addEventListener('playing', () => frame.classList.add('is-playing'));
  let visible = false;
  const play = async () => {
    await load();
    if (visible) video.play().catch(() => {});
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else video.pause();
  }, { threshold: 0.25 }).observe(frame);
  mq.addEventListener('change', () => {
    if (loaded) play();
  });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .vhero-frame')) return;
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap((c) => [...c.children]);
  const head = make('div', 'vhero-heading');
  const frame = make('section', 'vhero-frame');
  frame.setAttribute('aria-label', 'Gallery');
  const detail = make('div', 'vhero-detail');
  const config = make('div', 'vhero-config');
  config.hidden = true;
  const sources = [];
  nodes.forEach((node) => {
    const link = videoLink(node);
    if (link) {
      sources.push(link.href);
      config.append(node);
    } else if (isMedia(node) && !node.textContent.trim()) {
      frame.append(node.matches('picture, img') ? node : node.querySelector('picture') || node);
    } else if (/^H[1-6]$/.test(node.tagName) && !head.children.length) {
      head.append(node);
    } else {
      detail.append(node);
    }
  });
  // live navigation_v2 announces its single slide
  const live = make('p', 'sr-only');
  live.setAttribute('aria-live', 'polite');
  live.textContent = 'Item 1 of 1';
  frame.append(live);
  const children = [];
  if (head.children.length) children.push(head);
  children.push(frame);
  if (detail.children.length) children.push(detail);
  if (config.children.length) children.push(config);
  block.replaceChildren(...children);
  attachVideo(frame, sources);
}
