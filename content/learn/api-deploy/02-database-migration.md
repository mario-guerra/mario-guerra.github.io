---
title: "Relational Database Migration (Postgres)"
moduleNumber: 2
slug: "database-migration"
description: "Migrate your database connection from local SQLite to serverless PostgreSQL."
soloCommand: "architect, critique, revise, code, test"
pillar: "03: Security-First"
checkpoint: true
---

# Module 2: Relational Database Migration (Postgres)

**Goal:** Adapt your Python code to talk to a PostgreSQL database if configured in environment variables.

### What you need to know first

**Why SQLite fails in Serverless Cloud Hosting:** 
In serverless platforms (like GCP Cloud Run or Render), your running containers are **ephemeral** (temporary). If your API receives no requests for 15 minutes, the cloud platform deletes the running container to save power (scaling to zero). 

When a new request arrives, a fresh container is instantly started. If you use SQLite, your database file (`tasks.db`) will be deleted and recreated empty every time the container sleeps!

**PostgreSQL (Postgres):** An enterprise-grade relational database. It runs on a dedicated network connection separate from your API container, allowing database records to persist permanently.

**Neon.tech:** A serverless Postgres provider offering a fully managed database. It has a generous free tier (no credit card required) that automatically sleeps when not in use, keeping your cost at **$0.00**.

---

### The SOLO idea
We do not hardcode PostgreSQL connection settings. Following **Pillar 03: Security-First**, we write a relational adapter that dynamically loads connection strings from environment variables, reverting to local SQLite automatically if no postgres string exists. We plan the driver switch using the planning loop.

---

### Lab 2: Postgres Setup & code Migration

**Estimated AI conversations: 3**

1. Install the PostgreSQL database connector and setup tools:
   ```bash
   pip install psycopg2-binary
   ```
   *Note: We use `psycopg2-binary` instead of `psycopg2` to avoid local compilation failures on macOS and Windows.*
2. Create a free database account on [Neon.tech](https://neon.tech) (requires no credit card). 
3. Create your first project on Neon. In the creation wizard:
   - **Project Name:** Choose a name like `task-api-db`.
   - **Region:** Keep the default region (e.g. `AWS US East 1 (N. Virginia)`).
   - **Neon Auth Toggle:** **Leave this toggled OFF.** Do not enable it. (You spent the previous course building your own custom bcrypt hashing and JWT token middleware. Enabling "Neon Auth" would bypass the custom security framework you wrote).
4. Copy the **Connection String** URL from the dashboard (it will start with `postgresql://...`).
5. **Step A: Plan the database migration.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan database connector updates in `db.py` to support both SQLite and PostgreSQL.
   > - If the environment variable `DATABASE_URL` is defined (and starts with `postgres`), establish connection pools using `psycopg2` instead of `sqlite3`.
   > - Ensure the raw SQL statements remain compatible (Postgres uses `%s` as its query placeholder parameter instead of SQLite's `?`).
   > - Re-write query mapping functions to handle differences in parameter placeholders dynamically.
6. **Step B: Critique database compatibility.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the Postgres migration plan. Will the table initialization routines fail on Postgres because of differences in auto-increment keywords? (Hint: SQLite uses `AUTOINCREMENT` but Postgres uses `SERIAL`).
7. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to ensure schema initialization commands use standard postgres queries if a Postgres connection is active, and update test mock database connections.
8. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the updated connection code in `db.py`.
9. Add the `DATABASE_URL` string to your local `.env` file:
   ```env
   DATABASE_URL=postgresql://user:pass@ep-name.region.pooler.neon.tech/neondb?sslmode=require
   ```
10. Run your test suite locally to verify tests run and save records directly to the Postgres instance:
    ```bash
    pytest -v
    ```
11. Commit:
    ```bash
    git add .
    git commit -m "Module 2: integrated postgres database driver support using psycopg2-binary"
    git push
    ```

---

### Checkpoint
Create `checkpoint_02.md`:
- Paste the database connection checks code block from `db.py`.
- Explain in 1 sentence why local SQLite files are unsuitable for stateless, serverless deployments in the cloud.
