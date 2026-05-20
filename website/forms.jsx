// forms.jsx — interactive forms + remaining pages

const { useState: useStateF } = React;

// ─────────────── Field component ───────────────
function Field({ label, name, type = 'text', value, onChange, error, required, placeholder, full, options, rows }) {
  const [lang] = useLang();
  const id = `f-${name}`;
  return (
    <div className={`field ${full ? 'full' : ''} ${error ? 'has-err' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="req"> *</span>}</label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} rows={rows || 4}/>
      ) : type === 'select' ? (
        <select id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
          <option value="">{t('select.choose', lang)}</option>
          {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
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
  const [lang] = useLang();
  const [data, setData] = useStateF({ firma: '', nip: '', email: '', telefon: '', zaladunek: '', rozladunek: '', typ: '', waga: '', data: '', uwagi: '', dodatkowe: '', rodo: false });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);
  const [submitting, setSubmitting] = useStateF(false);

  const set = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };
  const setBool = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!data.firma) e.firma = t('err.firma', lang);
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t('err.email', lang);
    if (!data.telefon) e.telefon = t('err.phone', lang);
    if (!data.zaladunek) e.zaladunek = t('err.loading', lang);
    if (!data.rozladunek) e.rozladunek = t('err.unloading', lang);
    if (!data.rodo) e.rodo = t('err.rodo', lang);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const isEN = lang === 'en';
    const L = (pl, en) => isEN ? en : pl;
    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mqejpzen', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          _subject: `${L('Zapytanie o transport','Transport inquiry')} — ${data.firma}`,
          [L('Firma','Company')]: data.firma,
          [L('NIP','Tax ID')]: data.nip,
          [L('Telefon','Phone')]: data.telefon,
          [L('Załadunek','Pick-up')]: data.zaladunek,
          [L('Rozładunek','Drop-off')]: data.rozladunek,
          [L('Ładunek','Cargo')]: data.typ,
          [L('Waga kg','Weight kg')]: data.waga,
          [L('Data załadunku','Loading date')]: data.data,
          [L('Uwagi','Notes')]: data.uwagi,
          [L('Dodatkowe','Additional')]: data.dodatkowe,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">{t('client.crumb', lang)}</div>
          <h1>{t('client.h1.a', lang)} <em>{t('client.h1.b', lang)}</em></h1>
          <p className="lead">{t('client.lead', lang)}</p>
          <div style={{marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', fontSize: 15, color: 'var(--text-dim)'}}>
            <div><span style={{fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 4}}>{t('client.dispatcher.phone', lang)}</span><a href="tel:+48539849869" style={{color: 'var(--text)', fontSize: 18, fontWeight: 500, textDecoration: 'none'}}>+48 539 849 869</a></div>
            <div><span style={{fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 4}}>{t('client.dispatcher.email', lang)}</span><a href="mailto:transport@eslogistics.pl" style={{color: 'var(--text)', fontSize: 18, fontWeight: 500, textDecoration: 'none'}}>transport@eslogistics.pl</a></div>
          </div>
        </div>
      </header>

      {/* PROCES */}
      <section className="section">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('client.process.section', lang)}</div>
            <div><h2>{t('client.process.h2.a', lang)}<br/>{t('client.process.h2.b', lang)} <em>{t('client.process.h2.c', lang)}</em></h2></div>
          </div>
          <div className="process scroll-reveal">
            {[1,2,3,4].map((n, i) => (
              <div key={n} className={`process-step ${i === 0 ? 'active' : ''}`}>
                <div className="dot">{String(n).padStart(2,'0')}</div>
                <h4>{t(`client.step${n}.t`, lang)}</h4>
                <p>{t(`client.step${n}.d`, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARZ */}
      <section className="section" style={{paddingTop: 0}} id="formularz">
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('client.form.section', lang)}</div>
            <div><h2>{t('client.form.h2.a', lang)} <em>{t('client.form.h2.b', lang)}</em></h2><p className="lead">{t('client.form.lead', lang)}</p></div>
          </div>

          {submitted ? (
            <div className="form-success scroll-reveal">
              <h4>{t('client.success.h', lang)}</h4>
              <p style={{color: 'var(--text-dim)'}}>{t('client.success.p', lang)} <strong style={{color: 'var(--text)'}}>transport@eslogistics.pl</strong>. {t('client.success.fallback', lang)} +48 539 849 869.</p>
              <div style={{marginTop: 16}}>
                <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setData({ firma: '', nip: '', email: '', telefon: '', zaladunek: '', rozladunek: '', typ: '', waga: '', data: '', uwagi: '', dodatkowe: '', rodo: false }); }}>{t('client.success.again', lang)}</button>
              </div>
            </div>
          ) : (
            <form className="form scroll-reveal" onSubmit={onSubmit} noValidate>
              <Field label={t('field.firma', lang)} name="firma" value={data.firma} onChange={set} error={errors.firma} required placeholder={t('field.firma.ph', lang)}/>
              <Field label={t('field.nip', lang)} name="nip" value={data.nip} onChange={set} error={errors.nip} placeholder="0000000000"/>
              <Field label={t('field.email', lang)} name="email" type="email" value={data.email} onChange={set} error={errors.email} required placeholder={t('field.email.ph', lang)}/>
              <Field label={t('field.phone', lang)} name="telefon" type="tel" value={data.telefon} onChange={set} error={errors.telefon} required placeholder="+48 ..."/>
              <Field label={t('field.loading', lang)} name="zaladunek" value={data.zaladunek} onChange={set} error={errors.zaladunek} required placeholder={t('field.loading.ph', lang)}/>
              <Field label={t('field.unloading', lang)} name="rozladunek" value={data.rozladunek} onChange={set} error={errors.rozladunek} required placeholder={t('field.loading.ph', lang)}/>
              <Field label={t('field.cargo', lang)} name="typ" type="textarea" value={data.typ} onChange={set} full rows={3} placeholder={t('field.cargo.ph', lang)}/>
              <Field label={t('field.weight', lang)} name="waga" type="number" value={data.waga} onChange={set} placeholder={t('field.weight.ph', lang)}/>
              <Field label={t('field.date', lang)} name="data" type="date" value={data.data} onChange={set}/>
              <Field label={t('field.notes', lang)} name="uwagi" type="textarea" value={data.uwagi} onChange={set} full placeholder={t('field.notes.ph', lang)}/>
              <Field label={t('field.extra', lang)} name="dodatkowe" type="textarea" value={data.dodatkowe} onChange={set} full placeholder={t('field.extra.ph', lang)}/>

              <label className={`consent ${errors.rodo ? 'has-err' : ''}`}>
                <input type="checkbox" checked={data.rodo} onChange={(e) => setBool('rodo', e.target.checked)}/>
                <span>{t('rodo.consent', lang)} <a href="#/legal" style={{color: 'var(--accent)'}}>{t('footer.privacy', lang)}</a>. {errors.rodo && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4}}>{errors.rodo}</span>}</span>
              </label>

              <div className="full" style={{display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 12}}>
                <button type="submit" className="btn btn-primary" disabled={submitting}><span>{submitting ? '...' : t('btn.send', lang)}</span><span className="btn-arrow"></span></button>
                <span style={{fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em'}}>{t('submit.note', lang)}</span>
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
  const [lang] = useLang();
  const [data, setData] = useStateF({ imie: '', email: '', temat: '', wiadomosc: '', rodo: false });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);
  const [submitting, setSubmitting] = useStateF(false);
  const set = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };
  const setBool = (k, v) => { setData(d => ({...d, [k]: v})); setErrors(e => ({...e, [k]: ''})); };

  const validate = () => {
    const e = {};
    if (!data.imie) e.imie = t('err.imie', lang);
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t('err.email', lang);
    if (!data.wiadomosc) e.wiadomosc = t('err.message', lang);
    if (!data.rodo) e.rodo = t('err.rodo', lang);
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const isEN = lang === 'en';
    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mqejpzen', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          _subject: data.temat ? `${data.temat} — ${data.imie}` : `${isEN ? 'Website message' : 'Wiadomość ze strony'} — ${data.imie}`,
          [isEN ? 'Name' : 'Imię i nazwisko']: data.imie,
          [isEN ? 'Subject' : 'Temat']: data.temat,
          [isEN ? 'Message' : 'Wiadomość']: data.wiadomosc,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <main>
      <header className="page-header">
        <div className="corner-lion"><LionGraphic/></div>
        <div className="container">
          <div className="crumb">{t('kontakt.crumb', lang)}</div>
          <h1>{t('kontakt.h1.a', lang)}<br/><em>{t('kontakt.h1.b', lang)}</em></h1>
          <p className="lead">{t('kontakt.lead', lang)}</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid scroll-reveal">
            <div className="contact-info">
              <div className="contact-row"><span className="k">{t('contact.row.address', lang)}</span><span className="v">{t('contact.officeAddrLong', lang).split('\n').map((line, i) => <React.Fragment key={i}>{i>0 && <br/>}{line}</React.Fragment>)}</span></div>
              <div className="contact-row"><span className="k">{t('contact.row.phone', lang)}</span><span className="v">+48 539 849 869</span></div>
              <div className="contact-row"><span className="k">{t('contact.row.email', lang)}</span><span className="v">transport@eslogistics.pl</span></div>
              <div className="contact-row"><span className="k">{t('contact.row.companyData', lang)}</span><span className="v">ES Logistics Sp. z o.o.<br/>NIP 7831941973 · KRS 0001206499</span></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              <div className="map-frame" style={{aspectRatio: '4/3'}}>
                <iframe title="Office ES Logistics — Święty Marcin 29/8, Poznań" loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=16.918%2C52.404%2C16.938%2C52.412&layer=mapnik&marker=52.4076%2C16.9276"/>
              </div>
              <a href="https://www.openstreetmap.org/?mlat=52.4076&mlon=16.9276#map=18/52.4076/16.9276" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{alignSelf: 'flex-start'}}>{t('contact.openMap', lang)}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head scroll-reveal">
            <div className="num">{t('kontakt.form.section', lang)}</div>
            <div><h2>{t('kontakt.form.h2.a', lang)} <em>{t('kontakt.form.h2.b', lang)}</em></h2></div>
          </div>

          {submitted ? (
            <div className="form-success scroll-reveal">
              <h4>{t('kontakt.success.h', lang)}</h4>
              <p style={{color: 'var(--text-dim)'}}>{t('kontakt.success.p', lang)}</p>
            </div>
          ) : (
            <form className="form scroll-reveal" onSubmit={onSubmit} noValidate>
              <Field label={t('field.fullname', lang)} name="imie" value={data.imie} onChange={set} error={errors.imie} required/>
              <Field label={t('field.email', lang)} name="email" type="email" value={data.email} onChange={set} error={errors.email} required/>
              <Field label={t('field.subject', lang)} name="temat" value={data.temat} onChange={set} full/>
              <Field label={t('field.message', lang)} name="wiadomosc" type="textarea" value={data.wiadomosc} onChange={set} error={errors.wiadomosc} required full rows={6}/>
              <label className={`consent ${errors.rodo ? 'has-err' : ''}`}>
                <input type="checkbox" checked={data.rodo} onChange={(e) => setBool('rodo', e.target.checked)}/>
                <span>{t('rodo.consent.short', lang)} {errors.rodo && <span style={{color: '#ff6b6b', display: 'block', marginTop: 4}}>{errors.rodo}</span>}</span>
              </label>
              <div className="full" style={{marginTop: 12}}>
                <button type="submit" className="btn btn-primary" disabled={submitting}><span>{submitting ? '...' : t('btn.sendMsg', lang)}</span><span className="btn-arrow"></span></button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// LEGAL
// ═════════════════════════════════════════════════════════════════════════════
function LegalPage() {
  useReveal();
  const [lang] = useLang();
  return (
    <main>
      <header className="page-header">
        <div className="container">
          <div className="crumb">{t('legal.crumb', lang)}</div>
          <h1>{t('legal.h1.a', lang)} <em>{t('legal.h1.b', lang)}</em></h1>
          <p className="lead">{t('legal.lead.a', lang)} <a href="mailto:transport@eslogistics.pl" style={{color: 'var(--accent)'}}>transport@eslogistics.pl</a>.</p>
        </div>
      </header>
      <section className="section">
        <div className="container" style={{maxWidth: 820, color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 32}}>

          <div>
            <h3 style={{color: 'var(--text)', marginBottom: 12}}>{t('legal.admin.h', lang)}</h3>
            <p>
              <strong style={{color: 'var(--text)'}}>{t('legal.admin.p1', lang)}</strong><br/>
              {t('legal.admin.p2', lang)}<br/>
              {t('legal.admin.p3', lang)}
            </p>
            <p>{t('legal.admin.contactLine', lang)} <a href="mailto:transport@eslogistics.pl" style={{color: 'var(--accent)'}}>transport@eslogistics.pl</a></p>
          </div>

          <div>
            <h3 style={{color: 'var(--text)', marginBottom: 12}}>{t('legal.privacy.h', lang)}</h3>
            <p>{t('legal.privacy.p1', lang)}</p>
            <p>{t('legal.privacy.p2', lang)}</p>
          </div>

          <div>
            <h3 style={{color: 'var(--text)', marginBottom: 12}}>{t('legal.rodo.h', lang)}</h3>
            <p>{t('legal.rodo.intro', lang)}</p>
            <ul style={{paddingLeft: 20, margin: '8px 0'}}>
              <li>{t('legal.rodo.li1', lang)}</li>
              <li>{t('legal.rodo.li2', lang)}</li>
              <li>{t('legal.rodo.li3', lang)}</li>
              <li>{t('legal.rodo.li4', lang)}</li>
              <li>{t('legal.rodo.li5', lang)}</li>
              <li>{t('legal.rodo.li6', lang)}</li>
            </ul>
            <p>{t('legal.rodo.outro', lang)} <a href="mailto:transport@eslogistics.pl" style={{color: 'var(--accent)'}}>transport@eslogistics.pl</a>.</p>
          </div>

          <div>
            <h3 style={{color: 'var(--text)', marginBottom: 12}}>{t('legal.cookies.h', lang)}</h3>
            <p>{t('legal.cookies.p1', lang)}</p>
            <p>{t('legal.cookies.p2', lang)}</p>
          </div>

        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ClientPage, ContactPage, LegalPage });
