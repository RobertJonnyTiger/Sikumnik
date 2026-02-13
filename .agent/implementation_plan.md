# Master Page Implementation Plan - System Design

## Goal
Systematically engineer a "Master Page" template that harmonizes `course-structure.md` and `components-catalog.md`. This plan covers the creation of a **brand new** component library (`components/core/master-page/`) and the **deletion** of legacy components.
**CRITICAL UPDATE**: The interface will shift from vertical-scroll to a **Sticky Tabbed Navigation** system with a **Collapsible Sidebar**.

## 🛠️ Resources & Orchestration (The "How")

### 🤖 Agents (The "Who")
| Agent | Role | Responsibility |
| :--- | :--- | :--- |
| **`project-planner`** | **The Architect** | Orchestration, Plan Verification, Backup/Cleanup management. |
| **`frontend-specialist`** | **The Builder** | React State, Tailwind Animations, Tab Logic, Component Architecture. |
| **`academic-content-creator`** | **The Author** | Generating "Golden Content" (Real Hebrew EdTech material) for the prototype. |

### ⚡ Skills (The "Tools")
| Skill | Purpose |
| :--- | :--- |
| **`tailwind-design-system`** | Enforcing "Dark/Teal" design tokens (bg-[#050b18], accent #2dd4bf) and responsive layout. |
| **`react-components`** | Managing `activeTab` state, context providers, and transition animations. |
| **`shadcn-ui`** | Providing accessible `Tabs` and `Collapsible` primitives. |
| **`verification-before-completion`** | Verifying state integrity (progress retention on tab switch) and responsiveness. |

---

## 📅 Step-by-Step Execution Roadmap

### Phase 0: Safety Backup 🛡️
> **Objective**: Preserve legacy state before any destructive actions.

*   **Agent**: `project-planner`
*   **Role**: **The Auditor**

1.  [ ] **Create Backup Directory**: `mkdir -p components/_backup/accounting/`
2.  [ ] **Snapshot Legacy**: Copy all files from `components/accounting/` to `components/_backup/accounting/`.
3.  [ ] **Verify Integrity**: Confirm file counts match.

### Phase 1: Structural Shell & Navigation 🏗️
> **Objective**: Build the Layout, Sticky Tabs, and Collapsible Sidebar.

*   **Agent**: `frontend-specialist`
*   **Role**: **The Builder**
*   **Skills**: `react-components`, `tailwind-design-system`

1.  [ ] **`MasterPageLayout.tsx`**: (Refactor) Implement the Main Layout Grid.
    *   **Grid**: Sidebar (Left/Right depending on RTL), Main Content Area.
    *   **Theme**: Apply global Dark BG (`#050b18`).
2.  [ ] **`Sidebar.tsx`**: Build Collapsible Navigation.
    *   **State**: `isCollapsed` (Persisted in localStorage?).
    *   **Content**: Chapter list + Progress.
3.  [ ] **`ChapterTabs.tsx`**: Build Sticky Horizontal Nav.
    *   **UI**: Sticky position `top-0`, z-index high.
    *   **Style**: Dark theme, Teal accent (`#2dd4bf`) for active tab border/text.
*   **Dynamic Topics**: Tabs are generated based on the specific topics of the active Chapter (e.g., for "Demand": "Law of Demand", "Shifts in Demand", "Elasticity").
    *   **Content Mapping**: Each Topic (Tab) renders a sequence of content blocks (drawn from the 15+ specialized components) relevant to that specific sub-subject.
    *   **Data Structure**: Components must accept a `topicId` or `content` prop rather than being hard-coded to a fixed tab index.
4.  [ ] **`useChapterState.ts`**: Custom Hook.
    *   Manage `activeTab`.
    *   Ensure interactions (quiz progress) are preserved when switching tabs.
    *   Update Breadcrumbs dynamically based on Tab.

### Phase 2: Content Blocks 🎨
> **Objective**: Implement the static educational visual components.

*   **Agent**: `frontend-specialist`
*   **Role**: **The Designer**

1.  [ ] **`DefinitionBlock.tsx`**: Replacing `ConceptCard`. Strict academic styling.
2.  [ ] **`ToneBreak.tsx`**: High-contrast, "Street Mode" styling.
3.  [ ] **`TeaserAnalogy.tsx`**: Visual analogy box.
4.  [ ] **`CommonMistakes.tsx`**: Grid layout with Red/Green/Yellow indicators.

### Phase 3: Interactive Engine 🎮
> **Objective**: Implement the logic-driven learning components.

*   **Agent**: `frontend-specialist`
*   **Role**: **The Engineer**

1.  [ ] **`Collapse.tsx`**: Reusable "Reveal" primitive.
2.  [ ] **`CheckpointQuiz.tsx`**: 2-question logic with instant feedback.
3.  [ ] **`GuidedExercise.tsx`**: Sequential "Step 1 -> Step 2 -> Answer".
4.  [ ] **`IndependentExercise.tsx`**: "Hint -> Answer" toggle.

### Phase 4: The "Golden Prototype" 🏆
> **Objective**: Prove the system works with real context.

*   **Agent**: `frontend-specialist` + `academic-content-creator`
*   **Role**: **The Architect** + **The Author**

1.  [ ] **`app/golden-prototype/page.tsx`**: Route setup.
2.  [ ] **Content Construction**: Map JSON 15 sections -> 4 Tabs Logic.
3.  [ ] **Assembly**: Wire it all together.

### Phase 5: Cleanup & Handover 🧹
> **Objective**: Remove technical debt.

*   **Agent**: `project-planner`
*   **Role**: **The Auditor**

1.  [ ] **Verification**: Run `npm run lint`, `npm run build`.
2.  [ ] **Destruction**: Delete `components/_backup/` and legacy `components/accounting/`.
3.  [ ] **Handover**: Document Tab mapping logic and Collapsible Sidebar usage.