/**
 * pchero — product hero (live .pc-hero-main): a full-width 56vw media stage (poster picture with
 * a muted looping video that plays while it is in view) and an optional overlaid headline and
 * sub-copy at the top left.
 *
 * Authoring (cells or flat siblings, in any order):
 *   pictures   — first = desktop poster, second (optional) = ≤767px poster
 *   video links — a link to an .m3u8 / .mp4 file: first = desktop, second (optional) = ≤767px
 *   heading + paragraphs — the overlay copy
 *
 * @variants block: warm — beige stage (#f2efeb) behind the media
 * @variants block: dark — black stage, 50vw tall (live razr 70 hero, containerBGColor #000)
 * @variants block: center — white copy centred at the bottom of the stage (live brilliant
 *   collection hero, dContentPlacement center / dContentAlignment end)
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

/* Muted looping background video over the poster picture: plays while ≥ 25 % visible (live:
   JS-driven play in view); it stays transparent until it is actually playing. */
function attachVideo(stage, sources) {
  if (!sources.length) return;
  const video = document.createElement('video');
  video.className = 'pchero-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'none';
  video.setAttribute('aria-hidden', 'true');
  stage.append(video);

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
  video.addEventListener('playing', () => stage.classList.add('is-playing'));
  let visible = false;
  const play = async () => {
    await load();
    if (visible) video.play().catch(() => {});
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else video.pause();
  }, { threshold: 0.25 }).observe(stage);
  mq.addEventListener('change', () => {
    if (loaded) play();
  });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .pchero-media')) return;
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap((c) => [...c.children]);
  const stage = make('div', 'pchero-media');
  const content = make('div', 'pchero-content');
  const config = make('div', 'pchero-config');
  config.hidden = true;
  const sources = [];
  const pics = [];
  nodes.forEach((node) => {
    const link = videoLink(node);
    if (link) {
      sources.push(link.href);
      config.append(node);
    } else if (isMedia(node) && !node.textContent.trim()) {
      pics.push(node.matches('picture, img') ? node : node.querySelector('picture, img'));
    } else if (/^H[1-6]$/.test(node.tagName)) {
      content.append(make('div', 'pchero-headline', node));
    } else {
      content.append(make('div', 'pchero-sub', node));
    }
  });
  pics.forEach((pic, i) => {
    stage.append(make('div', i === 0 && pics.length > 1 ? 'pchero-poster pchero-desktop'
      : `pchero-poster${i ? ' pchero-mobile' : ''}`, pic));
  });
  const children = [stage];
  if (content.children.length) children.push(content);
  if (config.children.length) children.push(config);
  block.replaceChildren(...children);
  attachVideo(stage, sources);
}
