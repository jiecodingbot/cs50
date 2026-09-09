/* BASIS. Shared behaviour. No dependencies. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav flips from dark to bone once you clear the masthead */
  var nav = document.getElementById('nav');
  var masthead = document.querySelector('.masthead');
  if (nav && masthead) {
    var paint = function () {
      var y = window.scrollY || window.pageYOffset;
      nav.dataset.mode = y > masthead.offsetHeight - 80 ? 'light' : 'dark';
      nav.classList.toggle('stuck', y > 8);
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
  }

  /* reveal on scroll */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(items, function (el) { rio.observe(el); });
  }

  /* workflow loops run only while their pair is on screen */
  var pairs = document.querySelectorAll('.compare');
  if (pairs.length) {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(pairs, function (el) { el.classList.add('live'); });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle('live', e.isIntersecting); });
      }, { threshold: .18 });
      Array.prototype.forEach.call(pairs, function (el) { cio.observe(el); });
    }
  }

  /* the illustrative session readout */
  var readout = document.getElementById('readout');
  var play = document.getElementById('play');
  if (readout && play) {
    var run = function () {
      readout.classList.add('played');
      play.textContent = 'Session played';
      play.setAttribute('aria-disabled', 'true');
    };
    play.addEventListener('click', run);
    if (reduce) { run(); }
    else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } });
      }, { threshold: .3 });
      io.observe(readout);
    }
  }

  /* the form has no handler yet */
  var form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('formnote');
      if (note) {
        note.textContent = 'No handler connected yet. Point this form at your backend or form service to start collecting.';
      }
    });
  }
})();
