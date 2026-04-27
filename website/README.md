# ES Logistics — strona internetowa (v2 design)

Zaawansowany design React-based dla **ES Logistics Sp. z o.o.** (Poznań). Editorial / magazine vibe, monochromatyczna estetyka z księgi znaku, godło lwa eksponowane jako element marki, panel live-tweaków do testowania wariantów.

> Poprzednia wersja (statyczna multi-page HTML) została zachowana w folderze `website-v1-static/` na wypadek gdybyś chciał wrócić.

---

## Co jest w tej wersji

### Strony (routing przez hash `#/`)

- `#/` — strona główna (hero + usługi + trust bar + dlaczego my + split CTA + statystyki + testimonials + lion divider + kontakt)
- `#/o-nas` — O firmie i Eryku Szymkowiaku
- `#/uslugi` — Cztery filary usług
- `#/dla-klienta` — Proces 4-krokowy + formularz zapytania
- `#/dla-przewoznika` — Korzyści + wymagania + formularz rejestracji
- `#/kontakt` — Pełne kanały kontaktu + formularz + mapa
- `#/legal` — Polityka prywatności / regulamin / RODO

### Live tweaks panel (prawy dolny róg)

Po prawej stronie ekranu jest panel pozwalający w czasie rzeczywistym zmieniać:

| Opcja | Warianty | Co zmienia |
|---|---|---|
| **Motyw** | Dark / Light | Tryb kolorystyczny |
| **Akcent** | Mono / Blue / Emerald / Amber | Kolor CTA i wyróżnień |
| **Lew (godło)** | Subtle / Featured / Editorial | Jak mocno eksponowany jest lew |
| **Wariant nagłówka hero** | A / B / C | Trzy różne propozycje hasła |
| **Tło hero** | Foto / Split / Typo | Zdjęcie / podział / czysta typografia |
| **Gęstość sekcji** | Airy / Regular / Dense | Spacing między sekcjami |

**Wybierz wariant, który Ci odpowiada** — gdy się zdecydujesz, daj znać i "zamrożę" go jako stałą wersję.

---

## Jak uruchomić lokalnie

### ⚠️ WAŻNE — strona NIE OTWIERA się przez podwójne kliknięcie

React + Babel-in-browser wymaga protokołu HTTP. Otwarcie `index.html` z dysku (file://) **nie zadziała** — przeglądarka zablokuje ładowanie plików `.jsx`.

### Uruchomienie

**Opcja A — Python (jeśli zainstalowany):**
```bash
cd website
python -m http.server 8000
# Otwórz http://localhost:8000
```

**Opcja B — Node.js:**
```bash
npx serve website -p 8000
# Otwórz http://localhost:8000
```

**Opcja C — VS Code:**
Zainstaluj rozszerzenie "Live Server", kliknij prawym na `index.html` → Open with Live Server.

---

## Struktura plików

```
website/
├── index.html             # Entry point, ładuje React + Babel + .jsx files
├── styles.css             # Wszystkie style (~28 KB), design tokens, tematy
├── components.jsx         # Header, Footer, BrandLockup, LionMark/Graphic, hooks (useReveal, useCountUp)
├── pages.jsx              # HomePage, AboutPage, ServicesPage
├── forms.jsx              # ClientPage, CarrierPage, ContactPage, LegalPage + walidacja
├── tweaks-panel.jsx       # Panel live-tweaków (prawy dolny róg)
└── assets/
    ├── lew.png            # Godło lwa (z księgi znaku) — używane jako LionMark/LionGraphic
    ├── lion.svg           # Wariant SVG (rezerwa)
    ├── logo.png, logo-2.png, napis.png  # Pełne logotypy
    ├── favicon.png        # Favicon
    └── photo-1..4.jpeg    # Zdjęcia firmowe
```

---

## Wdrożenie na hosting

Tak samo jak v1 — strona jest **statyczna**, mimo że używa React. Wszystkie zależności są wczytywane z CDN (unpkg.com) lub lokalnie. Wgrywasz całą zawartość `website/` na hosting.

### Klasyczny hosting (OVH, cyber_Folks, nazwa.pl)

1. FTP do katalogu `public_html`
2. Wgraj wszystkie pliki + folder `assets/`
3. Włącz HTTPS w panelu (Let's Encrypt)
4. Skonfiguruj domenę

**Ważne:** hosting musi serwować `.jsx` z prawidłowym MIME type. Jeśli pojawi się problem, dodaj plik `.htaccess`:
```apache
AddType application/javascript .jsx
```

### Vercel / Netlify (najprościej)

Drag & drop folderu `website/` na panel Vercel lub Netlify. Wszystko zadziała natywnie.

---

## Production checklist (przed publikacją)

### Krytyczne

- [ ] **Pre-render dla SEO** — Babel-in-browser jest wolny i nie crawlowany przez Google. Przed produkcją warto pre-renderować strony do statycznego HTML (np. Puppeteer + `npm run prerender` skrypt) lub przepisać do Next.js. Bez tego SEO będzie słabe.
- [ ] **Telefon** — wymień placeholder `+48 — — —` na realny numer (w `components.jsx`, `pages.jsx`, `forms.jsx`)
- [ ] **NIP / REGON / KRS** — uzupełnij w stopce (`components.jsx`)
- [ ] **Statystyki** — `Stat value={1200}` itd. w `pages.jsx` to przykładowe liczby. Podmień na realne lub usuń.
- [ ] **Testimonials** — opinie w `pages.jsx` to placeholdery. Zastąp realnymi (lub usuń całą sekcję jeśli nie masz jeszcze referencji).
- [ ] **Polityka prywatności + Regulamin** — strona `#/legal` wymaga uzupełnienia treścią od prawnika.

### Formularze

Formularze obecnie tylko walidują i pokazują "wysłano" — **nie wysyłają faktycznie nic**. Trzy opcje na produkcję:

1. **Formspree / FormSubmit** — najprostsze (5 min). Zmień `<form onSubmit>` na `action="https://formspree.io/f/TWOJE_ID"`.
2. **Backend PHP** — `send.php` z `mail()` na klasycznym hostingu.
3. **CRM** — Airtable / HubSpot przez API.

Edytuj `forms.jsx` — funkcję `onSubmit` w każdej page (ClientPage, CarrierPage, ContactPage).

### SEO & Analytics

- [ ] Wdroż domenę `eslogistics.pl`
- [ ] Google Analytics 4 (snippet w `<head>` w `index.html`)
- [ ] Search Console + sitemap
- [ ] Banner cookies (Cookiebot / Cookie-Script)

### Optymalizacja

- [ ] Wymień `react.development.js` i `react-dom.development.js` na `.production.min.js` (5x mniejsze)
- [ ] Zminifikuj CSS i JSX (Terser / esbuild)
- [ ] Pre-render każdej strony do osobnego HTML dla SEO
- [ ] Rozważ migrację do Next.js dla pełnego SSR

---

## Stack

- **React 18.3** (przez CDN unpkg)
- **Babel Standalone 7.29** — kompilacja JSX w przeglądarce (tylko do prototypowania!)
- **Vanilla CSS** z CSS Variables (28 KB, bez frameworków)
- **Google Fonts** — Barlow + Outfit
- **OpenStreetMap embed** (mapa, bez klucza API)

---

## Tryb edycji (TWEAK_DEFAULTS)

W `index.html` jest blok:

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "mono",
  "lion": "featured",
  "density": "regular",
  "heroBg": "photo",
  "heroVariant": "A"
}/*EDITMODE-END*/;
```

To są domyślne wartości tweaków. Po wybraniu finalnych wariantów, podmień je tutaj — będą domyślne dla wszystkich odwiedzających.

---

## Wsparcie i rozwój

W razie pytań: `biuro@eslogistics.pl` (po wdrożeniu).

**Faza 2 — sugestie:**
1. Przepisanie do Next.js (lepszy SEO, SSR, łatwiejsze utrzymanie)
2. Wersje EN / DE
3. Blog SEO (`/blog/` z artykułami branżowymi)
4. Pre-rendering wszystkich tras do statycznego HTML
5. Integracja z Trans.eu API (giełda transportowa)
6. Panel klienta — śledzenie zleceń (większy projekt)
