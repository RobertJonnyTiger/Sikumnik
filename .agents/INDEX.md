# 🌌 Sikumnik Agent Ecosystem

Welcome to the **Sikumnik Agent Ecosystem**. This directory (`.agents/`) is the central nervous system for all AI agents, skills, and autonomous workflows operating within the Sikumnik educational platform.

## 🧭 Directory Structure

- **`/agents/`** - The core "Personalities" or Roles. Each file defines an autonomous agent's mandate, constraints, and operational protocol.
- **`/skills/`** - The "Toolbelt." These are atomic, installable capabilities that give agents specific domain knowledge (like Framer Motion syntax or Tailwind styling).
- **`/workflows/`** - The "Blueprints." Step-by-step Standard Operating Procedures (SOPs) that string together agents and tools to execute complex, multi-stage pipelines.

---

## 🤖 1. The Agents (`/agents/`)

These are the primary drivers of work. When initiating a task, you are conversing with one of these personas:

| Agent | Role | Triggers |
| :--- | :--- | :--- |
| **`frontend-specialist`** | Senior UI Architect | Building/fixing React components, CSS, animations, responsive design. Enforces "Anti-Safe Harbor" design rules. |
| **`project-planner`** | Orchestrator & Planner | Turning vague business goals into actionable `task.md` plans via atomic decomposition. |
| **`product-manager`** | UX Advocate & Strategist | Defining features, writing Gherkin Acceptance Criteria (AC), and prioritizing user value. |

---

## 🧰 2. The Skills (`/skills/`)

Skills are automatically dynamically loaded by Agents based on context, but can also be manually invoked. For a complete, categorized breakdown of all 16 active skills, please see the **[Skills Directory Guide](./skills/README.md)**.

---

## 🔄 3. The Workflows (`/workflows/`)

Workflows are repeatable playbooks for complex operations that require strict sequencing.

| Workflow | Description | Command |
| :--- | :--- | :--- |
| **`exam-pipeline`** | Processes a raw PDF exam using Groq Vision (Llama 4) for OCR, solves it iteratively via deep reasoning, and outputs an ExamEngine-ready JSON structure. | `/exam-pipeline` |

---

## 🚦 Operational Discipline

1. **Role Clarity:** Ensure you are "speaking" to the right agent before generating code. A UI task should be handled by the Frontend Specialist.
2. **Context Preservation:** Agents load `.md` rules automatically. Do not duplicate rules in your prompts.
3. **Execution Chain:** `Product Manager` defines → `Project Planner` organizes → `Specialist` executes.
