---
description: Synchronize all core project documentation (README, GEMINI.md, CLAUDE-CHAT-INSTRUCTIONS.md, AGENTS.md) with the current project status.
---

# Project Synchronization Workflow (/sync-status)

Use this workflow to ensure that all high-level documentation and agent instructions are perfectly aligned with the actual project state (libraries, architecture, skills, and environment).

## Step 1: Deep Audit
Perfrom a comprehensive research phase:
1. **Tech Stack**: Read `web/package.json` for latest dependency versions.
2. **Architecture**: Read `web/src/data/courses/registry.ts` and `web/src/app/courses/` to understand the current content patterns.
3. **Capabilities**: List `.agents/skills/` to catalog all 16+ active skills.
4. **Environment**: Confirm the OS and Shell (Windows PowerShell).

## Step 2: Role-Specific Updates
Update the following files based on their unique roles:

### 📄 README.md (The Project Guide)
- Update the **Tech Stack** section with verified versions.
- Update **Project Structure** and **Chapter Creation** guides to reflect the latest dynamic JSON/Registry architecture.
- Ensure the **Environment** section mandates Windows PowerShell.

### 🤖 GEMINI.md (The Agent Soul)
- Update the **Tech Stack (Source of Truth)** block.
- Sync the **Key Skills Reference** table to include ALL active skills in `.agents/skills/`.
- Maintain the **Identity** and **Strict Operational Rules** (Soul of the Agent).

### 🧠 CLAUDE-CHAT-INSTRUCTIONS.md (The System Prompt)
- Update the **Project Context** section (Tech Stack, Structure).
- Ensure the **Orchestration Protocol** reflects the latest "Deep Audit & Litigation" mandate.
- Keep this file "portable" for easy copy-pasting into fresh AI sessions.

### 📋 AGENTS.md (The Registry)
- Update the **Personnel** list (Heimerdinger + Partner Strategist).
- Sync the **Directory Structure** and **Code Style Guidelines**.

## Step 3: Verification
- Verify that there is zero redundancy between files (each file holds its own "role" data).
- Ensure all markdown formatting is correct.
- Provide a `walkthrough.md` or summary of what was synchronized.
