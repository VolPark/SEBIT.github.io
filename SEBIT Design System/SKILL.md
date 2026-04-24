---
name: sebit-design
description: Use this skill to generate well-branded interfaces and assets for SEBIT Solutions s.r.o. (Czech IT consulting, plus divisions SEBIT Labs, SEBIT Medical, SEBIT Academy), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `ui_kits/`, `preview/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view. Always import `colors_and_type.css` and use the `--sebit-navy` / `--sebit-lime` / Inter font stack.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. The source site lives in `source/` as read-only reference.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions (which division — Solutions / Labs / Medical / Academy; what surface — marketing page, slide, prototype, asset), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key brand rules to never violate:
- Palette is three colors only: navy `#002B5C`, lime `#C6FF00`, white. Lime is ACCENT-only (never a large fill).
- Type is Inter. No serif, no mono.
- All copy is Czech, formal "Vy/Vaše", first-person plural ("my/naše"). No emoji, ever.
- Cards: `rounded-lg`, `shadow`, lift on hover (`translate-y-1` + `shadow-2xl`).
- CTAs: pill-shaped (`rounded-full`), sentence case, imperative verb.
- Arrow signet (`assets/favicon_arrow.svg`) goes left of the wordmark.
