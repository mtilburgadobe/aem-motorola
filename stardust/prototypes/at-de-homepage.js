/* at-de-homepage — catch-all gallery: autoplay (centred active slide, loop via clones), pause, hover-pause.
   Observed on the live site (motion-observe): timer-driven track transform 0.5s; slide state classes. */
(function () {
  'use strict';
  var region = document.querySelector('.gallery__region');
  if (!region) return;
  var track = region.querySelector('.gallery__track');
  var slides = Array.prototype.slice.call(track.children);
  var REAL = 4, FIRST_REAL = 4;          // 4 clones before, 4 real, 4 clones after
  var index = FIRST_REAL;                 // active slide (pantone) at rest
  var paused = false, hovering = false;
  var mq = window.matchMedia('(max-width: 600px)');
  var offset = function (i) {
    if (mq.matches) return -1156 - (i - FIRST_REAL) * 288;
    return -1510 - (i - FIRST_REAL) * 495;
  };
  var mark = function () {
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === index);
      s.classList.toggle('is-prev', i === index - 1);
      s.classList.toggle('is-next', i === index + 1);
    });
  };
  var go = function (i, animate) {
    track.style.transition = animate ? '' : 'none';
    index = i;
    track.style.transform = 'translateX(' + offset(i) + 'px)';
    mark();
    if (!animate) { void track.offsetWidth; track.style.transition = ''; }
  };
  track.addEventListener('transitionend', function () {
    if (index >= FIRST_REAL + REAL) go(index - REAL, false);
    if (index < FIRST_REAL) go(index + REAL, false);
  });
  mark();
  var timer = setInterval(function () { if (!paused && !hovering) go(index + 1, true); }, 4000);
  region.addEventListener('mouseenter', function () { hovering = true; region.classList.add('is-hover'); });
  region.addEventListener('mouseleave', function () { hovering = false; region.classList.remove('is-hover'); });
  var btn = region.querySelector('.gallery__pause');
  if (btn) btn.addEventListener('click', function () {
    paused = !paused;
    btn.setAttribute('aria-label', (paused ? 'Play' : 'Pause') + ' All Things Motorola carousel');
    btn.classList.toggle('is-paused', paused);
  });
  mq.addEventListener('change', function () { go(index, false); });
  window.addEventListener('pagehide', function () { clearInterval(timer); });
})();
