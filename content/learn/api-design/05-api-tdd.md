---
title: "Testing Web APIs (API TDD)"
moduleNumber: 5
slug: "api-tdd"
description: "Write integration tests using TestClient and assert status codes for happy and error paths."
soloCommand: "test"
pillar: "05: Test-Driven"
checkpoint: true
---

# Module 5: Testing Web APIs (API TDD)

**Goal:** Write integration tests asserting that your API routes return the expected JSON structures and status codes.

### What you need to know first

**Integration Testing:** Testing how different components (routing, serialization, validation, database queries) work together.

**FastAPI TestClient:** An HTTP client tool that simulates web requests on your running FastAPI code without needing to start uvicorn. It intercepts requests inside Python, making test runs extremely fast:
```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
```

---

### The SOLO idea
Your test suite is your definition of correctness. When expanding endpoints or securing routes, the tests run automatically to catch regression issues immediately. The AI must fix the application logic until tests are green; **never change the test values to bypass errors.**

---

### Lab 5: Endpoint Testing

**Estimated AI conversations: 2-3**

1. Create a test file `test_main.py` in your project folder.
2. **Step A: Plan the test setup.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan integration tests for `main.py` using `fastapi.testclient.TestClient` and `pytest`.
   > - The plan must use a temporary test SQLite database `test_tasks.db`.
   > - Plan a `pytest` fixture that overrides the `get_db` dependency in FastAPI with a connection to `test_tasks.db` using `app.dependency_overrides[get_db]`.
   > - Plan fixtures to delete and recreate the test database schema before every test execution.
3. **Step B: Critique testing isolation.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the database override plan. Does it guarantee that test runs do not read or write data to the production `tasks.db`? How are connections cleaned up?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the test strategy to make sure dependencies are overridden correctly and test files are cleaned up after runs.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the test suites in `test_main.py`.
6. Review the resulting setup. It should use the standard FastAPI override pattern:
   ```python
   import pytest
   from fastapi.testclient import TestClient
   from main import app
   from db import get_db
   import sqlite3

   # Define database override
   def override_get_db():
       conn = sqlite3.connect("test_tasks.db")
       conn.row_factory = sqlite3.Row
       try:
           yield conn
       finally:
           conn.close()

   app.dependency_overrides[get_db] = override_get_db
   client = TestClient(app)
   ```
7. Run your tests in the terminal:
   ```bash
   pytest -v
   ```
   *⚠️ Pytest Command Issues:* If your terminal throws a `pytest: command not found` or `ModuleNotFoundError`, your virtual environment is either not active or missing dependencies. Ensure you see `(.venv)` at the beginning of your terminal prompt. If you don't see it, run your activation command (e.g. `source .venv/bin/activate` or `.venv\Scripts\Activate.ps1`). If it is active but still throws errors, re-run `pip install pytest fastapi httpx` to ensure the testing packages are installed inside the isolated sandbox.
8. Ensure all tests pass. If any fail, check for database file locks or missing parameters.
9. Commit:
   ```bash
   git add test_main.py
   git commit -m "Module 5: integrated API tests with 100% pass rate and get_db overrides"
   git push
   ```

---

### Checkpoint
Create `checkpoint_05.md`:
- Paste the test summary output of `pytest -v`.
- Explain how using a separate test database file (or transactional rollback) ensures that test runs remain reproducible and reliable.

---

### Next Step
Your Task Organizer REST API is fully functioning, parameterized, and covered by automated tests. However, right now, anyone in the world can write to your database or delete your tasks.

Proceed to **[Course 3: Authentication & Security](/learn/api-auth/)** to protect your endpoints with user registration, secure bcrypt hashing, and JWT tokens!

