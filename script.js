document.addEventListener('DOMContentLoaded', () => {
  // Get-quote hover preview
  const getQuoteEl = document.querySelector('.getquote-float');
  if (getQuoteEl) {
    const preview = document.createElement('div');
    preview.className = 'getquote-preview';
    const img = document.createElement('img');
    img.src = 'https://res.cloudinary.com/dfvudlvl7/image/upload/v1772967107/WhatsApp_Image_2025-10-11_at_11.55.43_tafuog.jpg';
    img.alt = 'Profile preview';
    preview.appendChild(img);
    document.body.appendChild(preview);

    getQuoteEl.addEventListener('mouseenter', () => { preview.style.display = 'block'; });
    getQuoteEl.addEventListener('mouseleave', () => { preview.style.display = 'none'; });
    getQuoteEl.addEventListener('focus', () => preview.style.display = 'block');
    getQuoteEl.addEventListener('blur', () => preview.style.display = 'none');
  }

  // Portfolio bookmark popup toggle + close on outside click
  const bookmarkIcon = document.querySelector('.portfolio-bookmark .bookmark-icon');
  const popup = document.querySelector('.portfolio-popup');
  if (bookmarkIcon && popup) {
    bookmarkIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && !bookmarkIcon.contains(e.target)) popup.classList.remove('active');
    });
  }

  // Portfolio popup: ensure keyboard and hover accessibility, close on outside click
  const bookmark = document.querySelector('.portfolio-bookmark');
  if (bookmark && popup) {
    // focus handling (CSS :hover can still handle mouse hover)
    bookmark.addEventListener('focusin', () => popup.classList.add('active'));
    bookmark.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!bookmark.contains(document.activeElement)) popup.classList.remove('active');
      }, 10);
    });

    // show/hide on mouseenter/mouseleave for better responsiveness
    bookmark.addEventListener('mouseenter', () => popup.classList.add('active'));
    bookmark.addEventListener('mouseleave', () => popup.classList.remove('active'));

    // close popup when clicking outside
    document.addEventListener('click', (e) => {
      if (!bookmark.contains(e.target)) popup.classList.remove('active');
    });
  }

  // small nav hamburger toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      body.classList.toggle('nav-open');
      const isOpen = body.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !document.querySelector('.nav-menu').contains(e.target)) {
      body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // ensure .getquote-float always labelled correctly
  document.querySelectorAll('.getquote-float').forEach(el => el.textContent = 'Get Quote');

  // progress bar update for quote form (if page has it)
  const progress = document.querySelector('.progress-bar > i');
  const steps = document.querySelectorAll('.step');
  if (progress && steps.length) {
    function updateProgress(n){
      const pct = Math.round((n / (steps.length)) * 100);
      progress.style.width = pct + '%';
    }
    const toStep2 = document.getElementById('toStep2');
    const backTo1 = document.getElementById('backTo1');
    const confirm = document.getElementById('confirmQuote');
    if (toStep2) toStep2.addEventListener('click', ()=> updateProgress(1));
    if (backTo1) backTo1.addEventListener('click', ()=> updateProgress(0));
    if (confirm) confirm.addEventListener('click', ()=> updateProgress(2));
  }
});