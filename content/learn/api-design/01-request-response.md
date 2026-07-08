---
title: "The Request-Response Loop"
moduleNumber: 1
slug: "request-response"
description: "Demystify HTTP communication by building a running web server in Python."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 1: The Request-Response Loop

**Goal:** Understand how web servers receive instructions and return data over HTTP.

### What you need to know first

**Client-Server Model:** The client (e.g., a browser, a mobile app, or a command-line tool) makes a **Request**. The server (your running Python script) listens for requests, processes them, and returns a **Response**.

**HTTP (HyperText Transfer Protocol):** The format used to send requests and responses. Think of an HTTP request like sending a physical **letter in an envelope**:
- **The Envelope (Headers & Metadata):** 
  - **Method (Verb):** E.g., `GET` (fetch data) or `POST` (create new data). This is the instruction.
  - **Path (Endpoint):** E.g., `/tasks`. This is the delivery address.
  - **Headers:** Small metadata details written on the envelope (e.g., `Content-Type: application/json` tells the server the letter inside is formatted as JSON).
- **The Letter Inside (The Body):** The actual payload data being sent (e.g., the details of a new task).
- **The Response (The Return Mail):** The server sends back its own envelope with a **Status Code** (like `200 OK` meaning success, or `404 Not Found` meaning wrong address) and a response body.

---

### The SOLO idea
Even for the simplest endpoints, we never bypass the planning loop. Jumping straight to coding without defining requirements leads to ad-hoc structures. We follow the exact sequence: `/architect` → `/critique` → `/revise` → `/code`.

---

### Lab 1: Your First Web Server

**Estimated AI conversations: 2-3**

1. Create a file called `main.py` in your project folder.
2. **Step A: Plan the Endpoint.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a basic FastAPI server in main.py.
   > It needs a single GET endpoint at `/` that returns a JSON message: `{"status": "online"}`.
   > The plan should detail how the FastAPI instance is initialized and how uvicorn runs the app.
3. **Step B: Challenge the Plan.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the plan you just produced. Are there port conflicts or path issues?
4. **Step C: Revise the Plan.**
   > Follow #file:workflows/revise.md — Revise the plan to address the critique findings (like specifying a standard local port like 8000).
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Implement the server in `main.py` based on the finalized plan.
6. Verify the code matches this standard pattern:
   ```python
   from fastapi import FastAPI
   import uvicorn

   app = FastAPI()

   @app.get("/")
   def read_root():
       return {"status": "online"}

   if __name__ == "__main__":
       uvicorn.run("main:app", port=8000, reload=True)
   ```
4. Run your server:
   ```bash
   python main.py
   ```
   You should see logs indicating uvicorn is running on `http://127.0.0.1:8000`.

5. **Inspect the HTTP traffic:** Open a second terminal window and make a request using `curl`:
   * **Mac/Linux/Windows:**
     ```bash
     curl -i http://127.0.0.1:8000/
     ```
     The `-i` flag forces curl to show the **headers** returned by the server. Notice lines like:
     - `HTTP/1.1 200 OK` (Status code)
     - `content-type: application/json` (Data format header)
     - `{"status":"online"}` (Response body)

6. Close the server in your terminal with `Ctrl+C`.
7. **Commit your changes:**
   ```bash
   git add main.py
   git commit -m "Module 1: simple GET server running"
   git push
   ```

---

### Checkpoint
Create `checkpoint_01.md`:
- Paste the raw headers printed by your `curl -i` command.
- Explain in 1 sentence what the `200` in `HTTP/1.1 200 OK` represents.
