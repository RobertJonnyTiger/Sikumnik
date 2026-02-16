# Accounting Interactive Components

This directory contains domain-specific interactive components for accounting chapters. These components implement accounting-specific logic, visualizations, and educational interactions.

## Components

| Component | Purpose | Used In |
|-----------|---------|---------|
| `FinancialStatement` | Renders balance sheets, income statements with proper accounting formatting | Chapter 3, 4, 5 |
| `JournalEntry` | Double-entry bookkeeping visualization with debit/credit columns | Chapter 2, 3 |
| `BalanceSheetQuadrant` | Four-quadrant balance sheet layout (Assets/Liabilities/Equity) | Chapter 3 |
| `SunkCostDemo` | Interactive demo explaining sunk cost fallacy concept | Chapter 5 |
| `ClassificationGame` | Drag-and-drop game for account classification | Chapter 2 |
| `InteractiveExercise` | Exercise component with ASCII table parsing | Chapter 4, 6 |

## Migration Note

These components were moved from `components/accounting/` during the Phase 3 migration.
They are preserved here because they contain accounting-specific logic that cannot be
replaced by generic UI blocks in `core/blocks/`.

## Usage

```tsx
import { FinancialStatement, JournalEntry } from '@/components/core/interactive/accounting';

// In chapter page
<ChapterTemplate 
  data={chapterData}
  interactiveRegistry={{
    FinancialStatement: <FinancialStatement {...props} />,
    JournalEntry: <JournalEntry {...props} />
  }}
/>
```

## Dependencies

Some components may depend on legacy components from `core/master-page/` during the
transition period. These dependencies will be resolved as part of the complete migration.
