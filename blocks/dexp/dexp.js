/**
 * dexp — digital experience (live .digitalExpContainer): headline, copy and a row of icon
 * buttons on the left; a media stage on the right. An icon swaps the stage to its own media layer
 * (the default layer fades out .4s, the chosen one fades in; a second click restores the
 * default). A layer with an audio file gets a play button with a progress bar.
 *
 * Authoring, one row each (rows classified by content):
 *   text row   — heading + copy paragraph(s) | optional background picture
 *   media row  — the default stage picture (a row holding only a picture)
 *   item rows  — label paragraph (an :icon: + the label words) | layer picture (+ optional link
 *                to an audio file)
 *
 * @ew-exempt config — audio file link paragraphs are media sources, never displayed
 */

const PLAY = '<svg width="65" height="65" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="2" fill="none"></circle><polygon points="13 10 22 16 13 22" fill="currentColor"></polygon></svg>';
const PAUSE = '<svg width="65" height="65" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="2" fill="none"></circle><rect x="12" y="10" width="3" height="12" fill="currentColor"></rect><rect x="18" y="10" width="3" height="12" fill="currentColor"></rect></svg>';

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isHeading = (el) => /^H[1-6]$/.test(el.tagName);
const audioLink = (el) => {
  const a = el.querySelector && el.querySelector('a[href]');
  return a && /\.(wav|mp3|m4a|ogg|aac)(\?|$)/i.test(a.getAttribute('href')) ? a : null;
};
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

const fmt = (s) => {
  const t = Number.isFinite(s) ? Math.floor(s) : 0;
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

function buildAudio(href) {
  const audio = document.createElement('audio');
  audio.preload = 'none';
  audio.src = href;
  const btn = make('button', 'dexp-play', svg(PLAY));
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Play');
  const fill = make('span', 'dexp-fill');
  const thumb = make('div', 'dexp-thumb');
  const cur = make('span', '');
  const dur = make('span', '');
  cur.textContent = '0:00';
  dur.textContent = '0:00';
  const progress = make('div', 'dexp-progress', fill, thumb, make('div', 'dexp-time', cur, dur));
  btn.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener('play', () => {
    btn.replaceChildren(svg(PAUSE));
    btn.setAttribute('aria-label', 'Pause');
  });
  audio.addEventListener('pause', () => {
    btn.replaceChildren(svg(PLAY));
    btn.setAttribute('aria-label', 'Play');
  });
  audio.addEventListener('loadedmetadata', () => {
    dur.textContent = fmt(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = `${pct}%`;
    thumb.style.left = `calc(${pct}% - 6px)`;
    cur.textContent = fmt(audio.currentTime);
  });
  return make('div', 'dexp-audio', audio, btn, progress);
}

export default function decorate(block) {
  if (block.querySelector(':scope > .dexp-inner')) return;
  const text = make('div', 'dexp-text');
  const icons = make('ul', 'dexp-icons');
  const stage = make('div', 'dexp-media');
  const config = make('div', 'dexp-config');
  config.hidden = true;
  let bg = null;

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const nodes = cells.flatMap((c) => [...c.children]);
    if (nodes.some(isHeading)) {
      nodes.forEach((n) => {
        if (isMedia(n) && !n.textContent.trim()) bg = pictureOf(n);
        else text.append(make('div', isHeading(n) ? 'dexp-headline' : 'dexp-desc', n));
      });
      return;
    }
    if (cells.length < 2) {
      const pic = nodes.find(isMedia);
      if (pic) {
        stage.prepend(make('div', 'dexp-layer dexp-layer-default is-active', pictureOf(pic)));
      }
      return;
    }
    // item row: label | layer media
    const [labelCell, ...mediaCells] = cells;
    const layer = make('div', 'dexp-layer');
    mediaCells.flatMap((c) => [...c.children]).forEach((n) => {
      const a = audioLink(n);
      if (a) {
        layer.classList.add('dexp-layer-audio');
        layer.append(buildAudio(a.href));
        config.append(n);
      } else if (isMedia(n)) {
        layer.prepend(pictureOf(n));
      }
    });
    stage.append(layer);
    const btn = make('div', 'dexp-btn');
    btn.setAttribute('role', 'button');
    btn.tabIndex = 0;
    btn.setAttribute('aria-pressed', 'false');
    const label = make('div', 'dexp-label');
    [...labelCell.children].forEach((n) => {
      n.querySelectorAll('.icon').forEach((icon) => btn.append(icon));
      label.append(n);
    });
    icons.append(make('li', 'dexp-item', btn, label));
  });

  if (icons.children.length) text.append(icons);

  const layers = () => [...stage.querySelectorAll(':scope > .dexp-layer')];
  const btns = [...icons.querySelectorAll('.dexp-btn')];
  const set = (n) => {
    btns.forEach((b, i) => {
      const on = i + 1 === n;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    layers().forEach((l, i) => l.classList.toggle('is-active', i === n));
    block.classList.toggle('is-expanded', n > 0);
    if (n === 0) stage.querySelectorAll('audio').forEach((a) => a.pause());
  };
  btns.forEach((b, i) => {
    const act = () => set(b.classList.contains('is-active') ? 0 : i + 1);
    b.addEventListener('click', act);
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        act();
      }
    });
  });

  const children = [];
  if (bg) children.push(make('div', 'dexp-bg', bg));
  children.push(make('div', 'dexp-inner', text, stage));
  if (config.children.length) children.push(config);
  block.replaceChildren(...children);
}
