---
title: "API Hardening (OWASP Basics)"
moduleNumber: 5
slug: "api-hardening"
description: "Protect your web application against common security vulnerabilities like brute-force guessing and parameter tampering."
soloCommand: "architect, critique, revise, code, test"
pillar: "03: Security-First"
checkpoint: true
---

# Module 5: API Hardening (OWASP Basics)

**Goal:** Protect your API against brute-force password guessing and verify raw injection vulnerabilities.

### What you need to know first

**OWASP (Open Web Application Security Project):** A global organization that tracks and lists the most critical security vulnerabilities in web applications (the OWASP Top 10).

**Brute-Force Attacks:** An attacker using automated scripts to guess passwords by submitting thousands of requests per minute.
- *Defense:* **Rate Limiting** middleware blocks client IPs that send too many requests within a specific timeframe (e.g. max 5 login requests per minute).

**SQL Injection Audit:** Verify database queries. Parameter binding ensures values are sanitized. Never concatenate parameters inside SQL strings.

---

### The SOLO idea
Hardening is a continuous validation process. Following **Pillar 03: Security-First**, we audit code for vulnerability vectors, write automated test cases to verify the bounds, and test limits. We plan rate-limiting scopes using the planning loop to prevent accidental system lockouts.

---

### Lab 5: Rate Limiting & Audit

**Estimated AI conversations: 3**

1. Install rate limiting package:
   ```bash
   pip install slowapi
   ```
2. **Step A: Plan rate limiting.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan adding rate-limiting middleware to `main.py` using the `slowapi` library.
   > - Plan to configure a limit of `5 requests per minute` on the `POST /login` route.
   > - If a client exceeds this limit, return a `429 Too Many Requests` status code.
3. **Step B: Critique lockouts.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the rate-limiting plan. Will it block mock integration tests from running? How does it resolve the client's real IP address behind a proxy?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to handle client IP resolution safely and bypass limits during test execution if needed.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the rate-limiting configuration in `main.py`.
6. Review the code. The integration should resemble:
   ```python
   from slowapi import Limiter, _rate_limit_exceeded_handler
   from slowapi.util import get_remote_address
   from slowapi.errors import RateLimitExceeded

   limiter = Limiter(key_func=get_remote_address)
   app.state.limiter = limiter
   app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

   @app.post("/login")
   @limiter.limit("5/minute")
   def login(...):
       ...
   ```
7. **Audit SQL Query boundaries:** Run a workspace search (or open file) to verify that no SQL queries contain raw string concatenation (e.g. `execute(f"...")`). If any exist, replace them with `execute("...", (args,))`.
8. **Write integration tests in `test_main.py`:**
   - Assert that making 6 consecutive requests to `POST /login` within a few seconds yields a `429` status code on the final attempt.
9. Run your tests:
   ```bash
   pytest -v
   ```
10. Commit:
    ```bash
    git add .
    git commit -m "Module 5: integrated login rate limiting and completed SQL parameter injection audit"
    git push
    ```

---

### Checkpoint
Create `checkpoint_05.md`:
- Paste the test case in `test_main.py` verifying rate limiting.
- Explain in 1 sentence why rate-limiting is essential for protecting the `/login` route.

---

### Next Step
Your Task Organizer REST API is secure, validated, and hardened against brute-force login attempts. However, it still only runs locally on your machine (`http://127.0.0.1:8000`).

Move on to **[Course 4: Cloud Deployment & DevOps](/learn/api-deploy/)** to learn Docker containerization and host your secure backend API live on production cloud servers!

