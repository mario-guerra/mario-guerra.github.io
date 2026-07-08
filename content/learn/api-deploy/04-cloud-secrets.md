---
title: "Cloud Secrets & Environment Configuration"
moduleNumber: 4
slug: "cloud-secrets"
description: "Inject runtime environment variables and database connections into your production container safely."
soloCommand: "architect, critique"
pillar: "03: Security-First"
checkpoint: true
---

# Module 4: Cloud Secrets & Environment Configuration

**Goal:** Bind database connection strings and security key variables to your production application securely.

### What you need to know first

**The Deployed Environment:** 
In local development, you loaded settings using a local `.env` file. In cloud environments, **no `.env` file exists inside the Docker container** (it was excluded by `.dockerignore` to prevent security leaks).

Instead, cloud providers inject environment variables directly into the container's operating system environment at runtime. Your Python code accesses them identically using `os.getenv()`.

---

### The SOLO idea
Credential separation is a core security border. Under **Pillar 03: Security-First**, we never hardcode fallback credentials in code if environment variables are missing. If a secret is missing, the application must crash immediately with a clear error logs record rather than proceeding with insecure default settings.

---

### Lab 4: Setting the Variables

**Estimated AI conversations: 1-2**

1. Identify the secrets required by your Task Organizer API:
   - `DATABASE_URL` (Connection string to the Neon Postgres database)
   - `JWT_SECRET` (Your private cryptographic token signature key)
2. **Apply the credentials inside your hosting provider:**

   - **If using Render (Track A):**
     1. Open your Render Dashboard, click on your Web Service, and go to the **Environment** tab.
     2. Click **Add Environment Variable**.
     3. Add:
        - Key: `DATABASE_URL` | Value: `[your-neon-postgres-connection-string]`
        - Key: `JWT_SECRET` | Value: `[generate-a-long-random-string]`
     4. Click **Save Changes**. Render will automatically trigger a redeploy of your application.

   - **If using GCP Cloud Run (Track B):**
     1. Open the GCP Console, navigate to **Cloud Run**, and click on your service `task-api`.
     2. Click **Edit & Deploy New Revision**.
     3. Scroll to the **Variables & Secrets** section.
     4. Add environment variables:
        - Name: `DATABASE_URL` | Value: `[your-neon-postgres-connection-string]`
        - Name: `JWT_SECRET` | Value: `[generate-a-long-random-string]`
     5. Click **Deploy**.

3. **Verify the connection:**
   - Wait for the deployment to finish successfully.
   - Navigate to your public URL Swagger documentation page (`https://[your-url]/docs`).
   - Use the Swagger UI to create a user account (`POST /register`) and login (`POST /login`).
   - Copy the returned JWT token, sign in via the Swagger "Authorize" key, and create a task (`POST /tasks`).
   - Check your Neon Database Console dashboard to verify the new task row is saved permanently in your Postgres tables.
   - Wait 15 minutes for the container to scale to zero (sleep), refresh the page, and check if your tasks still load successfully.

---

### Checkpoint
Create `checkpoint_04.md`:
- Explain in 1 sentence why storing secrets directly in a GCP Cloud Run environment dashboard is safer than checking a `.env` file into a GitHub repository.
- Paste a copy of the server logs output (visible in Render Logs or GCP Log Explorer) showing that the database successfully initialized the Postgres connection pool on start.
