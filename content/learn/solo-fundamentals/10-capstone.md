---
title: "SOLO CLI Project"
moduleNumber: 10
slug: "capstone"
description: "Integrate every SOLO pillar and loop to build a program of your choice from scratch."
soloCommand: "all"
pillar: "all"
checkpoint: true
---

# SOLO CLI Project: Build Something You Actually Want

**Goal:** Use every SOLO loop to build a small Python CLI project of your choice from scratch.

### Pick a project
Choose something you'd actually use. Here are ideas, but feel free to design your own — just keep it CLI-based (no web stuff or databases yet; save that for the next courses):

1. **Grade Calculator** — enter assignments, weights, and scores per class; see current grade, and predict *"what score do I need on the final to get an A?"*
2. **Flashcard Quizzer** — import questions from a text file, quiz yourself, track which ones you get wrong most often, and prioritize those.
3. **Budget Tracker** — log expenses with categories, see spending summaries by week/month/category, and set alerts for budget limits.
4. **Workout Logger** — log exercises with sets/reps/weight, see progress over time, and track personal records per exercise.

---

### The Full SOLO Sequence

**Phase 1: Plan**
- [ ] Write your specification file (`SPEC.md`) before writing any code.
- [ ] **Step A: Plan.** Run `/architect` to get a technical plan (use `#file:workflows/architect.md`).
- [ ] **Step B: Critique.** Run `/critique` — label every finding as 🔴/🟡/⚪ (use `#file:workflows/critique.md`).
- [ ] **Step C: Revise.** Run `/revise` — address all 🔴 and chosen 🟡 findings (use `#file:workflows/revise.md`).
- [ ] Run `/critique` again for a second pass.
- [ ] Define your interfaces (`interfaces.md`) showing your function signatures.
- [ ] Write your automated test definitions (before implementation).
- [ ] Commit everything.

**Phase 2: Build**
- [ ] **Step D: Implement.** Run `/code` to write the code (tests should go green) (use `#file:workflows/code.md`).
- [ ] Add explicit input validation for every user input.
- [ ] Run tests: `pytest -v` — everything green, no warnings.
- [ ] Run `/memory` at the end of a session to save context (use `#file:workflows/memory.md`).
- [ ] Start a new session, run `/resume`, and keep building (use `#file:workflows/resume.md`).
- [ ] If you hit a non-obvious bug, use `/sherlock` before patching (use `#file:workflows/sherlock.md`).
- [ ] Final `pytest -v` check — 100% passing.
- [ ] Commit everything, push to GitHub.

---

### Project Deliverables
All of these must be pushed to your GitHub repository:
1. **Working program** — a clean script someone can clone and run.
2. **SPEC.md** — your handwritten specification.
3. **PLAN_v2.md** — the revised technical architecture plan.
4. **CRITIQUE_v1.md** — with your critique findings labeled by severity.
5. **interfaces.md** — your function signatures.
6. **Tests** — with at least 15 automated test functions.
7. **At least one `SESSION_MEMORY.md`**.
8. **Post-Mortem (`POSTMORTEM.md`):**
   - Where did SOLO save you time vs. just asking the AI to build it?
   - Which pillar had the biggest impact on code quality?
   - What would you do differently next time?

---

### Next Step
Now that you have mastered the foundational SOLO loops, you are ready to transition your standalone Python scripts into network-accessible services.

Move on to **[Course 2: API Design](/learn/api-design/)** to learn HTTP mechanics and start persisting state using FastAPI and SQLite!

