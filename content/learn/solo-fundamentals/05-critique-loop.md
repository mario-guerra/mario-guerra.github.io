---
title: "Trust But Verify"
moduleNumber: 5
slug: "critique-loop"
description: "Run the critique-revise gauntlet to catch flaws in plans before writing code."
soloCommand: "critique, revise"
pillar: "04: Trust but Verify"
checkpoint: true
---

# Module 5: Trust But Verify (The Critique Loop)

**Pillar 04:** *"Never accept the first output."*

### What you need to know first

**Plan vs. implementation:** A plan is what you're *going to* build. Implementation is the actual code. Plans are cheap to change; code is expensive to change. SOLO insists you get the plan right before writing code.

**Critique:** Asking the AI to tear apart its own plan. This sounds strange — why would it find problems it just created? Because LLMs generate one plan by following the path of least resistance. When you explicitly ask them to *attack* that plan, they activate a different reasoning pattern and often find real issues.

**Revise:** Updating the plan based on critique findings.

### The SOLO idea
The planning loop is: `/architect` → `/critique` → `/revise` → repeat if needed. You never implement the first plan. You always run at least one critique pass. The critique catches shortcuts, missing edge cases, and unstated assumptions.

But here's what the blog doesn't tell you: **not every critique finding is worth acting on.** Some are real problems. Some are the AI being pedantic. You need to learn to tell the difference.

### Reading
- SOLO blog: "The planning loop"
- Open `workflows/critique.md` in VS Code and read it — note the list of "Anti-Patterns to Flag"
- Open `workflows/revise.md` and read it (it's short)

---

### Lab 5: The Critique Gauntlet

**Estimated AI conversations: 2-3**

1. **Get a plan.** In Copilot Chat, type:
   > Follow #file:workflows/architect.md — Here is my spec: #file:SPEC.md. Produce a detailed technical plan for building this.

   Save the AI's output as `PLAN_v1.md`.

2. **Critique it.** In the same conversation, type:
   > Now follow #file:workflows/critique.md — Critique the plan you just produced.

   Save the output as `CRITIQUE_v1.md`.

3. **Now, learn to evaluate the critique.** Read every finding and label it:

   | Label | Meaning | Example |
   |-------|---------|---------|
   | 🔴 **Real problem** | Would cause a bug or break something | "No validation on date input — program will crash if user enters 'yesterday'" |
   | 🟡 **Good idea, not critical** | Would improve the code but isn't a blocker | "Could add a confirmation prompt before deleting a session" |
   | ⚪ **Noise** | Pedantic, over-engineered, or irrelevant for this project | "Should implement a plugin architecture for future extensibility" |

   Write your labels directly in `CRITIQUE_v1.md` next to each finding.

4. **Revise the plan.** In the same conversation, type:
   > Follow #file:workflows/revise.md — Address these findings from the critique: [paste the 🔴 and 🟡 findings]. Ignore everything else.

   Save the output as `PLAN_v2.md`.

5. **Run critique one more time** on the revised plan. This second pass usually finds fewer issues. If it finds zero, you're done. If it finds real ones, revise again.

6. **Commit everything:**
   ```bash
   git add PLAN_v1.md CRITIQUE_v1.md PLAN_v2.md
   git commit -m "Planning loop: architect, critique, revise"
   git push
   ```

> **The habit to build:** Never implement the first plan. Always critique. But also: learn to filter. The AI will generate 15 findings, of which 3 matter. Your job is to find the 3.
