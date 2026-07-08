---
title: "Orientation & Setup"
moduleNumber: 0
slug: "orientation"
description: "Welcome to the program. Set up your tools and understand what we are building."
soloCommand: null
pillar: null
checkpoint: false
---

# Orientation & Setup

Welcome! You are starting a program to learn **agentic coding** using the **SOLO Protocol**.

> **What is the SOLO Protocol?**
> The SOLO (Single Operator Loop Orchestration) Protocol is an engineering methodology designed to transition developer workflows from ad-hoc "vibe coding" into disciplined, specification-driven software construction. To understand the core philosophy, history, and mechanics of the protocol before you write your first line of code, read the original blog article: **[The SOLO Protocol](/blog/the-solo-protocol)**.

## How This Program Works

You'll build one project across the entire program — a **command-line study tracker** in Python. No web frameworks. No databases. No frontend. Just Python, files, and your terminal.

Each module teaches one idea from the SOLO protocol. They build on each other, so do them in order. Every module has:
1. **What you need to know first** — background concepts explained simply
2. **The SOLO idea** — what the pillar is and why it matters
3. **Lab** — hands-on work where you apply the idea to your project
4. **Checkpoint** — something you produce to prove you learned it

> **A note on cost:** GitHub Copilot is free for verified students through [GitHub Education](https://education.github.com/) — sign up with your *.edu email. This gives you access to Copilot Chat in VS Code and OpenAI Codex. The program is designed to work within these free-tier limits if you're deliberate about your sessions. Each module estimates how many AI conversations you'll need. Don't burn through your usage aimlessly — that's literally one of the things SOLO teaches you to avoid.

---

## Setup (Do This First)

### 1. Install VS Code and GitHub Copilot
1. Download [VS Code](https://code.visualstudio.com/) if you don't have it
2. Open VS Code, go to the Extensions panel (⌘+Shift+X on Mac, Ctrl+Shift+X on Windows)
3. Search for "GitHub Copilot" and install it (it's by GitHub — the verified one)
4. Sign in with your GitHub account when prompted
5. Make sure you have a Copilot subscription (free for students — see [GitHub Education](https://education.github.com/))

**How to use Copilot Chat:** Press ⌘+I (Mac) or Ctrl+I (Windows) to open the chat panel. This is where you'll type instructions to the AI. You can also click the Copilot icon in the sidebar.

In Copilot Chat, enable **Agent Mode** — it lets the AI edit files, run commands, and iterate on code autonomously (instead of just suggesting snippets). Look for the mode selector at the top of the chat panel.

### 2. Install OpenAI Codex
Codex is a terminal-based agentic coding tool. While Copilot Chat works inside VS Code, Codex works in your regular terminal — you describe what you want in plain English and it writes and runs code for you.

1. Install via npm: `npm install -g @openai/codex`
2. If you don't have npm, install [Node.js](https://nodejs.org/) first (which includes npm)
3. Run `codex --help` to verify it works
4. Codex uses your GitHub Copilot credentials, so if you're signed into Copilot, you're good

**When to use which:**
- **Copilot Chat (in VS Code):** Best for working with files you have open, editing code, and conversations where you want to see changes in context
- **Codex (in terminal):** Best for autonomous tasks like "implement this whole module" or "run all tests and fix failures" — it works more independently

You'll use both throughout this program. The instructions will tell you which one to use for each step.

### 3. Install the SOLO workflow files
These are text files that teach the AI *how* to behave when you give it specific instructions. They're like recipes — you point the AI at a recipe file and say "follow this."

1. Open your terminal
2. Navigate to where you want your project:
   - **Mac/Linux/PowerShell:** `cd ~/Projects` (or wherever)
   - **Windows Command Prompt:** `cd %USERPROFILE%\Projects`
3. Create your project folder: `mkdir study-tracker && cd study-tracker`
4. Clone and set up the SOLO workflows:
   - **Mac/Linux:**
     ```bash
     git clone https://github.com/mario-guerra/solo-protocol-release.git .solo-temp
     mkdir -p workflows
     cp .solo-temp/workflows/*.md workflows/
     rm -rf .solo-temp
     ```
   - **Windows Command Prompt:**
     ```cmd
     git clone https://github.com/mario-guerra/solo-protocol-release.git .solo-temp
     mkdir workflows
     copy .solo-temp\workflows\*.md workflows\
     rmdir /s /q .solo-temp
     ```
   - **Windows PowerShell:**
     ```powershell
     git clone https://github.com/mario-guerra/solo-protocol-release.git .solo-temp
     mkdir -Force workflows
     copy-item .solo-temp/workflows/*.md workflows/
     remove-item -Recurse -Force .solo-temp
     ```
5. Open the `study-tracker` folder in VS Code: `code .`
6. Verify: you should see a `workflows/` folder in your Explorer panel containing files like `architect.md`, `critique.md`, `code.md`, etc.

### How to use SOLO workflows in Copilot Chat

Some agentic IDEs (like Cursor or Antigravity) let you type `/architect` as a slash command. **Copilot Chat doesn't work that way.** Instead, you reference the workflow file and tell the AI to follow it. Here's the pattern:

```
Follow the instructions in #file:workflows/architect.md to architect my project.
Here are my requirements: [your requirements here]
```

The `#file:` syntax tells Copilot Chat to read that file and include it as context. The AI then follows the instructions in the workflow file.

**Throughout this program, when you see an instruction like "run `/architect`", translate it to:**
> In Copilot Chat: `Follow the instructions in #file:workflows/architect.md — [your request]`

> In Codex: `Follow the instructions in workflows/architect.md — [your request]`

Here's the quick translation for every SOLO command:

| SOLO Command | What to type in Copilot Chat |
|---|---|
| `/architect` | `Follow #file:workflows/architect.md — [your request]` |
| `/critique` | `Follow #file:workflows/critique.md — critique the plan above` |
| `/revise` | `Follow #file:workflows/revise.md — address these findings: [list]` |
| `/code` | `Follow #file:workflows/code.md — implement based on the plan` |
| `/review` | `Follow #file:workflows/review.md — review the code` |
| `/fix` | `Follow #file:workflows/fix.md — fix the issues from the review` |
| `/test` | `Follow #file:workflows/test.md — run all tests and fix failures` |
| `/sherlock` | `Follow #file:workflows/sherlock.md — [describe the symptom]` |
| `/memory` | `Follow #file:workflows/memory.md — save session context` |
| `/resume` | `Follow #file:workflows/resume.md — restore context from .tmp/SESSION_MEMORY.md` |

You'll get used to this quickly. After a few modules it'll be muscle memory.

### 4. Verify Python
Run the version check in your terminal (you need Python 3.10 or higher):
- **Mac/Linux:** `python3 --version`
- **Windows:** `python --version`
If it's not installed or is an older version, go to [python.org](https://python.org) and install it.
