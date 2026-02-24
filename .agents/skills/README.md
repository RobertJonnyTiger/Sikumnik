# Sikumnik Agent Skills Guide

Skills extend the agent's capabilities. They auto-trigger based on context or can be manually invoked.

---

## Workflow & Process

| Skill | Objective | When to Use |
|-------|-----------|-------------|
| **brainstorming** | Explore requirements & design before implementation | Creating features, components, or modifying behavior |
| **systematic-debugging** | Find root cause before fixing | Bugs, test failures, unexpected behavior, performance issues |
| **skill-creator** | Guide for creating skills | Creating or updating a skill |
| **find-skills** | Discover ecosystem skills | "How do I do X?", "find a skill for X" |

---

## UI/UX & Design

| Skill | Objective | When to Use |
|-------|-----------|-------------|
| **frontend-design** | Production-grade frontend interfaces | Building components, pages, styling |
| **ui-ux-pro-max** | Design intelligence (50 styles, 97 palettes) | Choosing colors, typography, landing pages, dashboards |
| **web-design-guidelines** | Web design best practices | General design decisions |
| **accessibility-compliance** | WCAG 2.2 compliant interfaces | Screen readers, keyboard nav, focus management, audits |

---

## React & Next.js

| Skill | Objective | When to Use |
|-------|-----------|-------------|
| **next-best-practices** | Next.js file conventions, RSC, data patterns | Writing/reviewing Next.js code |
| **vercel-react-best-practices** | Performance optimization (57 rules) | Optimizing bundles, data fetching, re-renders |
| **nextjs-app-router-patterns** | App Router specific patterns | Advanced routing questions |
| **nextjs-app-router-fundamentals** | App Router basics | Foundational Next.js questions |

---

## Component Libraries

| Skill | Objective | When to Use |
|-------|-----------|-------------|
| **radix-ui-design-system** | Radix UI patterns | Building with Radix primitives |
| **framer-motion** | Animation patterns | Adding animations |
| **framer-motion-animator** | Advanced animations | Complex motion needs |
| **tailwindcss-fundamentals-v4** | Tailwind CSS v4 | Utility class styling |

---

## Quick Commands

```bash
# Install skill (always use --yes to skip prompts)
npx skills add <owner/repo@skill> --yes

# Search for skills
npx skills find <query>

# Check for updates
npx skills check
npx skills update
```

---

## Pro Tips

1. **Always use `-y` or `--yes`** with `npx skills` to skip confirmations
2. **Skills auto-trigger** - no need to manually invoke
3. **Keep skills concise** - they share your context window
