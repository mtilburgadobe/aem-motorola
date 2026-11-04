/* at-de-offers — deal carousels (live Swiper: 4 per view, groups of 4, prev/next + bullets, 300 ms slide). */
(function () {
  'use strict';
  document.querySelectorAll('.reco--deal').forEach(function (sec) {
    var track = sec.querySelector('.reco__track');
    var cards = track ? track.children : [];
    var dots = Array.prototype.slice.call(sec.querySelectorAll('.reco__dot'));
    var prev = sec.querySelector('.reco__prev');
    var next = sec.querySelector('.reco__next');
    var PER = 4, page = 0;
    if (!track || cards.length <= PER) return;
    var pages = dots.length || Math.ceil((cards.length - PER) / PER) + 1;
    var render = function () {
      var first = Math.min(page * PER, cards.length - PER);
      var step = cards[1].offsetLeft - cards[0].offsetLeft;
      track.style.transform = 'translate3d(' + (-first * step) + 'px, 0, 0)';
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === page);
        if (i === page) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      if (prev) prev.disabled = page === 0;
      if (next) next.disabled = page === pages - 1;
      Array.prototype.forEach.call(cards, function (c, i) { c.classList.toggle('is-active', i === first); });
    };
    var go = function (p) { page = Math.max(0, Math.min(pages - 1, p)); render(); };
    if (prev) prev.addEventListener('click', function () { go(page - 1); });
    if (next) next.addEventListener('click', function () { go(page + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    window.addEventListener('resize', function () { track.style.transition = 'none'; render(); void track.offsetWidth; track.style.transition = ''; });
    render();
  });
  /* colour swatches: live moves the selected ring (radio group); SKU data swap needs the commerce API — not wired */
  document.querySelectorAll('.reco__swatches').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var sw = e.target.closest('.reco__swatch');
      if (!sw) return;
      group.querySelectorAll('.reco__swatch').forEach(function (s) {
        var on = s === sw;
        s.classList.toggle('is-selected', on);
        s.setAttribute('aria-checked', String(on));
        s.tabIndex = on ? 0 : -1;
      });
    });
  });
})();
