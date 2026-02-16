# Sikumnik Component Foundation v2 — Teaching-First Architecture

> **Philosophy:** The chapter IS the lesson. Components are pedagogical tools woven into a teaching narrative, not standalone data displays.

---

## Core Concept: The Topic-Tab Model

A chapter teaches **multiple topics**. Each topic gets its own **tab** — not section types like "definitions" or "exercises", but actual subject-matter tabs.

```
Chapter: "Opportunity Cost" (3 topics)
├── Tab 1: "What is Opportunity Cost?"      ← teaches the concept
├── Tab 2: "Comparative vs Absolute"        ← dives deeper
├── Tab 3: "Practice & Summary"             ← consolidation
```

Each topic-tab is a **self-contained lesson** that teaches ONE concept from start to finish. Within it, pedagogical components appear inline as the teaching demands them.

---

## 1. The Data Schema

```typescript
interface ChapterData {
  // ── Identity ──
  id: string;
  title: string;
  chapterNumber: number;
  totalChapters: number;
  course: string;
  navigation?: {
    previous?: { id: string; title: string };
    next?: { id: string; title: string };
  };

  // ── Chapter-Level ──
  pageMap?: {
    learningObjectives: string[];
    prerequisites?: { chapterId: string; title: string }[];
    estimatedTime: string;
  };
  
  introduction?: {
    content: string;
    whyItMatters?: string;
    hook?: string;              // attention-grabbing opener
  };

  // ── THE CORE: Topics ──
  topics: Topic[];

  // ── Chapter-Level Wrap-Up ──
  checkpoint?: QuizQuestion[];          // end-of-chapter quiz
  independentExercises?: Exercise[];    // challenge problems
  quickReference?: {
    formulas: { name: string; formula: string }[];
    definitions: { term: string; definition: string }[];
  };
  trivia?: { fact: string; source?: string }[];
  bridge?: {
    nextChapterTitle: string;
    content: string;
    nextChapter: string;
  };
}
```

### The Topic — The Main Teaching Unit

```typescript
interface Topic {
  id: string;
  title: string;                        // tab label
  
  // ── Teaching Flow (ordered sequence) ──
  blocks: ContentBlock[];
}
```

### Content Blocks — The Building Blocks of a Lesson

A topic is a **sequence of content blocks**, rendered in order. Each block has a `type` that determines which component renders it. This is what lets different topics have different structures.

```typescript
type ContentBlock =
  | { type: "explanation";    content: string; highlight?: string }
  | { type: "analogy";        content: string; icon?: string }
  | { type: "definition";     term: string; content: string; tooltips?: Record<string, string> }
  | { type: "formula";        title: string; formula: string; variables?: Variable[] }
  | { type: "example";        title: string; scenario: string; solution: string; calculation?: string }
  | { type: "deep-dive";      title: string; sections: { title: string; content: string }[] }
  | { type: "tone-break";     opener: string; content: string }
  | { type: "common-mistake"; mistake: string; correct: string; why: string }
  | { type: "guided-exercise"; difficulty: number; question: string; thinkingDirection: string;
      steps: Step[]; finalAnswer: string }
  | { type: "interactive";    componentId: string; config?: Record<string, any> }
  | { type: "callout";        variant: "tip" | "warning" | "note"; content: string }
  | { type: "image";          src: string; alt: string; caption?: string }
  | { type: "checkpoint";     questions: QuizQuestion[] }
  | { type: "summary";        content: string; keyPoints?: string[] };

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Step {
  title: string;
  action: string;
  reasoning: string;
  calculation: string;
  result: string;
}

interface Exercise {
  difficulty: number;
  question: string;
  hint: string;
  answer: string;
  options?: string[];
  isExamStyle?: boolean;
}

interface Variable {
  symbol: string;
  name: string;
  desc: string;
}
```

---

## 2. Real Example: "The Demand Function" Chapter

This chapter covers a massive topic. It splits into 3 topic-tabs, each with **multiple content blocks** that layer explanations progressively.

```
Chapter: "The Demand Function"
├── Tab 1: "Demand & Price"            ← how price affects quantity demanded
├── Tab 2: "Demand & Income"           ← how income shifts the curve
├── Tab 3: "Cross-Price Elasticity"    ← how OTHER products' prices matter
└── Wrap-up: "Summary & Practice"      ← chapter-level consolidation
```

### Tab 1: "Demand & Price" (multiple blocks building on each other)

```
blocks: [
  ── BLOCK 1: Lay the foundation ──
  { type: "explanation",  "What is demand? Not just 'wanting something'..." }
  { type: "definition",   term: "Quantity Demanded" }
  { type: "analogy",      "Think of yourself at the supermarket..." }

  ── BLOCK 2: Go deeper — the Law of Demand ──
  { type: "explanation",  "Now that you understand demand, let's see the LAW..." }
  { type: "definition",   term: "Law of Demand" }
  { type: "formula",      "Qd = a - bP" }
  { type: "example",      scenario: "When shawarma costs ₪30 vs ₪45..." }

  ── BLOCK 3: Nail it down — movement along the curve ──
  { type: "explanation",  "So what happens visually when price changes?" }
  { type: "interactive",  componentId: "DemandCurve" }      ← drag the price, see Qd change
  { type: "common-mistake", "Confusing movement ALONG the curve with SHIFT of the curve" }
  { type: "checkpoint",   [2 quick questions to verify understanding] }
]
```

### Tab 2: "Demand & Income" (builds on Tab 1)

```
blocks: [
  ── BLOCK 1: Introduce the concept ──
  { type: "explanation",  "We said demand depends on price. But what if your salary doubles?" }
  { type: "definition",   term: "Normal Good" }
  { type: "definition",   term: "Inferior Good" }
  { type: "analogy",      "Instant noodles vs. sushi — what do you buy when you're broke vs. rich?" }

  ── BLOCK 2: The math — income elasticity ──
  { type: "explanation",  "Let's measure HOW MUCH income affects demand..." }
  { type: "formula",      "Ey = %ΔQd / %ΔY" }
  { type: "example",      scenario: "Your income rises 20%, you buy 30% more coffee..." }
  { type: "callout",      variant: "tip", "Ey > 0 = normal good, Ey < 0 = inferior good" }

  ── BLOCK 3: Practice it ──
  { type: "guided-exercise", question: "Given income rose from ₪8000 to ₪10000 and Qd changed from..." }
  { type: "common-mistake", "Forgetting that luxury goods have Ey > 1" }
]
```

### Tab 3: "Cross-Price Elasticity" (builds on Tabs 1 & 2)

```
blocks: [
  ── BLOCK 1: Why other products matter ──
  { type: "explanation",  "So far: price and income. But Coca-Cola's price affects Pepsi's demand..." }
  { type: "definition",   term: "Substitute Goods" }
  { type: "definition",   term: "Complementary Goods" }
  { type: "example",      scenario: "Butter goes up → margarine demand rises..." }

  ── BLOCK 2: Cross-price elasticity formula ──
  { type: "explanation",  "Let's put a number on this relationship..." }
  { type: "formula",      "Exy = %ΔQx / %ΔPy" }
  { type: "callout",      variant: "warning", "Pay attention to the SIGN: positive = substitutes, negative = complements" }

  ── BLOCK 3: Everything together ──
  { type: "deep-dive",    title: "The Full Demand Equation", sections: [...] }
  { type: "guided-exercise", question: "Given Exy = 1.5 between tea and coffee..." }
  { type: "checkpoint",   [3 questions covering all three elasticity types] }
  { type: "summary",      keyPoints: ["Price → movement along curve", "Income → shift of curve", "Cross-price → relationship between goods"] }
]
```

### Key Pattern

Each topic has **multiple waves of explanation** — teach a piece, support it with components (definition, formula, example), then teach the next piece that builds on it. No single block carries the whole topic. The teaching breathes.

---

## 3. Component Map

### Block Renderers (14 types → 14 components)

| Block Type | Component | Purpose |
|:---|:---|:---|
| `explanation` | `Explanation` | Rich text teaching content — the backbone |
| `analogy` | `Analogy` | Relatable comparisons with personality |
| `definition` | `DefinitionBlock` | Formal term + definition, inline |
| `formula` | `FormulaCard` | LaTeX formula with variable legend |
| `example` | `WorkedExample` | Scenario → solution walkthrough |
| `deep-dive` | `DeepDive` | Expandable in-depth exploration |
| `tone-break` | `ToneBreak` | Casual "street level" interlude |
| `common-mistake` | `MistakeCard` | What students get wrong + correction |
| `guided-exercise` | `GuidedExercise` | Step-by-step solved problem |
| `interactive` | *Dynamic import* | PPFGraph, ClassificationGame, etc. |
| `callout` | `Callout` | Tip / Warning / Note box |
| `image` | `ChapterImage` | Captioned image |
| `checkpoint` | `CheckpointQuiz` | In-topic mini-quiz |
| `summary` | `TopicSummary` | Key points recap for this topic |

### Structural Components (5 total)

| Component | Purpose |
|:---|:---|
| `ChapterTemplate` | Takes `ChapterData`, renders tabs + blocks |
| `TopicTab` | Renders one tab's content blocks in sequence |
| `BlockRenderer` | Switch statement: `block.type` → component |
| `ChapterHeader` | Title, progress, navigation |
| `ChapterFooter` | Bridge to next chapter, trivia |

**Total: 19 components. Clean. No duplicates.**

---

## 4. The Template

```tsx
// ChapterTemplate.tsx
function ChapterTemplate({ data, interactiveRegistry }: Props) {
  const tabs = [
    // Chapter intro is always the first "tab" or above-fold content
    ...(data.introduction ? [{ id: "intro", label: data.title }] : []),
    // Each topic becomes a tab
    ...data.topics.map(t => ({ id: t.id, label: t.title })),
    // Wrap-up tab if chapter-level exercises/summary exist
    ...(hasWrapUp(data) ? [{ id: "wrap-up", label: "סיכום ותרגול" }] : []),
  ];

  return (
    <ChapterLayout title={data.title} course={data.course} tabs={tabs}>
      {data.introduction && <IntroPanel data={data} />}
      
      {data.topics.map(topic => (
        <TopicTab key={topic.id} id={topic.id}>
          {topic.blocks.map((block, i) => (
            <BlockRenderer 
              key={i} 
              block={block} 
              interactiveRegistry={interactiveRegistry} 
            />
          ))}
        </TopicTab>
      ))}

      {hasWrapUp(data) && <WrapUpTab data={data} />}
    </ChapterLayout>
  );
}
```

### Chapter page:

```tsx
// app/courses/microeconomics/chapter-2/page.tsx
import data from "@/data/chapters/microeconomics/chapter-2.json";
import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import { PPFGraph } from "@/components/core/interactive/PPFGraph";

export default function Page() {
  return (
    <ChapterTemplate
      data={data}
      interactiveRegistry={{ PPFGraph: <PPFGraph /> }}
    />
  );
}
```

---

## 5. What This Changes

| Before | After |
|:---|:---|
| Tabs = section types ("Definitions", "Practice") | Tabs = **topics** ("What is X?", "How Y works") |
| Components are standalone sections | Components are **inline blocks** within teaching flow |
| 31 files in master-page/ | **19 components** total |
| Data schema has `any` types | **Fully typed** discriminated union |
| Each chapter manually wires imports | **One template**, data drives everything |
| Definitions live in their own tab | Definitions appear **where the student needs them** |
| Exercises dumped at the end | Exercises appear **right after the concept they test** |

---

## 6. Interactive Components (Separate Library)

These are NOT content blocks — they're domain-specific widgets registered per-chapter:

| Component | Course | Chapters |
|:---|:---|:---|
| `PPFGraph` | Micro | ch2 |
| `PPCShifter` | Micro | ch4 |
| `CurveElement` | Micro | ch4, ch5 |
| `TradeBalanceVisualizer` | Micro | ch5 |
| `SupplyDemandGraph` | Micro | ch5 |
| *Future* | Accounting | TBD |

These live in `components/core/interactive/` and are passed to `ChapterTemplate` via the `interactiveRegistry` prop.
