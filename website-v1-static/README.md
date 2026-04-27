# ES Logistics — strona internetowa

Statyczna wielostronicowa witryna firmy spedycyjnej **ES Logistics Sp. z o.o.** (Poznań). Zbudowana w czystym HTML + CSS + JavaScript — bez frameworków, bez build-stepu, bez node_modules. Wgrywasz pliki na hosting i strona działa.

---

## Struktura plików

```
website/
├── index.html                    # Strona główna
├── o-nas.html                    # O firmie i założycielu
├── uslugi.html                   # Szczegółowy opis usług
├── dla-klienta.html              # Proces + formularz zapytania o transport
├── dla-przewoznika.html          # Wymagania + formularz rejestracji przewoźnika
├── kontakt.html                  # Dane kontaktowe + formularz + mapa
├── polityka-prywatnosci.html     # RODO (szablon do uzupełnienia)
├── regulamin.html                # Regulamin (szablon do uzupełnienia)
├── sitemap.xml                   # Mapa strony dla wyszukiwarek
├── robots.txt                    # Reguły crawlowania
├── css/
│   └── style.css                 # Wszystkie style (paleta z księgi znaku, fonty)
├── js/
│   └── main.js                   # Mobile menu, smooth scroll, walidacja formularzy
└── assets/
    ├── logo.png                  # Logo główne (godło + napis)
    ├── logo-2.png                # Wariant pozioma
    ├── lew.png                   # Samo godło
    ├── napis.png                 # Sam logotyp
    ├── favicon.png               # Favicon
    └── photo-*.jpeg              # Zdjęcia firmowe
```

---

## Jak uruchomić lokalnie

Po prostu **otwórz `index.html`** w przeglądarce — to wszystko. Strona działa z plików.

Dla pełnej funkcjonalności (np. sprawdzania ścieżek względnych w niektórych przeglądarkach) możesz uruchomić prosty serwer:

```bash
# Python (jeśli zainstalowany)
cd website
python -m http.server 8000
# Otwórz http://localhost:8000

# Albo Node.js
npx serve .
```

---

## Wdrożenie na hosting (production)

### Opcja A — klasyczny hosting (OVH, cyber_Folks, nazwa.pl, home.pl)

1. Połącz się z hostingiem przez FTP (FileZilla, Total Commander) lub panel webowy
2. Wgraj **całą zawartość folderu `website/`** do katalogu `public_html` (lub odpowiednika) — pliki **bezpośrednio**, nie folder website jako podfolder
3. Skonfiguruj domenę (`eslogistics.pl`) tak, by wskazywała na ten katalog
4. Włącz HTTPS (zwykle Let's Encrypt jednym kliknięciem w panelu)
5. Gotowe — strona działa pod domeną

### Opcja B — Vercel / Netlify (darmowe, szybsze)

1. Utwórz konto na [vercel.com](https://vercel.com) lub [netlify.com](https://netlify.com)
2. Przeciągnij folder `website/` do okna deploy (drag & drop)
3. Otrzymasz tymczasową domenę (`xxx.vercel.app`) — działa od razu
4. Podepnij własną domenę w ustawieniach

### Opcja C — GitHub Pages (darmowe, dla developerów)

1. Wgraj folder `website/` do repozytorium GitHub
2. W ustawieniach repo → Pages → wybierz branch i folder
3. Strona dostępna pod `username.github.io/repo-name`

---

## Co MUSISZ uzupełnić przed publikacją

### 1. Dane kontaktowe (we wszystkich plikach .html)

Znajdź i zamień (Ctrl+H w VS Code lub innym edytorze):

| Placeholder | Czym zamienić |
|---|---|
| `+48 000 000 000` | Realny numer telefonu |
| `biuro@eslogistics.pl` | Realny adres e-mail (jeśli inny) |
| `[DO UZUPEŁNIENIA]` (w polityce prywatności) | NIP, REGON, KRS spółki |

### 2. Statystyki na stronie głównej (`index.html`, sekcja Stats)

W kodzie znajdź `data-counter="..."` i podmień liczby na realne:
- 11 — lat doświadczenia (zostawić)
- 500 — zrealizowanych transportów (do podmiany)
- 20 — krajów obsługi (do podmiany)
- 100 — przewoźników w sieci (do podmiany)

Pod sekcją statystyk jest informacja o orientacyjnych liczbach — po podmianie usuń ją.

### 3. Formularze — backend

Obecnie formularze otwierają **klienta pocztowego** użytkownika (`mailto:`) — to działa, ale nie jest profesjonalne. Trzy opcje na produkcję:

**A) Najprostsza — usługa typu Formspree / FormSubmit (5 minut konfiguracji):**
W każdym formularzu zmień `data-form="..."` na faktyczny `action="https://formspree.io/f/TWOJE_ID"` i `method="POST"`. Usuń `data-form` i przekaż obsługę submit do nich.

**B) Backend PHP na klasycznym hostingu** — utwórz plik `send.php` z `mail()` i wskaż go jako action.

**C) Pełna integracja CRM** — np. wpisywanie zgłoszeń do Airtable, HubSpot, Pipedrive. Wymaga developera.

### 4. Polityka prywatności i regulamin

Oba dokumenty to **szablony**. Przed publikacją:
- Skonsultuj się z prawnikiem lub IOD
- Uzupełnij dane rejestrowe spółki
- Dostosuj treść do narzędzi, których faktycznie używasz (Google Analytics? Newsletter? CRM?)
- Rozważ podpięcie banneru cookies (np. [Cookiebot](https://www.cookiebot.com), [Cookie-Script](https://cookie-script.com))

### 5. Google Analytics + Search Console

Po wdrożeniu na produkcji:
1. Załóż konto [Google Analytics 4](https://analytics.google.com) → otrzymasz `G-XXXXXXXXXX`
2. Dodaj snippet `gtag.js` do sekcji `<head>` każdego pliku HTML (lub przez Google Tag Manager)
3. Zweryfikuj domenę w [Search Console](https://search.google.com/search-console)
4. Wgraj `sitemap.xml` do Search Console

### 6. Mapa Google na stronie kontakt

Mapa jest osadzona przez `iframe` z prostym `q=ul.+Kopanina+28/32,+Pozna%C5%84`. Działa, ale dla pełnej kontroli i analityki rozważ klucz API Google Maps i osadzenie przez Google Maps Embed API.

### 7. Domena

Zarejestruj `eslogistics.pl` (jeśli wolne) — np. przez [home.pl](https://home.pl), [nazwa.pl](https://nazwa.pl), [OVH](https://ovh.pl). Koszt ~50 zł/rok.

Polecam dodatkowo wykupić `eslogistics.eu` jeśli planujesz ekspansję EN/DE.

---

## Co dalej (faza 2)

- **Wersje EN/DE** — duplikacja struktury w `/en/` i `/de/` z przetłumaczonymi treściami
- **Blog branżowy** — sekcja `/blog/` jako narzędzie SEO (przewóz ADR, dokumenty CMR, kierunki transportowe)
- **Case studies** — opisy zrealizowanych transportów (z anonimizacją klientów)
- **Integracja z giełdą** — Trans.eu, Timocom (API)
- **Panel klienta** — śledzenie zleceń online (większy projekt — wymaga backendu)
- **CMS lekki** (np. Sanity, Decap CMS) — żeby Eryk lub zespół mógł sam edytować treści

---

## Stack technologiczny

- **HTML5** semantyczny
- **CSS3** z CSS Variables (paleta zgodna z księgą znaku ES Logistics)
- **JavaScript ES6+** (vanilla, bez frameworków)
- **Google Fonts** — Barlow (nagłówki) + Outfit (treść)
- **Schema.org** — strukturyzowane dane LocalBusiness
- **WCAG 2.1** — semantyka, kontrasty, alt-y, nawigacja klawiaturą

Strona działa we wszystkich nowoczesnych przeglądarkach (Chrome, Firefox, Safari, Edge — od ~2020).

---

## Wsparcie

W razie pytań do struktury, edycji lub rozwoju — wszystkie pliki są w czystym HTML/CSS/JS i czytelne dla każdego programisty stron. Cały kod ma komentarze.

**Licencja kodu:** zgodnie z umową z wykonawcą.
**Logo i materiały graficzne:** prawa autorskie ES Logistics Sp. z o.o.
