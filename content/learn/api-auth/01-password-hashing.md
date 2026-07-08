---
title: "Passwords & Safe Storage (Hashing)"
moduleNumber: 1
slug: "password-hashing"
description: "Understand the risk of plaintext storage and implement bcrypt hashing for user registration."
soloCommand: "architect, critique, revise, code"
pillar: "03: Security-First"
checkpoint: true
---

# Module 1: Passwords & Safe Storage (Hashing)

**Goal:** Store user accounts securely in your SQLite database without ever writing raw passwords to disk.

### What you need to know first

**Plaintext Danger:** If a database is leaked, any passwords stored as plaintext are immediately exposed. Because users reuse passwords across different sites, a leak on your app compromises their email, banking, or social media accounts.

**Cryptographic Hashing:** A one-way function that takes input (a password) and produces a fixed-size string (a hash). It is mathematically impossible to reverse the hash back to the password.
- *Good practice:* We store the hash. When a user logs in, we hash their password attempt and check if it matches the stored hash.

**Salt:** A random string appended to the password before hashing. If two users have the same password, salts ensure their stored hashes are different, preventing attackers from using lookup tables (rainbow tables) to crack them.

**bcrypt:** A slow, secure hashing algorithm designed specifically for passwords. It uses an internal salt and a "work factor" to resist brute-force cracking.

---

### The SOLO idea
Security is built from the start. Under **Pillar 03: Security-First**, we do not write placeholder plain-text user login systems. Passwords are encrypted at the API input boundary. We plan database tables and hashing pipelines together using the planning loop before generating code.

---

### Lab 1: Hashed User Registration

**Estimated AI conversations: 2-3**

1. Install the `bcrypt` library:
   ```bash
   pip install bcrypt
   ```
2. Create a `users` table in your SQLite database. The schema should hold `id` (INTEGER PRIMARY KEY), `username` (TEXT UNIQUE), and `password_hash` (TEXT). You can add this table definition inside `db.py`.
3. **Step A: Plan registration.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a `POST /register` endpoint in `main.py` that accepts a JSON body with `username` and `password`.
   > - The plan must use `bcrypt` to generate a password hash.
   > - Save the username and the password hash into the SQLite `users` table.
   > - Detail how duplicate username errors are caught and handled by returning a `400 Bad Request`.
4. **Step B: Critique hashing safety.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique this plan. Does it accidentally log the raw password string during execution? Does it handle empty usernames or passwords correctly?
5. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to ensure raw passwords are never printed in logs and validation guarantees non-empty values.
6. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the registration route in `main.py`.
7. Review the code. The hash generation should use:
   ```python
   import bcrypt
   # Generate salt and hash the password bytes
   salt = bcrypt.gensalt()
   password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
   ```
5. Test registration using `curl`:
   * **Mac/Linux:**
     ```bash
     curl -i -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "mypassword"}' http://127.0.0.1:8000/register
     ```
   * **Windows:**
     ```cmd
     curl -i -X POST -H "Content-Type: application/json" -d "{\"username\": \"testuser\", \"password\": \"mypassword\"}" http://127.0.0.1:8000/register
     ```
6. Verify database contents:
   ```bash
   sqlite3 tasks.db "SELECT * FROM users;"
   ```
   Confirm that the password column contains a bcrypt string (like `$2b$12$...`) rather than `mypassword`.
7. Commit:
   ```bash
   git add .
   git commit -m "Module 1: user registration with bcrypt password hashing"
   git push
   ```

---

### Checkpoint
Create `checkpoint_01.md`:
- Paste the query output from your SQLite `users` table showing the hashed string.
- Explain in 1-2 sentences why a "salt" is appended to user passwords before hashing.
