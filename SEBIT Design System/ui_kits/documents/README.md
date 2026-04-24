# SEBIT Document Templates

Print-ready A4 templates for the documents SEBIT Solutions ships every week.
Open `index.html`, use the toolbar to switch between pages, and press **Tisk / PDF**
to export to paper or PDF.

## What's in here

| Template | Purpose | Voice |
|---|---|---|
| **Nabídka · Titul** | Cover page for every formal proposal | Confident, navy hero, one editorial headline |
| **Nabídka · Obsah** | Inside pages — context, approach, proof | Pull quotes, attributed stats, arrow bullets |
| **Case study** | Reference sheet with outcomes | Numbers-forward, one killer quote |
| **Hlavičkový dopis** | Formal letter on SEBIT letterhead | Formal Czech (Vy/Vás), serif body |
| **Faktura** | Tax invoice | Minimal, legal-correct, bankable |

## Design language

- **A4 canvas** (794×1123 px @ 96 dpi) — exports 1:1 via `window.print()`.
- **Editorial typography** — Fraunces for display/headings (adds personality to
  the Inter-only brand), Inter for body and UI, JetBrains-style ui-monospace
  for eyebrows and meta.
- **Arrow as motif** — `>` appears as bullet, edge-mark, decorative cluster
  on the cover, and signature glyph in the letter footer.
- **Number blocks** follow the Stats variant C pattern: thin lime bar → serif
  numeral → small label → source attribution.
- **Navy bleeds** on the cover and the case-study outcome strip — the rest of
  the system stays generous and white, so navy feels deliberate.

## Editing

Each template is a single `<div class="page" id="p-*">`. To spin up a new
proposal, copy `#p-cover` + `#p-body`, replace strings, regenerate the serial
number (`SEB-<year>-<seq>-<tag>`), and print.

All copy is placeholder — replace the client names, amounts, and dates before
sending. IČO / DIČ / bank account numbers on the invoice are illustrative.
