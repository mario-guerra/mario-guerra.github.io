---
title: "Spec-Driven Development"
moduleNumber: 4
slug: "spec-driven"
description: "Define what 'done' looks like before asking for a single line of code."
soloCommand: "architect"
pillar: "01: Spec-Driven"
checkpoint: true
---

# Module 4: Spec-Driven Development

**Pillar 01:** *"Define what 'done' looks like before asking for code."*

### What you need to know first

**Specification (spec):** A description of what your program should do, written *before* you write the code. It answers: What does the program take as input? What does it produce? What should happen when things go wrong? What's out of scope?

**Requirements:** Specific, checkable statements about what the program must do. "It should handle errors" is vague. "If the user types letters when asked for hours, the program prints 'Please enter a number' and asks again" is a requirement.

**Scope boundary:** An explicit list of what the program will *not* do. This is just as important as what it will do, because the AI will add features you didn't ask for if you don't tell it to stop.

### The SOLO idea
The AI fills in every gap in your instructions with whatever's cheapest and fastest. If you say "build me a study tracker," it decides the data format, the error handling, the feature set, and the user experience — all without asking you. Spec-driven development means *you* make those decisions upfront and give the AI a blueprint to follow.

The `/architect` workflow tells the AI to act as an experienced software architect. You give it your requirements, and it produces a detailed technical plan. But the quality of that plan depends entirely on the quality of your input.

### Reading
- SOLO blog: "The six pillars of SOLO" → Pillar 01
- SOLO blog: "The planning loop"
- Open `workflows/architect.md` in VS Code and read it — pay attention to the "Standard Specification Schema" (sections 1-11) and the "Pre-Flight Verification" phase. You won't understand everything yet, and that's fine.

---

### Lab 4: Write the Blueprint

**Estimated AI conversations: 1-2**

You're going to throw away the vibe-coded version and the Session A version, and rebuild the study tracker from a proper spec.

1. **Write the spec yourself first** (no AI). Create a file called `SPEC.md` in your project root. Answer these questions in plain English:

   ```markdown
   # Study Tracker Specification

   ## What does this program do?
   (One paragraph. E.g., "A command-line program that lets me log study
   sessions, view them, and see summaries of how much I've studied per
   class.")

   ## Commands the user can run
   (List every command. E.g.:
   - `log` — record a new study session
   - `list` — show all sessions
   - `summary` — show total hours per class
   - `delete` — remove a session by its number
   - `export` — save all sessions to a CSV file)

   ## What information does a study session contain?
   (List every field. E.g.: class name, date, hours, optional notes)

   ## How is data stored?
   (E.g., "In a JSON file called sessions.json in the project folder")

   ## What happens when things go wrong?
   (List at least 5 specific error cases. E.g.:
   - User types letters when asked for hours → show error, ask again
   - User tries to delete a session that doesn't exist → show error
   - sessions.json doesn't exist yet → create it automatically
   - sessions.json is corrupted/unreadable → show error, don't crash
   - User enters a date in the wrong format → show expected format, ask again)

   ## What this program does NOT do (scope boundary)
   (E.g.: no web interface, no login system, no cloud sync, no grades
   — just time tracking)
   ```

2. **Feed your spec to the AI.** In Copilot Chat, type:
   > Follow the instructions in #file:workflows/architect.md — Review my spec in #file:SPEC.md and produce an architecture plan. Tell me what I missed, what's ambiguous, and what could cause problems.

3. **Compare the AI's architecture output to your handwritten spec** — what did the AI add that you missed? What did it remove or simplify that you explicitly required?

4. **Update your spec** based on the AI's feedback. Don't let the AI rewrite it — *you* update it, deciding which suggestions to accept and which to reject.

5. **Commit the spec:**
   ```bash
   git add SPEC.md
   git commit -m "Add project specification"
   git push
   ```

> **The key insight:** The 20 minutes you spend writing a spec saves hours of fighting with AI-generated code that doesn't do what you wanted. The spec is your contract with the AI.
