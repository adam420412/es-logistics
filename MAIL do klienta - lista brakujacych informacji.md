# Mail do klienta — wzór do wysłania

> Skopiuj treść poniżej do swojego klienta poczty (Gmail / Outlook). Pola w **[NAWIASACH KWADRATOWYCH]** uzupełnij sam.

---

**Temat:**
Strona ES Logistics — wstępna wersja do akceptacji + lista brakujących danych

**Do:** [adres klienta]
**Od:** [Twój adres]

---

## Treść

Dzień dobry [Panie / Pani Eryku — lub jak zwykle zwracasz się do klienta],

w załączeniu / pod linkiem przesyłam **wstępną wersję strony internetowej** ES Logistics Sp. z o.o. — gotową do oceny i komentarzy.

**Link do podglądu:** [WKLEJ TUTAJ link Vercel po deploy, np. https://es-logistics-preview.vercel.app]

Strona została zbudowana w oparciu o:
- charakter działalności firmy (PDF który Pan przesłał),
- księgę znaku ES Logistics (paleta monochromatyczna, lew, fonty Barlow + Outfit),
- referencje branżowe (donedeliveries.com, ltransport.pl, skat.com.pl/dla-przewoznika).

**Co jest na stronie:**
- Strona główna z hero, sekcjami usług, „Dlaczego my", liczbami, kierunkami obsługi i kontaktem
- Podstrony: O nas / Usługi / Dla klienta / Dla przewoźnika / Kontakt
- Formularze (zapytanie o transport + rejestracja przewoźnika + kontakt)
- Sekcja FAQ z najczęstszymi pytaniami
- Pełna identyfikacja zgodna z księgą znaku
- Wersja na komputer i telefon (responsywność)

---

## Czego potrzebuję od Pana, żeby ją sfinalizować:

### 1. Dane teleadresowe

- **Numer telefonu** kontaktowego do biura
- **Numer telefonu** bezpośredni (jeśli inny niż biuro)
- **Adres e-mail** ogólny (np. biuro@eslogistics.pl) — czy domena `eslogistics.pl` jest już zarejestrowana?
- **Godziny pracy biura** (zakładam pon-pt 8:00-17:00 — proszę potwierdzić lub poprawić)

### 2. Dane rejestrowe spółki

- **NIP**
- **REGON**
- **KRS**
- **Kapitał zakładowy** (do stopki, opcjonalnie)
- **Pełny adres do faktur** (jeśli inny niż ul. Kopanina 28/32)

### 3. Treści merytoryczne

- **Statystyki firmy** — czy mogę napisać konkretne liczby? Obecnie sekcja „W liczbach" zawiera placeholdery. Potrzebuję:
  - Liczba zrealizowanych zleceń (przybliżona, za jaki okres)
  - Liczba krajów obsługi
  - Liczba przewoźników w sieci
  - Jeśli woli Pan nie podawać liczb na start — usunę tę sekcję, dodam coś innego
- **Kierunki obsługi** — które kraje obsługujecie najczęściej? Obecnie wymieniam: Polska, Niemcy, Holandia, Belgia, Francja, Włochy, Hiszpania, Czechy, Słowacja, Austria, Skandynawia. Proszę zweryfikować i ewentualnie skrócić / rozszerzyć listę.
- **Specjalizacja** — czy są typy ładunków, których szczególnie nie obsługujecie albo specjalizujecie się (ADR, chłodnie, ponadgabaryt, ekspres, tylko paleta)?
- **Język obsługi klientów** — strona zakłada PL/EN/DE. Czy to się zgadza, czy dodać np. UA/RU/CZ?

### 4. Referencje (opcjonalnie ale mocno zalecane)

- **Logotypy klientów** lub ich nazw, do sekcji „Zaufali nam" — najsilniejszy element budujący wiarygodność. Wystarczą 4-6 logotypów. Jeśli klienci nie wyrazili zgody na ujawnienie nazwy, mogę dodać branże (np. „Producent komponentów stalowych — Wielkopolska").
- **Realne testimonials / opinie** — 1-2 cytaty od klientów lub przewoźników. Jeśli nie ma — usunę sekcję, na jej miejsce dam coś innego.

### 5. Materiały graficzne (opcjonalnie)

Mam podstawowe zdjęcia z folderu, ale dla maksymalnej jakości warto dodać:

- **Profesjonalne zdjęcie portretowe** Pana (do sekcji „O nas" i podpisu maili) — opcjonalnie
- **Zdjęcia biura** w Poznaniu (jeśli już urządzone)
- **Zdjęcia ciężarówek / floty** — jeśli nawet jeszcze nie ma własnej, mogą być stockowe albo z czasów wcześniejszej pracy
- **Krótki film w hero** (5-15 sek, ciężarówka na drodze, drogi z drona) — daje ogromny efekt „wow", ale można dodać w drugim etapie

### 6. Decyzje wizualne

W panelu testowym (na razie ukrytym) ustawiłem: **dark mode, akcent monochromatyczny (biały), lew eksponowany, hero wariant A**. Możemy łatwo zmienić — proszę dać znać jeśli woli Pan np.:
- Tryb jasny zamiast ciemnego
- Kolor akcentu (mono / niebieski / zielony / pomarańczowy)
- Inne hasło w hero (mam przygotowane 3 warianty)

---

## Kolejne kroki po Pana stronie:

1. **Proszę kliknąć w link i obejrzeć stronę** na komputerze i na telefonie
2. **Zaznaczyć ewentualne uwagi** (mile widziane: screenshot z komentarzem albo lista „w sekcji X chciałbym żeby Y")
3. **Dosłać dane z punktów 1-4** powyżej

Po otrzymaniu informacji wprowadzę zmiany i przygotuję wersję finalną gotową do publikacji pod docelową domeną.

---

W razie pytań — chętnie wyjaśnię każdą sekcję na rozmowie telefonicznej.

Pozdrawiam,
[Twoje imię i nazwisko]
[Twój telefon]
[Twój email]

---

## ⚠️ Nota dla Ciebie (Adam) — usuń przed wysłaniem klientowi

**Co robisz przed wysłaniem:**

1. ✅ Wykonaj deploy na Vercel (instrukcja w `website/INSTRUKCJA-DEPLOY-VERCEL.md`)
2. ✅ Skopiuj URL z Vercel — wklej do maila zamiast `[WKLEJ TUTAJ link Vercel]`
3. ✅ Wpisz prawdziwe dane klienta i swoje podpisy
4. ✅ Usuń tę notę
5. ✅ Wyślij

**Tip:** Pierwszy mail po skończonym projekcie to często moment, gdzie klient płaci za poczucie kontroli. Lista 6 punktów daje mu poczucie, że projekt jest dobrze prowadzony i wie co od niego zależy. Nie wysyłaj samego linku „proszę o ocenę" — zawsze ze strukturalną prośbą o feedback.
