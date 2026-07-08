---
title: "Credential Hygiene & Session Tokens (JWTs)"
moduleNumber: 2
slug: "env-hygiene-jwt"
description: "Implement credential environment loading and generate signed stateless JWT tokens."
soloCommand: "architect, critique, revise, code"
pillar: "03: Security-First"
checkpoint: true
---

# Module 2: Credential Hygiene & Session Tokens (JWTs)

**Goal:** Load API configuration securely from the environment and issue cryptographically signed JWT login tokens.

### What you need to know first

**Credential Hygiene:** Never commit secret keys, database passwords, or auth tokens to Git. If you push a secret key to GitHub, scanners will find it and compromise your system. Instead, store secrets in a local `.env` file that is excluded from Git, and load them at runtime.
- *⚠️ Environment Scope Warning:* Putting secrets inside `.env` does NOT load them into your local command-line shell session. If you type `echo $JWT_SECRET` in your terminal, it will return blank. The `.env` file variables are loaded exclusively into the memory of your running Python process when the `python-dotenv` library executes at script startup.

**Stateful vs. Stateless Sessions (JWTs):** 
- **Stateful (The List):** In traditional setups, when a user logs in, the server registers the session in its database and keeps track of it. This is like a teacher maintaining a paper list of students allowed out of the room. Every time a student asks to go out, the teacher must read the list.
- **Stateless (The Hall Pass):** A JWT (JSON Web Token) acts like a **digitally signed hall pass**. When a user logs in successfully, the server creates a text ticket (the JWT) containing details like `user_id` and an expiration timestamp. The server signs the pass using its secret key and hands it to the client. The client includes this pass on every request. The server doesn't need to consult a database list—it just verifies that the signature on the pass is valid and hasn't been forged.
  - A JWT has three dot-separated parts:
    1. **Header:** The type of token and hashing algorithm.
    2. **Payload:** The visible data (e.g. user ID, username, expiration time). *Warning: anyone can decode the payload, so never store sensitive data like passwords inside it.*
    3. **Signature:** The cryptographic proof verifying the token wasn't altered. It is signed using the secret key.

---

### The SOLO idea
Before using JWTs, you must establish environment boundaries. Under **Pillar 03: Security-First**, setting up a `.env` file and updating `.gitignore` is a hard checkpoint before writing login routes. We use the planning loop to review the token's lifetime and verify it expires.

---

### Lab 2: Safe Tokens

**Estimated AI conversations: 3**

1. Install dependencies:
   ```bash
   pip install python-dotenv pyjwt
   ```
2. Create a `.env` file in your project root:
   ```env
   JWT_SECRET=generate_a_long_random_string_here
   ```
3. **CRITICAL STEP:** Add `.env` to your `.gitignore` file. Test it: run `git status`. Verify that `.env` is *not* listed as an untracked file.
4. Load variables in `main.py`:
   ```python
   import os
   from dotenv import load_dotenv

   load_dotenv()
   JWT_SECRET = os.getenv("JWT_SECRET")
   ```
5. **Step A: Plan login tokens.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a `POST /login` endpoint in `main.py` that accepts `username` and `password`.
   > - Query the SQLite `users` table to find the user.
   > - Use `bcrypt.checkpw()` to verify the password attempt against the database hash.
   > - Plan to encode a JWT token containing payload keys `user_id`, `username`, and an expiration timestamp (`exp`). Sign it with `JWT_SECRET`.
   > - Return the token in JSON. If invalid, return a `401 Unauthorized`.
6. **Step B: Critique JWT payload.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the token signing plan. Are we setting a sensible expiration interval? Are we leak-testing (e.g. making sure we don't accidentally embed the password hash in the JWT payload)?
7. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to set a token expiration of 1 hour, using standard UTC timestamps.
8. **Step D: Implement.**
   > Follow #file:workflows/code.md — Implement the `/login` endpoint in `main.py` based on the plan.
9. Verify login via `curl`:
   * **Mac/Linux:**
     ```bash
     curl -i -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "mypassword"}' http://127.0.0.1:8000/login
     ```
   * **Windows:**
     ```cmd
     curl -i -X POST -H "Content-Type: application/json" -d "{\"username\": \"testuser\", \"password\": \"mypassword\"}" http://127.0.0.1:8000/login
     ```
   Verify you receive a JSON response with an `access_token` string.
7. Commit:
   ```bash
   git add .
   git commit -m "Module 2: JWT login token generation with environmental secrets"
   git push
   ```

---

### Checkpoint
Create `checkpoint_02.md`:
- Verify your `.gitignore` contains `.env`.
- Copy your login access token response and decode it using `jwt.io` (or a decode script). Paste the payload parameters visible in the token.
