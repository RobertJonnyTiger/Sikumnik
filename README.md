# 🎓 Sikumnik - Hebrew Education Platform

Sikumnik is a premium Hebrew education platform designed for university-level excellence in economics, accounting, and mathematics.

## 🏗️ Architecture & Tech Stack

The project is built with modern, performant, and premium technologies:

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion 12.34.0](https://www.framer.com/motion/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Math Rendering**: [KaTeX](https://katex.org/)
- **Content**: MDX & Dynamic JSON Chapters

## 📂 Project Structure

- `web/`: The main Next.js application.
- `input-materials/`: Source PDFs for course content generation.
- `scripts/`: Development and content generation utilities (e.g., OCR, chapter creation).
- `.agents/`: AI agent configurations and specialized skills.

## 📍 Course Discovery Pattern

The single source of truth for all course content is:
`web/src/data/courses/registry.ts`

To add a new course, register it here and create the corresponding directory in `web/src/app/courses/`.

## 💻 Environment Requirements

This project mandates a **Windows PowerShell** environment for all development activities. 

- **Port**: The development server runs on **3001**.
- **Commands**:
  - `npm run dev` (from `web/`)
  - `npm run build`
  - `npm run test`

## 🧩 AI Partnership

Sikumnik uses a strict **Architectural Partnership Protocol**. Agents (like Heimerdinger) operate as senior architects, requiring deep audits and explicit approval (LGTM) before any code execution.

---
*Last Updated: 2026-03-03*
