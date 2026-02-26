# 📐 Component API Specifications

---

## **DEFINITION BLOCKS**

### `AcademicDefinition`
**File:** `src/components/core/blocks/AcademicDefinition.tsx`

```tsx
interface AcademicDefinitionProps {
  // Core content
  term: string;                    // e.g., "Opportunity Cost"
  definition: string;              // Formal 2-3 sentence definition
  
  // Metadata
  source?: string;                 // e.g., "Game Theory 101"
  subject?: string;                // e.g., "Economics"
  
  // Optional
  citation?: {
    author?: string;
    year?: number;
  };
}

/**
 * @example
 * <AcademicDefinition
 *   term="Opportunity Cost"
 *   definition="The loss of potential gain from other alternatives when one alternative is chosen. In economic theory, it represents the benefit that could have been received but was foregone by making a different choice."
 *   source="Microeconomics 101"
 *   subject="Economics"
 * />
 */
```

**Styling Notes:**
- Dark blue left border (4px, #1e3a8a)
- Quote icon in top-right corner (subtle, 30% opacity)
- Serif font for term (Georgia or similar)
- Generous padding (32px)
- Subtle gradient background: from primary/5 to transparent
- Border: 1px solid primary/20
- Box shadow: md (0 4px 12px rgba(0,0,0,0.1))
- Rounded corners: 12px

---

### `Definition`
**File:** `src/components/core/blocks/Definition.tsx`

```tsx
interface DefinitionProps {
  term: string;                    // Short term name
  definition: string;              // 1-2 sentence simple definition
  className?: string;
}

/**
 * @example
 * <Definition
 *   term="Supply Curve"
 *   definition="A line showing the relationship between price and quantity that producers are willing to supply."
 * />
 */
```

**Styling Notes:**
- Teal border (left 2px, #06b6d4)
- Book icon (📖) in header
- Compact padding (16px)
- White background with 1px border (border-slate-200)
- Rounded: 8px
- Shadow: sm (0 1px 2px rgba(0,0,0,0.05))
- Font: sans-serif, smaller than academic version

---

## **ALERT SYSTEM (Unified)**

### `Alert`
**File:** `src/components/core/blocks/Alert.tsx`

```tsx
type AlertVariant = 'tip' | 'warning' | 'prerequisite';

interface AlertProps {
  variant: AlertVariant;           // Type of alert
  children: React.ReactNode;       // Alert content (required)
  title?: string;                  // Optional title override
  className?: string;
  icon?: React.ReactNode;          // Custom icon override
}

/**
 * @example - TIP VARIANT
 * <Alert variant="tip">
 *   High Importance Exam Tip: This concept appears in 80% of exams,
 *   so make sure you understand it deeply.
 * </Alert>
 *
 * @example - WARNING VARIANT
 * <Alert variant="warning">
 *   Many students confuse Revenue with Profit. Remember: Profit is
 *   Revenue MINUS Expenses.
 * </Alert>
 *
 * @example - PREREQUISITE VARIANT
 * <Alert variant="prerequisite" title="Supply Curves">
 *   You'll need to understand upward-sloping supply curves.
 *   Why: To calculate market equilibrium price.
 * </Alert>
 */
```

**Styling Rules by Variant:**

#### `tip` (✨ Sparkles)
- Border: 2px solid #14b8a6 (teal)
- Background: #f0fdfa (very light teal)
- Icon: ✨ (teal)
- Title color: #0d9488
- Text: Approachable, helpful tone
- Padding: 16px, Radius: 8px
- Shadow: sm

#### `warning` (⚠️ Triangle Alert)
- Border: 2px solid #fbbf24 (amber)
- Background: #fffbeb (light amber)
- Icon: ⚠️ (amber)
- Title color: #d97706
- Text: Assertive, watch-out tone
- Padding: 16px, Radius: 8px
- Shadow: sm

#### `prerequisite` (🔄 Rotate CCW)
- Border: 2px solid #9ca3af (gray)
- Background: #f9fafb (light gray)
- Icon: 🔄 (gray)
- Title color: #6b7280
- Text: Informational, requirement tone
- Padding: 16px, Radius: 8px
- Shadow: sm

---

## **REAL-WORLD EXAMPLES**

### `RealWorldExample`
**File:** `src/components/core/blocks/RealWorldExample.tsx`

```tsx
interface RealWorldExampleProps {
  title: string;                   // e.g., "Prisoner's Dilemma"
  narrative: string;               // Main story/scenario
  theoreticalLink: string;         // Connection back to theory
  theoreticalLinkTitle?: string;   // Optional label for the link
  icon?: 'globe' | 'case-study' | 'scenario';
}

/**
 * @example
 * <RealWorldExample
 *   title="Prisoner's Dilemma"
 *   narrative="Two suspects are arrested by police. The police have insufficient 
 *             evidence for conviction but interrogate them separately. Each suspect 
 *             faces the choice: confess or stay silent. If one confesses and the other 
 *             doesn't, the confessor gets a lighter sentence and the other gets 
 *             maximum penalty..."
 *   theoreticalLink="Shows the limits of non-cooperation. Even though both would 
 *                   benefit from staying silent, individual incentives lead both 
 *                   to confess, resulting in worse outcomes for both."
 *   theoreticalLinkTitle="How this relates:"
 * />
 */
```

**Styling Notes:**
- Left border: 4px solid primary (#3b82f6)
- Globe icon (🌍) in header
- Title: bold, large (18px)
- Narrative: regular paragraph flow
- Callout box at bottom for theory link:
  - Background: primary/5
  - Border-left: 4px primary/30
  - Padding: 12px
  - Smaller italic text
- Overall padding: 24px
- Radius: 12px
- Shadow: md

---

## **EXERCISE COMPONENTS**

### `CheckpointQuiz`
**File:** `src/components/core/blocks/CheckpointQuiz.tsx`

```tsx
interface CheckpointQuizProps {
  id?: string;                     // Unique ID for tracking
  question: string;                // The question text
  options: string[];               // Array of answer options
  correctAnswer: number;           // Index of correct option (0-based)
  explanation: string;             // Why this answer is correct
  questionNumber?: number;         // Display as Q1, Q2, etc.
  onAnswer?: (isCorrect: boolean) => void;
}

/**
 * @example
 * <CheckpointQuiz
 *   question="What happens to the demand curve when consumer income rises for a normal good?"
 *   options={[
 *     "Shifts Left",
 *     "Shifts Right",        // Correct
 *     "Movement along curve",
 *     "Becomes perfectly elastic"
 *   ]}
 *   correctAnswer={1}
 *   explanation="When income rises, consumers can afford more at every price level,
 *                so the entire demand curve shifts to the right (increased demand)."
 *   questionNumber={1}
 * />
 */
```

**Behavior:**
- Initial state: Show question + 4 options as radio buttons
- User selects option, button says "Check Answer"
- On submit: Show if correct/incorrect with visual feedback
  - Correct: Green checkmark + explanation box
  - Incorrect: Red X + "Try again" + hint OR explanation
- Allow retry (optional, configurable)
- No scoring, just validation

**Styling Notes:**
- Card with teal border (question card)
- Options: Radio buttons with hover state
- Button: Primary teal when ready
- Feedback: Green (correct) or Amber (incorrect) background box
- Explanation: Smaller text in callout

---

### `KnowledgeExam`
**File:** `src/components/core/blocks/KnowledgeExam.tsx`

```tsx
interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface KnowledgeExamProps {
  chapterId: string;               // For tracking/analytics
  questions: QuestionData[];       // Exactly 5 questions
  onSubmit?: (results: ExamResults) => void;
  showRetake?: boolean;            // Allow second attempt
}

interface ExamResults {
  score: number;                   // 0-10
  percentage: number;              // 0-100
  correct: number;                 // Number correct
  answers: number[];               // User's answers
}

/**
 * @example
 * <KnowledgeExam
 *   chapterId="microeconomics-ch3"
 *   questions={[
 *     { id: "q1", question: "...", options: [...], correctAnswer: 1, explanation: "..." },
 *     // ... 4 more questions
 *   ]}
 *   onSubmit={(results) => {
 *     console.log(`You scored ${results.score}/10`);
 *   }}
 * />
 */
```

**Behavior:**
- Show all 5 questions on one page (scrollable) OR modal cards
- Each question shows as independent card
- User answers all 5
- "Submit Exam" button at bottom/end
- After submit: Show score (X/10, Y%)
- Show which questions correct/incorrect
- Optional: Show explanations for ones they missed
- Optional: "Retake Exam" button to try again

**Styling Notes:**
- Sticky header showing progress: "Question 1/5"
- Each question card: teal border, subtle shadow
- Submit button: prominent, primary color
- Results screen: 
  - Large score display (40px font)
  - Breakdown by question (color-coded: green/red)
  - "Review" option to see explanations

---

### `GuidedExercise`
**File:** `src/components/core/blocks/GuidedExercise.tsx`

```tsx
interface ExerciseStep {
  step: number;
  title: string;                   // e.g., "List your data"
  content: string;                 // What to do
  reasoning: string;               // Why do this step
  diagram?: string;                // Optional SVG or image
}

interface GuidedExerciseProps {
  title: string;                   // e.g., "Calculating Weighted GPA"
  difficulty: 'easy' | 'medium' | 'hard';
  steps: ExerciseStep[];           // 3-5 steps
  finalAnswer: string;             // The final result
  finalAnswerExplanation?: string; // Why this is the answer
}

/**
 * @example
 * <GuidedExercise
 *   title="Calculating Weighted GPA"
 *   difficulty="medium"
 *   steps={[
 *     {
 *       step: 1,
 *       title: "List your data",
 *       content: "3 A's (4 credits each) + 2 B's (3 credits each)",
 *       reasoning: "We need all the information before we can calculate."
 *     },
 *     {
 *       step: 2,
 *       title: "Calculate sum",
 *       content: "(3×4×4) + (2×3×3) = 60 + 18 = 78",
 *       reasoning: "Each grade is multiplied by its credit hours, then summed."
 *     },
 *     {
 *       step: 3,
 *       title: "Calculate total credits",
 *       content: "(4×3) + (3×2) = 12 + 6 = 18 total credits",
 *       reasoning: "Sum all credit hours to get the denominator."
 *     },
 *     {
 *       step: 4,
 *       title: "Divide",
 *       content: "78 ÷ 18 = 4.33",
 *       reasoning: "Weighted GPA = Total points ÷ Total credits"
 *     }
 *   ]}
 *   finalAnswer="3.63 GPA"
 *   finalAnswerExplanation="This represents the average grade weighted by credit hours."
 * />
 */
```

**Behavior:**
- Steps display in vertical accordion style
- Each step can be expanded/collapsed
- Step shows: Title, Content, "Why?" reasoning section
- Diagram optional for visual steps
- All steps start collapsed EXCEPT first
- Final answer shown as separate box at bottom
- NO grading, NO right/wrong
- Read-only, fully educational

**Styling Notes:**
- Brain icon (🧠) in header
- Each step: Card with left colored border
- Step number: Circle with number inside
- Difficulty badge: Easy (green), Medium (yellow), Hard (red)
- "Why?" section: Italicized, gray background
- Final answer box: Large text, primary color, celebratory
- Radius: 12px throughout
- Shadows: sm for steps, md for final answer

---

## **NARRATIVE COMPONENTS**

### `Hook`
**File:** `src/components/core/blocks/Hook.tsx`

```tsx
interface HookProps {
  question?: string;               // Main engaging question
  statement?: string;              // Or opening statement
  followUp: string;                // Intrigue sentence
  icon?: 'lightbulb' | 'question' | 'star';
}

/**
 * @example
 * <Hook
 *   question="Ever wonder why gas prices jump before a hurricane?"
 *   followUp="Let's dive into Supply and Demand."
 *   icon="lightbulb"
 * />
 */
```

**Styling Notes:**
- Gradient background: linear-gradient(135deg, #7c3aed, #4f46e5) (Violet → Indigo)
- Light bulb icon (💡) - large, 40px
- Question: Large bold text (24px)
- Follow-up: Slightly smaller, secondary text color
- Padding: 32px
- Radius: 16px
- Text color: White
- Shadow: lg (0 8px 24px rgba(124, 58, 237, 0.3))

---

### `StreetSmart` (COMEBACK!)
**File:** `src/components/core/blocks/StreetSmart.tsx`

```tsx
interface StreetSmartProps {
  title: string;                   // e.g., "Let's Break it Down"
  children: React.ReactNode;       // Casual explanation content
  emoji?: string;                  // Optional emoji (default: ☕)
}

/**
 * @example
 * <StreetSmart title="Let's Break it Down">
 *   Okay so listen, opportunity cost is basically like... you pick pizza 
 *   for lunch, right? You're giving up the burger you could have had. 
 *   That burger = opportunity cost. It's not rocket science, just life stuff.
 * </StreetSmart>
 */
```

**Behavior:**
- Conversational, bro-language tone
- Use slang, analogies, real-life examples
- As if explaining in a pub or casually to a friend
- Avoid technical jargon or explain it casually
- Can include examples like "dude", "bro", "like", "basically"

**Styling Notes:**
- Orange left border: 4px solid #f97316
- Coffee cup icon (☕) in header
- Background: #fff7ed (very light orange)
- Title: Bold, orange color (#ea580c)
- Content: Regular sans-serif, conversational
- Padding: 20px
- Radius: 12px
- Shadow: sm
- Border: 1px solid #fed7aa

---

### `Explanation`
**File:** `src/components/core/blocks/Explanation.tsx`

```tsx
interface ExplanationProps {
  children: React.ReactNode;       // Main explanation text
  keyTakeaway?: string;            // Optional highlighted box
  className?: string;
}

/**
 * @example
 * <Explanation keyTakeaway="Key takeaway: Always consider what you're giving up when making decisions.">
 *   An explanation block breaking down a complex topic into digestible pieces...
 * </Explanation>
 */
```

**Styling Notes:**
- Left blue accent bar (4px, #3b82f6)
- No icon
- Optional key-takeaway highlight box:
  - Background: primary/5
  - Border-left: 4px primary
  - Padding: 12px
  - Italic
- Regular padding: 20px
- Radius: 8px
- Professional, clean look

---

### `DeepDive`
**File:** `src/components/core/blocks/DeepDive.tsx`

```tsx
interface DeepDiveSection {
  title: string;
  content: string;
  expanded?: boolean;              // Default: false
}

interface DeepDiveProps {
  title: string;                   // e.g., "The Microeconomics of Search Costs"
  sections: DeepDiveSection[];     // Expandable sections
  difficulty?: 'advanced' | 'graduate';
}

/**
 * @example
 * <DeepDive
 *   title="The Microeconomics of Search Costs"
 *   difficulty="advanced"
 *   sections={[
 *     { title: "Section 1", content: "Advanced analysis..." },
 *     { title: "Section 2", content: "More depth..." }
 *   ]}
 * />
 */
```

**Behavior:**
- Show title + sections as accordions
- Sections start collapsed (except optional first one)
- Click to expand, smooth animation
- Content is read-only, just informational
- Advanced badge shown

**Styling Notes:**
- Left border: 4px red (#dc2626)
- "Advanced" badge: red background
- Section headers: Bold, 16px
- Content: Regular, smaller font (14px)
- Padding: 20px
- Radius: 12px
- Shadow: sm
- Background: Light gray (f3f4f6)

---

## **SUMMARY COMPONENTS**

### `NarrativeSummary`
**File:** `src/components/core/blocks/NarrativeSummary.tsx`

```tsx
interface KeyLearning {
  icon: string;                    // Emoji
  title: string;
  description: string;
}

interface NarrativeSummaryProps {
  introduction: string;            // Opening paragraph from "bot" (AI coach)
  keyLearnings: KeyLearning[];    // 3-5 key takeaways
  closingReflection?: string;      // Optional reflection
  characterName?: string;          // Default: "Heimerdinger"
}

/**
 * @example
 * <NarrativeSummary
 *   introduction="Today we toured the fundamentals of organizational behavior, 
 *                moving from individual biases up to group dynamics."
 *   keyLearnings={[
 *     { icon: "💡", title: "Focus on Systems", description: "Individual behavior is 
 *       often a product of the environments we design." },
 *     { icon: "⚠️", title: "The Fundamental Attribution Error", description: "Remember 
 *       to look for situational factors before blaming personality." }
 *   ]}
 *   characterName="Heimerdinger"
 * />
 */
```

**Styling Notes:**
- Bot character appears (small avatar, top-left)
- Speech bubble with intro
- Key learnings shown as colored cards in grid (3 or 4 columns)
- Each card: Icon (large), title (bold), description
- Cards have light tinted background matching icon color
- Optional closing reflection below
- Overall: Friendly, encouraging, celebratory tone

---

## **NOTES**

1. **Consistency across all variants:**
   - All use consistent padding scale
   - All use consistent shadow system
   - All icons are 20-24px size
   - All use rounded corners (8px minimum)

2. **Accessibility:**
   - All components must have proper ARIA labels
   - Color not only distinguishing feature (use icons/text)
   - Sufficient contrast ratios (WCAG AA minimum)
   - Keyboard navigation support

3. **Mobile responsiveness:**
   - Stack elements vertically below 640px
   - Reduce padding on small screens
   - Increase touch targets (minimum 44px)
   - Readable font sizes on mobile

4. **Animation:**
   - Accordion open/close: 300ms ease-in-out
   - Fade-in on page load: 200ms
   - Hover states: 150ms transition
   - Keep animations accessible (respect prefers-reduced-motion)

---

