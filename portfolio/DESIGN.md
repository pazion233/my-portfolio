# DESIGN.md — Beza Alehegn portfolio

Dials (taste-skill): DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3.
Motion weighting (design-motion-principles): Krehel polish 50 · Emil restraint 30 · Jhey play 20.

## 1. Visual Theme & Atmosphere
Editorial, calm, confident. Warm charcoal canvas, serif display type, one ember accent. Left-aligned, asymmetric sections; whitespace does the work. The 3D hero is the single "wow" moment.

## 2. Color Palette & Roles
- Background `#171513` (hsl 30 9% 8%) · Card `hsl(30 8% 10.5%)` · Border `hsl(30 6% 17%)`
- Foreground `hsl(36 20% 94%)` · Muted text `hsl(30 6% 66%)`
- Accent ember `#F97316`: CTAs, active nav, index numerals, hover. Text on accent is dark `#171513` (≈7:1).
- Chart colours (skills dashboard) are categorical only; never reuse them for UI.

## 3. Typography Rules
- Display: Instrument Serif, weight 400, tight tracking, italic for the tagline.
- UI/body: Geist 400/500/600. Labels and indices: JetBrains Mono, 12px.
- `text-wrap: balance` on headings, `pretty` on paragraphs. Body ≥16px, line-height ~1.6.

## 4. Component Stylings
- Primary button: ember fill, dark text, 44px min height, radius 8px, `active:scale-[0.97]`.
- Ghost button: 1px border, hover `secondary`. Inputs: visible `<label>`, 44px min, 2px focus ring.
- Lists use hairline rows, not cards. Never nest a card in a card.

## 5. Layout Principles
12-column grid, max-width 1280px. Section heading: mono index (col 1–2), serif title (col 3–8), one-line aside (col 9–12). Sections 96–128px vertical rhythm, separated by a hairline.

## 6. Depth & Elevation
Flat. Hairline borders, no drop shadows, no blurred glow blobs. Only the sticky header uses backdrop blur.

## 7. Do's and Don'ts
Do: one accent, real project facts, visible focus, proper alt/labels. Don't: stock photos implying real screenshots, self-rated skill percentages as proof, fake form success, dead `#` links, purple gradients, bounce easing.

## 8. Responsive Behavior
Breakpoints 375 / 768 / 1024 / 1440. Spline hero mounts only ≥1024px with motion allowed. Mobile nav is an animated sheet (Esc closes). Hover styles only where hover exists.

## 9. Agent Prompt Guide
"Extend this site using DESIGN.md: serif display + Geist body, ember accent only for action/state, hairline rows, asymmetric 12-col layout. Motion: ease-out `cubic-bezier(0.23,1,0.32,1)`, 150–300ms, opacity/transform only, enter from 14px offset (never scale 0), exits faster than enters, honour prefers-reduced-motion, no bounce."

## Motion tokens
Reveal 500ms ease-out-expo · Menu in 220ms / out 150ms · Button press 200ms · Heavy assets (WebGL, charts) mount on approach via `OnView`.
