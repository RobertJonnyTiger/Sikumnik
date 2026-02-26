# Sikumnik (סיכומניק) Project Overview

This document provides a technical and design-oriented summary of the Sikumnik platform. It is intended for AI design and development platforms to understand the current state, architecture, and visual identity of the application.

## 🚀 Core Architecture

- **Framwork**: [Next.js 16.1.6](https://nextjs.org) (App Router configuration).
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode).
- **Content Engine**: **"Teaching-First" Data-Driven Architecture**.
  - Pages are thin wrappers around `ChapterTemplate.tsx`.
  - Content is primarily stored in a structured JSON format (`ChapterData` schema).
  - A discriminated union of **25+ Content Block types** (e.g., `explanation`, `formula`, `interactive`, `knowledge-challenge`) drives the UI.
- **Styling Strategy**: 
  - [Tailwind CSS v4](https://tailwindcss.com/) (using the new CSS-first `@theme` configuration).
  - [Framer Motion 12](https://www.framer.com/motion/) for orchestrated sequences and micro-interactions.
  - [Radix UI](https://www.radix-ui.com/) for accessible primitives (Accordion, Slider, etc.).

## 📂 Project Structure

```text
web/src/
├── app/                    # Routing & Page logic (organized by Course)
├── components/
│   ├── core/
│   │   ├── blocks/          # Recursive rendering of content block types
│   │   └── interactive/      # Complex, domain-specific calculators/animations
│   ├── ui/                  # Shadcn-style base primitives
│   └── layout/              # Navbars, Sidebars, and Footers
├── data/                    # The "Brain" - Course chapter JSON files
└── types/                   # Centralized schema definitions (chapter.ts)
```

## 🎨 Design System: "Calm Dark"

The application uses a high-contrast, OLED-friendly dark theme designed for focus and academic endurance.

### 🌈 Color Palette (OKLCH)
| Token | OKLCH Value | CSS Variable | Identity |
| :--- | :--- | :--- | :--- |
| **Background** | `oklch(0.01 0.02 260)` | `--color-background` | Deep Slate / OLED Black |
| **Foreground** | `oklch(0.985 0.01 240)` | `--color-foreground` | Crisp Off-White |
| **Primary** | `oklch(0.7 0.2 170)` | `--color-primary` | Vibrant Teal-400 |
| **Secondary** | `oklch(0.15 0.05 240)` | `--color-secondary` | Muted Slate-800 |
| **Accent** | `oklch(0.75 0.15 40)` | `--color-accent` | Safety Orange-400 |
| **Card** | `oklch(0.08 0.03 260)` | `--color-card` | Slate-900 |

### 📐 Visual Language
- **Geometry**: Base radius of `0.5rem` (8px), with aggressive `2rem`+ curves for large "Inner Sanctum" surfaces.
- **Depth**: Extensive use of **Glassmorphism** (`backdrop-blur-xl`) and **Layered Shadows**.
- **Glows**: 
  - `temple-glow`: Soft teal aura for primary interactions.
  - `neon-glow`: Intense orange highlight for attention-grabbing elements.
- **Typography**: 
  - **Main (Sans)**: `Assistant` (optimized for Hebrew readability).
  - **Headers**: `Heebo` (bold, geometric feel).
  - **Primary Direction**: `RTL` (Right-to-Left).

### ✨ Animation Mood
- **Physics**: Organic "Spring" physics (no linear transitions).
- **Entry**: `animate-entry` (Slide up + Fade in, 0.8s duration).
- **Micro-interactions**: "Hover Lift" (Y-offset + increased shadow depth).

## 🧪 Special Features
- **Math Visualization**: LaTeX rendering via [KaTeX](https://katex.org/).
- **AI Integration**: AI Lecturer chat utilizing [Agentation SDK](https://github.com/google/agentation).
- **RTL-First Design**: Optimized layouts specifically for Hebrew text alignment and flow.
