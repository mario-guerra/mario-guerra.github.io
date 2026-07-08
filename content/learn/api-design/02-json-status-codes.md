---
title: "The Language of the Web"
moduleNumber: 2
slug: "json-status-codes"
description: "Learn how to structure data payloads and return semantic HTTP status codes."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 2: The Language of the Web (JSON & Status Codes)

**Goal:** Accept incoming structured payloads and return correct status indicators.

### What you need to know first

**JSON (JavaScript Object Notation):** The text-based standard for structured data payloads. It represents lists (arrays) and dictionaries (objects) as text:
```json
{
  "title": "Study Python",
  "hours": 2.5
}
```

**HTTP Status Codes:**
- **2xx (Success):** E.g. `200 OK` (general success) or `201 Created` (new resource saved).
- **4xx (Client Error):** E.g. `400 Bad Request` (payload missing parameters) or `404 Not Found`.
- **5xx (Server Error):** E.g. `500 Internal Server Error` (your code crashed).

---

### The SOLO idea
Clean APIs never crash (returning 500 error logs) when users send bad data. You must intercept inputs at the route boundary, validate their types, and return descriptive `4xx` client errors. To ensure all inputs are guarded, plan the validator schema before writing the endpoint.

---

### Lab 2: Validated POST Request

**Estimated AI conversations: 2-3**

1. Run the server (`python main.py`).
2. **Step A: Plan validation boundaries.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a POST endpoint at `/tasks` in `main.py` that accepts a JSON body with keys `title` (string) and `hours` (float). 
   > - If `title` is empty, return a JSON error message with status code `400 Bad Request`.
   > - If `hours` is negative, return a JSON error message with status code `400 Bad Request`.
   > - Otherwise, return a JSON message containing the keys and a status code `201 Created`.
3. **Step B: Critique boundaries.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the validation plan. What happens if the user sends letters in the `hours` field? What if the field is missing entirely?
4. **Step C: Revise validation.**
   > Follow #file:workflows/revise.md — Revise the plan to handle missing keys and invalid type formatting (like letters inside floats) by returning 400 Bad Request.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Implement the `/tasks` validated POST handler in `main.py`.
6. Read the code. FastAPI handles data parsing automatically, but manually checking value limits in code reinforces boundary validation.
4. **Test the validation using curl:**
   - **Mac/Linux:**
     ```bash
     # Test Success (201)
     curl -i -X POST -H "Content-Type: application/json" -d '{"title": "Algorithms", "hours": 2.0}' http://127.0.0.1:8000/tasks

     # Test Fail (400)
     curl -i -X POST -H "Content-Type: application/json" -d '{"title": "", "hours": -1.5}' http://127.0.0.1:8000/tasks
     ```
   * **Windows (Command Prompt / PowerShell):**
     *Note: Windows escape syntax for double quotes in JSON requires backslashes.*
     ```cmd
     # Test Success (201)
     curl -i -X POST -H "Content-Type: application/json" -d "{\"title\": \"Algorithms\", \"hours\": 2.0}" http://127.0.0.1:8000/tasks

     # Test Fail (400)
     curl -i -X POST -H "Content-Type: application/json" -d "{\"title\": \"\", \"hours\": -1.5}" http://127.0.0.1:8000/tasks
     ```

5. Review the outputs. Verify that the headers contain `HTTP/1.1 201 Created` for the valid request and `HTTP/1.1 400 Bad Request` for the invalid request.
6. Commit:
   ```bash
   git add main.py
   git commit -m "Module 2: added validated POST /tasks endpoint"
   git push
   ```

---

### Checkpoint
Create `checkpoint_02.md`:
- Paste the raw header outputs for both the successful and failed requests.
- Why is it bad design to return status code `200 OK` when an operations request fails due to bad input data? (E.g. returning `{"error": "invalid data"}` with code 200).
