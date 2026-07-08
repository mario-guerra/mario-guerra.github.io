---
title: "State & Relational Persistence (SQLite)"
moduleNumber: 4
slug: "sqlite-persistence"
description: "Implement database storage using raw SQL queries and prevent SQL injection attacks."
soloCommand: "architect, critique, revise, code"
pillar: "03: Security-First"
checkpoint: true
---

# Module 4: State & Relational Persistence (SQLite)

**Goal:** Store your task data securely in a local relational database using raw SQL queries.

### What you need to know first

**State Persistence:** In previous modules, tasks were only saved in memory variables (which are erased when the server stops). To keep data permanently, we must write it to a database file.

**Relational Databases (SQLite):** 
- Think of a database like an **Excel Spreadsheet Workbook**:
  - **Tables** are like individual **Worksheets** inside the workbook (e.g. a `tasks` worksheet and a `users` worksheet).
  - **Columns** are the **Headers** specifying the data types (e.g., `id` is an integer, `title` is text).
  - **Rows** are the actual **Records** of data.
- **SQLite** is a lightweight engine that stores this entire spreadsheet structure in a single local file (e.g. `tasks.db`). 
- *⚠️ SQLite File Lock Warning:* Because SQLite is a simple local file, it only allows one writer connection at a time. If you open `tasks.db` in a database viewer app (like DB Browser for SQLite) to inspect your tables and try to run writing tests at the same time, the viewer might lock the file, causing uvicorn or pytest to crash with a `database is locked` error. Keep your GUI viewers closed or in read-only mode during tests.

**SQL Injection (SQLi):** A severe vulnerability where malicious code inside user input is executed as SQL.
- *Vulnerable (Concatenation):*
  ```python
  query = f"INSERT INTO tasks (title) VALUES ('{user_input}')"
  ```
  If `user_input` is `Task', '1'); DROP TABLE tasks; --`, the database will execute the DROP statement!
- *Secure (Parameter Binding):*
  ```python
  cursor.execute("INSERT INTO tasks (title) VALUES (?)", (user_input,))
  ```
  The database treats the input strictly as a text value, preventing code execution.

---

### The SOLO idea
Security is not a final step; it is a core feature. Following **Pillar 03: Security-First**, we never write concatenation-based query logic, even in temporary labs. Every query must use parameter placeholders. We plan our data layer and connection states *before* wiring them to endpoints.

---

### Lab 4: SQLite CRUD

**Estimated AI conversations: 3**

1. Create a database initialize script `db.py` in your project folder.
2. **Step A: Plan the database interface.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan the database helper in `db.py` that initializes an SQLite database file `tasks.db` with a table `tasks` containing columns: `id` (INTEGER PRIMARY KEY AUTOINCREMENT), `title` (TEXT), and `hours` (REAL).
   > - Plan a generator function `get_db()` that yields a database connection and closes it when finished.
   > - Configure the connection to use `sqlite3.Row` as its `row_factory` so that row records can be accessed like dictionaries (`row["title"]`).
3. **Step B: Critique database connections.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique this connection helper strategy. Will uvicorn lock the database if multiple requests run concurrently? Are we handling connections inside a `try...finally` block?
4. **Step C: Revise database helper.**
   > Follow #file:workflows/revise.md — Revise the plan to address database locking risks and connection safety (ensuring `conn.close()` always executes inside `finally`).
5. **Step D: Implement database helper.**
   > Follow #file:workflows/code.md — Write the finalized code in `db.py`.
6. Initialize your database:
   * **Mac/Linux/Windows:**
     ```bash
     python -c "import db; conn = db.sqlite3.connect('tasks.db') # or trigger helper creation"
     ```
7. **Step E: Plan, critique, and code the endpoints.** Follow the planning loop for endpoints:
   - **Plan:** Run `/architect` to map out replacing the stub functions in `main.py` using dependency injection with `Depends(get_db)` to acquire the database connection.
   - **Critique:** Run `/critique` to audit for SQL Injection. Verify every SQL command (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) uses `?` bindings and never string interpolation.
   - **Code:** Run `/code` to replace route logic.
8. Verify your API operations in the `/docs` UI. Confirm tasks are saved permanently in `tasks.db` even if you restart the server.
9. Commit:
   ```bash
   git add .
   git commit -m "Module 4: SQLite CRUD implemented with parameterized SQL and get_db generator"
   git push
   ```

---

### Checkpoint
Create `checkpoint_04.md`:
- List the SQL query statement templates used in your routes (e.g. `INSERT INTO tasks (title, hours) VALUES (?, ?)`).
- What does setting `conn.row_factory = sqlite3.Row` do under the hood, and why is it useful when returning data as JSON in FastAPI?
- What does the SQL placeholder `?` accomplish from a security perspective?
