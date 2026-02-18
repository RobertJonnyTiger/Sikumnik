---
description: Transforms a raw course chapter into a fully enriched, exam-ready learning experience — rewriting the tone, adding real-world examples, ingesting NotebookLM sources, generating gamified knowledge challenges, and applying rich visual formatting.
---

---
description: Transforms a raw course chapter into a fully enriched, exam-ready learning experience — rewriting the tone, adding real-world examples, ingesting NotebookLM sources, generating gamified knowledge challenges, adding misconception/pitfall warnings, and applying rich visual formatting. Agent stops after each phase for review.
---

## Usage
```
Run Chapter Workflow on Chapter [X]
```

---

## ⚠️ IMPORTANT: Load Skills First

Before starting ANY step, explicitly load the following skills:

```
Load and apply these skills throughout this entire workflow:
- .agent/skills/lecturer
- .agent/skills/writing-skills
- .agent/skills/interactive-exercise-builder
- .agent/skills/exercise-researcher
- .agent/skills/librarian
- .agent/skills/tailwind-design-system
- .agent/skills/shadcn-ui
- .agent/skills/subagent-driven-development
- .agent/skills/verification-before-completion
```

Do not proceed to Step 1 until all skills are loaded and confirmed.

---

## ⚠️ AGENT BEHAVIOR: Stop, Log & Wait After Every Phase

After completing **each phase**, the agent MUST:

1. **Log** what was done in this format:
```
✅ Phase [X] Complete — [Phase Name]
Files edited: [list]
What was done: [brief summary]
Waiting for your review. Type 'continue' to proceed to Phase [X+1].
```

2. **Stop and wait** for the user to type `continue` before moving to the next phase.
3. **Never auto-proceed** to the next phase without explicit confirmation.

---

## Phase 1 — TONE SHIFT (Skill: `lecturer`)

Rewrite the entire chapter using the `lecturer` skill.

The tone must be:
- A **genius friend** who completed the course and the degree
- Talking to a **small, selective group** of students who want to truly understand — not just memorize
- **Warm, direct, mentor-like** — "let me tell you what actually matters here"
- Formal enough to be academically credible, but grounded enough to feel human
- No fluff. No filler. Every sentence earns its place.

> ❌ Before: "Organizational behavior is the study of how individuals and groups act within organizations."
> ✅ After: "Here's the thing — OB is basically the manual nobody gave you for surviving and thriving in any organization. Once you get it, you start seeing the invisible rules that run every team you'll ever be part of."

**→ STOP. Log and wait for 'continue'.**

---

## Phase 2 — REAL-LIFE EXAMPLES (Skill: `exercise-researcher`)

For **every topic or concept** in the chapter:

- Add a real-world, relatable example that makes the concept click
- Use an existing `<Callout>` component, or create a `<RealWorldExample>` component
- The example must be **easy to understand**, not academic jargon
- Format:

```
💡 Real World: Think about [relatable scenario] — 
that's exactly what [concept] looks like in practice.
```

**Examples of good real-life framing:**
- "Think about the last time a manager took credit for your idea in a meeting — that's a textbook example of [concept]."
- "Remember the Amazon warehouse strikes? That's Maslow's hierarchy playing out at scale — you can't expect self-actualization when safety needs aren't met."
- "Every WhatsApp group that slowly dies because nobody wants to be 'that person' who starts the conversation? That's social loafing."

**→ STOP. Log and wait for 'continue'.**

---

## Phase 3 — NOTEBOOKLM ENRICHMENT (Skill: `librarian`)

1. Connect to the NotebookLM notebook for this course
2. For each topic in the chapter, call `ask_question` with the topic name
3. Pull elaborations, extra context, definitions, and nuance from the sources
4. Inject this content into the relevant sections of the chapter
5. **Any section that is 1–2 sentences must be expanded** — minimum 4–5 sentences per concept after enrichment

**→ STOP. Log and wait for 'continue'.**

---

## Phase 4 — MISCONCEPTIONS, PITFALLS & WARNINGS (Skills: `lecturer`, `exercise-researcher`)

This phase adds critical warning components throughout the chapter. For each major topic, identify and add **at least one** of the following block types where relevant:

### Block Types to Add:

**`common-mistake`** — A misconception students commonly have
```
❌ Common Misconception: [what students wrongly think]
✅ Reality: [what's actually true]
💡 Why this matters: [consequence of the mistake]
```

**`exam-pitfall`** — A specific trap that appears in exams
```
⚠️ Exam Pitfall: Students often confuse [X] with [Y].
The key difference is: [clear distinction]
If you see [trigger phrase] in a question — think [correct concept].
```

**`danger-mines`** — A conceptual landmine that derails understanding
```
💣 Danger! Mines!
[Bold warning about a subtle but critical point that breaks the whole concept if missed]
```

**`important-remember`** — A must-know rule or principle
```
📌 Important to Remember:
[The one thing you absolutely cannot forget about this topic]
```

### Placement Rules:
- Place **immediately after** the concept it relates to
- Do not cluster more than 2 warning blocks in a row
- Every major topic must have **at least one** warning block
- Prioritize `exam-pitfall` for concepts that are frequently tested
- Use `danger-mines` sparingly — only for truly critical conceptual traps

**→ STOP. Log and wait for 'continue'.**

---

## Phase 5 — EXAM PREPARATION (Skill: `exercise-researcher`)

For each topic, ask: *"How could this show up in an exam?"*

- Add a subtle **"📝 Exam Tip"** callout per major topic
- Flag the most testable concepts with a visual marker
- Focus on: definitions, comparisons between theories, real-world application questions, and "what would happen if..." scenarios

**→ STOP. Log and wait for 'continue'.**

---

## Phase 6 — KNOWLEDGE CHALLENGE QUESTIONS (Skills: `interactive-exercise-builder`, `exercise-researcher`)

For each major topic in the chapter, create **1–2 interactive questions**.

### Question Requirements:
- ✅ Multiple choice with 4 options
- ✅ Gamified — points, visual feedback, animations on correct/incorrect answer
- ✅ **Hidden reasoning component** — revealed only after the user answers, explaining *why* the correct answer is right and why the others are wrong
- ✅ Use the existing `<KnowledgeChallenge>` component — enhance it if needed

**→ STOP. Log and wait for 'continue'.**

---

## Phase 7 — CONTENT ENRICHMENT (Skill: `writing-skills`)

Rules:
- **No section can be a single sentence** — minimum 3–4 sentences per concept
- Every concept needs: **definition → explanation → example → why it matters**
- Expand shallow sections using NotebookLM sources + your own knowledge
- Add transitions between topics so the chapter flows like a conversation, not a list

**→ STOP. Log and wait for 'continue'.**

---

## Phase 8 — FORMATTING & VISUAL APPEAL (Skills: `tailwind-design-system`, `shadcn-ui`, `writing-skills`)

Apply throughout the entire chapter:

| Format | Use for |
|--------|---------|
| **Bold** | Key terms, important concepts, names of theories |
| *Italic* | Emphasis within a sentence, foreign terms |
| <u>Underline</u> | Exam-critical points, warnings |
| Bullet points | Any list — never run-on sentences for lists |
| Colors | Use Tailwind classes consistent with the site's design system |
| Section breaks | Between every major topic |
| Callout boxes | Real-world examples, exam tips, key takeaways |
| Warning blocks | Misconceptions, pitfalls, danger mines, important reminders |

> ⚠️ All formatting must use proper HTML/JSX tags or ReactMarkdown — no raw `**text**` or `*text*` as literal characters.

**→ STOP. Log and wait for 'continue'.**

---

## Phase 9 — VERIFY RENDERING (Skill: `verification-before-completion`)

Before marking the workflow as complete:

1. Scan all edited components for raw `**`, `*`, or `<u>` appearing as literal text
2. Confirm ReactMarkdown + rehype-raw is applied to all dynamic text
3. Open the chapter in the browser and visually verify:
   - Bold text renders as bold
   - Italics render as italic
   - Underlines render as underlined
   - Colors are applied correctly
   - Knowledge challenge questions are interactive and gamified
   - All warning blocks (misconceptions, pitfalls, danger mines) render correctly
4. Report every file changed and what was modified

**→ STOP. Log final summary and mark workflow as COMPLETE.**

---

## Final Log Format

When all phases are done, output:

```
🎉 Chapter Workflow Complete — Chapter [X]

Phases completed: 9/9
Files edited: [full list]
New components added: [list]
NotebookLM topics queried: [list]
Knowledge challenge questions added: [count]
Warning blocks added: [count breakdown by type]

Ready for your final review.
```

---

## Checklist

- [ ] Skills loaded
- [ ] Phase 1: Tone rewritten (mentor/genius friend style)
- [ ] Phase 2: Real-life examples added to every topic
- [ ] Phase 3: NotebookLM sources ingested and content enriched
- [ ] Phase 4: Misconceptions, exam pitfalls, danger mines, and important reminders added
- [ ] Phase 5: Exam tips added per topic
- [ ] Phase 6: Knowledge challenge questions created (gamified + hidden reasoning)
- [ ] Phase 7: No section left at 1–2 sentences
- [ ] Phase 8: Formatting applied (bold, italic, underline, bullets, colors, warning blocks)
- [ ] Phase 9: Rendering verified in browser — no raw markdown visible