// Shared interactions for all portfolio pages
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }));
  }

  const themeButton = document.querySelector('.theme-toggle');
  if (themeButton) {
    const savedTheme = localStorage.getItem('lhance-theme');
    if (savedTheme === 'light') document.body.classList.add('light-mode');
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('lhance-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }

  const backTop = document.querySelector('.back-top');
  const updateBackTop = () => {
    if (backTop) backTop.classList.toggle('show', window.scrollY > 350);
  };
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
});
