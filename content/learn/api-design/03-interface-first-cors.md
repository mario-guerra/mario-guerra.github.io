---
title: "Interface-First Design & CORS"
moduleNumber: 3
slug: "interface-first-cors"
description: "Define Pydantic schemas, stub out API routes, and configure CORS middleware."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 3: Interface-First Design & CORS

**Goal:** Establish your API endpoints' signatures and configure CORS headers.

### What you need to know first

**Pydantic:** A library Python uses to validate data structures. By defining a class inheriting from Pydantic's `BaseModel`, you get automatic type checking:
```python
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    hours: float
```
FastAPI reads this model and rejects requests automatically if the types don't match, returning `422 Unprocessable Entity`.

*⚠️ Access Syntax Warning:* A regular Python dictionary is accessed using bracket notation: `task["title"]`. However, a Pydantic `BaseModel` behaves like a **custom class object**, meaning you must access its fields using **dot notation**: `task.title`. If you try to write `task["title"]`, your Python script will crash with a `TypeError`.

**CORS (Cross-Origin Resource Sharing):** A security restriction implemented by browsers. 
- Think of CORS like **Passport Control at an airport**. 
- By default, if a website hosted at `http://myportfolio.com` tries to request data from your API running on a different origin (`http://localhost:8000`), the browser gets suspicious. It stops the request and asks the API: *"Is this website allowed to talk to you?"*
- If your API doesn't send back specific headers (like `Access-Control-Allow-Origin: *` or `Access-Control-Allow-Origin: http://myportfolio.com`), the browser blockades the response, throwing a CORS error in the Console. We configure CORS middleware to give our API its "passport approval stamps."

---

### The SOLO idea
By stubbing out your routes (defining the path, parameters, and types without writing the internal logic) and viewing them in the auto-generated `/docs` Swagger dashboard, you verify that your system contract is correct *before* wasting time implementing operations. Always run critique on your schemas to verify types match requirements.

---

### Lab 3: Defining the Contract

**Estimated AI conversations: 2-3**

1. Create a plan for your task API routes:
   - `POST /tasks` — Create a task (needs title, hours)
   - `GET /tasks` — List all tasks
   - `PUT /tasks/{task_id}` — Update a task (needs title, hours)
   - `DELETE /tasks/{task_id}` — Delete a task
2. **Step A: Plan the Interfaces.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Define the Pydantic schemas (TaskCreate, TaskResponse) and write stubs for the 4 CRUD routes (POST, GET, PUT, DELETE) in `main.py` using empty function handlers. 
   > Also, plan to configure FastAPI's `CORSMiddleware` in `main.py` to allow all origins (`*`) during local development.
3. **Step B: Critique the Contract.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the schemas and route stubs. Are the response types structured cleanly? Is `TaskResponse` containing a generated `id` property?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to ensure `TaskResponse` inherits from `TaskCreate` and adds `id: int`.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the stub routes and CORS middleware configuration in `main.py`.
6. Review the code. It should include the CORS setup:
   ```python
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```
4. Start your server and navigate to `http://127.0.0.1:8000/docs` in your browser.
5. Inspect the routes. You should see POST, GET, PUT, and DELETE listed cleanly.
6. Commit:
   ```bash
   git add main.py
   git commit -m "Module 3: Stubbed CRUD routes and configured CORS middleware"
   git push
   ```

---

### Checkpoint
Create `checkpoint_03.md`:
- Screenshot your Swagger UI dashboard (or list the routes and schema models visible on the page).
- What error does a web browser display in its Console if an API doesn't include CORS headers? (E.g. "Access to fetch at... from origin... has been blocked by CORS policy").
