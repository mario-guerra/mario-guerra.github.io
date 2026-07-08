---
title: "Define Your Interfaces First"
moduleNumber: 7
slug: "interfaces"
description: "Establish strict function signatures before implementing backend logic."
soloCommand: "code"
pillar: "02: API-First"
checkpoint: true
---

# Module 7: Define Your Interfaces First

**Pillar 02:** *"Get the contracts solid first."*

### What you need to know first

**Interface:** The "shape" of how two pieces of code talk to each other. When you write a function, the interface is: what it's called, what it takes in (parameters), and what it gives back (return value).

```python
# This function's interface:
#   Name: log_session
#   Takes: class_name (string), date (string), hours (float), notes (string or None)
#   Returns: True if saved successfully, False if validation fails
def log_session(class_name: str, date: str, hours: float, notes: str = None) -> bool:
    ...
```

**Why interfaces matter:** If you define your functions' inputs and outputs *before* writing the code inside them, you can change *how* a function works without breaking everything that calls it. This is especially important with AI — the AI might rewrite a function's internals, but if it changes the interface, everything that uses that function breaks.

### The SOLO idea
Pillar 02 in the blog is called "API-First design." An API is just an interface for web services — the same concept applied to the internet. For your project (a CLI tool, not a web app), the principle is the same: **decide what your functions take and return before writing what's inside them.**

---

### Lab 7: Design the Contract

**Estimated AI conversations: 1-2**

1. **List your program's modules.** Based on your spec and plan, your study tracker probably has these responsibilities:
   - **Storage:** Load and save sessions to/from the JSON file
   - **Validation:** Check that inputs are valid (non-empty class name, positive hours, valid date)
   - **Commands:** The logic for each user command (log, list, summary, delete, export)
   - **Display:** Formatting output for the terminal

2. **Define the interfaces.** Create a file called `interfaces.md` and write out every function signature for each module — name, parameters (with types), return value, and one sentence about what it does:

   ```markdown
   ## storage.py
   - `load_sessions(filepath: str) -> list[dict]`
     Load all sessions from the JSON file. Returns empty list if file doesn't exist.
   - `save_sessions(filepath: str, sessions: list[dict]) -> None`
     Write all sessions to the JSON file. Creates the file if it doesn't exist.

   ## validation.py
   - `validate_class_name(name: str) -> str | None`
     Returns an error message if invalid, None if valid.
   - `validate_hours(hours_input: str) -> tuple[bool, float | str]`
     Returns (True, parsed_float) if valid, (False, error_message) if not.

   ## commands.py
   - `cmd_log(sessions: list[dict]) -> list[dict]`
     Prompt user for session info, validate, add to list, return updated list.
   ...
   ```

3. **Ask the AI to review your interfaces.** In Copilot Chat, type:
   > Review #file:interfaces.md — Are any of these function interfaces ambiguous? Do any return types make it hard for callers to use them? Did I miss any functions I'll need?

4. **Update your interfaces** based on feedback, then implement. In Copilot Chat, type:
   > Follow #file:workflows/code.md — Implement the study tracker following the exact function signatures in #file:interfaces.md. Do not change the parameter names, types, or return types.

5. **Run tests** to verify everything still works: `pytest -v`

6. **Commit:**
   ```bash
   git add .
   git commit -m "Refactored to defined interfaces"
   git push
   ```
