// Components.jsx — shared building blocks for ES Logistics site
// All components attach to window at end so other Babel scripts can use them.

const { useState, useEffect, useRef, useCallback } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Lion SVG (inline so it inherits currentColor / fill from CSS)
// ─────────────────────────────────────────────────────────────────────────────
function LionMark({ size = 22, style }) {
  return (
    <img src="assets/lew.png" alt="" aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain', filter: 'var(--lion-filter, none)', ...style }}/>
  );
}

function LionGraphic() {
  return (
    <img src="assets/lew.png" alt="" aria-hidden="true"
      style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'var(--lion-filter, none)' }}/>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header / Nav
// ─────────────────────────────────────────────────────────────────────────────
function BrandLockup() {
  const [lang] = useLang();
  return (
    <a href="#/" className="brand-lockup" aria-label={t('a11y.brand', lang)}>
      <span className="lion-mark"><LionMark size={20} /></span>
      <span className="brand-wordmark">
        <span className="top">ES LOGISTICS</span>
      </span>
    </a>
  );
}

function Header({ route, onRoute }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useLang();

  useEffect(() => { setOpen(false); }, [route]);

  const links = [
    { href: '#/', label: t('nav.start', lang), match: '/' },
    { href: '#/uslugi', label: t('nav.services', lang), match: '/uslugi' },
    { href: '#/o-nas', label: t('nav.about', lang), match: '/o-nas' },
    { href: '#/kontakt', label: t('nav.contact', lang), match: '/kontakt' },
  ];

  return (
    <header className={`site-header ${open ? 'mobile-menu-open' : ''}`}>
      <div className="container nav">
        <BrandLockup />
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={route === l.match ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label={t('lang.label', lang)}>
            {['pl','en'].map(L => (
              <button key={L} className={lang === L ? 'active' : ''} onClick={() => setLang(L)}>{L.toUpperCase()}</button>
            ))}
          </div>
          <a href="#/dla-klienta" className="btn btn-primary" style={{padding: '10px 16px', fontSize: 12}}>
            {t('cta.order', lang)}
          </a>
          <button className={`menu-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? t('menu.close', lang) : t('menu.open', lang)}>
            <span className="menu-burger" aria-hidden="true">
              <span/><span/><span/>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const [lang] = useLang();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <BrandLockup />
            <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-dim)'}}>
              <div>office@eslogistics.pl</div>
              <div>+48 539 849 869</div>
            </div>
          </div>
          <div className="footer-col">
            <h5>{t('footer.col.company', lang)}</h5>
            <ul>
              <li><a href="#/o-nas">{t('nav.about', lang)}</a></li>
              <li><a href="#/kontakt">{t('nav.contact', lang)}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t('footer.col.collab', lang)}</h5>
            <ul>
              <li><a href="#/dla-klienta">{t('cta.order', lang)}</a></li>
              <li><a href="#/kontakt">{t('cta.contact', lang)}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t('footer.col.legal', lang)}</h5>
            <ul>
              <li><a href="#/legal">{t('footer.privacy', lang)}</a></li>
              <li><a href="#/legal">{t('footer.rodo', lang)}</a></li>
              <li><a href="#/" onClick={() => setTimeout(() => { const el = document.getElementById('faq'); if (el) el.scrollIntoView({behavior: 'smooth'}); }, 100)}>{t('footer.faq', lang)}</a></li>
              <li><a href="#/legal">{t('footer.cookies', lang)}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="reg">© 2026 ES LOGISTICS Sp. z o.o.</span>
          <span>{t('footer.bottom.made', lang)}</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────
function useHashRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#', '') || '/'));
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash.replace('#', '') || '/');
      window.scrollTo({top: 0, behavior: 'instant'});
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return [route, (r) => { window.location.hash = r; }];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return [val, ref];
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat (animated count)
// ─────────────────────────────────────────────────────────────────────────────
function Stat({ value, unit, label, prefix = '' }) {
  const [v, ref] = useCountUp(value);
  return (
    <div className="stat" ref={ref}>
      <div className="v">{prefix}{v}<span className="unit">{unit}</span></div>
      <div className="l">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Photo placeholder — labelled, monochrome
// ─────────────────────────────────────────────────────────────────────────────
function PhotoPlaceholder({ label, ratio = '16/9', tone = 'dark', children, style, src }) {
  const palette = tone === 'dark'
    ? 'linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 70%)'
    : 'linear-gradient(135deg, #2a2a2a 0%, #161616 70%)';
  const bg = src
    ? `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url('${src}') center/cover no-repeat`
    : palette;
  return (
    <div className="photo-ph" style={{
      aspectRatio: ratio,
      background: bg,
      filter: src ? 'grayscale(0.35) contrast(1.05)' : undefined,
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      ...style,
    }}>
      {/* subtle textured stripes to suggest a photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
      }}/>
      {children}
      <div style={{
        position: 'relative',
        margin: 16,
        fontFamily: 'var(--font-display)',
        fontWeight: 700, fontStyle: 'italic',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
        padding: '6px 10px',
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(6px)',
      }}>
        {label}
      </div>
    </div>
  );
}

Object.assign(window, {
  LionMark, LionGraphic, BrandLockup, Header, Footer,
  useHashRoute, useReveal, useCountUp, Stat, PhotoPlaceholder,
});
