# SEBIT Solutions Web

Tento repozitář obsahuje statickou webovou prezentaci společnosti SEBIT Solutions s.r.o., zaměřenou na IT consulting, bodyshopping, team leasing a vývoj moderních webových řešení.

## Struktura projektu

- `index.html` – Hlavní stránka s přehledem služeb a odkazem na jednotlivé divize.
- `academy/`, `labs/`, `medical/`, `solutions/`, `jira/` – Podstránky jednotlivých divizí (každá má vlastní `index.html`).
- `favicon_rounded.png`, `favicon_arrow.svg` – Favicony a loga.
- `sebit_*_light.svg`, `sebit_*_dark.svg` – Loga jednotlivých divizí.
- `brand_guidelines.md` – Pravidla pro používání značky.
- `CNAME` – Nastavení vlastní domény pro GitHub Pages.

## Technologie

- **HTML5** – Statické stránky.
- **Tailwind CSS** (CDN) – Rychlé stylování a responzivní design.
- **AOS (Animate On Scroll)** – Animace při scrollování.
- **Font Awesome** – Ikony.
- **JavaScript** – Interaktivita (mobilní menu, dynamický rok ve footeru, rozbalovací sekce "Zjistit více").

## Spuštění

Web je statický, není potřeba žádný build proces. Stačí otevřít `index.html` v prohlížeči nebo nasadit na libovolný webhosting (např. GitHub Pages).

## Úpravy

- Pro změnu obsahu upravte příslušné HTML soubory.
- Pro změnu stylů lze upravit Tailwind konfiguraci v `<script>` v `<head>`.

## Kontakt

- Web: [https://www.sebit.cz/](https://www.sebit.cz/)
- E-mail: info@sebit.cz

---

© SEBIT Solutions s.r.o.
