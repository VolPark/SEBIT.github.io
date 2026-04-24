# SEBIT Design System — Full Tailwind Migration Plan

> **Status:** Plánováno, čeká na schválení  
> **Předpoklad:** Fáze 1 (postupná integrace) je dokončena — `colors_and_type.css` je importován ve všech stránkách

---

## Cíl migrace

Kompletní přechod z **Tailwind CSS CDN** na čistý **vanilla CSS** založený na design tokenech v `colors_and_type.css`. Výsledkem bude:

1. ✅ Žádná runtime závislost na Tailwind CDN (4 MB JS)
2. ✅ Rychlejší načítání stránek (žádný JIT compile v prohlížeči)
3. ✅ Plná kontrola nad CSS, žádné vendor-specific utility třídy
4. ✅ Design System jako jediný zdroj pravdy

---

## Příprava — co je potřeba před migrací

### 1. Utility třídy k přeložení

Zmapovat všechny Tailwind utility třídy používané v HTML a převést je na CSS třídy/vlastnosti:

| Tailwind třída | CSS ekvivalent | DS token |
|---|---|---|
| `bg-sebit-navy` | `background: var(--bg-navy)` | `--bg-navy` |
| `bg-sebit-lime` | `background: var(--sebit-lime)` | `--sebit-lime` |
| `text-sebit-navy` | `color: var(--fg-1)` | `--fg-1` |
| `text-sebit-lime` | `color: var(--fg-accent)` | `--fg-accent` |
| `text-gray-800` | `color: var(--fg-2)` | `--fg-2` |
| `text-gray-600` | `color: var(--fg-3)` | `--fg-3` |
| `text-gray-300` | `color: var(--fg-on-navy-muted)` | `--fg-on-navy-muted` |
| `bg-white` | `background: var(--bg-0)` | `--bg-0` |
| `bg-gray-50` | `background: var(--bg-1)` | `--bg-1` |
| `bg-gray-100` | `background: var(--bg-2)` | `--bg-2` |
| `shadow` | `box-shadow: var(--shadow)` | `--shadow` |
| `shadow-lg` | `box-shadow: var(--shadow-lg)` | `--shadow-lg` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl)` | `--shadow-2xl` |
| `rounded` | `border-radius: var(--radius-sm)` | `--radius-sm` |
| `rounded-lg` | `border-radius: var(--radius-md)` | `--radius-md` |
| `rounded-xl` | `border-radius: var(--radius-lg)` | `--radius-lg` |
| `rounded-full` | `border-radius: var(--radius-pill)` | `--radius-pill` |

### 2. Layout utility třídy → CSS komponenty

Tyto nelze 1:1 nahradit tokeny, potřebují vlastní CSS třídy:

```css
/* Container */
.sebit-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

/* Flexbox layouts */
.sebit-flex { display: flex; }
.sebit-flex-col { flex-direction: column; }
.sebit-flex-center { align-items: center; justify-content: center; }
.sebit-flex-between { justify-content: space-between; }
.sebit-flex-grow { flex-grow: 1; }

/* Grid */
.sebit-grid { display: grid; gap: var(--space-8); }
.sebit-grid-2 { grid-template-columns: repeat(2, 1fr); }
.sebit-grid-3 { grid-template-columns: repeat(3, 1fr); }
.sebit-grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .sebit-grid-2, .sebit-grid-3, .sebit-grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Spacing */
.sebit-section { padding: var(--space-20) 0; }
.sebit-section-sm { padding: var(--space-16) 0; }
.sebit-section-heading { margin-bottom: var(--space-12); text-align: center; }
```

### 3. Komponenty k vytvoření v CSS

Na základě `preview/` souborů v DS vytvořit tyto CSS component classes:

#### Navigace
```css
.sebit-nav { /* fixed header */ }
.sebit-nav-link { /* standardní nav odkaz s hover border-bottom */ }
.sebit-nav-link--active { /* aktivní stav */ }
```

#### Karty
```css
.sebit-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  padding: var(--space-6);
  transition: transform 0.15s, box-shadow 0.15s;
}
.sebit-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--shadow-2xl);
}
```

#### Tlačítka
```css
.sebit-btn {
  border-radius: var(--radius-pill);
  font-weight: var(--fw-semibold);
  padding: 0.75rem 2rem;
  transition: all 0.15s;
  text-align: center;
  display: inline-block;
}
.sebit-btn--primary {
  background: var(--sebit-white);
  color: var(--sebit-navy);
  box-shadow: var(--shadow-lg);
}
.sebit-btn--cta {
  background: var(--sebit-lime);
  color: var(--sebit-navy);
  box-shadow: var(--shadow-lg);
}
.sebit-btn--disclosure {
  background: var(--gray-200);
  color: var(--gray-800);
  border-radius: var(--radius-sm);
  padding: 0.5rem 1rem;
}
.sebit-btn--disclosure:hover {
  background: var(--sebit-navy);
  color: var(--sebit-white);
}
```

#### Formuláře
```css
.sebit-input {
  width: 100%;
  border: 1px solid var(--border-default);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.sebit-input:focus {
  outline: none;
  border-color: var(--sebit-navy);
  box-shadow: 0 0 0 2px rgba(0, 43, 92, 0.2);
}
```

#### Stat bloky
```css
.sebit-stat-block {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sebit-stat-block__divider {
  width: 1.75rem;
  height: 3px;
  background: var(--sebit-lime);
  border-radius: 2px;
  margin-bottom: var(--space-3);
}
```

#### Testimonial karty
```css
.sebit-testimonial {
  background: var(--bg-navy-translucent);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-navy-translucent);
}
```

---

## Postup migrace — stránku po stránce

### Krok 1: Vytvoření `sebit-components.css`
Nový CSS soubor s výše popsanými component classes. Import vedle `colors_and_type.css`.

### Krok 2: Migrace `privacy/index.html` (nejmenší stránka — 159 řádků)
- Začít zde jako proof of concept
- Nahradit všechny Tailwind utility třídy za DS component classes
- **Odebrat** `<script src="cdn.tailwindcss.com">` a inline Tailwind config
- Ověřit pixel-perfect shodu

### Krok 3: Migrace `manifest/index.html` (228 řádků)
- Jednoduchá stránka, žádné "more-btn" sekce
- Testovat print styly

### Krok 4: Migrace `labs/index.html`, `Medical/index.html`, `Academy/index.html`
- Tyto tři mají identickou strukturu
- Migrovat jednu, pak copy-paste vzor

### Krok 5: Migrace `index.html` a `solutions/index.html`
- Nejsložitější — mají "more-btn" expandy a reference sekci
- Pečlivě testovat interaktivní prvky

### Krok 6: Vyčištění
- Odebrat `<script src="cdn.tailwindcss.com">` ze všech stránek
- Odebrat inline Tailwind config bloky
- Odebrat preconnect na `cdn.tailwindcss.com`
- Ověřit performance (stránka by se měla načítat výrazně rychleji)

---

## Responsivita

Tailwind breakpointy `md:` (768px) a `sm:` (640px) přeložit na:

```css
/* Tailwind md: → min-width: 768px */
@media (min-width: 768px) { ... }

/* Tailwind sm: → min-width: 640px */
@media (min-width: 640px) { ... }

/* Tailwind lg: → min-width: 1024px */
@media (min-width: 1024px) { ... }
```

Každá responsive utility třída (např. `md:grid-cols-3`) musí mít ekvivalent v `sebit-components.css`.

---

## Rizika a mitigace

| Riziko | Pravděpodobnost | Mitigace |
|--------|----------------|----------|
| Vizuální regrese | Střední | Screenshot diff s produkčním webem před/po |
| Chybějící Tailwind utility | Nízká | Audit všech tříd před zahájením |
| Responsivita se rozbije | Střední | Testovat na 3 breakpointech (320, 768, 1280) |
| AOS animace přestanou fungovat | Nízká | AOS nemá závislost na Tailwindu |

---

## Odhad práce

| Krok | Odhad |
|------|-------|
| Vytvoření `sebit-components.css` | 2–3 hodiny |
| Migrace `privacy` + `manifest` | 1 hodina |
| Migrace 3× division pages | 2 hodiny |
| Migrace `index.html` + `solutions` | 2–3 hodiny |
| Testování a opravy | 2 hodiny |
| **Celkem** | **~10 hodin** |

---

## Doporučení

1. **Migrovat po fázích** — jedna stránka = jeden PR = testovatelný na preview URL
2. **Začít od nejmenší stránky** (privacy) jako proof of concept
3. **Nevytvářet závislost** na build toolech — zůstat u čistého CSS bez preprocessoru
4. **Verzovat DS** — po plné migraci přidat version tag do `colors_and_type.css` (komentář v hlavičce)
