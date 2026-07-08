---
title: "Controlled Context"
moduleNumber: 3
slug: "memory-loop"
description: "Take control over what the AI remembers across coding sessions."
soloCommand: "memory, resume"
pillar: "06: Controlled Context"
checkpoint: true
---

# Module 3: Controlled Context (The Memory Loop)

**Pillar 06:** *"You decide what gets remembered."*

> **Why this is Module 3:** This pillar requires zero technical knowledge and produces the most immediately useful result. Before learning architecture or testing, you need to understand that AI conversations have a shelf life — and you control whether your work survives.

### What you need to know first

**Context window:** The AI can only "remember" a certain amount of conversation. Imagine a whiteboard that's 10 feet wide. Once it's full, old stuff gets erased from the left side to make room on the right. That's what happens to your conversation with the AI. Older instructions, decisions, and code get quietly forgotten.

**Compaction:** Some IDEs try to "summarize" old conversation to save space. This is like someone else deciding which of your class notes to keep and which to throw away. They'll keep the wrong ones.

**Session:** One continuous conversation with the AI. When you close the chat and open a new one, you start a new session with a blank whiteboard.

### The SOLO idea
The Memory Loop is your note-taking system for AI sessions. At the end of a session, you save a structured file capturing what you worked on, what went wrong, what decisions you made, and what to do next. At the start of the next session, you feed that file back to the AI so it can pick up where you left off.

Two commands:
- **`/memory`** — tells the AI to write a session summary file
- **`/resume`** — tells the AI to read the session summary and reconstruct context

### Reading
- SOLO blog: "The memory loop" section
- Open `workflows/memory.md` in VS Code and read it — it's a template with sections like "Project Overview," "Completed Work," "Critical Knowledge," and "Resume Instructions"
- Open `workflows/resume.md` — it's shorter, it tells the AI how to read the memory file and produce a "Session Ready Report"

---

### Lab 3: Save and Restore Your Brain

**Estimated AI conversations: 2 (one per session)**

**Session A (30-45 minutes):**
1. Start a new Copilot Chat conversation (click the + icon in the chat panel)
2. Tell the AI: *"I have a study tracker project. I want to start fresh and rebuild it properly. For now, just create a clean project structure: a main.py that does nothing yet, and a README.md describing what we'll build."*
3. Work with the AI to add one small feature: *"Add the ability to log a study session. Ask the user for the class name, date, and hours studied. Save it to a JSON file called `sessions.json`."*
4. While working, you'll probably hit at least one surprise (JSON file doesn't exist yet, date format is ambiguous, etc.). Note it.
5. **Before closing the session**, type in Copilot Chat:
   > `Follow #file:workflows/memory.md — save session context for this project`
6. Read the file the AI creates (it'll be at `.tmp/SESSION_MEMORY.md`)
7. Check: Does it mention the JSON file? The surprise you hit? What you'd do next?
8. If it missed something, **edit the file yourself** to add it
9. Commit everything:
   ```bash
   git add .
   git commit -m "Session A: basic logging + memory file"
   git push
   ```

**Session B (the next day, or at least a few hours later):**
1. Start a **completely new** conversation — don't continue the old one.
2. In Copilot Chat, type:
   > `Follow #file:workflows/resume.md — restore context from .tmp/SESSION_MEMORY.md`
3. The AI will read your memory file and produce a "Session Ready Report" — a summary of where you left off.
4. Read it carefully. Ask yourself:
   - Did it get the project description right?
   - Did it identify the next thing to work on?
   - Did it remember the surprise/gotcha from Session A?
   - Did it make up anything that didn't happen?
5. Continue working: add the ability to view study sessions. See how smooth (or bumpy) the pickup is.

> **Why this matters:** Without this discipline, every AI session starts from zero. With it, projects can span weeks. This is the difference between AI as a toy and AI as a tool.
