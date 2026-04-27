# Deploy strony na Vercel — 5 minut

Vercel to darmowy hosting dla statycznych stron. Wynik: dostajesz publiczny URL typu `es-logistics-xxxxx.vercel.app` — wysyłasz go klientowi.

---

## Wariant A — Drag & drop (najprostszy, bez konta na początek)

1. Wejdź na **https://vercel.com/new**
2. Kliknij **„Continue with..."** → wybierz Google / GitHub / e-mail (możesz założyć w 30 sekund)
3. Po zalogowaniu zobaczysz ekran "Import Git Repository". **Pomiń** — przewiń niżej.
4. Znajdziesz sekcję **"Or import a third-party Git Repository"** lub **„Try another way to deploy"** — kliknij.
5. **Drag & drop:** weź folder `website` z pulpitu i przeciągnij na ekran Vercel.
6. Vercel zapyta o nazwę projektu — wpisz np. `es-logistics-preview`.
7. Kliknij **Deploy**. Czeka 30-60 sekund.
8. Dostajesz URL typu `https://es-logistics-preview.vercel.app` — gotowe.

---

## Wariant B — Vercel CLI (dla bardziej zaawansowanych, jeśli wolisz terminal)

```powershell
# Zainstaluj Vercel CLI (jednorazowo, wymaga Node.js)
npm install -g vercel

# Wejdź do folderu strony
cd "C:\Users\adamm\OneDrive\Desktop\ES LOGISTICS\website"

# Deploy
vercel

# Pierwsze uruchomienie zapyta:
# - Set up and deploy? Y
# - Which scope? (wybierz swoje konto)
# - Link to existing project? N
# - Project name? es-logistics-preview
# - In which directory? ./
# - Override settings? N

# Po chwili dostajesz URL preview
# Aby wdrożyć produkcyjnie:
vercel --prod
```

---

## Wariant C — przez GitHub (najlepszy długoterminowo)

Jeśli planujesz dalej pracować nad stroną (zmiany, edycje), to warto:

1. Załóż konto na **github.com** (jeśli nie masz)
2. Utwórz nowe repozytorium `es-logistics-website`
3. Wgraj cały folder `website` jako pierwszy commit
4. Na Vercel: **New Project → Import** → wybierz repo z GitHub
5. Każdy push do GitHub = automatyczny redeploy na Vercel

**Zaleta:** historia zmian, możliwość cofnięcia, łatwa współpraca z developerami.

---

## ⚠️ Uwaga: który plik wystawiasz?

W folderze `website/` masz dwa „wejścia":

| Plik | Co to | Kiedy użyć |
|---|---|---|
| `index.html` | Wersja produkcyjna z Babel-in-browser | **Wystawiaj to na Vercel** — wszystko działa, panel tweaków jest aktywny |
| `start-here.html` | Single-file backup do testów lokalnych | Tylko do otwierania z dysku gdy nie ma internetu |

Vercel automatycznie wystawi `index.html` jako stronę główną pod URL-em. `start-here.html` po prostu nie używaj online — wersja produkcyjna jest szybsza i lepiej zoptymalizowana.

---

## Co po deploy?

1. **Otwórz URL** który dostałeś od Vercel — sprawdź czy strona się ładuje
2. **Przetestuj** wszystkie zakładki (klika się przez nawigację: O nas, Usługi itd.)
3. **Otwórz na telefonie** — sprawdź responsywność (URL skopiuj, otwórz w mobilnym Chrome/Safari)
4. **Skopiuj URL** i wklej do maila — `MAIL do klienta - lista brakujacych informacji.md` na pulpicie ma gotowy szablon
5. Jeśli widzisz błąd, zrób screenshot konsoli (F12 → Console) — wrócimy do tego

---

## Custom domena (opcjonalnie, w drugim kroku)

Gdy klient zaakceptuje wersję, możesz podpiąć własną domenę:

1. Zarejestruj `eslogistics.pl` (np. na home.pl, OVH, nazwa.pl — ~50 zł/rok)
2. W Vercel → Project Settings → Domains → Add → wpisz `eslogistics.pl`
3. Vercel poda Ci DNS records (typu CNAME) — wpisz je u rejestratora domeny
4. Po 5-30 minutach domena działa, automatyczne HTTPS gratis

---

## Wyłączenie panelu tweaków przed produkcją

Panel po prawej dolnej (z opcjami Theme/Akcent/Lew) to narzędzie projektowe — klient nie powinien go widzieć w finalnej wersji.

Gdy zdecydujesz się na ostateczny wygląd, daj znać — w 1 minucie usuwam panel z `index.html` i robimy redeploy.

Na razie zostawiam panel widoczny — klient może sam pobawić wariantami i powiedzieć Ci, który mu się najbardziej podoba.
