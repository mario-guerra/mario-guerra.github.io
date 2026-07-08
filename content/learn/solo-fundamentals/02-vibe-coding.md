---
title: "Experience the Failure Mode"
moduleNumber: 2
slug: "vibe-coding"
description: "Understand why SOLO exists by experiencing what happens without it."
soloCommand: null
pillar: null
checkpoint: true
---

# Module 2: Experience the Failure Mode

**Goal:** Understand *why* SOLO exists by experiencing what happens without it.

### What you need to know first

**Agentic coding** means you type a request in plain English, and an AI writes the code for you. It can also run your code, read your files, edit existing code, and fix bugs — all from Copilot Chat inside VS Code, or from Codex in your terminal.

This is powerful. It's also dangerous. The AI will happily write code that *works* but is fragile, poorly organized, and impossible to change later. This module lets you feel that problem firsthand.

### Reading
- Read the blog post: [Shift from Vibes to Production Code with the SOLO Protocol](https://marioguerra.xyz/shift-from-vibes-to-production-code-with-the-solo-protocol/)
- Focus on the section "The problem with just letting it code"
- Don't worry about understanding every term yet — you'll learn them across the program

---

### Lab 2: Vibe Coding

**Estimated AI conversations: 1-2**

1. Open your `study-tracker` project in VS Code.
2. Open Copilot Chat (⌘+I / Ctrl+I), make sure Agent Mode is enabled, and type this prompt (and nothing else):
   > *"Build me a command-line study tracker in Python. I want to log study sessions and see my total hours."*
3. **Accept everything the AI produces.** Don't guide it. Don't correct it. Let it cook.
4. Run the program. It probably works for the basic case.
5. Now try to extend it — type these one at a time in Copilot Chat and see what happens:
   - *"Add the ability to track which class each session is for"*
   - *"Show me a weekly summary broken down by class"*
   - *"What happens if I type 'abc' for the number of hours?"*
   - *"Add the ability to delete a study session"*
6. After each change, look at the code. Notice:
   - Is it getting messier with each addition?
   - Did adding one feature break something that worked before?
   - Is the AI building on its earlier choices, or rewriting things?
   - Could *you* explain what the code does if someone asked?
7. **Commit this code to git** — you'll compare it to what you build later:
   ```bash
   git add .
   git commit -m "Vibe-coded version (no SOLO)"
   git push
   ```

> **The punchline:** That last question — "what do you wish you'd told the AI before it started coding?" — is the entire foundation of SOLO. The rest of this program teaches you how to answer it.
