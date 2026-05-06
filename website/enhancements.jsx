// enhancements.jsx — cookie banner, back-to-top, sticky mobile CTA, hamburger icon
// Renderowane jako globalne overlay komponenty (ponad routing).

const { useState: useStateE, useEffect: useEffectE } = React;

// ─────────────── Cookie banner (RODO) ───────────────
function CookieBanner() {
  const [visible, setVisible] = useStateE(false);
  const [lang] = useLang();

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
    <div className="cookie-banner" role="dialog" aria-label={t('cookie.dialog', lang)}>
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <strong>{t('cookie.title', lang)}</strong>
          <span>{t('cookie.body', lang)}</span>
        </div>
        <div className="cookie-banner__actions">
          <a href="#/legal" className="cookie-banner__link">{t('cookie.privacy', lang)}</a>
          <button onClick={accept} className="btn btn-primary cookie-banner__btn">{t('cookie.accept', lang)}</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Back to top ───────────────
function BackToTop() {
  const [visible, setVisible] = useStateE(false);
  const [lang] = useLang();

  useEffectE(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button className="back-to-top" aria-label={t('a11y.backTop', lang)}
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
  const [lang] = useLang();

  useEffectE(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a href="#/dla-klienta" className={`mobile-cta ${visible ? 'visible' : ''}`}>
      <span>{t('cta.order', lang)}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>
  );
}

// ─────────────── Skip to content (a11y) ───────────────
function SkipLink() {
  const [lang] = useLang();
  return (
    <a href="#main-content" className="skip-link">{t('a11y.skip', lang)}</a>
  );
}

Object.assign(window, { CookieBanner, BackToTop, MobileCTA, SkipLink });
