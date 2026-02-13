# Critical Change Log (Debugging)

This file tracks major architectural shifts, destructive actions, and potential breaking changes during the **Master Page Redesign**.

## 📅 Log Entries

### [2026-02-12] Phase 0: Safety Backup & Initialization
- **Action**: Created backup of legacy accounting components.
- **Source**: `web/src/components/accounting/` (Corrected Path)
- **Destination**: `web/src/components/_backup/accounting/`
- **Reason**: Moving to a "Clean Slate" architecture for Master Page (Tabbed Interface).

### [2026-02-12] Phase 1-4: Master Page Architecture Deployed
- **Action**: Deployed `components/core/master-page/` library.
- **Key Components**: 
    - `MasterPageLayout` (Grid System)
    - `ChapterTabs` (Sticky Navigation)
    - `Sidebar` (Collapsible)
    - `ChapterContext` (State Management)
- **New Route**: `app/golden-prototype/page.tsx`

### [2026-02-12] Phase 4.1: Navigation & Layout Refinement (User Feedback)
- **Action**: Fixed Sidebar RTL and Tab Layout.
- **Changes**: 
    - Removed `flex-row-reverse` from `MasterPageLayout` to force Sidebar to RIGHT (Start) in RTL.
    - Updated `ChapterTabs` to use `flex-1` for full width.
    - **New Component**: `ChapterNavigationFooter` added for Bi-Directional navigation (Previous/Next).
    - **Removal**: Removed "Next" button from Header.

### [2026-02-12] Phase 4.2: Localization & Content Polish
- **Action**: Localized Formulas and Summaries.
- **Changes**:
    - **Formulas**: Swapped dominance (Hebrew large/bold, English small/secondary).
    - **Styling**: Removed obscure abbreviations ("CA-CL") in favor of full Hebrew terms.
    - **Street Summary**: Added "Lightbulb" icon and Teal border for high contrast.

### [2026-02-12] Phase 5: Cleanup
- **Action**: Deleted `web/src/components/_backup/` directory.
- **Status**: Backup removed. Architecture is now committed.

## 🌍 Global Design Standards (User Defined)
The following rules have been established as **GLOBAL DEFAULTS** for all chapters.

### 1. Navigation & Layout
- **[GLOBAL] Full-Width Tabs**: `ChapterTabs` must always use `flex-1` to span the full width of the container. No collapsed or "squashed" tabs.
- **[GLOBAL] Bi-Directional Footer**: Every chapter must include the `ChapterNavigationFooter` at the bottom of the content area.
    - **Previous Button**: Right side (Start).
    - **Next Button**: Left side (End).
    - **Logic**: "Previous" is disabled on the first tab.
- **[GLOBAL] Focused Sidebar**:
    - The `Sidebar` must be on the **RIGHT** (RTL standard).
    - It must only show the **Chapter Context** (current chapter's subsections).
    - The global app sidebar (Logo, other courses) is **HIDDEN** while inside a chapter to increase focus ("Scope: Chapter Domain").

### 2. Educational Content
- **[GLOBAL] Formula Hierarchy**:
    - **Hebrew**: Primary, Large, Bold.
    - **English/Math**: Secondary, Smaller, Subtitle.
    - **No Abbreviations**: Use full terms (e.g., "נכסים שוטפים" instead of "CA").
- **[GLOBAL] Street Summary**: High-contrast Teal styling with Lightbulb icon is the standard for summaries.
The font that is being used on this sentence on this equation, what is his name and can you substitute it please for another one? 