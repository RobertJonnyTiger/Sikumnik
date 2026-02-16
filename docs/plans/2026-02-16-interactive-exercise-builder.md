# Design: "The Interactive Exercise Builder" Skill

| Metadata | Details |
| :--- | :--- |
| **Author** | Sikumnik (Agent) |
| **Date** | 2026-02-16 |
| **Status** | DRAFT |
| **Target Output** | `GuidedExerciseBlock`, `CheckpointBlock`, `Exercise[]` |
| **Schema Reference** | `web/src/types/chapter.ts` |

## 1. Problem Statement
We have "The Librarian" (Ingest) and "The Lecturer" (Teach). We are missing **"The Drill Sergeant"** (Practice).
The current content is engaging but passive. Students need to *do* to utilize the "Science of Learning" principles (Active Recall, Spaced Repetition).
We have powerful schema structures (`GuidedExerciseBlock`) that are currently empty or underutilized.

## 2. Proposed Persona: "The Drill Sergeant" (or "The Coach")
*   **Tone:** Encouraging but demanding. "Practice makes permanent."
*   **Philosophy:** Getting it wrong is part of learning. Breaking complex problems into small steps.
*   **Input:** `chapter.json` (Source Content) + `raw-topic.md` (Source Material).
*   **Output:** JSON blocks to be injected into the Chapter.

## 3. Approaches

### Option A: The Quiz Factory (Low Effort)
*   **Focus:** Generate mass quantities of Multiple Choice Questions (Checkpoints).
*   **Output:** `CheckpointBlock` and `independentExercises`.
*   **Pros:** Fast, covers wide breadth.
*   **Cons:** Shallow learning. Doesn't use the `GuidedExercise` potential.

### Option B: The Scaffolder (Recommended) 🏆
*   **Focus:** Deep practice on complex concepts using **Guided Exercises**.
*   **Method:**
    1.  Identify the "Hardest Concept" in a topic (e.g., "Calculating Opportunity Cost").
    2.  Break it down into a `GuidedExerciseBlock`:
        *   **Step 1:** Define the formula/logic.
        *   **Step 2:** Apply to specific numbers.
        *   **Step 3:** Interpret result.
    3.  Generate 3-5 `Checkpoint` questions to verify.
    4.  Generate 5 `Independent Exercises` for homework.
*   **Pros:** High educational value, utilizes strict schema, aligns with "Dual Code Storyteller".
*   **Cons:** Requires careful prompt engineering to ensure logic steps are correct.

### Option C: The Gamifier (High Effort)
*   **Focus:** `InteractiveBlock` configs.
*   **Method:** Generate configs for React components (e.g., "SupplyDemandGraph", "BudgetConstraint").
*   **Pros:** "Wow" factor.
*   **Cons:** Dependencies: We don't have the React components built yet!

## 4. Detailed Design (Option B)

### The Workflow
1.  **User**: "Build exercises for Chapter 1".
2.  **Agent**: Reads `chapter-1/chapter.json` (to see what was taught).
3.  **Agent**: Identifies 1-2 core skills per topic (e.g., "Calculation", "Graph Reading").
4.  **Agent**: Generates:
    *   **1 x Guided Exercise** (Step-by-step).
    *   **3 x Checkpoint Questions**.
    *   **5 x Independent Exercises**.
5.  **Agent**: Injects them into the `chapter.json`.

### Schema Mapping

| Concept | Block Type | Fields |
| :--- | :--- | :--- |
| **"I Do / We Do"** | `GuidedExerciseBlock` | `steps` array (title, action, reasoning) |
| **"Quick Check"** | `CheckpointBlock` | `questions` (MCQ with explanation) |
| **"Homework"** | `independentExercises` | `Exercise` (question, hint, answer) |

### Hebrew Only Rule
As with "The Lecturer", all output textual content (Thinking Process, Questions, Explanations) must be in Hebrew.

## 5. Implementation Plan
1.  **Skill Path:** `.agent/skills/interactive-exercise-builder/`
2.  **Master Instruction:** `interactive-exercise-builder-SKILL.md`
3.  **Prompt Strategy:**
    *   "Act as a Tutor breaking down a math problem."
    *   "For the concept [Concept Name], create a 3-step reasoning chain."
    *   "Ensure JSON format matches `web/src/types/chapter.ts`."

## 6. Questions for User
*   Do you agree with **Option B (The Scaffolder)**?
*   Do you want to overwrite existing exercises or append? (Append is safer).
*   Should this skill *modify* the `chapter.json` file directly, or output a separate snippet file for manual insertion? (Direct modification is faster but risky).
