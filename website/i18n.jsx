// i18n.jsx — translations + useLang hook
// Globals: T (object), useLang() -> [lang, setLang], t(key) -> string for current lang.

const TR = {
  // ─────── header / nav
  'nav.start': { pl: 'Start', en: 'Home' },
  'nav.services': { pl: 'Usługi', en: 'Services' },
  'nav.about': { pl: 'O nas', en: 'About' },
  'nav.contact': { pl: 'Kontakt', en: 'Contact' },
  'cta.order': { pl: 'Zamów transport', en: 'Order transport' },
  'cta.contact': { pl: 'Skontaktuj się', en: 'Get in touch' },
  'cta.allChannels': { pl: 'Wszystkie kanały kontaktu', en: 'All contact channels' },
  'menu.open': { pl: 'Otwórz menu', en: 'Open menu' },
  'menu.close': { pl: 'Zamknij menu', en: 'Close menu' },
  'lang.label': { pl: 'Język', en: 'Language' },

  // ─────── hero
  'hero.eyebrow': { pl: '01 — ES Logistics · Poznań', en: '01 — ES Logistics · Poznań' },
  'hero.h1.a': { pl: 'Transport i Spedycja', en: 'International Transport' },
  'hero.h1.b': { pl: 'międzynarodowa,', en: 'and freight forwarding,' },
  'hero.h1.c': { pl: 'na której można polegać.', en: 'you can rely on.' },
  'hero.sub': { pl: ' ', en: ' ' },
  'hero.meta.experience.k': { pl: 'Doświadczenie', en: 'Experience' },
  'hero.meta.experience.v': { pl: '12 lat w TSL', en: '12 years in TSL' },
  'hero.meta.specialization.k': { pl: 'Specjalizacja', en: 'Specialization' },
  'hero.meta.specialization.v': { pl: 'Transport i Spedycja międzynarodowa', en: 'International Transport & Freight Forwarding' },
  'hero.meta.reach.k': { pl: 'Zasięg', en: 'Coverage' },
  'hero.meta.reach.v': { pl: 'Cała Europa', en: 'All of Europe' },

  // ─────── home: nasze usługi (services grid)
  'services.section': { pl: '02 — Nasze usługi', en: '02 — Our services' },
  'services.h2.a': { pl: 'Nasze', en: 'Our' },
  'services.h2.c': { pl: 'usługi', en: 'services' },
  'services.1.t': { pl: 'Transport międzynarodowy', en: 'International transport' },
  'services.1.d': {
    pl: 'Cała Europa — od Polski po Hiszpanię, od Norwegii po Włochy. Stałe trasy i zlecenia jednorazowe, FTL i LTL.',
    en: 'All of Europe — from Poland to Spain, from Norway to Italy. Regular routes and ad-hoc orders, FTL and LTL.'
  },
  'services.2.t': { pl: 'Transport krajowy', en: 'Domestic transport' },
  'services.2.d': {
    pl: 'Realizacja zleceń na terenie Polski. Ładunki paletowe, drobnica, pełne pojazdy — krótki czas reakcji.',
    en: 'Orders within Poland. Pallet shipments, LTL, full truck loads — short response time.'
  },
  'services.3.t': { pl: 'Doświadczeni spedytorzy', en: 'Experienced dispatchers' },
  'services.3.d': {
    pl: '12 lat praktyki w branży TSL. Bezpośredni kontakt z dyspozytorem, jasna kalkulacja, dokumentacja na czas.',
    en: '12 years of TSL practice. Direct contact with a dispatcher, clear pricing, documentation on time.'
  },
  'services.4.t': { pl: 'Liczna flota', en: 'Large fleet' },
  'services.4.d': {
    pl: 'Sieć sprawdzonych partnerów + rozwijana własna flota pojazdów ciężarowych i busów. Pełna kontrola nad realizacją.',
    en: 'Network of verified partners + a growing own fleet of trucks and vans. Full control over delivery.'
  },

  // ─────── home: dlaczego ES (six reasons)
  'why.section': { pl: '03 — Dlaczego ES Logistics', en: '03 — Why ES Logistics' },
  'why.h2.a': { pl: 'Sześć powodów, dla których', en: 'Six reasons why our' },
  'why.h2.b': { pl: 'klienci do nas', en: 'clients keep' },
  'why.h2.c': { pl: 'wracają.', en: 'coming back.' },
  'why.1.t': { pl: '12 lat doświadczenia', en: '12 years of experience' },
  'why.1.d': {
    pl: 'Założyciel firmy zbudował karierę w branży TSL od pozycji operacyjnej po nadzór. To nie startup — to skondensowana praktyka.',
    en: 'The founder built a career in the TSL industry from operational roles to senior oversight. This is not a startup — it is condensed hands-on practice.'
  },
  'why.2.t': { pl: 'Bezpośredni kontakt z dyspozytorem', en: 'Direct contact with a dispatcher' },
  'why.2.d': {
    pl: 'Każde zlecenie obsługiwane przez konkretną osobę. Bez infolinii, bez przekierowań — bezpośredni kontakt z dyspozytorem.',
    en: 'Every order is handled by a specific person. No call centres, no transfers — direct contact with the dispatcher.'
  },
  'why.3.t': { pl: 'Cała Europa', en: 'All of Europe' },
  'why.3.d': {
    pl: 'Działamy w całej Europie — od Polski po Hiszpanię, od Norwegii po Włochy. Stałe trasy i zlecenia jednorazowe.',
    en: 'We operate across all of Europe — from Poland to Spain, from Norway to Italy. Regular routes and ad-hoc orders.'
  },
  'why.4.t': { pl: 'Transparentne procesy', en: 'Transparent processes' },
  'why.4.d': {
    pl: 'Status zlecenia, dokumenty, kontakt do kierowcy — wszystko na bieżąco. Bez niedomówień, bez ukrytych kosztów.',
    en: 'Order status, documents, driver contact — everything in real time. No half-truths, no hidden costs.'
  },
  'why.5.t': { pl: 'Obsługa wielojęzyczna', en: 'Multilingual service' },
  'why.5.d': {
    pl: 'Pracujemy z firmami zagranicznymi tak samo płynnie jak z polskimi.',
    en: 'We work with foreign companies as smoothly as with Polish ones.'
  },
  'why.6.t': { pl: 'Własna flota', en: 'Own fleet' },
  'why.6.d': {
    pl: 'Rozwijamy własny park pojazdów ciężarowych i busów — pełna kontrola nad realizacją zleceń.',
    en: 'We are growing our own fleet of trucks and vans — full control over order delivery.'
  },

  // ─────── home: split CTA
  'splitCta.tag': { pl: 'Dla klientów', en: 'For clients' },
  'splitCta.h3': { pl: 'Potrzebujesz transportu?', en: 'Need transport?' },
  'splitCta.p': {
    pl: 'Wypełnij krótki formularz — przygotujemy wycenę i dobierzemy najlepsze rozwiązanie dla Twojego ładunku, jeszcze tego samego dnia.',
    en: 'Fill in a short form — we will prepare a quote and pick the best solution for your shipment, within the same day.'
  },

  // ─────── home: FAQ
  'faq.section': { pl: '04 — Najczęstsze pytania', en: '04 — Frequently asked questions' },
  'faq.h2.a': { pl: 'O co najczęściej pytają', en: 'What our clients' },
  'faq.h2.b': { pl: 'nasi', en: 'most often' },
  'faq.h2.c': { pl: 'klienci.', en: 'ask us.' },
  'faq.q1': { pl: 'Jak szybko otrzymam wycenę transportu?', en: 'How quickly will I receive a transport quote?' },
  'faq.a1': {
    pl: 'Standardowo w ciągu kilku godzin od przesłania zapytania.',
    en: 'Usually within a few business hours of submitting your inquiry.'
  },
  'faq.q2': { pl: 'Czy pomagacie w dokumentacji celnej?', en: 'Do you help with customs documentation?' },
  'faq.a2': { pl: 'Tak.', en: 'Yes.' },
  'faq.q3': { pl: 'W jakich językach prowadzicie obsługę?', en: 'In which languages do you operate?' },
  'faq.a3': {
    pl: 'Polski, angielski, niemiecki — w zakresie komunikacji z klientem, kierowcą i odbiorcą zagranicznym.',
    en: 'Polish, English, German — for communication with the client, driver and foreign consignee.'
  },
  'faq.q4': { pl: 'Czy obsługujecie ładunki ADR / niebezpieczne?', en: 'Do you handle ADR / hazardous goods?' },
  'faq.a4': {
    pl: 'Na zapytanie — w oparciu o partnerów z aktualnymi uprawnieniami ADR. Każdy taki transport jest weryfikowany pod kątem dokumentacji i klasy ładunku przed potwierdzeniem.',
    en: 'On request — based on partners with current ADR authorisations. Every such transport is verified for documentation and cargo class before confirmation.'
  },
  'faq.q5': { pl: 'Czy macie własną flotę?', en: 'Do you have your own fleet?' },
  'faq.a5': { pl: 'Tak.', en: 'Yes.' },

  // ─────── home: contact teaser
  'contact.section': { pl: '05 — Kontakt', en: '05 — Contact' },
  'contact.h2.a': { pl: 'Porozmawiajmy o', en: 'Let’s talk about' },
  'contact.h2.b': { pl: 'Twoim', en: 'your' },
  'contact.h2.c': { pl: 'transporcie.', en: 'transport.' },
  'contact.row.office': { pl: 'Biuro', en: 'Office' },
  'contact.row.phone': { pl: 'Telefon', en: 'Phone' },
  'contact.row.email': { pl: 'E-mail', en: 'E-mail' },
  'contact.row.address': { pl: 'Adres', en: 'Address' },
  'contact.row.transport': { pl: 'Transport / Spedycja', en: 'Transport / Forwarding' },
  'contact.row.companyData': { pl: 'Dane spółki', en: 'Company details' },
  'contact.openMap': { pl: 'Otwórz w mapach', en: 'Open in maps' },
  'contact.officeAddr': { pl: 'ul. Święty Marcin 29/8, Poznań', en: 'Święty Marcin 29/8, Poznań, Poland' },
  'contact.officeAddrLong': { pl: 'ul. Święty Marcin 29/8\n61-806 Poznań, Wielkopolska, Polska', en: 'Święty Marcin 29/8\n61-806 Poznań, Greater Poland, Poland' },

  // ─────── footer
  'footer.col.company': { pl: 'Firma', en: 'Company' },
  'footer.col.collab': { pl: 'Współpraca', en: 'Cooperation' },
  'footer.col.legal': { pl: 'Informacje prawne', en: 'Legal' },
  'footer.privacy': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'footer.rodo': { pl: 'RODO', en: 'GDPR' },
  'footer.faq': { pl: 'Najczęściej zadawane pytania', en: 'Frequently asked questions' },
  'footer.cookies': { pl: 'Cookies', en: 'Cookies' },
  'footer.bottom.made': { pl: 'Made in Poznań', en: 'Made in Poznań' },

  // ─────── about page
  'about.crumb': { pl: 'Start  ·  O nas', en: 'Home  ·  About' },
  'about.h1.a': { pl: '12 lat praktyki', en: '12 years of practice' },
  'about.h1.b': { pl: 'w branży', en: 'in the' },
  'about.h1.c': { pl: 'TSL.', en: 'TSL industry.' },
  'about.lead': {
    pl: 'ES Logistics powstała z konkretnego doświadczenia — nie z idei.',
    en: 'ES Logistics was born from concrete experience — not from an idea.'
  },
  'about.mission': { pl: 'Misja', en: 'Mission' },
  'about.missionLine': {
    pl: 'Łączymy biznes w Europie — w sposób transparentny, terminowy i godny zaufania.',
    en: 'We connect business across Europe — in a transparent, on-time and trustworthy way.'
  },
  'about.values.section': { pl: '02 — Wartości', en: '02 — Values' },
  'about.values.h2.a': { pl: 'Trzy zasady, które', en: 'Three rules that are' },
  'about.values.h2.b': { pl: 'nie podlegają', en: 'not up for' },
  'about.values.h2.c': { pl: 'negocjacji.', en: 'negotiation.' },
  'about.value1.t': { pl: 'Słowo trzymane', en: 'Word kept' },
  'about.value1.d': {
    pl: 'Termin to termin. Wycena to wycena. Nie zmieniamy zasad gry w trakcie zlecenia.',
    en: 'A deadline is a deadline. A quote is a quote. We do not change the rules mid-order.'
  },
  'about.value2.t': { pl: 'Bezpośredni kontakt', en: 'Direct contact' },
  'about.value2.d': {
    pl: 'Klient zawsze rozmawia z konkretnym dyspozytorem — nie z systemem zgłoszeniowym.',
    en: 'The client always talks to a specific dispatcher — never to a ticket system.'
  },
  'about.value3.t': { pl: 'Pełna dokumentacja', en: 'Full documentation' },
  'about.value3.d': {
    pl: 'CMR, faktury, protokoły — komplet dokumentów dostarczamy w terminie, w czytelnej formie.',
    en: 'CMR, invoices, reports — the full document set is delivered on time and in a readable format.'
  },

  // ─────── client page
  'client.crumb': { pl: 'Start  ·  Dla klienta', en: 'Home  ·  For clients' },
  'client.h1.a': { pl: 'Zamów', en: 'Order' },
  'client.h1.b': { pl: 'transport.', en: 'transport.' },
  'client.lead': {
    pl: 'Bezpośredni kontakt z dyspozytorem — bez infolinii, bez kolejek.',
    en: 'Direct contact with a dispatcher — no call centres, no queues.'
  },
  'client.dispatcher.phone': { pl: 'Telefon do dyspozytora', en: 'Dispatcher phone' },
  'client.dispatcher.email': { pl: 'E-mail do zapytań', en: 'Inquiry e-mail' },
  'client.process.section': { pl: '01 — Proces', en: '01 — Process' },
  'client.process.h2.a': { pl: 'Cztery kroki do', en: 'Four steps to a' },
  'client.process.h2.b': { pl: 'zrealizowanego', en: 'completed' },
  'client.process.h2.c': { pl: 'transportu.', en: 'transport.' },
  'client.step1.t': { pl: 'Zapytanie', en: 'Inquiry' },
  'client.step1.d': {
    pl: 'Wypełniasz formularz lub piszesz e-mail. Otrzymujesz pierwszą informację zwrotną zazwyczaj w ciągu kilku godzin.',
    en: 'Fill in the form or send an e-mail. You will get the first response usually within a few hours.'
  },
  'client.step2.t': { pl: 'Wycena', en: 'Quote' },
  'client.step2.d': {
    pl: 'Przygotowujemy wycenę na podstawie trasy, typu ładunku i terminu. Bez ukrytych kosztów.',
    en: 'We prepare a quote based on the route, cargo type and timing. No hidden costs.'
  },
  'client.step3.t': { pl: 'Realizacja', en: 'Execution' },
  'client.step3.d': {
    pl: 'Dobieramy najlepsze rozwiązanie, koordynujemy załadunek, monitorujemy trasę. Jesteś na bieżąco.',
    en: 'We pick the best solution, coordinate loading, track the route. You stay informed.'
  },
  'client.step4.t': { pl: 'Dokumentacja', en: 'Documentation' },
  'client.step4.d': {
    pl: 'Komplet dokumentów (CMR, faktura) trafia do Ciebie po rozładunku — w terminie i w czytelnej formie.',
    en: 'A full document set (CMR, invoice) reaches you after unloading — on time and in a readable form.'
  },
  'client.form.section': { pl: '02 — Formularz', en: '02 — Form' },
  'client.form.h2.a': { pl: 'Zapytanie o', en: 'Transport' },
  'client.form.h2.b': { pl: 'transport.', en: 'inquiry.' },
  'client.form.lead': {
    pl: 'Wypełnienie zajmuje ok. 2 minuty. Pola oznaczone gwiazdką są wymagane.',
    en: 'Takes about 2 minutes to complete. Fields marked with an asterisk are required.'
  },
  'client.success.h': { pl: 'Dziękujemy — zapytanie zostało wysłane.', en: 'Thank you — your inquiry has been sent.' },
  'client.success.p': {
    pl: 'Twój klient pocztowy powinien otworzyć przygotowaną wiadomość do',
    en: 'Your e-mail client should open a prepared message to'
  },
  'client.success.fallback': {
    pl: 'Jeśli to nie nastąpiło — skontaktuj się z nami bezpośrednio:',
    en: 'If that did not happen — contact us directly:'
  },
  'client.success.again': { pl: 'Wyślij kolejne zapytanie', en: 'Send another inquiry' },
  'field.firma': { pl: 'Firma', en: 'Company' },
  'field.firma.ph': { pl: 'Nazwa firmy', en: 'Company name' },
  'field.nip': { pl: 'NIP', en: 'Tax ID (NIP / VAT)' },
  'field.email': { pl: 'E-mail', en: 'E-mail' },
  'field.email.ph': { pl: 'kontakt@firma.pl', en: 'contact@company.com' },
  'field.phone': { pl: 'Telefon', en: 'Phone' },
  'field.loading': { pl: 'Miejsce załadunku', en: 'Pick-up location' },
  'field.loading.ph': { pl: 'Miasto, kod pocztowy, kraj', en: 'City, postal code, country' },
  'field.unloading': { pl: 'Miejsce rozładunku', en: 'Drop-off location' },
  'field.cargo': { pl: 'Opis ładunku (typ, wymiary)', en: 'Cargo description (type, dimensions)' },
  'field.cargo.ph': {
    pl: 'Opisz ładunek — np. 12 palet EUR, wymiary 1200×800×1400 mm, łączna waga 8 t, opakowanie kartonowe',
    en: 'Describe the cargo — e.g. 12 EUR pallets, 1200×800×1400 mm, total weight 8 t, cardboard packaging'
  },
  'field.weight': { pl: 'Waga (kg)', en: 'Weight (kg)' },
  'field.weight.ph': { pl: 'np. 12000', en: 'e.g. 12000' },
  'field.date': { pl: 'Planowana data załadunku', en: 'Planned loading date' },
  'field.notes': { pl: 'Uwagi dodatkowe', en: 'Additional notes' },
  'field.notes.ph': {
    pl: 'Godziny pracy magazynu, dane osoby kontaktowej u załadowcy, wymagania sprzętowe...',
    en: 'Warehouse working hours, on-site contact person, equipment requirements...'
  },
  'field.extra': { pl: 'Dodatkowe cenne informacje', en: 'Additional valuable information' },
  'field.extra.ph': {
    pl: 'Wszelkie inne informacje, które warto, abyśmy znali — preferencje, specyfika ładunku, terminy krytyczne...',
    en: 'Anything else worth knowing — preferences, cargo specifics, critical deadlines...'
  },
  'rodo.consent': {
    pl: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez ES Logistics Sp. z o.o. w celu udzielenia odpowiedzi na zapytanie. Pełna treść:',
    en: 'I consent to the processing of my personal data by ES Logistics Sp. z o.o. for the purpose of responding to my inquiry. Full text:'
  },
  'rodo.consent.short': {
    pl: 'Wyrażam zgodę na przetwarzanie moich danych osobowych.',
    en: 'I consent to the processing of my personal data.'
  },
  'btn.send': { pl: 'Wyślij zapytanie', en: 'Send inquiry' },
  'btn.sendMsg': { pl: 'Wyślij wiadomość', en: 'Send message' },
  'submit.note': { pl: 'WIADOMOŚĆ TRAFI NA TRANSPORT@ESLOGISTICS.PL', en: 'MESSAGE WILL BE SENT TO TRANSPORT@ESLOGISTICS.PL' },
  'err.firma': { pl: 'Podaj nazwę firmy', en: 'Enter company name' },
  'err.email': { pl: 'Nieprawidłowy adres e-mail', en: 'Invalid e-mail address' },
  'err.phone': { pl: 'Podaj telefon', en: 'Enter phone number' },
  'err.loading': { pl: 'Podaj miejsce załadunku', en: 'Enter pick-up location' },
  'err.unloading': { pl: 'Podaj miejsce rozładunku', en: 'Enter drop-off location' },
  'err.rodo': { pl: 'Wymagana zgoda RODO', en: 'GDPR consent required' },
  'err.imie': { pl: 'Podaj imię i nazwisko', en: 'Enter first and last name' },
  'err.message': { pl: 'Wpisz treść wiadomości', en: 'Enter the message' },
  'select.choose': { pl: '— wybierz —', en: '— choose —' },

  // ─────── contact page
  'kontakt.crumb': { pl: 'Start  ·  Kontakt', en: 'Home  ·  Contact' },
  'kontakt.h1.a': { pl: 'Porozmawiajmy.', en: 'Let’s talk.' },
  'kontakt.h1.b': { pl: 'Bezpośredni kontakt z dyspozytorem.', en: 'Direct contact with a dispatcher.' },
  'kontakt.lead': {
    pl: 'Telefon, e-mail albo formularz. Odpowiadamy zazwyczaj w ciągu 24 godzin.',
    en: 'Phone, e-mail or form. We usually reply within 24 business hours.'
  },
  'kontakt.form.section': { pl: '02 — Formularz', en: '02 — Form' },
  'kontakt.form.h2.a': { pl: 'Napisz', en: 'Write a' },
  'kontakt.form.h2.b': { pl: 'wiadomość.', en: 'message.' },
  'kontakt.success.h': { pl: 'Wiadomość wysłana — dziękujemy!', en: 'Message sent — thank you!' },
  'kontakt.success.p': {
    pl: 'Odpowiemy na wskazany adres w ciągu 24 godzin.',
    en: 'We will reply to the address you provided within 24 business hours.'
  },
  'field.fullname': { pl: 'Imię i nazwisko', en: 'First and last name' },
  'field.subject': { pl: 'Temat', en: 'Subject' },
  'field.message': { pl: 'Wiadomość', en: 'Message' },
  'subj.opt1': { pl: 'Zapytanie o transport', en: 'Transport inquiry' },
  'subj.opt2': { pl: 'Logistyka kontraktowa', en: 'Contract logistics' },
  'subj.opt3': { pl: 'Inne', en: 'Other' },

  // ─────── legal page
  'legal.crumb': { pl: 'Start  ·  Informacje prawne', en: 'Home  ·  Legal' },
  'legal.h1.a': { pl: 'Informacje', en: 'Legal' },
  'legal.h1.b': { pl: 'prawne.', en: 'information.' },
  'legal.lead.a': {
    pl: 'Polityka prywatności, RODO i polityka cookies. W razie pytań prosimy o kontakt:',
    en: 'Privacy policy, GDPR and cookie policy. For any questions please contact:'
  },
  'legal.admin.h': { pl: 'Administrator danych', en: 'Data controller' },
  'legal.admin.p1': { pl: 'ES LOGISTICS Sp. z o.o.', en: 'ES LOGISTICS Sp. z o.o.' },
  'legal.admin.p2': { pl: 'ul. Święty Marcin 29/8, 61-806 Poznań', en: 'Święty Marcin 29/8, 61-806 Poznań, Poland' },
  'legal.admin.p3': { pl: 'NIP: 7831941973 · KRS: 0001206499', en: 'Tax ID (NIP): 7831941973 · KRS: 0001206499' },
  'legal.admin.contactLine': { pl: 'Kontakt w sprawach ochrony danych:', en: 'Data protection contact:' },
  'legal.privacy.h': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'legal.privacy.p1': {
    pl: 'Administratorem Twoich danych osobowych przekazanych w formularzach kontaktowych lub w korespondencji e-mail jest ES LOGISTICS Sp. z o.o. z siedzibą w Poznaniu (ul. Święty Marcin 29/8, 61-806 Poznań). Dane przetwarzamy wyłącznie w celu udzielenia odpowiedzi na Twoje zapytanie, przygotowania oferty oraz realizacji ewentualnej współpracy.',
    en: 'The controller of your personal data submitted via contact forms or e-mail correspondence is ES LOGISTICS Sp. z o.o., based in Poznań, Poland (Święty Marcin 29/8, 61-806 Poznań). The data is processed solely to respond to your inquiry, prepare an offer and to perform any subsequent cooperation.'
  },
  'legal.privacy.p2': {
    pl: 'Dane przechowujemy przez okres niezbędny do obsługi zapytania, a w przypadku nawiązania współpracy — zgodnie z obowiązującymi przepisami prawa (m.in. ustawy o rachunkowości oraz przepisów podatkowych).',
    en: 'We retain the data for the period necessary to handle the inquiry, and in case of cooperation — in line with applicable law (including accounting and tax regulations).'
  },
  'legal.rodo.h': { pl: 'RODO — Twoje prawa', en: 'GDPR — your rights' },
  'legal.rodo.intro': {
    pl: 'Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO), masz prawo do:',
    en: 'Under Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR), you have the right to:'
  },
  'legal.rodo.li1': { pl: 'dostępu do swoich danych osobowych,', en: 'access your personal data,' },
  'legal.rodo.li2': { pl: 'sprostowania, usunięcia lub ograniczenia ich przetwarzania,', en: 'rectification, erasure or restriction of processing,' },
  'legal.rodo.li3': { pl: 'przenoszenia danych,', en: 'data portability,' },
  'legal.rodo.li4': { pl: 'wniesienia sprzeciwu wobec przetwarzania,', en: 'object to processing,' },
  'legal.rodo.li5': {
    pl: 'cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania, którego dokonano przed jej cofnięciem),',
    en: 'withdraw consent at any time (without affecting the lawfulness of processing carried out before the withdrawal),'
  },
  'legal.rodo.li6': { pl: 'wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.', en: 'lodge a complaint with the Polish DPA (UODO).' },
  'legal.rodo.outro': {
    pl: 'W celu realizacji powyższych praw skontaktuj się z nami pod adresem',
    en: 'To exercise these rights, please contact us at'
  },
  'legal.cookies.h': { pl: 'Polityka cookies', en: 'Cookie policy' },
  'legal.cookies.p1': {
    pl: 'Strona wykorzystuje pliki cookies wyłącznie w celach technicznych — do zapewnienia poprawnego działania serwisu oraz zapamiętywania preferencji użytkownika (np. wybranego trybu kolorystycznego). Nie korzystamy z plików cookies do celów marketingowych ani profilowania.',
    en: 'This site uses cookies solely for technical purposes — to ensure correct functioning of the service and to remember user preferences (e.g. selected colour mode). We do not use cookies for marketing or profiling.'
  },
  'legal.cookies.p2': {
    pl: 'Możesz w każdej chwili zmienić ustawienia plików cookies w swojej przeglądarce — wyłączenie ich może wpłynąć na funkcjonalność strony.',
    en: 'You may change cookie settings in your browser at any time — disabling them may affect the site’s functionality.'
  },

  // ─────── 404
  'nf.crumb': { pl: 'Błąd 404', en: 'Error 404' },
  'nf.h2.a': { pl: 'Tej strony tu nie ma —', en: 'This page is not here —' },
  'nf.h2.b': { pl: 'ale Twój ładunek dowieziemy.', en: 'but we will deliver your shipment.' },
  'nf.lead': {
    pl: 'Sprawdź adres URL albo wróć do strony głównej. W razie problemów napisz do nas — odpowiadamy w 24h.',
    en: 'Check the URL or return to the home page. If you run into problems, write to us — we reply within 24h.'
  },
  'nf.home': { pl: 'Strona główna', en: 'Home page' },

  // ─────── enhancements
  'cookie.title': { pl: 'Ciasteczka.', en: 'Cookies.' },
  'cookie.body': {
    pl: 'Strona używa plików cookies w celu zapewnienia poprawnego działania serwisu. Korzystając ze strony wyrażasz zgodę na ich używanie.',
    en: 'This site uses cookies to ensure correct functioning of the service. By using the site you agree to their use.'
  },
  'cookie.privacy': { pl: 'Polityka prywatności', en: 'Privacy policy' },
  'cookie.accept': { pl: 'Akceptuję', en: 'Accept' },
  'cookie.dialog': { pl: 'Informacja o cookies', en: 'Cookie notice' },
  'a11y.skip': { pl: 'Przejdź do treści', en: 'Skip to content' },
  'a11y.backTop': { pl: 'Wróć na górę', en: 'Back to top' },
  'a11y.brand': { pl: 'ES Logistics — strona główna', en: 'ES Logistics — home page' },
};

const LANG_KEY = 'es-lang';
const LANG_EVENT = 'es-lang-change';

function getStoredLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === 'pl' || v === 'en') return v;
  } catch (e) {}
  return 'pl';
}

function useLang() {
  const [lang, setLangState] = React.useState(getStoredLang());
  React.useEffect(() => {
    const handler = (e) => setLangState(e.detail);
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);
  const setLang = (v) => {
    if (v !== 'pl' && v !== 'en') return;
    try { localStorage.setItem(LANG_KEY, v); } catch (e) {}
    document.documentElement.lang = v;
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: v }));
  };
  return [lang, setLang];
}

function t(key, lang) {
  const entry = TR[key];
  if (!entry) return key;
  if (!lang) {
    try { lang = localStorage.getItem(LANG_KEY) || 'pl'; } catch (e) { lang = 'pl'; }
  }
  return entry[lang] || entry.pl || key;
}

// Initialise <html lang="..."> on first load
try {
  document.documentElement.lang = getStoredLang();
} catch (e) {}

Object.assign(window, { TR, useLang, t });
