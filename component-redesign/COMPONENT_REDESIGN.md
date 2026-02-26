# 🎨 Sikumnik Component System Redesign
## Unified Architecture & Design Specifications

---

## **1. DEFINITION BLOCKS** (Glossary & Terminology)

### `AcademicDefinition` 
**Context:** First page of chapter / formal introduction to core concept  
**Purpose:** Establish rigorous, authoritative definition  
**Tone:** Academic, formal, rigorous  
**Design:**
- Elegant bordered container with academic accent color (dark blue)
- Quote icon in corner
- Formal serif typography for term
- Citation-style badge (e.g., "Game Theory 101")
- Padding: generous, scholarly feel
- Border: thick left accent (4px)
- Background: subtle gradient from primary/5 to transparent

**Visual Hierarchy:**
```
┌────────────────────────────────┐
│ 📚 Formal Definition            │
│ ─────────────────────────────  │
│ [Large elegant term name]       │
│                                 │
│ "The formal, rigorous definition│
│  spanning 2-3 sentences with    │
│  academic precision..."         │
│                                 │
│ Citation Badge | Subject Badge  │
└────────────────────────────────┘
```

---

### `Definition` (Simple/Quick)
**Context:** Mid-chapter when new term introduced in topic  
**Purpose:** Quick reference, exam-friendly  
**Tone:** Clear, direct, simple  
**Design:**
- Compact card with light teal accent
- No citation needed
- Smaller padding (condensed)
- Book icon (simple)
- Single color accent (teal/cyan)
- Background: white with subtle border

**Visual Hierarchy:**
```
┌──────────────────────────┐
│ 📖 Definition             │
│ ──────────────────────── │
│ **Term Name**             │
│ Simple 1-2 sentence       │
│ definition here.          │
└──────────────────────────┘
```

**API:**
```tsx
<Definition 
  term="Opportunity Cost"
  definition="The loss of potential gain from other alternatives when one alternative is chosen."
/>
```

---

## **2. ALERT SYSTEM** (Notifications, Tips, Warnings, Prerequisites)

### Unified `<Alert />` Component
**Purpose:** Consistent notification/callout system  
**Variants:** `tip | warning | prerequisite`  
**Tone:** Varies by variant

### `tip` Variant (ExamTip - medium importance)
**Context:** Helpful hints, study strategies, exam pointers  
**Icon:** ✨ Sparkles (not 🔥 fire)  
**Color:** Teal/secondary  
**Design:**
- Subtle glow effect
- Clean, approachable
- No "must-know" messaging
- Better for scattered hints throughout chapter

**Visual:**
```
┌────────────────────────────────┐
│ ✨ Exam Tip                     │
│                                │
│ Here's a helpful pointer that  │
│ might appear on your exam or   │
│ help you study better.         │
└────────────────────────────────┘
```

### `warning` Variant (Alert/Caution)
**Context:** Common mistakes, critical cautionary info  
**Icon:** ⚠️ Triangle Alert  
**Color:** Amber/warning  
**Design:**
- Warm yellow/amber border
- More assertive than tip
- Used for "watch out" moments

**Visual:**
```
┌────────────────────────────────┐
│ ⚠️ Watch Out                    │
│                                │
│ Many students confuse this...  │
│ Make sure you understand that..│
└────────────────────────────────┘
```

### `prerequisite` Variant (Requirement)
**Context:** Required prior knowledge, dependencies  
**Icon:** 🔄 Rotate CCW  
**Color:** Gray/muted  
**Design:**
- Muted, informational tone
- Not alarming, just informative
- "Before you continue, know this..."

**Visual:**
```
┌────────────────────────────────┐
│ 🔄 Before We Start             │
│                                │
│ You'll need to know about:     │
│ Supply Curves (Chapter 2)      │
│ → Why: To calculate equilibrium│
└────────────────────────────────┘
```

**API:**
```tsx
<Alert variant="tip">
  High Importance Exam Tip goes here
</Alert>

<Alert variant="warning">
  Common misconception warning
</Alert>

<Alert variant="prerequisite" title="Supply Curves">
  Why needed: To calculate market equilibrium
</Alert>
```

---

## **3. REAL-WORLD EXAMPLES**

### `RealWorldExample` (Consolidated)
**Context:** Practical application anywhere in chapter  
**Purpose:** Bridge theory to real-world  
**Tone:** Engaging, relatable  
**Design:**
- Left border accent (primary blue)
- Globe icon
- Example title (bold)
- Narrative explanation
- "Connection to theory" call-out box at bottom

**Visual:**
```
┌────────────────────────────────┐
│ 🌍 Prisoner's Dilemma          │
│                                │
│ Two suspects are arrested...   │
│ [narrative about real scenario]│
│                                │
│ ┌──────────────────────────┐   │
│ │ 🔗 How this relates:    │   │
│ │ Shows the limits of     │   │
│ │ non-cooperation         │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

---

## **4. EXERCISE COMPONENTS**

### `CheckpointQuiz` (Unchanged but improved)
**Context:** End of topic for quick self-check  
**Purpose:** Informal progress check with immediate feedback  
**Tone:** Encouraging, low-stakes  
**Features:**
- Multiple choice or T/F
- "Check Answer" button reveals correct answer with explanation
- Shows answer + why explanation
- No scoring, just validation
- Can be revisited

**Structure:**
```tsx
<CheckpointQuiz
  question="What happens to demand when income rises?"
  options={[
    "Shifts Left",
    "Shifts Right", // correct
    "Movement along curve",
    "Becomes elastic"
  ]}
  correctAnswer={1}
  explanation="Higher income increases purchasing power for normal goods"
/>
```

---

### `KnowledgeChallenge` (End-of-Chapter Exam)
**Context:** Last page of chapter only - 5-question cumulative exam  
**Purpose:** Comprehensive chapter validation + scoring  
**Tone:** Formal, graded  
**Features:**
- 5 questions minimum
- Multi-choice, T/F, or mixed
- Submit all at end
- Get score out of 10
- See which you got right/wrong
- Explains each answer

**Flow:**
```
Chapter Content → ... → Last Page
                           ↓
                    "Take Knowledge Exam" CTA
                           ↓
                    [Question 1 Card]
                    [Question 2 Card]
                    [Question 3 Card]
                    [Question 4 Card]
                    [Question 5 Card]
                           ↓
                    [Submit Exam Button]
                           ↓
                    Score: 8/10 (80%)
                    Review: See what you missed
```

**API:**
```tsx
<KnowledgeExam 
  chapterId="chapter-3"
  questions={[...]}
  onSubmit={(results) => { /* track progress */ }}
/>
```

---

### `GuidedExercise` (Step-by-Step Solution)
**Context:** Any topic, shows HOW to solve (not a quiz)  
**Purpose:** Teach problem-solving methodology and internal logic  
**Tone:** Educational, scaffolded  
**Features:**
- NO grading, NO right/wrong answers
- Step 1 → Step 2 → Step 3 (expandable)
- Shows thinking process
- "Why this step?" explanation for each
- Visual diagrams where helpful
- Final answer shown at end

**Structure:**
```
┌─────────────────────────────────┐
│ 🧠 Guided Exercise              │
│ Calculating Weighted GPA        │
├─────────────────────────────────┤
│ ┌──────────────────────────┐    │
│ │ 📍 Step 1: List data    │ ▼  │
│ │ 3 A's (4 credits each)  │    │
│ │ 2 B's (3 credits each)  │    │
│ │                          │    │
│ │ 🤔 Why: We need all info│    │
│ └──────────────────────────┘    │
│                                  │
│ ┌──────────────────────────┐    │
│ │ 📍 Step 2: Calculate sum │ ▼  │
│ │ (3×4×4) + (2×3×3) = 66  │    │
│ │                          │    │
│ │ 🤔 Why: Multiply grade  │    │
│ │    by credits            │    │
│ └──────────────────────────┘    │
│                                  │
│ ┌──────────────────────────┐    │
│ │ ✅ Final Answer: 3.63    │    │
│ └──────────────────────────┘    │
└─────────────────────────────────┘
```

---

## **5. NARRATIVE HOOKS & TONE BREAKS**

### `Hook` (Chapter Opener)
**Context:** Very start of chapter  
**Purpose:** Grab attention, create curiosity  
**Tone:** Engaging, mysterious, relatable  
**Design:**
- Gradient background (violet to indigo)
- Light bulb icon
- Large engaging question or statement
- Follow-up intrigue sentence

**Visual:**
```
┌────────────────────────────────┐
│ 💡 Ever wonder why gas prices  │
│    jump before a hurricane?    │
│                                │
│ Let's dive into Supply &       │
│ Demand.                        │
└────────────────────────────────┘
```

---

### `StreetSmart` (Casual Explanation - COMEBACK!)
**Context:** Mid-chapter when topic needs simple explanation  
**Purpose:** Explain complex ideas in down-to-earth, bro language  
**Tone:** Casual, slang-heavy, as-if-in-a-pub or talking-to-a-friend  
**Design:**
- Orange/warm casual color
- Coffee cup icon (or casual emoji)
- Conversational title
- Bro language, analogies, relatable examples
- No formality, just clarity

**Visual:**
```
┌────────────────────────────────┐
│ ☕ Let's Break it Down         │
│                                │
│ Okay so listen, opportunity   │
│ cost is basically like...      │
│ you pick pizza for lunch,      │
│ you're giving up the burger,   │
│ right? That burger you could  │
│ have had = opportunity cost.   │
│                                │
│ Not rocket science, just life. │
└────────────────────────────────┘
```

**API:**
```tsx
<StreetSmart title="Let's Break it Down">
  Explain complex topic in casual, bro language with analogies
</StreetSmart>
```

---

### `Explanation` (Core Concept Breakdown)
**Context:** Standard educational explanation  
**Purpose:** Teach core concept clearly  
**Tone:** Professional, clear, structured  
**Design:**
- Left blue accent bar
- Key takeaway highlighted
- Structured paragraphs
- No emoji, professional tone

---

### `DeepDive` (Advanced Expandable)
**Context:** Optional advanced reading  
**Purpose:** Extended analysis for interested students  
**Tone:** Academic, in-depth  
**Design:**
- Expandable sections
- Advanced complexity badge
- Red/orange accent to show "advanced"
- Initially collapsed

---

## **6. SUMMARY COMPONENTS**

### `NarrativeSummary` (Chapter Wrap-up)
**Context:** End of chapter (KEEP THIS)  
**Purpose:** Story-style recap of chapter learnings  
**Tone:** Reflective, narrative  
**Design:**
- Bot character speaks (friendly AI coach voice)
- Key takeaways as callout boxes (visual grid)
- "Bird's Eye View" 🦅 style recap

**Visual:**
```
🤖 "Today we toured organizational behavior..."

Key Learnings:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 💡 Systems   │  │ ⚠️ Attribution│  │ 🔄 Feedback  │
│ Focus on ... │  │ Error: Look ..│  │ Loops Matter │
└──────────────┘  └──────────────┘  └──────────────┘
```

### `TopicSummary` (DELETE - Old/Redundant)
**Status:** REMOVED ❌

---

## **7. CONSISTENCY FRAMEWORK**

### Design Tokens
```
Spacing:     4px, 8px, 12px, 16px, 24px, 32px
Border:      1px solid, 2px solid, 4px left accent
Radius:      8px (standard), 12px (cards), 16px (large)
Shadows:     sm (1px 2px 4px), md (0 4px 12px), lg (0 8px 24px)
Icons:       24px size, centered, colored to variant
Typography:  Serif for academic, sans-serif for casual
```

### Color Mapping (From Brand Color System)
```
Academic Definition  → Sapphire Blue (#1e40af) - formal, elegant, authority
Definition          → Teal (#06b6d4) - accessible, learning-focused
Tip (Alert)         → Fresh Emerald (#059669) - positive, helpful, growth
Warning (Alert)     → Golden Amber (#d97706) - attention, warm caution
Prerequisite (Alert)→ Cool Slate (#6b7280) - neutral, informational
RealWorldExample    → Sapphire Blue (#1e40af) - professional application
Hook                → Vibrant Indigo gradient (#5b21b6 → #4f46e5 → #3b82f6)
StreetSmart         → Warm Orange (#f97316) - casual, friendly, approachable
Explanation         → Sapphire Blue (#1e40af) accent bar - structured
DeepDive            → Rose Red (#dc2626) - advanced, careful
CheckpointQuiz      → Slate Blue (#475569) - neutral, focus
KnowledgeExam       → Slate Blue (#475569) - neutral, professional
GuidedExercise      → Slate Blue (#475569) - focus, methodology
```

### Icon System
```
Academic Definition → 📚 Quote icon (#1e40af, 30% opacity)
Definition         → 📖 Book (#06b6d4)
Tip                → ✨ Sparkles (#059669)
Warning            → ⚠️ Triangle Alert (#d97706)
Prerequisite       → 🔄 Rotate CCW (#6b7280)
RealWorldExample   → 🌍 Globe (#1e40af)
Hook               → 💡 Lightbulb (white on gradient)
StreetSmart        → ☕ Coffee Cup (#f97316)
Explanation        → (no icon, just left bar)
DeepDive           → 📦 Box (#dc2626)
CheckpointQuiz     → ❓ Question (#475569)
KnowledgeExam      → 🏆 Trophy (#475569)
GuidedExercise     → 🧠 Brain (#475569)
```

---

## **8. IMPLEMENTATION ROADMAP**

### Phase 1: Definition & Alert Unification
- [ ] Create `<AcademicDefinition />` (enhanced styling)
- [ ] Simplify `<Definition />` 
- [ ] Create unified `<Alert variant="tip|warning|prerequisite" />`
- [ ] Remove old `ExamTip`, `Callout`, `CommonMistake`

### Phase 2: Exercise System
- [ ] Improve `<CheckpointQuiz />` with better UX
- [ ] Create `<KnowledgeExam />` for end-of-chapter
- [ ] Enhance `<GuidedExercise />` step system
- [ ] Update chapter data to use new components

### Phase 3: Narrative Components
- [ ] Redesign `<Hook />` (more engaging)
- [ ] Resurrect `<StreetSmart />` (casual explanation)
- [ ] Enhance `<NarrativeSummary />` 
- [ ] Delete `<TopicSummary />`

### Phase 4: Polish & Testing
- [ ] Ensure visual consistency across all variants
- [ ] Test on all devices (mobile-first)
- [ ] Update component library docs
- [ ] Update chapter data JSON

---

## **9. COMPONENT COUNT**

### Before
```
DEFINITIONS:        3 (Definition, DefinitionCard, AcademicDefinition)
ALERTS:             5 (Callout tip/warning/note/important, ExamTip, Prerequisite, CommonMistake)
EXAMPLES:           2 (Example, RealWorldExample)
EXERCISES:          4 (CheckpointQuiz, KnowledgeChallenge, GuidedExercise, Checkpoint)
SUMMARIES:          2 (NarrativeSummary, TopicSummary)
NARRATIVE:          2 (Hook, ToneBreak)
SPECIAL:            ~10 (FormulaCard, Analogy, DidYouKnow, MaslowPyramid, etc.)
────────────────────────────
TOTAL:              ~30 components
```

### After
```
DEFINITIONS:        2 (AcademicDefinition, Definition)
ALERTS:             1 (Alert with 3 variants: tip, warning, prerequisite)
EXAMPLES:           1 (RealWorldExample)
EXERCISES:          3 (CheckpointQuiz, KnowledgeExam, GuidedExercise)
SUMMARIES:          1 (NarrativeSummary)
NARRATIVE:          3 (Hook, StreetSmart, Explanation, DeepDive)
SPECIAL:            ~10 (FormulaCard, Analogy, DidYouKnow, MaslowPyramid, etc.)
────────────────────────────
TOTAL:              ~22 components (-26% clutter)
```

---

## **10. JSON DATA MIGRATION GUIDE**

### Before
```json
{
  "blocks": [
    { "type": "definition", "term": "...", "content": "..." },
    { "type": "academic-definition", "content": "..." },
    { "type": "callout", "variant": "tip", "content": "..." },
    { "type": "callout", "variant": "warning", "content": "..." },
    { "type": "exam-tip", "importance": "high", "content": "..." }
  ]
}
```

### After
```json
{
  "blocks": [
    { "type": "definition", "variant": "academic", "term": "...", "content": "..." },
    { "type": "definition", "variant": "simple", "term": "...", "content": "..." },
    { "type": "alert", "variant": "tip", "content": "..." },
    { "type": "alert", "variant": "warning", "content": "..." },
    { "type": "street-smart", "title": "...", "content": "..." }
  ]
}
```

---

## **NEXT STEPS**

1. **Validate this design** - Does it align with your vision?
2. **Create component specs** - Detailed props, styling, behavior
3. **Design mockups** - Visual refinement in Figma/browser
4. **Implement core** - Start with Definition + Alert unification
5. **Migrate data** - Update all chapter JSONs
6. **Test thoroughly** - Ensure all chapters render correctly

---

**Questions to clarify:**
- Should `StreetSmart` be a full block or inline explanation?
- For `KnowledgeExam`, should questions be on separate cards or scrollable page?
- Should we add difficulty badges to exercises?
- Color for `StreetSmart` - orange good, or something else?

