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

  const headlines = {
    A: { eyebrow: '01 — ES Logistics · Poznań',
         h: <>Spedycja <em className="accent">międzynarodowa,</em><br/>na której można polegać.</>,
         sub: 'Organizujemy transport drogowy w Polsce i całej Europie. 11 lat doświadczenia, sprawdzeni przewoźnicy, transparentne procesy.' },
    B: { eyebrow: '01 — ES Logistics · Poznań',
         h: <>Twój ładunek.<br/><em className="accent">Nasza odpowiedzialność.</em></>,
         sub: 'ES Logistics — spedycja drogowa, która łączy biznes w całej Europie. Doświadczenie, sieć partnerów, indywidualne podejście.' },
    C: { eyebrow: '01 — ES Logistics · Poznań',
         h: <>Logistyka <em className="accent">bez kompromisów.</em></>,
         sub: 'Spedycja międzynarodowa z Poznania. Dla firm, które wymagają więcej.' },
  };
  const hero = headlines[heroVariant] || headlines.A;

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg photo"/>
        <div className="hero-overlay"/>
        <div className="hero-lion"><LionGraphic/></div>
        <div className="container hero-content">
          <div className="hero-eyebrow"><span>{hero.eyebrow}</span></div>
          <h1>{hero.h}</h1>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-cta">
            <a href="#/dla-klienta" className="btn btn-primary"><span>Zamów transport</span><span className="btn-arrow"></span></a>
            <a href="#/dla-przewoznika" className="btn btn-ghost">Współpraca dla przewoźników</a>
          </div>
        </div>
        <div className="hero-meta">
          <div className="container">
            <div className="hero-meta-inner">
              <div className="hero-meta-cell"><span className="k">Doświadczenie</span><span className="v">11 lat w TSL</span></div>
              <div className="hero-meta-cell"><span className="k">Specjalizacja</span><span className="v">Spedycja międzynarodowa</span></div>
              <div className="hero-meta-cell"><span className="k">Biuro</span><span className="v">Poznań, Polska</span></div>
              <div className="hero-meta-cell"><span className="k">Obsługa</span><span className="v">PL · EN · DE</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE z krajami */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[...Array(2)].map((_, dup) => (
            <React.Fragment key={dup}>
              {['Polska','Niemcy','Holandia','Belgia','Francja','Włochy','Hiszpania','Czechy','Słowacja','Austria','Dania','Szwecja','Norwegia','Litwa','Łotwa','Estonia'].map((c, i) => (
                <span className="hero-marquee-item" key={`${dup}-${i}`}>{c}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* USŁUGI */}
      <section className="section" id="uslugi">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">02 — Nasze usługi</div>
            <div>
              <h2>Pełen pakiet logistyczny —<br/>od zlecenia do dostawy.</h2>
              <p className="lead">Cztery filary współpracy z ES Logistics. Każdy proces prowadzony przez doświadczonego spedytora — od pierwszej wyceny po rozładunek u odbiorcy.</p>
            </div>
          </div>

          <div className="services-grid scroll-reveal">
            {[
              { n: '01', icon: I.globe, t: 'Spedycja międzynarodowa', d: 'Organizacja transportu drogowego w Polsce, UE i krajach EOG. Pełna koordynacja z przewoźnikami i odbiorcami.' },
              { n: '02', icon: I.truck, t: 'Transport drogowy', d: 'Współpraca ze sprawdzoną siecią przewoźników. Realizacja zleceń całopojazdowych (FTL) i drobnicowych (LTL).' },
              { n: '03', icon: I.doc, t: 'Obsługa dokumentacji', d: 'Listy przewozowe CMR, dokumenty celne, raporty załadunkowe. Wszystko w jednym miejscu, w pełnej zgodności z prawem.' },
              { n: '04', icon: I.warehouse, t: 'Logistyka kontraktowa', d: 'Magazynowanie, przeładunki i obsługa stałych łańcuchów dostaw — w fazie rozwoju.', badge: 'W rozwoju' },
            ].map((s) => (
              <a key={s.n} href="#/uslugi" className="service-card">
                {s.badge && <span className="badge">{s.badge}</span>}
                <span className="num">{s.n}</span>
                <div style={{color: 'var(--accent)'}}>{s.icon(28)}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{padding: '0'}}>
        <div className="container">
          <div className="trust-bar">
            <div className="trust-cell"><span className="ico">{I.shield(24)}</span><span className="lbl"><strong>Wiarygodność</strong>11 lat w branży TSL</span></div>
            <div className="trust-cell"><span className="ico">{I.globe(24)}</span><span className="lbl"><strong>Zasięg europejski</strong>PL · DE · UE · EOG</span></div>
            <div className="trust-cell"><span className="ico">{I.pin(24)}</span><span className="lbl"><strong>Biuro w Poznaniu</strong>ul. Kopanina 28/32</span></div>
            <div className="trust-cell"><span className="ico">{I.hand(24)}</span><span className="lbl"><strong>Obsługa</strong>w językach PL/EN/DE</span></div>
          </div>
        </div>
      </section>

      {/* DLACZEGO ES */}
      <section className="section">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">03 — Dlaczego ES Logistics</div>
            <div>
              <h2>Sześć powodów, dla których<br/>klienci do nas <em>wracają.</em></h2>
            </div>
          </div>

          <div className="why-grid scroll-reveal">
            {[
              { n: '01', t: '11 lat doświadczenia', d: 'Założyciel firmy zbudował karierę w branży TSL od pozycji operacyjnej po nadzór. To nie startup — to skondensowana praktyka.' },
              { n: '02', t: 'Indywidualne podejście', d: 'Każde zlecenie obsługiwane przez konkretną osobę. Bez infolinii, bez przekierowań. Bezpośredni kontakt ze spedytorem.' },
              { n: '03', t: 'Sprawdzona sieć przewoźników', d: 'Lata pracy z partnerami w Polsce i Europie. Każdy przewoźnik zweryfikowany dokumentacyjnie i operacyjnie.' },
              { n: '04', t: 'Transparentne procesy', d: 'Status zlecenia, dokumenty, kontakt do kierowcy — wszystko na bieżąco. Bez niedomówień, bez ukrytych kosztów.' },
              { n: '05', t: 'Obsługa dwujęzyczna', d: 'PL, EN i DE. Pracujemy z firmami zagranicznymi tak samo płynnie jak z polskimi.' },
              { n: '06', t: 'Własna flota — wkrótce', d: 'Od 2026 rozwijamy własny park pojazdów ciężarowych i busów. Pełna kontrola nad realizacją.' },
            ].map((it) => (
              <div key={it.n} className="why-item">
                <span className="n">{it.n}</span>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="split-cta scroll-reveal">
            <div className="split-panel">
              <div className="corner-lion"><LionGraphic/></div>
              <span className="tag">Dla klientów</span>
              <h3>Potrzebujesz transportu?</h3>
              <p>Wypełnij krótki formularz — przygotujemy wycenę i dobierzemy przewoźnika do Twojego ładunku, zazwyczaj jeszcze tego samego dnia roboczego.</p>
              <div className="actions">
                <a href="#/dla-klienta" className="btn btn-primary"><span>Zamów transport</span><span className="btn-arrow"></span></a>
                <a href="#/uslugi" className="btn btn-ghost">Zobacz usługi</a>
              </div>
            </div>
            <div className="split-panel dark">
              <div className="corner-lion"><LionGraphic/></div>
              <span className="tag">Dla przewoźników</span>
              <h3>Szukasz stałych zleceń?</h3>
              <p>Współpracujemy z firmami transportowymi w całej Europie. Stałe kierunki, terminowe płatności, fair stawki. Dołącz do naszej sieci.</p>
              <div className="actions">
                <a href="#/dla-przewoznika" className="btn btn-primary"><span>Zarejestruj firmę</span><span className="btn-arrow"></span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">04 — W liczbach</div>
            <div>
              <h2>Skala, doświadczenie,<br/>zaufanie partnerów.</h2>

            </div>
          </div>
          <div className="stats-grid scroll-reveal">
            <Stat value={11} unit="" label="Lat doświadczenia w branży TSL"/>
            <Stat value={12} unit="" label="Krajów na stałych trasach"/>
            <Stat value={3} unit="" label="Języki obsługi (PL · EN · DE)"/>
            <Stat value={24} unit="h" label="Czas reakcji na zapytanie"/>
          </div>
        </div>
      </section>

      {/* KIERUNKI OBSŁUGI */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">05 — Kierunki obsługi</div>
            <div>
              <h2>Z Polski w całą <em>Europę.</em></h2>
              <p className="lead">Najczęstsze trasy realizowane przez ES Logistics. Każdy kierunek mamy obsłużony siecią sprawdzonych przewoźników, z lokalnym wsparciem językowym.</p>
            </div>
          </div>
          <div className="countries-grid scroll-reveal">
            {[
              {code: 'PL', name: 'Polska', tag: 'Hub'},
              {code: 'DE', name: 'Niemcy', tag: 'Główny'},
              {code: 'NL', name: 'Holandia', tag: 'Regularny'},
              {code: 'BE', name: 'Belgia', tag: 'Regularny'},
              {code: 'FR', name: 'Francja', tag: 'Regularny'},
              {code: 'IT', name: 'Włochy', tag: 'Regularny'},
              {code: 'ES', name: 'Hiszpania', tag: 'Na zapytanie'},
              {code: 'CZ', name: 'Czechy', tag: 'Regularny'},
              {code: 'SK', name: 'Słowacja', tag: 'Regularny'},
              {code: 'AT', name: 'Austria', tag: 'Regularny'},
              {code: 'DK', name: 'Dania', tag: 'Regularny'},
              {code: 'SE', name: 'Szwecja', tag: 'Na zapytanie'},
            ].map((c) => (
              <div key={c.code} className="country-tile">
                <span className="country-code">{c.code}</span>
                <span className="country-name">{c.name}</span>
                <span className="country-tag">{c.tag}</span>
              </div>
            ))}
          </div>
          <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 32, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase'}}>Inny kierunek? Skontaktuj się — sprawdzimy możliwości realizacji.</p>
        </div>
      </section>

      {/* ZAUFALI NAM — placeholder logotypy */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">06 — Zaufali nam</div>
            <div>
              <h2>Pracujemy dla firm,<br/>które <em>wymagają więcej.</em></h2>
              <p className="lead">Producenci, dystrybutorzy, importerzy z Polski i Europy. Pełna lista referencji dostępna na życzenie — wiele transportów realizujemy na podstawie umów o poufności.</p>
            </div>
          </div>
          <div className="logos-strip scroll-reveal">
            {['Producent komponentów stalowych · Wielkopolska',
              'Dystrybutor materiałów budowlanych · Mazowsze',
              'Importer części motoryzacyjnych · Śląsk',
              'Producent opakowań · Wielkopolska',
              'Firma e-commerce · Pomorze',
              'Sieć handlowa · Małopolska'].map((t, i) => (
              <div key={i} className="logo-cell">
                <span className="logo-mono">●</span>
                <span className="logo-label">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">07 — Najczęstsze pytania</div>
            <div>
              <h2>Co najczęściej pytają<br/>nasi <em>klienci.</em></h2>
            </div>
          </div>
          <div className="faq-list scroll-reveal">
            {[
              {q: 'Jak szybko otrzymam wycenę transportu?', a: 'Standardowo w ciągu kilku godzin roboczych od przesłania zapytania. W przypadku zleceń rutynowych (znane kierunki) — często jeszcze tego samego dnia.'},
              {q: 'Czy pomagacie w dokumentacji celnej?', a: 'Tak. Przygotowujemy CMR, koordynujemy dokumenty celne (T1, EX, IM), prowadzimy archiwum każdego zlecenia. Klient otrzymuje komplet dokumentów po realizacji.'},
              {q: 'W jakich językach prowadzicie obsługę?', a: 'Polski, angielski, niemiecki — w zakresie komunikacji z klientem, kierowcą i odbiorcą zagranicznym.'},
              {q: 'Czy obsługujecie ładunki ADR / niebezpieczne?', a: 'Na zapytanie — w oparciu o przewoźników z aktualnymi uprawnieniami ADR. Każdy taki transport jest weryfikowany pod kątem dokumentacji i klasy ładunku przed potwierdzeniem.'},
              {q: 'Jakie są terminy płatności?', a: 'Standardowo 14 dni, dla stałych klientów do uzgodnienia indywidualnie. Przewoźnikom płacimy w terminie — to fundament naszej współpracy.'},
              {q: 'Czy macie własną flotę?', a: 'Obecnie pracujemy w modelu spedycji — dobierając przewoźników z naszej zweryfikowanej sieci. W 2026 planujemy zakup pierwszych pojazdów ciężarowych i busów, by uzupełnić ofertę o własny transport.'},
            ].map((it, i) => (
              <details key={i} className="faq-item">
                <summary>
                  <span className="faq-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="faq-q">{it.q}</span>
                  <span className="faq-icon">+</span>
                </summary>
                <p className="faq-a">{it.a}</p>
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
            <div className="num">08 — Kontakt</div>
            <div><h2>Porozmawiajmy o<br/>Twoim <em>ładunku.</em></h2></div>
          </div>
          <div className="contact-grid scroll-reveal">
            <div className="contact-info">
              <div className="contact-row"><span className="k">Biuro</span><span className="v">ul. Kopanina 28/32, Poznań<small>Wielkopolska, Polska</small></span></div>
              <div className="contact-row"><span className="k">Telefon</span><span className="v">Numer w przygotowaniu<small>Najszybciej — przez e-mail</small></span></div>
              <div className="contact-row"><span className="k">E-mail</span><span className="v">biuro@eslogistics.pl<small>Odpowiadamy w ciągu 24h</small></span></div>
              <div className="contact-row"><span className="k">Prezes</span><span className="v">Eryk Szymkowiak<small>11 lat doświadczenia w TSL</small></span></div>
              <div style={{marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap'}}>
                <a href="#/kontakt" className="btn btn-primary"><span>Wszystkie kanały kontaktu</span><span className="btn-arrow"></span></a>
              </div>
            </div>
            <div className="map-frame">
              <iframe title="Biuro ES Logistics — Kopanina 28/32, Poznań" loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=16.857%2C52.397%2C16.890%2C52.413&layer=mapnik&marker=52.405%2C16.873"
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
  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">Start  ·  O nas</div>
          <h1>11 lat praktyki<br/>w branży <em>TSL.</em></h1>
          <p className="lead">ES Logistics powstała z konkretnego doświadczenia — nie z idei. Eryk Szymkowiak przez ponad dekadę pracował z klientami zagranicznymi, organizował transporty i nadzorował operacje, zanim założył własną firmę spedycyjną w Poznaniu.</p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{display: 'grid', gridTemplateColumns: 'minmax(260px, 360px) 1fr', gap: 80, alignItems: 'start'}}>
          <div className="scroll-reveal">
            <PhotoPlaceholder label="Eryk Szymkowiak — Prezes Zarządu" ratio="3/4" src="assets/photo-2.jpeg"/>
            <div style={{marginTop: 20}}>
              <div style={{fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic', fontSize: 22}}>Eryk Szymkowiak</div>
              <div style={{color: 'var(--text-dim)', fontSize: 14, marginTop: 4}}>Prezes Zarządu, założyciel</div>
            </div>
          </div>
          <div className="scroll-reveal" style={{display: 'flex', flexDirection: 'column', gap: 32}}>
            <div>
              <span className="eyebrow">Misja</span>
              <h3 style={{marginTop: 16, fontStyle: 'italic'}}>Łączymy biznes w Europie — w sposób transparentny, terminowy i godny zaufania.</h3>
            </div>
            <p style={{color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.7}}>
              Branża spedycyjna potrafi być chaotyczna — zmiana kierowcy w ostatniej chwili, dokumenty, których nikt nie pilnuje, ceny ustalane przez nieznanego pośrednika. ES Logistics buduje przeciwwagę: jednoosobowy kontakt, jasna kalkulacja, dokumentacja na czas.
            </p>
            <p style={{color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.7}}>
              Pracujemy z firmami produkcyjnymi i handlowymi z Polski, Niemiec i innych krajów UE. Nasz najczęstszy kierunek to transport drogowy w obrębie Europy — od pojedynczego zlecenia po stałe linie kontraktowe.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginTop: 16}}>
              <div style={{padding: '24px 24px 24px 0', borderRight: '1px solid var(--border)'}}>
                <div style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 36, color: 'var(--accent)'}}>2024</div>
                <div style={{color: 'var(--text-dim)', fontSize: 14, marginTop: 4}}>Rejestracja ES Logistics Sp. z o.o.</div>
              </div>
              <div style={{padding: '24px', borderRight: '1px solid var(--border)'}}>
                <div style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 36, color: 'var(--accent)'}}>02/26</div>
                <div style={{color: 'var(--text-dim)', fontSize: 14, marginTop: 4}}>Start rekrutacji zespołu</div>
              </div>
              <div style={{padding: '24px 0 24px 24px'}}>
                <div style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 36, color: 'var(--accent)'}}>2026</div>
                <div style={{color: 'var(--text-dim)', fontSize: 14, marginTop: 4}}>Zakup pierwszych pojazdów</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wartości */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">02 — Wartości</div>
            <div><h2>Trzy zasady, które<br/>nie podlegają <em>negocjacji.</em></h2></div>
          </div>
          <div className="why-grid scroll-reveal" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            <div className="why-item"><span className="n">01</span><h4>Słowo trzymane</h4><p>Termin to termin. Wycena to wycena. Nie zmieniamy zasad gry w trakcie zlecenia.</p></div>
            <div className="why-item"><span className="n">02</span><h4>Bezpośredni kontakt</h4><p>Klient zawsze rozmawia z konkretnym spedytorem — nie z systemem zgłoszeniowym.</p></div>
            <div className="why-item"><span className="n">03</span><h4>Pełna dokumentacja</h4><p>CMR, faktury, protokoły — komplet dokumentów dostarczamy w terminie, w czytelnej formie.</p></div>
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
  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">Start  ·  Usługi</div>
          <h1>Pełen pakiet<br/>logistyczny — <em>cztery filary.</em></h1>
          <p className="lead">Od pojedynczego zlecenia do stałej współpracy kontraktowej. Wybierz to, czego potrzebujesz — albo skorzystaj z całości pakietu.</p>
        </div>
      </header>

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
          <div className="split-cta scroll-reveal">
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
            <div className="split-panel">
              <div className="corner-lion"><LionGraphic/></div>
              <span className="tag">Dla przewoźników</span>
              <h3>Chcesz dołączyć do sieci?</h3>
              <p>Zarejestruj firmę transportową — dobieramy zlecenia do floty, kierunków i specjalizacji.</p>
              <div className="actions">
                <a href="#/dla-przewoznika" className="btn btn-ghost">Współpraca</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomePage, AboutPage, ServicesPage });
