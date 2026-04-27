// enhancements.jsx — cookie banner, back-to-top, sticky mobile CTA, hamburger icon
// Renderowane jako globalne overlay komponenty (ponad routing).

const { useState: useStateE, useEffect: useEffectE } = React;

// ─────────────── Cookie banner (RODO) ───────────────
function CookieBanner() {
  const [visible, setVisible] = useStateE(false);

  useEffectE(() => {
    try {
      if (!localStorage.getItem('es-cookies-accepted')) setVisible(true);
    } catch (e) { setVisible(true); }
  }, []);

  const accept = () => {
    try { localStorage.setItem('es-cookies-accepted', '1'); } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Informacja o cookies">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <strong>Ciasteczka.</strong>
          <span>Strona używa plików cookies w celu zapewnienia poprawnego działania serwisu. Korzystając ze strony wyrażasz zgodę na ich używanie.</span>
        </div>
        <div className="cookie-banner__actions">
          <a href="#/legal" className="cookie-banner__link">Polityka prywatności</a>
          <button onClick={accept} className="btn btn-primary cookie-banner__btn">Akceptuję</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Back to top ───────────────
function BackToTop() {
  const [visible, setVisible] = useStateE(false);

  useEffectE(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button className="back-to-top" aria-label="Wróć na górę"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5 12 12 5 19 12"/>
      </svg>
    </button>
  );
}

// ─────────────── Sticky mobile CTA ───────────────
function MobileCTA() {
  const [visible, setVisible] = useStateE(false);

  useEffectE(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a href="#/dla-klienta" className={`mobile-cta ${visible ? 'visible' : ''}`}>
      <span>Zamów transport</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>
  );
}

// ─────────────── Skip to content (a11y) ───────────────
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">Przejdź do treści</a>
  );
}

Object.assign(window, { CookieBanner, BackToTop, MobileCTA, SkipLink });
