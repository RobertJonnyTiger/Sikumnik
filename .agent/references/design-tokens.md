# Sikumnik Design Tokens (Truth 2.0 - Calm Dark)

This document defines the core tokens for the Sikumnik platform. All components must strictly adhere to these values to maintain Truth 2.0 compliance.

## Colors (Calm Dark Palette)

| Token | Value | Tailwind v4 Variable | Truth 2.0 Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#020617` | `--color-background` | Main container background |
| **Surface (Card)** | `#0f172a / 40%` | `--color-card` | GlassCard surfaces (backdrop-blur-3xl) |
| **Text High Emphasis** | `#ffffff` | `--color-foreground` | Headers, total amounts, active logic |
| **Text Body** | `#cbd5e1` | `--color-text-secondary` | Body text, readable content |
| **Text Muted** | `#64748b` | `--color-muted-foreground` | Sub-labels, dates, inactive steps |
| **Primary** | `#2dd4bf` | `--color-primary` | Assets, positive logic, main highlights |
| **Accent** | `#fb923c` | `--color-accent` | Liabilities/Equity, tips, secondary highlights |
| **Error** | `#f43f5e` | `--color-error` | **MANDATORY** for CommonMistakes and WRONG answers |
| **Success** | `#10b981` | `--color-success` | Validated patterns, CORRECT answers |

## Typography (Truth 2.0 Standards)

| Level | Size | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Display (H1)** | `4xl - 6xl` | `font-black` | Page Titles, Final Exam Totals |
| **Heading (H2/H3/H4)** | `3xl - 5xl` | `font-black` | Card titles, Section headers |
| **Body (Large)** | `text-2xl` | `font-medium` | Main content paragraphs |
| **Body (Default)** | `text-xl` | `font-medium` | Smallest allowed text size |
| **Logic/Amount** | `text-2xl+` | `font-black` | Currency values, formulas, steps |

### Font Rules
1. **font-main**: Compulsory for all help text, exercises, and structural content. 
2. **font-handwriting**: Forbidden for body text. Use ONLY for ad-hoc scribbles or "live" student inputs.
3. **No Italics**: Strictly prohibited for emphasis. Use weight or color instead.

## Structural Tokens (Truth 2.0)

- **Glassmorphism**: `backdrop-blur-3xl` + `border-r-8` or `border-t-8`.
- **Rounding**: `rounded-4xl` (standard) or `rounded-[3rem]` (large).
- **Shadows**: `shadow-premium` (deep elevation) and `shadow-neon` (interaction glow).
- **Highlighting**: **Keyword Boxes** (`bg-primary/20` + `border-b-2`) must be used for important concepts in every sentence.

## Core Components (The "Blocks")

| Component | Description | Truth 2.0 Style |
| :--- | :--- | :--- |
| **Independent Exercise** | Single question for self-check (e.g., "Lottery Winner"). | `bg-slate-900` card + `Collapse` for Hints/Answers. |
| **Guided Exercise** | Step-by-step walkthrough of complex problems. | **Accordion** system with `bg-primary/5` steps. |
| **Common Mistakes** | "Classic Mistake" vs "Pro Way". | **Red Glow** (`border-error`) + Compact Grid. |
| **Tone Break** | Casual, real-world analogy to reset attention. | **Neon Pink** (`border-pink-500`) + Glow Effect. |
| **Reference Card** | Formulas and definitions. | **Monospace** font + High contrast. |
