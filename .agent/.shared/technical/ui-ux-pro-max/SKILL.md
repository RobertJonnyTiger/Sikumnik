---
name: ui-ux-pro-max
description: "The Singularity for UI/UX Design. Combines operational workflows, aesthetic philosophy, and automated design generation. Use this for ANY frontend task: plan, build, design, implement, fix, or optimize."
layer: technical
compliance_gates:
  - aesthetics_audit
  - animation_smoothness
references:
  - standards: [.agent/.shared/technical/ui-ux-pro-max/AESTHETICS.md]
---

# UI/UX Pro Max - The Design Intelligence

> **Role**: Master Design System & Operations
> **Status**: Active (Merged v5.0)

This skill is the single source of truth for creating "Luxury Tech" interfaces for Sikumnik. It combines technical execution (Python scripts) with high-level design philosophy.

---

## 🎨 Part 1: Design Philosophy (The Soul)
*Swallowed from `frontend-design`*

### 1. The "Anti-Slop" Directive
**NEVER** produce generic "AI" interfaces (plain Bootstrap-like layouts, un-styled scrollbars, default shadows).
**ALWAYS** commit to a **BOLD Aesthetic Direction**.

### 2. Design Thinking Process
Before coding, define:
-   **Tone**: Luxury/Refined, Industrial/Raw, or Playful/Toy-like.
-   **Differentiation**: What is the ONE element that makes this memorable? (e.g., a custom cursor, a noise texture, a specific fluid animation).
-   **Motion**: Staggered reveals (`animation-delay`) > scattered micro-interactions.

### 3. Aesthetics Guidelines
-   **Typography**: Avoid default Inter/Roboto unless specified. Use fonts with character.
-   **Depth**: Use layered transparencies, gradient meshes, and noise textures.
-   **Space**: Use generous negative space or controlled density. Asymmetry is welcome.

---

## 🛠️ Part 2: Operations & Workflow (The Brain)
*Swallowed from `skills/ui-ux-pro-max`*

### Prerequisites
Ensure Python 3 is installed for the design generation scripts.

### The Standard Workflow
When asked to "design", "build", or "create" a UI component:

1.  **Analyze**: Extract Product Type, Style, and Stack.
2.  **Search (Scripted)**:
    ```bash
    # Generate design system data
    python3 .agent/.shared/technical/ui-ux-pro-max/scripts/search.py "<keywords>" --domain style
    python3 .agent/.shared/technical/ui-ux-pro-max/scripts/search.py "<keywords>" --domain color
    ```
3.  **Synthesize**: Combine the generated data with the `AESTHETICS.md` standards.
4.  **Implement**: Use the chosen stack (default: `html-tailwind` or `react`).

### Critical Rules
-   **Icons**: SVG only (Lucide/Heroicons). NO Emojis as icons.
-   **Interaction**: `cursor-pointer` on everything clickable.
-   **Dark Mode**: First-class citizen. Test `bg-white/10` visibility on dark.

---

## 📚 Part 3: Technical Standards (The Law)
*Reference to `AESTHETICS.md`*

See [AESTHETICS.md](file:///.agent/.shared/technical/ui-ux-pro-max/AESTHETICS.md) for:
-   **Colors**: HSL usage.
-   **Typo**: Tracking guidelines.
-   **Motion**: Spring physics constants.
-   **Layout**: Bento Grid rules.

---

## ⚡ Quick Actions

-   **Generate Palette**: `python3 .../search.py "luxury fintech" --domain color`
-   **Find Font Pairing**: `python3 .../search.py "modern clean" --domain typography`
-   **Audit UI**: Check against "Common Rules for Professional UI" (Part 2 above).
