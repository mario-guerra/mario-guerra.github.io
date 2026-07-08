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
   > Follow #file:workflows/architect.md — Plan to register Python REST-client functions as tools using the `google-genai` SDK.
   > - Write a function `add_study_task(title: str, hours: float) -> str` that sends an authenticated HTTP `POST` request to the local FastAPI development server at `http://127.0.0.1:8000/tasks`.
   > - Load `API_USERNAME`, `API_PASSWORD`, and `API_BASE_URL` from the local `.env` file using `python-dotenv`.
   > - Implement a token retrieval helper that logs in via `POST /login` and returns the JWT authorization header.
   > - Register this function as a tool in the model configuration list.
3. **Step B: Critique execution safety.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the tool calling architecture. How does the script handle situations where the local FastAPI server is offline? How are 401 Unauthorized or 400 Bad Request status codes parsed and reported back to the agent?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the code to add validation checks, catch `requests.exceptions.ConnectionError`, and gracefully pass error logs back to the model context.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the code in `agent_tools.py`.
6. Verify your implementation uses the standard tool registration format and hits the REST API endpoints:
   ```python
   import os
   import requests
   from dotenv import load_dotenv
   from google import genai
   from google.genai import types

   load_dotenv()

   client = genai.Client()
   BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")

   def get_jwt_token() -> str:
       """Logs in using credentials and returns a valid JWT token."""
       username = os.getenv("API_USERNAME")
       password = os.getenv("API_PASSWORD")
       response = requests.post(
           f"{BASE_URL}/login",
           data={"username": username, "password": password}
       )
       if response.status_code != 200:
           raise Exception("Authentication failed on the API server.")
       return response.json()["access_token"]

   # 1. Define tools with explicit docstrings and types
   def add_study_task(title: str, hours: float) -> str:
       """
       Sends a request to the FastAPI server to log a study task in the database.
       Use this whenever the student asks to log, save, record, or track a task.
       """
       if not title.strip():
          return "Error: task title cannot be empty."
       
       try:
           token = get_jwt_token()
           headers = {"Authorization": f"Bearer {token}"}
           response = requests.post(
               f"{BASE_URL}/tasks",
               json={"title": title, "hours": hours},
               headers=headers
           )
           if response.status_code == 201:
               return f"Success: Logged task '{title}' ({hours} hours) to database."
           return f"Failed: Server responded with status code {response.status_code}."
       except requests.exceptions.ConnectionError:
           return "Error: Could not connect to the API server. Make sure it is running locally."
       except Exception as e:
           return f"Error: {e}"

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
                   print(result)
   ```
7. Start your local FastAPI server from Course 3 (`uvicorn main:app --reload`), run the agent script with the prompt: *"Add 3 hours of biology homework."*, and verify the task appears in your local SQLite/Postgres database.

---

### Checkpoint
Create `checkpoint_03.md`:
- Paste your Python function definition containing the HTTP request and header configuration.
- Paste the console output verifying the task was logged successfully via the API.
