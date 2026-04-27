/* =========================================================
   ES LOGISTICS — main.js
   - Mobilne menu (toggle)
   - Smooth scroll do kotwic
   - Walidacja i obsługa formularzy (mailto fallback)
   - Animowane liczniki w sekcji statystyk
   - Aktywny link w nawigacji wg ścieżki
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobilne menu ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      const expanded = nav.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Zamknij menu po kliknięciu w link
    nav.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  /* ---------- Aktywny link w nawigacji ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* ---------- Animowane liczniki ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    if (isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toString();
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Walidacja + mailto fallback dla formularzy ---------- */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const errEl = form.querySelector('.form__error');
      const okEl  = form.querySelector('.form__success');
      if (errEl) errEl.classList.remove('is-visible');

      // walidacja podstawowa
      const required = form.querySelectorAll('[required]');
      let invalid = false;
      required.forEach(field => {
        field.style.borderColor = '';
        const val = (field.value || '').trim();
        if (!val) { invalid = true; field.style.borderColor = '#EF4444'; }
        if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          invalid = true; field.style.borderColor = '#EF4444';
        }
      });

      if (invalid) {
        if (errEl) {
          errEl.textContent = 'Uzupełnij wymagane pola (oznaczone *) i sprawdź poprawność e-maila.';
          errEl.classList.add('is-visible');
        }
        return;
      }

      // Składamy treść e-maila i otwieramy klient pocztowy
      const formType = form.dataset.form;
      const subjectMap = {
        'klient':       'Zapytanie o transport — formularz ze strony',
        'przewoznik':   'Zgłoszenie współpracy (przewoźnik) — formularz ze strony',
        'kontakt':      'Wiadomość ze strony — formularz kontaktowy'
      };
      const subject = subjectMap[formType] || 'Wiadomość ze strony ES Logistics';

      const fields = form.querySelectorAll('input:not([type=checkbox]):not([type=submit]), select, textarea');
      const lines = [];
      fields.forEach(f => {
        if (!f.name) return;
        const label = (form.querySelector(`label[for="${f.id}"]`)?.textContent || f.name)
          .replace('*','').trim();
        lines.push(`${label}: ${f.value || '-'}`);
      });
      const body = lines.join('\n') + '\n\n--\nWiadomość wygenerowana z formularza www.';

      const recipient = form.dataset.recipient || 'biuro@eslogistics.pl';
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      // Pokaż komunikat sukcesu (formalnie — bez backendu nie wiemy czy mail wyszedł)
      if (okEl) {
        okEl.textContent = 'Otwarto klienta pocztowego — wyślij wiadomość, aby zakończyć. Skontaktujemy się jak najszybciej.';
        okEl.classList.add('is-visible');
      }
      form.reset();
    });
  });

  /* ---------- Rok w stopce ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
