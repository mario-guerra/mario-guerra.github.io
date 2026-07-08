---
title: "Tool Calling & Function Execution"
moduleNumber: 3
slug: "tool-calling"
description: "Register local Python functions as tools to allow Gemini to read and write database files autonomously."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 3: Tool Calling & Function Execution

**Goal:** Bind local Python execution functions to the Gemini API, letting the LLM read/write local files autonomously.

### What you need to know first

**The Limitation of LLMs:** A standard language model is isolated. It doesn't know the current date, it can't check if a file exists on your computer, and it can't query your databases.

**Tool Calling (Function Calling):** A standard protocol where you present your local Python functions to the model as "tools".
- You provide the function name, its docstring (explaining what it does), and its argument types.
- The model doesn't run your code directly. Instead, when it needs to answer a prompt, it returns a **Function Call Request** indicating: *"I want to run function `add_task` with arguments `title='Study SQL', hours=2.0`."*
- Your local Python application executes the function, captures the return text, and sends it back to the model to formulate a final response.

---

### The SOLO idea
Never let an agent access tools without defining boundaries. Following **Pillar 02: API-First**, we declare our functions, parameters, and return types clearly in Python docstrings first. The model relies completely on your docstrings to understand how to call your tools.

---

### Lab 3: Connecting Your Database to Gemini

**Estimated AI conversations: 2-3**

1. Create a script named `agent_tools.py`.
2. **Step A: Plan the Tool Registry.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan to register Python file-writing functions as tools using the `google-genai` SDK.
   > - Write a function `add_study_task(title: str, hours: float) -> str` that writes task details to a local JSON file `tasks.json`.
   > - Write a function `read_study_tasks() -> list[dict]` that reads task logs.
   > - Register both functions in the `tools` configuration list during a model generation call.
3. **Step B: Critique execution safety.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the tool calling architecture. How does the script handle situations where the LLM passes invalid argument types (like passing a string instead of a float for hours)? How do we intercept and sanitize input variables?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the code to add validation checks inside the tool functions and gracefully pass exceptions back to the model context.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the code in `agent_tools.py`.
6. Verify your implementation uses the standard tool registration format:
   ```python
   import json
   import os
   from google import genai
   from google.genai import types

   client = genai.Client()

   # 1. Define tools with explicit docstrings and types
   def add_study_task(title: str, hours: float) -> str:
       """
       Logs a study task to the local JSON file. 
       Use this whenever the student asks to log, save, record, or track a task.
       """
       if not title.strip():
           return "Error: task title cannot be empty."
       
       task = {"title": title, "hours": hours}
       tasks = []
       if os.path.exists("tasks.json"):
           with open("tasks.json", "r") as f:
               tasks = json.load(f)
       
       tasks.append(task)
       with open("tasks.json", "w") as f:
           json.dump(tasks, f, indent=2)
       
       return f"Success: Logged task '{title}' ({hours} hours)."

   # 2. Register tools during execution
   def run_agent(prompt: str):
       response = client.models.generate_content(
           model='gemini-2.5-flash',
           contents=prompt,
           config=types.GenerateContentConfig(
               tools=[add_study_task],
           ),
       )
       
       # Check if the model wants to call a function
       if response.function_calls:
           for call in response.function_calls:
               name = call.name
               args = call.args
               print(f"[Model request] Executing function '{name}' with args {args}")
               
               if name == "add_study_task":
                   result = add_study_task(title=args["title"], hours=float(args["hours"]))
                   
                   # Send result back to model to get final statement
                   # (Standard agent callback loop)
                   print(result)
   ```
7. Run the script prompting: *"Add 3 hours of biology homework."* Open `tasks.json` and verify the row was logged automatically.

---

### Checkpoint
Create `checkpoint_03.md`:
- Paste your Python function definition containing the detailed docstrings.
- Paste a copy of the JSON output written inside `tasks.json` by the model call.
