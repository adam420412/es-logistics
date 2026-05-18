// pages.jsx — page components for ES Logistics
// Depends on globals from components.jsx

const { useState: useStateP, useEffect: useEffectP } = React;

// Tiny inline icons (currentColor)
const I = {
  truck: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17h12V6H2zM14 9h4l3 4v4h-7zM6 21a2 2 0 100-4 2 2 0 000 4zM18 21a2 2 0 100-4 2 2 0 000 4z"/></svg>,
  globe: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>,
  doc: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6v18h12V7zM14 3v4h4M8 12h8M8 16h6"/></svg>,
  warehouse: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M3 9l9-5 9 5v12H3zM7 21V13h10v8M10 13v3h4v-3"/></svg>,
  shield: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  pin: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  clock: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  euro: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6a8 8 0 100 12M3 10h11M3 14h11"/></svg>,
  hand: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M9 11V5a2 2 0 114 0v6M13 11V4a2 2 0 114 0v9M9 11V7a2 2 0 10-4 0v8c0 4 3 6 7 6s7-2 7-6v-4a2 2 0 10-4 0"/></svg>,
};

// ═════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═════════════════════════════════════════════════════════════════════════════
function HomePage({ heroVariant }) {
  useReveal();
  const [lang] = useLang();

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg photo"/>
        <div className="hero-overlay"/>
        <div className="hero-lion"><LionGraphic/></div>
        <div className="container hero-content">
          <div className="hero-eyebrow"><span>{t('hero.eyebrow', lang)}</span></div>
          <h1>{t('hero.h1.a', lang)} <em className="accent">{t('hero.h1.b', lang)}</em><br/>{t('hero.h1.c', lang)}</h1>
          {t('hero.sub', lang).trim() && <p className="hero-sub">{t('hero.sub', lang)}</p>}
          <div className="hero-cta">
            <a href="#/dla-klienta" className="btn btn-primary"><span>{t('cta.order', lang)}</span><span className="btn-arrow"></span></a>
            <a href="#/kontakt" className="btn btn-ghost">{t('cta.contact', lang)}</a>
          </div>
        </div>
        <div className="hero-meta">
          <div className="container">
            <div className="hero-meta-inner">
              <div className="hero-meta-cell"><span className="k">{t('hero.meta.experience.k', lang)}</span><span className="v">{t('hero.meta.experience.v', lang)}</span></div>
              <div className="hero-meta-cell"><span className="k">{t('hero.meta.specialization.k', lang)}</span><span className="v">{t('hero.meta.specialization.v', lang)}</span></div>
              <div className="hero-meta-cell"><span className="k">{t('hero.meta.reach.k', lang)}</span><span className="v">{t('hero.meta.reach.v', lang)}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE z krajami */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[...Array(2)].map((_, dup) => (
            <React.Fragment key={dup}>
              {(lang === 'en'
                ? ['Poland','Germany','Netherlands','Belgium','France','Italy','Spain','Czechia','Slovakia','Austria','Switzerland','Denmark','Sweden','Norway','Lithuania','Latvia','Estonia']
                : ['Polska','Niemcy','Holandia','Belgia','Francja','Włochy','Hiszpania','Czechy','Słowacja','Austria','Szwajcaria','Dania','Szwecja','Norwegia','Litwa','Łotwa','Estonia']
              ).map((c, i) => (
                <span className="hero-marquee-item" key={`${dup}-${i}`}>{c}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* NASZE USŁUGI */}
      <section className="section">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('services.section', lang)}</div>
            <div>
              <h2>{t('services.h2.a', lang)} <em>{t('services.h2.c', lang)}</em></h2>
            </div>
          </div>
          <div className="services-grid scroll-reveal">
            {[
              { n: 1, icon: I.globe },
              { n: 2, icon: I.truck },
              { n: 3, icon: I.hand },
              { n: 4, icon: I.warehouse },
            ].map((s) => (
              <div key={s.n} className="service-card">
                <span className="num">{String(s.n).padStart(2,'0')}</span>
                <div style={{color: 'var(--accent)'}}>{s.icon(28)}</div>
                <h3>{t(`services.${s.n}.t`, lang)}</h3>
                <p>{t(`services.${s.n}.d`, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DLACZEGO ES */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('why.section', lang)}</div>
            <div>
              <h2>{t('why.h2.a', lang)}<br/>{t('why.h2.b', lang)} <em>{t('why.h2.c', lang)}</em></h2>
            </div>
          </div>

          <div className="why-grid scroll-reveal">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="why-item">
                <span className="n">{String(n).padStart(2,'0')}</span>
                <h4>{t(`why.${n}.t`, lang)}</h4>
                <p>{t(`why.${n}.d`, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="split-cta scroll-reveal" style={{gridTemplateColumns: '1fr'}}>
            <div className="split-panel">
              <div className="corner-lion"><LionGraphic/></div>
              <span className="tag">{t('splitCta.tag', lang)}</span>
              <h3>{t('splitCta.h3', lang)}</h3>
              <p>{t('splitCta.p', lang)}</p>
              <div className="actions">
                <a href="#/dla-klienta" className="btn btn-primary"><span>{t('cta.order', lang)}</span><span className="btn-arrow"></span></a>
                <a href="#/kontakt" className="btn btn-ghost">{t('cta.contact', lang)}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('faq.section', lang)}</div>
            <div>
              <h2>{t('faq.h2.a', lang)}<br/>{t('faq.h2.b', lang)} <em>{t('faq.h2.c', lang)}</em></h2>
            </div>
          </div>
          <div className="faq-list scroll-reveal">
            {[1,2,3,4,5].map((n, i) => (
              <details key={n} className="faq-item">
                <summary>
                  <span className="faq-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="faq-q">{t(`faq.q${n}`, lang)}</span>
                  <span className="faq-icon">+</span>
                </summary>
                <p className="faq-a">{t(`faq.a${n}`, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER WITH LION */}
      <div className="container">
        <div className="divider-with-lion scroll-reveal">
          <span className="l"></span>
          <span style={{color: 'var(--text-muted)'}}><LionMark size={56}/></span>
          <span className="l"></span>
        </div>
      </div>

      {/* CONTACT TEASER */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('contact.section', lang)}</div>
            <div><h2>{t('contact.h2.a', lang)}<br/>{t('contact.h2.b', lang)} <em>{t('contact.h2.c', lang)}</em></h2></div>
          </div>
          <div className="contact-grid scroll-reveal">
            <div className="contact-info">
              <div className="contact-row"><span className="k">{t('contact.row.office', lang)}</span><span className="v">{t('contact.officeAddr', lang)}</span></div>
              <div className="contact-row"><span className="k">{t('contact.row.phone', lang)}</span><span className="v">+48 539 849 869</span></div>
              <div className="contact-row"><span className="k">{t('contact.row.email', lang)}</span><span className="v">office@eslogistics.pl</span></div>
              <div style={{marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap'}}>
                <a href="#/kontakt" className="btn btn-primary"><span>{t('cta.allChannels', lang)}</span><span className="btn-arrow"></span></a>
              </div>
            </div>
            <div className="map-frame">
              <iframe title="Office ES Logistics — Święty Marcin 29/8, Poznań" loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=16.918%2C52.404%2C16.938%2C52.412&layer=mapnik&marker=52.4076%2C16.9276"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// O NAS
// ═════════════════════════════════════════════════════════════════════════════
function AboutPage() {
  useReveal();
  const [lang] = useLang();
  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">{t('about.crumb', lang)}</div>
          <h1>{t('about.h1.a', lang)}<br/>{t('about.h1.b', lang)} <em>{t('about.h1.c', lang)}</em></h1>
          <p className="lead">{t('about.lead', lang)}</p>
        </div>
      </header>

      <section className="section">
        <div className="container scroll-reveal" style={{maxWidth: 880}}>
          <span className="eyebrow">{t('about.mission', lang)}</span>
          <h3 style={{marginTop: 16, fontStyle: 'italic'}}>{t('about.missionLine', lang)}</h3>
        </div>
      </section>

      {/* Wartości */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('about.values.section', lang)}</div>
            <div><h2>{t('about.values.h2.a', lang)}<br/>{t('about.values.h2.b', lang)} <em>{t('about.values.h2.c', lang)}</em></h2></div>
          </div>
          <div className="why-grid scroll-reveal" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            <div className="why-item"><span className="n">01</span><h4>{t('about.value1.t', lang)}</h4><p>{t('about.value1.d', lang)}</p></div>
            <div className="why-item"><span className="n">02</span><h4>{t('about.value2.t', lang)}</h4><p>{t('about.value2.d', lang)}</p></div>
            <div className="why-item"><span className="n">03</span><h4>{t('about.value3.t', lang)}</h4><p>{t('about.value3.d', lang)}</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// USŁUGI
// ═════════════════════════════════════════════════════════════════════════════
function ServicesPage() {
  useReveal();
  const services = [
    { n: '01', t: 'Spedycja międzynarodowa', d: 'Pełna organizacja transportu drogowego pomiędzy Polską a krajami UE i EOG. Wycena, dobór przewoźnika, koordynacja załadunku, monitoring, dokumentacja.', items: ['Wyceny indywidualne i ramowe', 'Trasy stałe i ad-hoc', 'Komunikacja z odbiorcą zagranicznym', 'Monitoring statusu zlecenia'] },
    { n: '02', t: 'Transport drogowy', d: 'Realizacja zleceń całopojazdowych (FTL) i drobnicowych (LTL) w oparciu o sprawdzoną sieć przewoźników. Naczepy plandekowe, chłodnie, busy.', items: ['FTL — całopojazdowe', 'LTL — drobnica', 'Dostawy ekspresowe (busy)', 'Transporty ponadgabarytowe — na zapytanie'] },
    { n: '03', t: 'Obsługa dokumentacji', d: 'Listy CMR, dokumenty celne (T1, EX, IM), faktury, protokoły. Każdy dokument zachowany w archiwum klienta — dostępny na żądanie.', items: ['CMR — wszystkie języki', 'Dokumentacja celna', 'Archiwizacja zleceń', 'Raporty miesięczne'] },
    { n: '04', t: 'Logistyka kontraktowa', d: 'Stała współpraca dla firm z powtarzalnymi potrzebami transportowymi. Jeden spedytor, jeden harmonogram, jedna umowa.', items: ['Linie regularne PL ⇄ DE/UE', 'Indywidualne SLA', 'Dedykowany spedytor', 'Magazynowanie — w fazie rozwoju'], badge: 'W rozwoju' },
  ];
  const cards = [
    { icon: I.globe, title: 'Transport międzynarodowy', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' },
    { icon: I.truck, title: 'Transport krajowy', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80' },
    { icon: I.hand, title: 'Doświadczeni spedytorzy', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80' },
    { icon: I.truck, title: 'Liczna flota', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80' },
  ];

  return (
    <main>
      <section className="services-hero">
        <div className="container">
          <h1 className="services-hero-title"><em>Nasze usługi</em></h1>
          <div className="services-hero-grid">
            {cards.map((c, i) => (
              <div key={i} className="services-hero-card">
                <img src={c.img} alt={c.title} className="services-hero-card-img"/>
                <div className="services-hero-card-icon">{c.icon(28)}</div>
                <h3 className="services-hero-card-title">{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{display: 'flex', flexDirection: 'column', gap: 0}}>
          {services.map((s, i) => (
            <div key={s.n} className="scroll-reveal" style={{display: 'grid', gridTemplateColumns: '160px 1fr 1.2fr', gap: 48, padding: '56px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)', alignItems: 'start'}}>
              <div>
                <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic', fontSize: 56, lineHeight: 1, color: 'var(--text-muted)'}}>{s.n}</div>
                {s.badge && <div style={{marginTop: 16, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '4px 8px', display: 'inline-block', borderRadius: 2}}>{s.badge}</div>}
              </div>
              <div>
                <h3 style={{fontStyle: 'italic'}}>{s.t}</h3>
                <p style={{marginTop: 16, color: 'var(--text-dim)', fontSize: 17}}>{s.d}</p>
              </div>
              <div>
                <ul style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border)'}}>
                  {s.items.map((it, j) => (
                    <li key={j} style={{padding: '14px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: 15}}>{it}</span>
                      <span style={{color: 'var(--accent)', fontFamily: 'var(--font-display)'}}>—→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="split-cta scroll-reveal" style={{gridTemplateColumns: '1fr'}}>
            <div className="split-panel dark">
              <div className="corner-lion"><LionGraphic/></div>
              <span className="tag">Następny krok</span>
              <h3>Gotowy na wycenę?</h3>
              <p>Wypełnij formularz „Zamów transport" — odpowiemy zazwyczaj jeszcze tego samego dnia roboczego.</p>
              <div className="actions">
                <a href="#/dla-klienta" className="btn btn-primary"><span>Zamów transport</span><span className="btn-arrow"></span></a>
                <a href="#/kontakt" className="btn btn-ghost">Skontaktuj się</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 404 NOT FOUND
// ═════════════════════════════════════════════════════════════════════════════
function NotFoundPage() {
  useReveal();
  const [lang] = useLang();
  return (
    <main>
      <header className="page-header" style={{minHeight: '60vh', display: 'flex', alignItems: 'center'}}>
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container scroll-reveal">
          <div className="crumb">{t('nf.crumb', lang)}</div>
          <h1 style={{fontSize: 'clamp(80px, 12vw, 180px)', lineHeight: 1, fontStyle: 'italic'}}>
            <em style={{color: 'var(--accent)'}}>404.</em>
          </h1>
          <h2 style={{marginTop: 16, fontStyle: 'italic'}}>{t('nf.h2.a', lang)}<br/>{t('nf.h2.b', lang)}</h2>
          <p className="lead" style={{marginTop: 24}}>{t('nf.lead', lang)}</p>
          <div style={{marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap'}}>
            <a href="#/" className="btn btn-primary"><span>{t('nf.home', lang)}</span><span className="btn-arrow"></span></a>
            <a href="#/kontakt" className="btn btn-ghost">{t('nav.contact', lang)}</a>
          </div>
        </div>
      </header>
    </main>
  );
}

Object.assign(window, { HomePage, AboutPage, ServicesPage, NotFoundPage });
