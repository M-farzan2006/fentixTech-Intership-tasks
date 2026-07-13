/* =========================================================
   Muhammad Farzan — Portfolio Scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hide'), 2500);

  /* ---------- Custom cursor dot (desktop only) ---------- */
  const cursorDot = document.getElementById('cursorDot');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorDot.classList.add('active');
    });
    document.addEventListener('mouseleave', () => cursorDot.classList.remove('active'));
  }

  /* ---------- Navbar scroll state + active link ---------- */
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Collapse mobile menu after clicking a link
  const navMenu = document.getElementById('navMenu');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  /* ---------- Typing effect for hero role ---------- */
  const roles = [
    'Full-Stack Web Developer',
    'React & Node.js Enthusiast',
    'UI/UX-minded Engineer',
    'Freelance Web Developer'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 85);
  }
  if (typedEl) typeLoop();

  /* ---------- Scroll reveal animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = +entry.target.dataset.counter;
      const numEl = entry.target.querySelector('.stat-num');
      let count = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        count = Math.min(target, count + step);
        numEl.textContent = count;
        if (count < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Skill bar fill animation ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach((bar) => barObserver.observe(bar));

  /* ---------- Contact form validation + fake submit ---------- */
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formToast');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('.form-control').forEach((field) => {
        const isEmail = field.type === 'email';
        const filled = field.value.trim().length > 0;
        const emailOk = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        const ok = filled && emailOk;
        field.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        toast.classList.remove('show');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';

      // Simulated send (no backend attached to this static site)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        toast.classList.add('show');
        form.reset();
        form.querySelectorAll('.form-control').forEach((f) => f.classList.remove('is-invalid'));
        setTimeout(() => toast.classList.remove('show'), 5000);
      }, 900);
    });

    form.querySelectorAll('.form-control').forEach((field) => {
      field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
