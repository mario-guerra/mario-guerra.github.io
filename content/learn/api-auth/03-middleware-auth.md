---
title: "Guarding the Gate (Auth Middleware)"
moduleNumber: 3
slug: "middleware-auth"
description: "Implement API auth dependencies to validate tokens and scope database queries to active users."
soloCommand: "architect, critique, revise, code, test"
pillar: "03: Security-First"
checkpoint: true
---

# Module 3: Guarding the Gate (Auth Middleware)

**Goal:** Intercept incoming requests to verify tokens and ensure users can only access their own data.

### What you need to know first

**Middleware/Dependencies (The Security Guard):** Code that runs *before* your endpoint functions execute. In FastAPI, we use a feature called **dependency injection** (using `Depends`). 
- Think of it like a security guard standing at the door of your functions. Before your route handler is allowed to run, FastAPI routes the request to the guard function first. 
- The guard inspects the `Authorization` header, extracts and decrypts the JWT pass, and verifies the signature. 
- If the signature is valid, the guard hands the user object to your route function and lets it run. If the signature is invalid or missing, the guard throws an HTTP exception immediately, blocking the request from ever reaching your code.

**Database Scoping (The Locker Keys):** 
- In CRUD systems, you must filter database actions using the authenticated user's ID.
  - *Insecure query:* `SELECT * FROM tasks WHERE id = ?`
  - *Secure query:* `SELECT * FROM tasks WHERE id = ? AND user_id = ?`
- Think of it like a gym locker room. Every locker has a number (`id`). If you only check the locker number, User A can open User B's locker simply by asking for that number. To make it secure, you must require both the locker number *and* the user's specific key (`user_id`). If the key doesn't match the locker, access is denied.

---

### The SOLO idea
Never trust route parameters blindly. Under **Pillar 03: Security-First**, we write secure database isolation queries immediately. User data must be isolated at the query layer. We plan our route dependencies and query filters together using the planning loop before generating code.

---

### Lab 3: Guardo & User Scope

**Estimated AI conversations: 3**

1. Create a `user_id` column (INTEGER) in your SQLite `tasks` table. Update the database schema definition.
2. **Step A: Plan the security gate.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a FastAPI dependency `get_current_user` in `main.py`.
   > - It must read the `Authorization` request header, extract the Bearer token, and decode it using `JWT_SECRET`.
   > - If validation fails (token expired, altered signature, missing header), return a `401 Unauthorized`.
   > - Plan to inject this dependency into the CRUD `/tasks` endpoints and re-write SQL queries to scope task actions to the authenticated user's `id`.
3. **Step B: Critique security isolation.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the gatekeeper plan. What happens if the `Authorization` header is poorly formatted (e.g. missing the word 'Bearer')? Does our SQLite query structure fully isolate operations?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to handle header formatting errors gracefully and double-check database isolation queries.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the dependency logic and update routes in `main.py`.
6. Review the implementation. A route definition with auth injection should look similar to:
   ```python
   @app.get("/tasks")
   def list_tasks(current_user: dict = Depends(get_current_user)):
       # SQLite query: SELECT * FROM tasks WHERE user_id = ?
       ...
   ```
7. **Write automated tests:** Open `test_main.py` and write tests to assert:
   - Requesting `/tasks` without a Bearer token returns 401.
   - User A logs in, logs a task. User B logs in, and calls GET `/tasks`. User B's task list must be empty.
8. Run the tests:
   ```bash
   pytest -v
   ```
9. Commit:
   ```bash
   git add .
   git commit -m "Module 3: guarded routes and user database scoping"
   git push
   ```

---

### Checkpoint
Create `checkpoint_03.md`:
- Paste the code snippet for your `get_current_user` auth dependency.
- Paste the test summary output of `pytest -v`.
- Explain how User A is blocked from deleting User B's tasks.
