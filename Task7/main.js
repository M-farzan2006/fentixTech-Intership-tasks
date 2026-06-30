// ===========================================================
// WHITEPACE — interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Testimonial dot navigation (visual only, static content) ---- */
  const dots = document.querySelectorAll('.carousel-dots span');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  /* ---- Testimonial prev/next arrows ---- */
  const prevBtn = document.querySelector('.t-prev');
  const nextBtn = document.querySelector('.t-next');
  let activeIndex = 0;

  function setActiveDot(index) {
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + dots.length) % dots.length;
      setActiveDot(activeIndex);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % dots.length;
      setActiveDot(activeIndex);
    });
  }

});
