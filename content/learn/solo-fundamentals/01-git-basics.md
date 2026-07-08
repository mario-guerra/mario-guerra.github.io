---
title: "Learn Git (The Basics)"
moduleNumber: 1
slug: "git-basics"
description: "Learn enough git to save your work, track changes, and collaborate safely."
soloCommand: null
pillar: null
checkpoint: true
---

# Module 1: Learn Git (The Basics)

**Goal:** Learn enough git to save your work, track changes, and collaborate. You need this before everything else.

### What you need to know first

**Git** is a tool that tracks every change you make to your code. Think of it like "Track Changes" in Google Docs, but for code files. It lets you:
- Save snapshots of your project (called **commits**) that you can go back to
- Work on new features without messing up what already works (called **branches**)
- Put your code online so others can see it (using **GitHub**)

**Why this matters for agentic coding:** The AI will modify your files constantly. Sometimes it breaks things. Git lets you undo those changes instantly instead of trying to remember what the code looked like before.

---

### Lab 1: Your First Repository

**Estimated AI conversations: 0** (this one's all you)

1. **Install git** (if not already installed):
   - Mac: Open Terminal, type `git --version`. If it's not installed, it'll prompt you to install it.
   - Windows: Download from [git-scm.com](https://git-scm.com)

2. **Configure git** (one-time setup):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.aggie.email@tamu.edu"
   ```

3. **Initialize your project:**
   - Go to your project folder:
     - **Mac/Linux/PowerShell:** `cd ~/Projects/study-tracker`
     - **Windows Command Prompt:** `cd %USERPROFILE%\Projects\study-tracker`
   - Initialize git:
     ```bash
     git init                        # turn this folder into a git repo
     ```

4. **Create your first file and commit it:**
   - Create a file called `README.md` (you can do this in VS Code, or run `echo # Study Tracker > README.md` in terminal).
   - Commit the file:
     ```bash
     git add README.md               # stage the file (tell git you want to save it)
     git commit -m "Initial commit"  # save the snapshot with a message
     ```

5. **Put it on GitHub:**
   - Go to [github.com](https://github.com), sign in, click "New repository"
   - Name it `study-tracker`, keep it public, **don't** check "Add a README" (you already have one)
   - Follow the "push an existing repository" instructions GitHub gives you

6. **Practice the daily workflow** — create a file called `notes.txt`, write anything in it, then:
   ```bash
   git add notes.txt
   git commit -m "Add notes file"
   git push
   ```

7. **Learn to undo** — this is the most important part:
   ```bash
   # See what changed since your last commit
   git status

   # See the actual changes line-by-line
   git diff

   # Undo all changes since the last commit (CAREFUL: this erases uncommitted work)
   git checkout -- .

   # Go back to a previous commit to see what the code looked like
   git log --oneline          # see your commit history (shows list of hashes + messages)

   # ⚠️ Replace '<commit-hash>' with a real 7-character hash from your log output (e.g., git checkout a1b2c3d)
   git checkout <commit-hash> # go to that snapshot (read-only)

   git checkout main          # come back to the present (or 'master' if your main branch is named master)
   ```

---

### Git commands you need (and nothing else, for now)

| Command | What it does |
|---------|-------------|
| `git init` | Start tracking a folder |
| `git add <file>` | Stage a file for saving |
| `git add .` | Stage everything that changed |
| `git commit -m "message"` | Save a snapshot |
| `git push` | Upload to GitHub |
| `git pull` | Download from GitHub |
| `git status` | See what changed |
| `git diff` | See the actual changes |
| `git log --oneline` | See commit history |
| `git checkout -- .` | Undo all uncommitted changes |

> **You don't need to learn branches, merging, rebasing, or anything else right now.** That stuff matters for teams. You're working solo (pun intended). Just commit often, push daily, and know how to undo.
