# Wrzucenie strony na GitHub + auto-deploy na Vercel

## Dlaczego GitHub + Vercel?

- **GitHub** = magazyn kodu, historia zmian, możliwość cofnięcia
- **Vercel** = darmowy hosting, automatycznie publikuje każdą zmianę z GitHub
- Workflow: zmieniasz plik → push do GitHub → Vercel sam wrzuca na produkcję w 30 sek

---

## ⚠️ Najpierw — dwa drobiazgi do posprzątania

W folderze `website/` jest folder `.git-broken-todelete/` — to artefakt nieudanej próby inicjalizacji git ze sandbox-a. **Usuń go ręcznie** zanim zaczniesz:

1. Otwórz folder w Eksploratorze: `C:\Users\adamm\OneDrive\Desktop\ES LOGISTICS\website`
2. W górnym menu: **Widok** → zaznacz **Ukryte elementy** (żeby zobaczyć foldery `.git*`)
3. Usuń folder `.git-broken-todelete` (Shift+Delete albo do kosza)

**Drugi drobiazg:** OneDrive nie lubi się z gitem. Najczystsze rozwiązanie to **przenieść folder `website` poza OneDrive** zanim zrobisz git init. Sugestia:

```
C:\Users\adamm\OneDrive\Desktop\ES LOGISTICS\website
                    ↓ przenieś do ↓
C:\projects\es-logistics-website
```

Albo zostaw na OneDrive, ale wyłącz synchronizację .git folderu — w prawym kliknięciu na folder `.git` → "Zawsze trzymaj na tym urządzeniu".

---

## Wariant A — GitHub Desktop (GUI, zalecany jeśli to Twój pierwszy raz)

### Krok 1: Zainstaluj i zaloguj się
1. Pobierz **GitHub Desktop**: https://desktop.github.com
2. Zainstaluj, zaloguj się kontem GitHub (jeśli nie masz konta — załóż na github.com, ~30 sekund)

### Krok 2: Dodaj folder jako repo
1. W GitHub Desktop: **File → Add local repository**
2. Wskaż folder `website` (po przeniesieniu z OneDrive — patrz wyżej)
3. GitHub Desktop powie „This directory does not appear to be a Git repository" → kliknij **Create a repository here instead**
4. Wpisz nazwę: `es-logistics-website`
5. Description: `ES Logistics — strona internetowa firmy spedycyjnej`
6. Zaznacz **"Initialize this repository with a README"** ❌ NIE — mamy już README
7. Git ignore: **None** — mamy własny .gitignore
8. License: **None** (chyba że chcesz publiczne)
9. Kliknij **Create Repository**

### Krok 3: Pierwszy commit
1. W lewym dolnym rogu: pole **Summary** → wpisz `Initial: ES Logistics website v1`
2. Kliknij **Commit to main**

### Krok 4: Wrzuć na GitHub
1. Na górze ekranu: **Publish repository**
2. Odznacz **"Keep this code private"** jeśli chcesz publiczne, zostaw zaznaczone żeby było prywatne
3. Kliknij **Publish Repository**

**Gotowe!** Repo jest na GitHubie. Otwórz `github.com` żeby zobaczyć.

---

## Wariant B — Terminal (jeśli wolisz CLI)

### Krok 1: Zainstaluj git
Jeśli nie masz: https://git-scm.com/downloads (Windows installer, default options)

### Krok 2: Konfiguracja jednorazowa
```powershell
git config --global user.name "Adam Mazziarz"
git config --global user.email "a.mazziarz@gmail.com"
```

### Krok 3: Init i commit
```powershell
cd "C:\projects\es-logistics-website"   # albo ścieżka gdzie masz folder

git init
git add .
git commit -m "Initial: ES Logistics website v1"
```

### Krok 4: Stwórz repo na GitHub
1. Wejdź na https://github.com/new
2. Repository name: `es-logistics-website`
3. Description: `ES Logistics — strona internetowa firmy spedycyjnej`
4. Public/Private — wybierz Private (zalecane — to projekt komercyjny)
5. **NIE** zaznaczaj "Add a README" / "Add .gitignore" / "Choose a license" — masz już swoje
6. **Create repository**

### Krok 5: Push
GitHub pokaże Ci komendy. Skopiuj te dla **„push an existing repository":**

```powershell
git remote add origin https://github.com/TWOJ_LOGIN/es-logistics-website.git
git branch -M main
git push -u origin main
```

Pierwszy push poprosi o autoryzację — w Windows otworzy się okno przeglądarki, zaloguj się na GitHub, kliknij "Authorize git-credential-manager".

**Gotowe!** Odśwież stronę repo na GitHubie — powinieneś widzieć pliki.

---

## Połączenie z Vercel (auto-deploy)

### Krok 1: Zaloguj się na Vercel przez GitHub
1. Wejdź na https://vercel.com/signup
2. **Continue with GitHub** — autoryzuj Vercel do dostępu do repo

### Krok 2: Importuj repo
1. Po zalogowaniu: **Add New → Project**
2. W liście "Import Git Repository" znajdziesz `es-logistics-website` — kliknij **Import**
3. Project Name: `es-logistics-preview` (lub jak wolisz)
4. Framework Preset: **Other** (Vercel wykryje że to statyczna strona)
5. Root Directory: pozostaw `./`
6. Build Command: zostaw puste
7. Output Directory: zostaw puste
8. Install Command: zostaw puste
9. Kliknij **Deploy**

### Krok 3: Czekaj 30-60 sekund
Vercel pokaże live log deployu. Gdy skończy:
- Zobaczysz screen z napisem **„Congratulations!"**
- Kliknij **Visit** lub skopiuj URL `https://es-logistics-preview-XXXXXX.vercel.app`

### Krok 4: Co dalej?
**Każda zmiana którą zrobisz lokalnie i pushujesz na GitHub → Vercel automatycznie redeployuje w 30 sek.** Workflow:

```powershell
# Zrobiłeś zmianę w pliku styles.css
git add styles.css
git commit -m "Zmiana koloru akcentu"
git push
# → Vercel sam wrzuca na produkcję
```

Albo w GitHub Desktop: zmiana → commit → push przyciskiem.

---

## Jak teraz wysłać klientowi link?

1. Skopiuj URL z Vercel (np. `https://es-logistics-preview-abc123.vercel.app`)
2. Otwórz `MAIL do klienta - lista brakujacych informacji.md` (na pulpicie)
3. Wklej URL w miejsce `[WKLEJ TUTAJ link Vercel]`
4. Uzupełnij swoje imię/podpis na końcu
5. **Skopiuj treść** (od „Dzień dobry" do końca)
6. Wklej do Gmaila / Outlooka, dodaj adres klienta, wyślij

---

## Podpięcie własnej domeny (gdy klient zaakceptuje)

Gdy klient powie OK i zarejestrujecie domenę `eslogistics.pl`:

1. Vercel → Project Settings → **Domains** → Add Domain
2. Wpisz `eslogistics.pl`
3. Vercel poda Ci **DNS records** (A record + CNAME)
4. Wpisz je u rejestratora domeny (home.pl / OVH / nazwa.pl — w panelu DNS)
5. Po 5-30 min strona działa pod `eslogistics.pl` z automatycznym HTTPS

---

## Co jeśli coś nie działa?

**Strona pokazuje błąd 404 / pustą stronę:**
- Sprawdź czy `index.html` jest w głównym folderze repo (nie w podfolderze)
- Sprawdź F12 → Console w przeglądarce — wklej błąd, zobaczę co jest nie tak

**Push do GitHub odrzucony:**
- Najczęściej autoryzacja — wyloguj się i zaloguj ponownie w GitHub Desktop
- Lub: `git pull origin main --rebase` → `git push`

**Vercel build failed:**
- Otwórz log deployu w panelu Vercel — zwykle to drobiazg w nazwie pliku albo brakujący asset

W razie problemów napisz, pokażę jak naprawić.
