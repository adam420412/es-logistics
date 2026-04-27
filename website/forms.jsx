// forms.jsx — interactive forms + remaining pages

const { useState: useStateF } = React;

// ─────────────── Field component ───────────────
function Field({ label, name, type = 'text', value, onChange, error, required, placeholder, full, options, rows }) {
  const id = `f-${name}`;
  return (
    <div className={`field ${full ? 'full' : ''} ${error ? 'has-err' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="req"> *</span>}</label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} rows={rows || 4}/>
      ) : type === 'select' ? (
        <select id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
          <option value="">— wybierz —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder}/>
      )}
      <span className="err">{error || ''}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DLA KLIENTA
// ═════════════════════════════════════════════════════════════════════════════
function ClientPage() {
  useReveal();
  const [data, setData] = useStateF({ firma: '', nip: '', email: '', telefon: '', zaladunek: '', rozladunek: '', typ: '', waga: '', data: '', uwagi: '', rodo: false });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);

  const set = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };
  const setBool = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!data.firma) e.firma = 'Podaj nazwę firmy';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Nieprawidłowy adres e-mail';
    if (!data.telefon) e.telefon = 'Podaj telefon';
    if (!data.zaladunek) e.zaladunek = 'Podaj miejsce załadunku';
    if (!data.rozladunek) e.rozladunek = 'Podaj miejsce rozładunku';
    if (!data.rodo) e.rodo = 'Wymagana zgoda RODO';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => { ev.preventDefault(); if (validate()) setSubmitted(true); };

  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">Start  ·  Dla klienta</div>
          <h1>Zamów <em>transport.</em></h1>
          <p className="lead">Cztery kroki do realizacji. Bez infolinii, bez kolejek — bezpośredni kontakt ze spedytorem.</p>
        </div>
      </header>

      {/* PROCES */}
      <section className="section">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">01 — Proces</div>
            <div><h2>Cztery kroki do<br/>zrealizowanego <em>transportu.</em></h2></div>
          </div>
          <div className="process scroll-reveal">
            {[
              { n: '01', t: 'Zapytanie', d: 'Wypełniasz formularz lub piszesz e-mail. Otrzymujesz pierwszą informację zwrotną zazwyczaj w ciągu kilku godzin.' },
              { n: '02', t: 'Wycena', d: 'Przygotowujemy wycenę na podstawie trasy, typu ładunku i terminu. Bez ukrytych kosztów.' },
              { n: '03', t: 'Realizacja', d: 'Dobieramy przewoźnika, koordynujemy załadunek, monitorujemy trasę. Jesteś na bieżąco.' },
              { n: '04', t: 'Dokumentacja', d: 'Komplet dokumentów (CMR, faktura) trafia do Ciebie po rozładunku — w terminie i w czytelnej formie.' },
            ].map((s, i) => (
              <div key={s.n} className={`process-step ${i === 0 ? 'active' : ''}`}>
                <div className="dot">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARZ */}
      <section className="section" style={{paddingTop: 0}} id="formularz">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">02 — Formularz</div>
            <div><h2>Zapytanie o <em>transport.</em></h2><p className="lead">Wypełnienie zajmuje ok. 2 minuty. Pola oznaczone gwiazdką są wymagane.</p></div>
          </div>

          {submitted ? (
            <div className="form-success scroll-reveal">
              <h4>Dziękujemy — zapytanie zostało wysłane.</h4>
              <p style={{color: 'var(--text-dim)'}}>Skontaktujemy się z Tobą zazwyczaj w ciągu 24 godzin roboczych. Nr referencyjny: <strong style={{color: 'var(--text)'}}>ESL-{Math.floor(Math.random()*900000+100000)}</strong></p>
              <div style={{marginTop: 16}}>
                <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setData({ firma: '', nip: '', email: '', telefon: '', zaladunek: '', rozladunek: '', typ: '', waga: '', data: '', uwagi: '', rodo: false }); }}>Wyślij kolejne zapytanie</button>
              </div>
            </div>
          ) : (
            <form className="form scroll-reveal" onSubmit={onSubmit} noValidate>
              <Field label="Firma" name="firma" value={data.firma} onChange={set} error={errors.firma} required placeholder="Nazwa firmy"/>
              <Field label="NIP" name="nip" value={data.nip} onChange={set} error={errors.nip} placeholder="0000000000"/>
              <Field label="E-mail" name="email" type="email" value={data.email} onChange={set} error={errors.email} required placeholder="kontakt@firma.pl"/>
              <Field label="Telefon" name="telefon" type="tel" value={data.telefon} onChange={set} error={errors.telefon} required placeholder="+48 ..."/>
              <Field label="Miejsce załadunku" name="zaladunek" value={data.zaladunek} onChange={set} error={errors.zaladunek} required placeholder="Miasto, kod pocztowy, kraj"/>
              <Field label="Miejsce rozładunku" name="rozladunek" value={data.rozladunek} onChange={set} error={errors.rozladunek} required placeholder="Miasto, kod pocztowy, kraj"/>
              <Field label="Typ ładunku" name="typ" type="select" value={data.typ} onChange={set} options={['Ładunek paletowy','Drobnica (LTL)','Całopojazdowy (FTL)','Chłodnia / temperatura kontrolowana','Ponadgabaryt','Bus / dostawa ekspresowa','Inny']}/>
              <Field label="Waga (kg)" name="waga" type="number" value={data.waga} onChange={set} placeholder="np. 12000"/>
              <Field label="Planowana data załadunku" name="data" type="date" value={data.data} onChange={set}/>
              <div className="field"></div>
              <Field label="Uwagi dodatkowe" name="uwagi" type="textarea" value={data.uwagi} onChange={set} full placeholder="Wymiary ładunku, godziny pracy magazynu, dane osoby kontaktowej u załadowcy..."/>

              <label className={`consent ${errors.rodo ? 'has-err' : ''}`}>
                <input type="checkbox" checked={data.rodo} onChange={(e) => setBool('rodo', e.target.checked)}/>
                <span>Wyrażam zgodę na przetwarzanie moich danych osobowych przez ES Logistics Sp. z o.o. w celu udzielenia odpowiedzi na zapytanie. Pełna treść: <a href="#/legal" style={{color: 'var(--accent)'}}>Polityka prywatności</a>. {errors.rodo && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4}}>{errors.rodo}</span>}</span>
              </label>

              <div className="full" style={{display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 12}}>
                <button type="submit" className="btn btn-primary"><span>Wyślij zapytanie</span><span className="btn-arrow"></span></button>
                <span style={{fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em'}}>CHRONIONE PRZEZ reCAPTCHA</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DLA PRZEWOŹNIKA
// ═════════════════════════════════════════════════════════════════════════════
function CarrierPage() {
  useReveal();
  const [data, setData] = useStateF({ firma: '', nip: '', email: '', telefon: '', flota: '', kierunki: '', licencja: false, ocp: false, rodo: false });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);

  const set = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };
  const setBool = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!data.firma) e.firma = 'Podaj nazwę firmy';
    if (!data.nip) e.nip = 'Podaj NIP';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Nieprawidłowy adres e-mail';
    if (!data.telefon) e.telefon = 'Podaj telefon';
    if (!data.flota) e.flota = 'Opisz flotę';
    if (!data.licencja) e.licencja = 'Wymagana licencja transportowa';
    if (!data.ocp) e.ocp = 'Wymagana polisa OCP';
    if (!data.rodo) e.rodo = 'Wymagana zgoda RODO';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onSubmit = (ev) => { ev.preventDefault(); if (validate()) setSubmitted(true); };

  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">Start  ·  Dla przewoźnika</div>
          <h1>Stałe zlecenia.<br/>Terminowe <em>płatności.</em></h1>
          <p className="lead">Współpracujemy z firmami transportowymi w całej Europie. Jeśli prowadzisz firmę przewozową — dołącz do naszej sieci.</p>
          <div style={{marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap'}}>
            <a href="#formularz" className="btn btn-primary"><span>Zarejestruj firmę</span><span className="btn-arrow"></span></a>
            <a href="#/kontakt" className="btn btn-ghost">Zadaj pytanie</a>
          </div>
        </div>
      </header>

      {/* CO OFERUJEMY */}
      <section className="section">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">01 — Co oferujemy</div>
            <div><h2>Sześć powodów,<br/>by z nami <em>współpracować.</em></h2></div>
          </div>
          <div className="benefits-grid scroll-reveal">
            {[
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M2 17h12V6H2zM14 9h4l3 4v4h-7zM6 21a2 2 0 100-4 2 2 0 000 4zM18 21a2 2 0 100-4 2 2 0 000 4z"/></svg>, t: 'Stałe zlecenia', d: 'Powtarzalne kierunki — możesz zaplanować flotę z wyprzedzeniem zamiast łapać pojedyncze zlecenia z giełdy.' },
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M18 6a8 8 0 100 12M3 10h11M3 14h11"/></svg>, t: 'Terminowe płatności', d: 'Faktury opłacane zgodnie z umową. Bez przeciągania, bez „przypomnijcie się za tydzień".' },
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2v20M5 8l7-4 7 4M5 8v8l7 4 7-4V8"/></svg>, t: 'Fair stawki', d: 'Wyceny rynkowe z marżą, którą obie strony akceptują. Bez wyciskania kierowcy do ostatniego eurocenta.' },
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9zM12 7v5l3 2"/></svg>, t: 'Krótka decyzja', d: 'Zlecenie potwierdzamy w godzinach, nie dniach. Mniej czekania, więcej kilometrów.' },
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>, t: 'Pełna dokumentacja', d: 'Zlecenie transportowe, CMR, faktura — wszystko czytelne, podpisane, w jednym miejscu.' },
              { i: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zM12 7v5l3 2"/></svg>, t: 'Realny człowiek', d: 'Jeden spedytor — bezpośredni kontakt. Bez infolinii i tracenia czasu na powtarzanie sprawy.' },
            ].map((b, i) => (
              <div key={i} className="benefit">
                <div className="ico">{b.i}</div>
                <h4>{b.t}</h4>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WYMAGANIA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">02 — Wymagania</div>
            <div><h2>Czego oczekujemy<br/>od <em>partnera.</em></h2><p className="lead">Standard rynkowy. Sprawdzamy dokumenty raz, na początku — później budujemy zaufanie operacyjne.</p></div>
          </div>
          <div className="requirements scroll-reveal">
            {[
              { n: '01', t: 'Aktualna licencja transportowa', d: 'Krajowa lub wspólnotowa licencja na transport drogowy rzeczy.' },
              { n: '02', t: 'Polisa OCP', d: 'Aktualne ubezpieczenie odpowiedzialności cywilnej przewoźnika z odpowiednią sumą gwarancyjną.' },
              { n: '03', t: 'Sprawny tabor', d: 'Pojazdy w dobrym stanie technicznym, regularne przeglądy, ważne badania techniczne.' },
              { n: '04', t: 'Komunikacja', d: 'Kontakt do dyspozytora i kierowcy w godzinach pracy. Telefon, e-mail, SMS, WhatsApp.' },
              { n: '05', t: 'Doświadczenie', d: 'Minimum 1 rok prowadzenia firmy transportowej i pozytywne referencje.' },
              { n: '06', t: 'Zgodność dokumentowa', d: 'NIP, REGON, KRS / wpis do CEIDG, świadectwa kierowców (kod 95).' },
            ].map(r => (
              <div key={r.n} className="req-item">
                <div className="num">{r.n}</div>
                <div><h4>{r.t}</h4><p>{r.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARZ REJESTRACJI */}
      <section className="section" style={{paddingTop: 0}} id="formularz">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">03 — Rejestracja</div>
            <div><h2>Zarejestruj <em>firmę.</em></h2><p className="lead">Po wypełnieniu formularza otrzymasz e-mail z prośbą o przesłanie skanów licencji i OCP. Weryfikacja zazwyczaj zajmuje 1–2 dni robocze.</p></div>
          </div>

          {submitted ? (
            <div className="form-success scroll-reveal">
              <h4>Zgłoszenie wysłane — dziękujemy!</h4>
              <p style={{color: 'var(--text-dim)'}}>Wkrótce skontaktuje się z Tobą nasz spedytor. Na podany adres e-mail wyślemy listę dokumentów do weryfikacji. Nr referencyjny: <strong style={{color: 'var(--text)'}}>ESL-P-{Math.floor(Math.random()*900000+100000)}</strong></p>
              <div style={{marginTop: 16}}>
                <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setData({ firma: '', nip: '', email: '', telefon: '', flota: '', kierunki: '', licencja: false, ocp: false, rodo: false }); }}>Zarejestruj kolejną firmę</button>
              </div>
            </div>
          ) : (
            <form className="form scroll-reveal" onSubmit={onSubmit} noValidate>
              <Field label="Nazwa firmy" name="firma" value={data.firma} onChange={set} error={errors.firma} required placeholder="Pełna nazwa zgodna z KRS / CEIDG"/>
              <Field label="NIP" name="nip" value={data.nip} onChange={set} error={errors.nip} required placeholder="0000000000"/>
              <Field label="E-mail kontaktowy" name="email" type="email" value={data.email} onChange={set} error={errors.email} required placeholder="dyspozytor@firma.pl"/>
              <Field label="Telefon" name="telefon" type="tel" value={data.telefon} onChange={set} error={errors.telefon} required placeholder="+48 ..."/>
              <Field label="Flota — liczba i typ pojazdów" name="flota" type="textarea" value={data.flota} onChange={set} error={errors.flota} required full placeholder="np. 8 zestawów plandekowych 24t, 2 chłodnie, 3 busy 3.5t"/>
              <Field label="Główne kierunki" name="kierunki" type="textarea" value={data.kierunki} onChange={set} full placeholder="np. PL ⇄ DE, PL ⇄ FR, PL ⇄ BeNeLux"/>

              <div className="full" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 8}}>
                <label className={`consent ${errors.licencja ? 'has-err' : ''}`} style={{gridColumn: 'span 1'}}>
                  <input type="checkbox" checked={data.licencja} onChange={(e) => setBool('licencja', e.target.checked)}/>
                  <span><strong style={{color: 'var(--text)'}}>Posiadam aktualną licencję transportową</strong><br/>(skan prześlę w odpowiedzi na nasz e-mail) {errors.licencja && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4, fontSize: 12}}>{errors.licencja}</span>}</span>
                </label>
                <label className={`consent ${errors.ocp ? 'has-err' : ''}`} style={{gridColumn: 'span 1'}}>
                  <input type="checkbox" checked={data.ocp} onChange={(e) => setBool('ocp', e.target.checked)}/>
                  <span><strong style={{color: 'var(--text)'}}>Posiadam aktualną polisę OCP</strong><br/>(skan prześlę w odpowiedzi na nasz e-mail) {errors.ocp && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4, fontSize: 12}}>{errors.ocp}</span>}</span>
                </label>
              </div>

              <label className={`consent ${errors.rodo ? 'has-err' : ''}`}>
                <input type="checkbox" checked={data.rodo} onChange={(e) => setBool('rodo', e.target.checked)}/>
                <span>Wyrażam zgodę na przetwarzanie danych firmy przez ES Logistics Sp. z o.o. w celu nawiązania współpracy. Pełna treść: <a href="#/legal" style={{color: 'var(--accent)'}}>Polityka prywatności</a>. {errors.rodo && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4}}>{errors.rodo}</span>}</span>
              </label>

              <div className="full" style={{display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 12}}>
                <button type="submit" className="btn btn-primary"><span>Wyślij zgłoszenie</span><span className="btn-arrow"></span></button>
                <span style={{fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em'}}>CHRONIONE PRZEZ reCAPTCHA</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// KONTAKT
// ═════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  useReveal();
  const [data, setData] = useStateF({ imie: '', email: '', temat: '', wiadomosc: '', rodo: false });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);
  const set = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };
  const setBool = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!data.imie) e.imie = 'Podaj imię i nazwisko';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Nieprawidłowy adres e-mail';
    if (!data.wiadomosc) e.wiadomosc = 'Wpisz treść wiadomości';
    if (!data.rodo) e.rodo = 'Wymagana zgoda RODO';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onSubmit = (ev) => { ev.preventDefault(); if (validate()) setSubmitted(true); };

  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">Start  ·  Kontakt</div>
          <h1>Porozmawiajmy.<br/><em>Bez infolinii.</em></h1>
          <p className="lead">Bezpośredni kontakt ze spedytorem — telefon, e-mail albo formularz. Odpowiadamy zazwyczaj w ciągu 24 godzin roboczych.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid scroll-reveal">
            <div className="contact-info">
              <div className="contact-row"><span className="k">Adres</span><span className="v">ul. Kopanina 28/32<br/>60-105 Poznań<small>Wielkopolska, Polska</small></span></div>
              <div className="contact-row"><span className="k">Telefon</span><span className="v">Numer w przygotowaniu<small>Pon–Pt 8:00–18:00</small></span></div>
              <div className="contact-row"><span className="k">E-mail</span><span className="v">biuro@eslogistics.pl<small>Odpowiadamy w ciągu 24h</small></span></div>
              <div className="contact-row"><span className="k">Spedycja</span><span className="v">spedycja@eslogistics.pl<small>Zapytania transportowe</small></span></div>
              <div className="contact-row"><span className="k">Współpraca</span><span className="v">przewoznicy@eslogistics.pl<small>Rejestracja przewoźników</small></span></div>
              <div className="contact-row"><span className="k">Dane spółki</span><span className="v">ES Logistics Sp. z o.o.<small>NIP — · REGON — · KRS —</small></span></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              <div className="map-frame" style={{aspectRatio: '4/3'}}>
                <iframe title="Biuro ES Logistics — Kopanina 28/32, Poznań" loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=16.857%2C52.397%2C16.890%2C52.413&layer=mapnik&marker=52.405%2C16.873"/>
              </div>
              <a href="https://www.openstreetmap.org/?mlat=52.405&mlon=16.873#map=15/52.405/16.873" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{alignSelf: 'flex-start'}}>Otwórz w mapach</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">02 — Formularz</div>
            <div><h2>Napisz <em>wiadomość.</em></h2></div>
          </div>

          {submitted ? (
            <div className="form-success scroll-reveal">
              <h4>Wiadomość wysłana — dziękujemy!</h4>
              <p style={{color: 'var(--text-dim)'}}>Odpowiemy na wskazany adres w ciągu 24 godzin roboczych.</p>
            </div>
          ) : (
            <form className="form scroll-reveal" onSubmit={onSubmit} noValidate>
              <Field label="Imię i nazwisko" name="imie" value={data.imie} onChange={set} error={errors.imie} required/>
              <Field label="E-mail" name="email" type="email" value={data.email} onChange={set} error={errors.email} required/>
              <Field label="Temat" name="temat" type="select" value={data.temat} onChange={set} options={['Zapytanie o transport','Współpraca jako przewoźnik','Logistyka kontraktowa','Inne']} full/>
              <Field label="Wiadomość" name="wiadomosc" type="textarea" value={data.wiadomosc} onChange={set} error={errors.wiadomosc} required full rows={6}/>
              <label className={`consent ${errors.rodo ? 'has-err' : ''}`}>
                <input type="checkbox" checked={data.rodo} onChange={(e) => setBool('rodo', e.target.checked)}/>
                <span>Wyrażam zgodę na przetwarzanie moich danych osobowych. {errors.rodo && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4}}>{errors.rodo}</span>}</span>
              </label>
              <div className="full" style={{marginTop: 12}}>
                <button type="submit" className="btn btn-primary"><span>Wyślij wiadomość</span><span className="btn-arrow"></span></button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// LEGAL (placeholder)
// ═════════════════════════════════════════════════════════════════════════════
function LegalPage() {
  useReveal();
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <div className="crumb">Start  ·  Informacje prawne</div>
          <h1>Informacje <em>prawne.</em></h1>
          <p className="lead">Polityka prywatności, RODO, regulamin świadczenia usług, polityka cookies. Treści do uzupełnienia we współpracy z radcą prawnym.</p>
        </div>
      </header>
      <section className="section">
        <div className="container" style={{maxWidth: 760, color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 24}}>
          <p><strong style={{color: 'var(--text)'}}>Administrator danych:</strong><br/>ES Logistics Sp. z o.o., ul. Kopanina 28/32, Poznań. NIP — — —, REGON — — —, KRS — — —.</p>
          <p>Pełna treść polityki prywatności, klauzuli RODO i regulaminu zostanie uzupełniona przy wdrożeniu produkcyjnym strony.</p>
          <p>W razie pytań prosimy o kontakt: <a href="mailto:biuro@eslogistics.pl" style={{color: 'var(--accent)'}}>biuro@eslogistics.pl</a></p>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ClientPage, CarrierPage, ContactPage, LegalPage });
