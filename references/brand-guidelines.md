---
name: brand-guidelines
description: >
  Visual and tonal guidelines for TLV Academic course content.
  Defines voices, language standards, emoji usage, and formatting rules.
---

# Brand Guidelines — TLV Academic

## Voice & Tone

### Three Voices

1. **Conductor** — warm, relatable, Tel Aviv vibes
   - Sections: 1, 2, 3, 5, 10, 14, 15
   - Feels like: a friendly tutor at a coffee shop

2. **Professor** — strict academic, textbook Hebrew
   - Sections: 4, 6, 7, 13
   - Feels like: a university lecture, formal but clear

3. **Workshop Master** — encouraging, instructional
   - Sections: 8, 9, 11, 12
   - Feels like: a TA in a practice session

### Voice Rules

- Each section has ONE voice
- Never blend voices within a section
- Transition between voices happens BETWEEN sections, not within

---

## Language

### Hebrew Standards

- RTL throughout all content
- Academic terms: keep original language (English/Latin/Greek) with Hebrew explanation
- Mathematical notation: LaTeX format where applicable
- Proper grammar in formal sections
- Relaxed grammar allowed in casual sections

### Casual Sections (3, 5, 10)

Allowed and encouraged:
- Slang and colloquial Hebrew
- Humor (relevant to topic)
- Direct address ("אתה", "בוא נראה")
- Short punchy sentences
- Questions to the reader

Analogies must reference Tel Aviv student life:
- Wolt deliveries and waiting times
- Bus lines (especially the 5, Dan, traffic)
- Roommates and shared apartments
- Rent prices and landlords
- Coffee shops and coworking
- Dizengoff, Rothschild, campus life
- Bars and nightlife
- Dating apps
- Part-time jobs
- Exam stress and all-nighters

### Formal Sections (4, 6, 7, 13)

Required:
- Textbook Hebrew
- Full proper sentences
- Third person or passive voice
- Technical precision
- No slang whatsoever
- No humor
- No emojis
- No direct reader address

---

## Emojis

### Where Emojis Are Allowed

- Section 3: Teaser Analogy
- Section 5: Tone Break
- Section 8: Interactive Element
- Section 9: Checkpoint
- Section 10: Street Summary
- Section 11: Guided Exercises (sparingly)
- Section 12: Independent Exercises (sparingly)
- Section 14: Trivia
- Section 15: Bridge

### Where Emojis Are Forbidden

- Section 4: Formal Definitions
- Section 6: Deep Dive
- Section 7: Common Mistakes (except the markers below)
- Section 13: Quick Reference

### Functional Emoji Set

Use these consistently across all content:

| Emoji | Meaning | Usage |
|-------|---------|-------|
| 📌 | Important point | Highlighting key info |
| ⚠️ | Warning | Common mistakes, cautions |
| 💡 | Tip or insight | Helpful hints |
| 🎯 | Learning objective | Goals and targets |
| ✅ | Correct | Right answers, good examples |
| ❌ | Incorrect | Wrong answers, mistakes |
| 📝 | Step | Exercise steps |
| 💭 | Thinking | Approach and reasoning |
| 🎲 | Fun fact | Trivia items |
| ➡️ | Next | Bridge to next chapter |

### Emoji Density

- Casual sections: 3-5 emojis per section maximum
- Workshop sections: 1-2 per exercise maximum
- Never use emojis decoratively — only functionally

---

## Formatting

### Tooltips

Purpose: Define new or uncommon terms inline

Rules:
- Apply on FIRST appearance only
- Never tooltip the same term twice
- One sentence maximum per tooltip
- Format: **term** [tooltip: brief definition]

Example:
- First use: **פחת נצבר** [tooltip: סכום הפחת שנרשם מיום הרכישה]
- Later uses: פחת נצבר (no tooltip)

### Collapsible Sections

Use collapsible reveals for:
- Exercise steps (reveal one at a time)
- Hints in independent exercises
- Answers in independent exercises
- Checkpoint answers
- Thinking direction in guided exercises

Format in JSON: mark with "collapsible": true
Format in HTML: use details/summary pattern

### Difficulty Ratings

Always present on exercises. Use consistently:

| Rating | Level | Meaning |
|--------|-------|---------|
| ⭐ | Basic | Direct application of concept |
| ⭐⭐ | Intermediate | Requires thinking and connection |
| ⭐⭐⭐ | Exam level | Typical exam difficulty |
| ⭐⭐⭐⭐ | Challenge | Above exam level, for strong students |

Display format: "⭐⭐⭐ רמת מבחן" or just the stars

### Section Headers

Every section header includes:
1. Section number in brackets
2. Emoji marker
3. Hebrew title
4. English subtitle (optional, for code reference)

Example: [4] 📚 הגדרות פורמליות — FORMAL DEFINITIONS

### Lists and Bullets

- Use bullets for unordered items
- Use numbers for sequential steps or ranked items
- Use checkboxes for checklists
- Indent sub-items consistently

---

## Visual Design Principles

### Layout

- Compact: avoid unnecessary whitespace
- Clean: no clutter, clear hierarchy
- Scannable: headers, bullets, short paragraphs
- Consistent: same patterns across all chapters

### Section Separation

- Clear visual break between sections
- Each section could stand alone
- Consider collapsibility for returning students

### Responsiveness

- Mobile-first thinking
- Tables should scroll horizontally on mobile
- Collapsibles especially important on mobile

### Accessibility

- Sufficient color contrast
- Alt text for images/diagrams
- Logical heading hierarchy (h1 > h2 > h3)
- Screen reader friendly structures

---

## Content Density

### Paragraph Length

- Formal sections: 3-5 sentences per paragraph
- Casual sections: 1-3 sentences per paragraph
- Never wall-of-text

### Section Length Guidelines

| Section | Target Length |
|---------|---------------|
| Page Map | 10-15 lines |
| Introduction | 2-3 paragraphs |
| Teaser Analogy | 3-5 sentences |
| Formal Definitions | As needed, comprehensive |
| Tone Break | 1-2 paragraphs |
| Deep Dive | Longest section, detailed |
| Common Mistakes | 3-5 items |
| Interactive Element | 1 element, complete |
| Checkpoint | 2 questions exactly |
| Street Summary | 2-3 paragraphs |
| Guided Exercises | 2-3 exercises |
| Independent Exercises | 2-3 exercises |
| Quick Reference | Fits one printed page |
| Trivia | 1-2 facts |
| Bridge | 1-2 sentences |

---

## Terminology Consistency

### Standard Terms (use these exact terms)

| Concept | Hebrew Term |
|---------|-------------|
| Assets | נכסים |
| Liabilities | התחייבויות |
| Equity | הון עצמי |
| Current | שוטף |
| Non-current | לא שוטף |
| Depreciation | פחת |
| Accumulated depreciation | פחת נצבר |
| Net | נטו |
| Gross | ברוטו |
| Balance sheet | מאזן |
| Income statement | דוח רווח והפסד |
| Journal entry | פקודת יומן |

### Acronyms

- First use: full term + acronym in parentheses
- Later uses: acronym only
- Example: "כללי חשבונאות מקובלים (GAAP)" then "GAAP"

---

## Quality Signals

### Good Content Has

- Clear learning objectives upfront
- Smooth transitions between sections
- Examples that build on each other
- Callbacks to previous chapters
- Foreshadowing of future chapters
- Balance of formal and casual
- Practical exam preparation

### Red Flags

- Wall of text without breaks
- Emojis in formal sections
- Slang in formal sections
- Missing exam appearance info
- Exercises without difficulty ratings
- No connection to student life
- Tooltips repeated for same term
- Sections out of order