---
title: "Role-Based Authorization"
moduleNumber: 4
slug: "role-based-authz"
description: "Differentiate user permissions by implementing role check boundaries (regular vs admin)."
soloCommand: "architect, critique, revise, code, test"
pillar: "03: Security-First"
checkpoint: true
---

# Module 4: Role-Based Authorization

**Goal:** Implement access control logic that differentiates regular accounts from admin accounts.

### What you need to know first

**Authentication vs. Authorization:**
- **Authentication (AuthN):** "Who are you?" (Resolved in Module 3 via JWTs).
- **Authorization (AuthZ):** "What are you allowed to do?" (Resolved here via roles).

**Role-Based Access Control (RBAC):** Assigning permissions based on user categories.
- A regular user can only manage their own tasks.
- An administrator can view system-wide reports, audit histories, or delete any account.

---

### The SOLO idea
Permissions must be verified at the endpoint level, not the frontend. If the frontend hides the "Delete All" button from users, but the backend doesn't check the user's role on the DELETE endpoint, the system is vulnerable. We plan our roles and restrict route access using the planning loop.

---

### Lab 4: Admin Privileges

**Estimated AI conversations: 2-3**

1. Add a `role` column (TEXT, default 'user') to the database `users` table schema. Update `db.py`.
2. **Step A: Plan authorization checks.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan user schema and token changes:
   > - When generating a JWT token during login, include the user's `role` inside the payload.
   > - Create an admin-only GET endpoint `/admin/export` that returns a list of *all* tasks across all users in the system.
   > - Inside `/admin/export`, inspect the authenticated user's `role` from the JWT.
   > - If the role is not `admin`, raise an HTTP exception: `403 Forbidden` ("You do not have permission to access this resource").
3. **Step B: Critique authorization limits.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the admin access plan. Can a regular user forge the token to set their own role to 'admin' (e.g. if the secret is insecure)? Are we safely validating claims?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to ensure role claims are fully validated on the server and JWT signature verification is sound.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the role-based auth routing code in `main.py`.
6. Review the code. The role check should resemble:
   ```python
   if current_user["role"] != "admin":
       raise HTTPException(status_code=403, detail="Admin access required")
   ```
4. **Write automated integration tests in `test_main.py`:**
   - Assert that an admin user calling `/admin/export` gets a 200 OK and a global list of tasks.
   - Assert that a regular user calling `/admin/export` gets a 403 Forbidden.
5. Run the tests:
   ```bash
   pytest -v
   ```
6. Commit:
   ```bash
   git add .
   git commit -m "Module 4: role-based access control (RBAC) configured"
   git push
   ```

---

### Checkpoint
Create `checkpoint_04.md`:
- Paste the test cases verifying role-based authorization from `test_main.py`.
- Explain in 1 sentence why hiding buttons in the UI is not a secure way to enforce user authorization.
