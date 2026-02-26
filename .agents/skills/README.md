# 🧰 Sikumnik Skills Directory

This directory contains specialized, atomic knowledge bases that enhance the AI's capabilities. Skills are automatically injected when relevant keywords are detected (e.g., "Tailwind", "Next.js"), or they can be manually invoked via slash-commands.

## 🗂️ Categorized Skill Index

### 🎨 UI & Design Systems
Skills dedicated to visual excellence, aesthetics, and user experience.
| Skill | Identity | Purpose |
| :--- | :--- | :--- |
| **`frontend-design`** | Production-grade Architect | Build uncompromising, distinctive UIs avoiding generic AI aesthetic clichés. |
| **`ui-ux-pro-max`** | Design Intelligence Matrix | 50+ styles, 90+ palettes. Use for color math, typography pairings, and layout structures. |
| **`radix-ui-design-system`** | Radix Accessibility | Building headless, fully accessible compound components (modals, sliders, tooltips). |
| **`tailwindcss-fundamentals-v4`** | Tailwind v4 Expert | Implementing the CSS-first `@theme` configuration and utility class strategies. |
| **`ui-audit`** | UX Reviewer | Automated UX heuristic evaluation against proven cognitive load and layout principles. |
| **`web-design-guidelines`** | Compliance Checker | Audits interfaces for general web standard compliance and best practices. |

### ⚛️ Framework & Architecture
Skills defining the structural React and Next.js foundation of the project.
| Skill | Identity | Purpose |
| :--- | :--- | :--- |
| **`nextjs-master`** | Next.js 16+ Authority | Comprehensive guide to App Router, RSC boundaries, and parallel routing. |
| **`vercel-react-best-practices`** | Performance Optimizer | Vercel's official guidelines for minimizing bundle sizes, re-renders, and data-fetching costs. |

### 🎬 Animation & Motion
Skills for fluid, physics-based micro-interactions.
| Skill | Identity | Purpose |
| :--- | :--- | :--- |
| **`framer-motion`** | Core Motion Guide | Official API syntax and performance rules for `framer-motion` properties. |
| **`framer-motion-animator`** | Choreographer | Building complex orchestrated sequences, page transitions, and gestures. |

### 🛠️ Tooling & Project Management
Skills for managing files, logic, and the overarching AI experience.
| Skill | Identity | Purpose |
| :--- | :--- | :--- |
| **`planning-with-files`** | Task Orchestrator | Implements file-based planning (`task_plan.md`, `progress.md`) for complex multi-step epics. |
| **`file-organizer`** | Disk Janitor | Intelligently sorts, categorizes, and audits chaotic folder structures. |
| **`systematic-debugging`** | Root Cause Analyzer | Strict investigative protocol to execute when encountering runtime errors or test failures. |
| **`skill-creator`** | Meta-Architect | Framework for defining and scaffolding *new* skills for this directory. |
| **`find-skills`** | Ecosystem Navigator | Discovers and installs external agent skills from the open-source community. |
| **`brainstorming`** | Ideation Engine | Explores user intent and edge cases *before* any code is written. |

---

## ⚡ How to Manage Skills

```bash
# To add a community skill:
npx skills add <owner/repo@skill-name> --yes

# To update existing skills:
npx skills update
```

> **Note:** Do not place standard code files in this directory. Every folder here must contain exactly one `SKILL.md` file wrapped in YAML frontmatter.
