---
name: brand-guidelines
description: >
  Visual and tonal guidelines for Sikumnik content.
  Defines the 23 "Truths" of the design system, language standards, and formatting.
---

# Brand Guidelines — Truth 2.0 (Sikumnik)

## The 23 Truths (Systemic Rules)

These 23 rules are GLOBAL and MANDATORY for all components and chapters.

| # | Truth | Implementation Details |
|---|---|---|
| 1 | **Hebrew Only** | Absolutely NO English words, even in parentheses. No names, no acronyms. |
| 2 | **No English Acronyms** | GAAP/IFRS -> תקינה חשבונאית. NO exceptions. |
| 3 | **Voice Consistency** | Stick to the assigned voice (Conductor, Professor, Workshop Master). |
| 4 | **No Wall of Text** | Use semantic blocks. Max 3 sentences per paragraph. |
| 5 | **Sentence-Level Highlighting** | Every sentence MUST have important concepts highlighted (primary/accent). |
| 6 | **Multi-line Formatting** | Break complex thoughts into lists or separate lines. |
| 7 | **No Semicolons** | Use new lines or bullet points instead of `;`. |
| 8 | **No Boring Text** | Every block of text should be wrapped in a semantic component (Card, Box, etc.). |
| 9 | **No Italics** | Use bolding or background highlighting for emphasis. |
| 10 | **Calm Dark Theme** | All pages must use the `bg-background` (Dark Slate) with subtle ambient glows. |
| 11 | **High Contrast** | Main text must be `text-white` or `text-foreground/95`. Subtext `text-foreground/70`. |
| 12 | **Font Primacy** | Use `font-main` for all text. `font-handwriting` ONLY for ad-hoc student notes. |
| 13 | **Boosted Font Sizes** | Defaults: `text-xl` (small), `text-2xl` (body), `text-3xl+` (headings). |
| 14 | **Semantic Highlighting** | `text-primary` for assets/positives. `text-accent` for liabs/equities. |
| 15 | **Red for Errors** | `CommonMistakes` and 'Incorrect' UI MUST use a deep red/error theme. |
| 16 | **Premium Glassmorphism** | Use `GlassCard`, `backdrop-blur-3xl`, and `shadow-premium`. |
| 17 | **Ambient Glows** | Use blur-3xl backgrounds and `shadow-neon` for interactive states. |
| 18 | **Uniform Column Design** | In grids (like QuickReference), use identical bolding and layout weights. |
| 19 | **GraduationCap Iconography** | Use `GraduationCap` for definitions and exam appearance stats. |
| 20 | **No Sub-headers in ToneBreak** | Keep `ToneBreak` pure: One calm message on a large background. |
| 21 | **Major Title (H1)** | Use `PageMap` style: Major white title, high contrast. |
| 22 | **High-Contrast Logic Boards** | Formula boards and calculations must be centered, large, and high-contrast. |
| 23 | **Truth 2.0 Compliance** | All 23 rules above must be verified before any chapter is marked 'Done'. |

---

## Voice & Tone

### Three Voices

1. **Conductor** — warm, relatable, Tel Aviv vibes. Relatable analogies (Wolt, traffic, rent).
2. **Professor** — strict academic, textbook Hebrew. Used for formal definitions.
3. **Workshop Master** — encouraging, instructional. Used for exercises.

---

## Language & Typography

### Hebrew Standards
- **Strictly RTL** throughout all content.
- **NO English references**: English translations in parentheses are strictly forbidden.
- **Acronyms**: Must be translated to their full Hebrew meaning.

### Typography
- **Primary Font**: `font-main` (Sikumnik standard). Used for 95% of content.
- **Handwriting Font**: `font-handwriting`. Used ONLY for "scribbled" notes or ad-hoc thinking steps. Never for body text or help blocks.
- **Weight**: Use `font-black` for headers and important amounts.

---

## Visual Design Components

### Glass Cards
- All content sections are wrapped in `GlassCard`.
- Border-top or Border-right highlighting (4px-8px) for semantic grouping.
- Rounding: Use `rounded-4xl` or `rounded-[3rem]` for containers.

### Highlighting System
- **Auto-Highlighting**: Key terms (ש"ח, סה"כ, נכסים, etc.) should be colored automatically.
- **Bold Boxes**: Use `bg-primary/20` with a 2px bottom border for "Keyword Boxes".

### Financial Statements
- High contrast: White text for important totals.
- No italics in balance sheet notes.
- Use `Success` (Greenish) for Assets and `Error` (Reddish) for Liabilities/Equity if appropriate, or keep consistent with `Primary`/`Accent`.

---

## Formatting Rules

### Tooltips & Definitions
- Use on first appearance only.
- One sentence maximum.

### Difficulty Ratings
- Mandatory for exercises: ⭐ to ⭐⭐⭐⭐.

### Checkpoints
- Exactly 2 questions per checkpoint.
- Must include a "Reveal Answer" interaction.

---

## Quality Checklist (Truth 2.0)
- [ ] Is there ANY English text left? (Check parentheses)
- [ ] Are font sizes too small? (Minimum `text-xl`)
- [ ] Is there a "Wall of Text"?
- [ ] Are important words highlighted in EVERY sentence?
- [ ] Is the theme "Calm Dark"?
- [ ] Is there any `font-handwriting` used for help/body text? (Should be `font-main`)
- [ ] Is there any use of semicolons?
