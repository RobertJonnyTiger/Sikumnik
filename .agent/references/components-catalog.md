---
name: components-catalog
description: >
  Catalog of existing React components for the accounting course.
  Documents each component's purpose, props, and usage.
---

# Components Catalog — Accounting Course

## Overview

Location: components/accounting/

All components are dynamically imported in chapter pages.
Most support SSR (ssr: true) except interactive ones (ssr: false).


## ConceptCard

Purpose: Displays a single concept with formal academic explanation and casual analogy.

Props:
- index (number, required): Position in the list for styling
- title (string, required): Concept title in Hebrew
- academicText (string, required): Formal academic explanation
- analogyText (string, required): Casual Tel Aviv analogy

Notes:
- Handles both formal and casual content in one card
- Index affects visual styling and animation
- Good for definitions, principles, concepts


## CalculationBlock

Purpose: Displays formulas, variables, calculation steps, and optional data tables.

Props:
- data (object, required): Contains all calculation info
  - data.title (string): Block title
  - data.formula_visual (string): Main formula display
  - data.variables (array): Variable definitions with name, value, desc
  - data.steps (array): Step-by-step explanation strings
  - data.analogy_note (string): Casual explanation
  - data.data (object): Table data with rows array

Row Object Fields:
- label (string): Row label
- amount (number): Numeric value
- type (string): asset / liability / equity / subtotal / total
- highlight (boolean): Visual emphasis
- tooltip (string): Hover explanation

Notes:
- Versatile component for any formula or calculation
- Data table is optional
- Good for equations, financial calculations, ratios


## JournalEntry

Purpose: Displays accounting journal entries in standard debit/credit format.

Props:
- data (object, required): Journal entry data
  - data.title (string): Entry description
  - data.date (string): Entry date
  - data.entries (array): Debit and credit lines

Entry Object Fields:
- account (string): Account name
- debit (number or null): Debit amount
- credit (number or null): Credit amount

Notes:
- Standard T-account format
- Debits and credits must balance
- Good for transaction recording examples, practice entries


## InteractiveExercise

Purpose: Self-practice exercise with question, solution reveal, and optional tip.

Props:
- question (string, required): Exercise question
- solution (string, required): Full solution (hidden initially)
- tip (string, optional): Helpful hint

Notes:
- SSR disabled (client-side interactivity)
- Solution is collapsible/revealable
- Current version is basic — may need enhancement for step-by-step


## BalanceSheetQuadrant

Purpose: Displays full balance sheet in 2x2 quadrant format.

Props:
- topLeft (object, required): Current assets quadrant
- topRight (object, required): Current liabilities quadrant
- bottomLeft (object, required): Non-current assets quadrant
- bottomRight (object, required): Non-current liabilities + equity

Quadrant Object Fields:
- title (string): Quadrant title
- rows (array): Data rows same as CalculationBlock rows

Notes:
- Visual representation of full balance sheet
- Shows the four quadrants clearly
- Good for chapter 2 and any balance sheet visualization


## Components Needed (Not Yet Built)

Based on the 15-section template, these components may need to be created:

PageMap:
- Breadcrumb, progress bar, learning objectives, prerequisites
- Status: does not exist

TeaserAnalogy:
- Styled casual analogy section
- Status: could use ConceptCard or build custom

ToneBreak:
- "תכלס" section with distinct styling
- Status: does not exist

CommonMistakes:
- List of mistakes with mistake/correct/why format
- Status: does not exist

Checkpoint:
- 2-question quiz with collapsible answers
- Status: could adapt InteractiveExercise

GuidedExercise:
- Step-by-step with progressive reveal
- Status: InteractiveExercise does not support steps

QuickReferenceCard:
- Printable cheat sheet format
- Status: does not exist

TriviaCard:
- Fun fact display
- Status: does not exist

ChapterBridge:
- Link to next chapter with teaser
- Status: does not exist


## Component Design Patterns

Styling:
- All use Tailwind classes
- Follow project design system
- Support dark mode if applicable
- RTL-aware

Data Source:
- Props come from chapter JSON files
- Located in data/chapters/chapter-X.json

Import Pattern:
- Use dynamic import from next/dynamic
- Set ssr true for static, false for interactive

Composition:
- Chapter pages compose these components
- Grid layouts handle positioning
- Sections are visually separated