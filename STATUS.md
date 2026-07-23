# 🚀 Foundly Agencja — Dokumentacja Projektu, Zmian i Stanu Systemu
**Data aktualizacji:** 23 lipca 2026 r.  
**Domena główna:** [https://foundly.pl](https://foundly.pl)  
**Repozytorium GitHub:** [A-Banaszak/foundly_agencja](https://github.com/A-Banaszak/foundly_agencja)

---

## 📌 Podsumowanie Wykonanych Prac

### 6. 📄 Moduł Generowania Ofert B2B & Eksportu do PDF
* **Przebudowa Stylów pod Brand Foundly:** Utworzono [src/styles/offer.css](file:///Ubuntu-26.04/home/alekb/foundly/foundly_agencja/src/styles/offer.css) z ciemnym motywem `#050505`, akcentami Indigo/Purple (`#6366f1` / `#818cf8`), fontem *Inter* oraz zoptymalizowanymi regułami `@media print` dla formatu A4.
* **Podstrona Astro:** Dodano dedykowaną stronę oferty [src/pages/oferta.astro](file:///Ubuntu-26.04/home/alekb/foundly/foundly_agencja/src/pages/oferta.astro) z nagłówkiem z logo Foundly, modułami usług, harmonogramem wdrożenia, tabelą wariantów cenowych i przyciskiem drukowania / wywołania pliku PDF.
* **Automatyczny Generator PDF (Puppeteer):** Dodano skrypt [scripts/export-pdf.js](file:///Ubuntu-26.04/home/alekb/foundly/foundly_agencja/scripts/export-pdf.js) pozwalający na bezobsługowe tworzenie gotowych plików PDF A4 ze strony HTML/Astro (`npm run export:pdf`).

---

### 1. 🔑 Bezpieczeństwo i Panel Zarządzania (`/panel-foundly/`)
* **Wtyczka 2FA Discord:** Dwuetapowa autoryzacja kodem generowanym cyklicznie i wysyłanym za pomocą webhooka na prywatny kanał Discord.
* **Nowy adres panelu:** Panel przeniesiono na utajniony adres `/panel-foundly/` (zablokowany w `robots.txt` przed indeksowaniem w Google).
* **Zarządzanie Leadami:** Dodano zakładkę **"Leady z Formularzy"** z wyszukiwarką, filtrowaniem statusów (*Nowy*, *W kontakcie*, *Zrealizowany*, *Odrzucony*) oraz edycją notatek w czasie rzeczywistym.
* **Baza danych SQLite:** Zintegrowany backend PHP (`/public/api/chat.php`) obsługujący automatyczne tworzenie tabel `chats`, `messages` oraz `form_leads`.

---

### 2. 🎨 Identyfikacja Wizualna i Grafiki Socjalne (Facebook)
* **Wektorowy Favicon:** Stworzono nowoczesny zestaw ikon:
  * `public/favicon.svg` — ciemna karta z neonową łuną Indigo i literą **F.** w kroju *Inter*.
  * `public/favicon-32x32.png` — wersja dla przeglądarek.
  * `public/apple-touch-icon.png` (180x180 px) — wersja dla ekosystemu Apple.
* **Materiały FB Renderowane z HTML:**
  * **Zdjęcie Profilowe FB (`fb_profile.png`):** 3200 × 3200 px (Skala 4x, Retina-ready).
  * **Zdjęcie w Tle FB (`fb_cover.png`):** 6560 × 2496 px (Skala 4x) z listą 4 usług (*Strony WWW*, *SEO Lokalne*, *Kampanie Ads*, *Abonament All-In-One*).
  * Wykorzystano oryginalne fonty **Inter** (italic 900 & bold) zsynchronizowane ze stroną WWW.
* **Badge w Logo:** Zmiana responsywności znaku `AGENCJA` przy logo w `Navbar.astro` (`hidden sm:inline-block`) – widoczny od tabletów i desktopu.

---

### 3. 🌐 Social Media & SEO Optimization (Open Graph & Sitemap)
* **Dedykowany Baner Open Graph (`og-image.png`):**
  * Wymiary: **1200 × 630 px** z Retiną w estetyce Dark/Indigo.
  * Zapisany w `public/og-image.png` (dostępny bezpośrednio pod `https://foundly.pl/og-image.png`).
* **Pełny Komplet Tagów Meta w `Layout.astro`:**
  * `og:title`, `og:description`, `og:type`, `og:site_name`, `og:url`, `og:image`, `og:image:width`, `og:image:height`.
  * **Twitter Cards:** `twitter:card` = `summary_large_image`, `twitter:image`, `twitter:title`, `twitter:description`.
* **Nowy Tytuł Strony (`<title>`):**
  * `Foundly Agencja - Strony WWW, Kampanie Ads, SEO dla Firm`
* **Automatyczna Sitemapa XML:**
  * Integracja z `@astrojs/sitemap`.
  * Generowane pliki: `https://foundly.pl/sitemap.xml` oraz `https://foundly.pl/sitemap-index.xml`.
  * Filtrowanie podstron prywatnych (`/panel-foundly`, `/polityka-prywatnosci`, `/regulamin`).

---

### 4. 🍪 Zgodność RODO / Cookiebot
* **Integracja CMP Cookiebot:**
  ```html
  <script is:inline id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="e661a291-f3e8-4f26-b9df-1fbd8c1ad5c2" data-blockingmode="auto" type="text/javascript"></script>
  ```
  Zainstalowano na samej górze sekcji `<head>` przed Google Tag Manager z włączonym automatycznym zarządzaniem zgodami.

---

### 5. 🎯 Przebudowa Podstrony Subskrypcji & Rzetelność Treści
* **Nowa kolejność sekcji na `/uslugi/abonament-growth`:**
  1. **Hero:** Wprowadzenie do modelu abonamentowego.
  2. **Korzyści:** Opłata od 1. msc, 100% Pakiet, Stałe Raportowanie, Umowa na Czas Nieokreślony (30 dni wypowiedzenia).
  3. **Cennik Pakiety (`PricingSection`):** Pakiety Start (`99 zł/mc`), Business Pro (`690 zł/mc`), Dominator (`990 zł/mc`).
  4. **Formularz Zamówienia (`SubscriptionOrderForm`):** Przearanżowany pod kotwicą `#zamow-formularz`.
  5. **Nawigacja po Usługach:** Odnośniki do pojedynczych usług (Strony WWW, SEO, Ads).
  6. **Sekcja FAQ.**
* **Korekta Komunikatów i Przycisków CTA:**
  * Usunięto mylące sformułowania *"0 PLN na start"* i *"Oblicz wycenę w 60s"*.
  * Przycisk główny: `Darmowa wycena w kalkulatorze`.
  * Przycisk pomocniczy: `Poznaj pakiety abonamentowe`.
* **Ukrycie Realizacji:** Ukryto sekcję portfolio (`Portfolio.astro`) ze strony głównej.

---

## 🛠️ Komenda do Publikacji na Serwerze MyDevil

Aby zaktualizować produkcję, zaloguj się na serwer SSH i wykonaj:

```bash
git reset --hard origin/main && git pull origin main && cp -r dist/* .
```

---
*Dokument wygenerowany automatycznie przez Antigravity Assistant.*
