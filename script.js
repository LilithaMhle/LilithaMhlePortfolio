document.addEventListener('DOMContentLoaded', () => {
  // Get-quote hover preview
  const getQuoteEl = document.querySelector('.getquote-float');
  if (getQuoteEl) {
    const preview = document.createElement('div');
    preview.className = 'getquote-preview';
    const img = document.createElement('img');
    img.src = 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/582800360_838055742036574_7301026098191671709_n.jpg?stp=c0.77.864.864a_dst-jpg_s565x565_tt6&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=N2Wv98efRysQ7kNvwE-dBJS&_nc_oc=Admwdsz9J4sJnff3Ho_K26BgjkdhyUeDaKIToRzZAAZxNKiswGK47spgIJ3aowxomkM&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=7vNUWuG1mCd2JXkoxDlZrQ&oh=00_Afg9p0dwuTTOHmpy5itXgugCxLUu7QYWNrXBSCmbdebyzQ&oe=691BB26C';
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
    hamburger.addEventListener('click', () => body.classList.toggle('nav-open'));
  }

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