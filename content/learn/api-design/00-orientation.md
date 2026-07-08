---
title: "Orientation: API Design"
moduleNumber: 0
slug: "orientation"
description: "Understand what web APIs are, and plan the structure of the Task Organizer API."
soloCommand: null
pillar: null
checkpoint: false
---

# Orientation: API Design

Welcome! In this curriculum, you'll move from building standalone command-line applications to building **web services** that other applications, websites, and mobile apps can communicate with.

> [!NOTE]
> **Sequential Prerequisite (Step 2 of 5)**
> This program is **Step 2** in your learning path. We highly recommend completing the **SOLO Fundamentals** program first, as we build directly on top of the git workflows and developer habits established in that course.

### What is a Web API?
An API (Application Programming Interface) is a bridge that allows different software systems to talk to each other over a network. Instead of a human interacting with a terminal or UI, another program calls your API to load data, save logs, or verify status.

### What you will build
Across this course, you will build a **Task Organizer Web API**. 
- It will run locally on your computer.
- It will receive HTTP requests containing task details.
- It will store, retrieve, update, and delete tasks in a local **SQLite database** using raw SQL queries.
- It will be fully tested using automated integration tests.

---

### Tools & Setup
We will use **FastAPI**, a modern, fast web framework for building APIs in Python.

#### Platform-Agnostic Setup Instructions:

1. Create a new folder for this project: `mkdir task-api && cd task-api`
2. Set up a Python virtual environment.
   - **Why a Virtual Environment?** Think of it like an **isolated sandbox**. If you install libraries globally, they can conflict with other Python homework projects. Setting up `.venv` gives this project its own private toolkit that won't mess up anything else on your computer.
   - **Mac/Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows (Command Prompt):**
     ```cmd
     python -m venv .venv
     .venv\Scripts\activate.bat
     ```
   - **Windows (PowerShell):**
     ```powershell
     python -m venv .venv
     .venv\Scripts\Activate.ps1
     ```
     *⚠️ Troubleshooting PowerShell:* If you get an error saying `Script execution is disabled on this system`, PowerShell is blocking your activation script. Fix this by running:
     `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
     Then try the activation command again.
3. Install the dependencies:
   ```bash
   pip install fastapi uvicorn pydantic pytest httpx
   ```
4. Verify your environment is clean, then commit:
   ```bash
   git init
   echo ".venv/" > .gitignore
   echo "__pycache__/" >> .gitignore
   git add .
   git commit -m "Orientation: environment initialized"
   ```
