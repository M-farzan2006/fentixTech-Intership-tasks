// ===========================================================
// WINTER PORTFOLIO — script.js
// ===========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');
  var navClose = document.getElementById('navClose');
  var navOverlay = document.getElementById('navOverlay');
  var navLinks = document.querySelectorAll('.nav-link');

  function openNav() {
    nav.classList.add('open');
    navOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });
  }
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navOverlay) navOverlay.addEventListener('click', closeNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
      navLinks.forEach(function (l) { l.classList.remove('active-link'); });
      link.classList.add('active-link');
    });
  });

  /* ---------- Active link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  function setActiveOnScroll() {
    var scrollPos = window.scrollY + 110;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove('active-link'); });
        link.classList.add('active-link');
      }
    });
  }
  window.addEventListener('scroll', setActiveOnScroll, { passive: true });

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function toggleHeaderShadow() {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 18px rgba(40,60,70,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });

  /* ---------- Gallery filter ---------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Contact form (front-end only) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in every field before sending.';
        formNote.style.color = '#b85c5c';
        return;
      }

      formNote.style.color = '';
      formNote.textContent = 'Thanks, ' + name.split(' ')[0] + ' — your message has been noted. I\'ll reply soon.';
      contactForm.reset();
    });
  }

});
