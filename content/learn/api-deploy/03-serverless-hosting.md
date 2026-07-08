---
title: "Serverless Cloud Hosting"
moduleNumber: 3
slug: "serverless-hosting"
description: "Deploy your Docker container to the public cloud using Render or GCP Cloud Run."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 3: Serverless Cloud Hosting

**Goal:** Launch your containerized API to public servers using Render or Google Cloud Run.

### What you need to know first

**Serverless Compute:** Instead of renting a computer in the cloud that runs 24/7 (and billing you 24/7), serverless compute hosts deploy your code as an ephemeral container. 
- When a request comes in, the host wakes up your container, processes the request, and responds.
- If no traffic arrives for a few minutes, the host suspends the container to save costs (**Scale-to-Zero**).
- Render and Google Cloud Run both offer massive serverless free tiers, enabling $0.00 hosting budgets.

---

### The SOLO idea
Before deploy steps, the planning loop is used to review the deployment parameters (minimum scale instance sizes, resource sizes). We ensure the container config is minimized to fit free-tier constraints.

---

### Lab 3: Public Deployment (Choose Your Track)

**Estimated AI conversations: 2**

#### Track A: Render (Recommended - No Credit Card Required)
1. Go to [Render.com](https://render.com) and create an account (no credit card required).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Select **Docker** as the Runtime environment.
5. In the Instance Type menu, select the **Free** tier.
6. Leave default commands, click **Advanced**, and add your variables (see Module 4 for secrets entry).
7. Click **Create Web Service**. Render will automatically clone your code, build the container image in the cloud, and deploy it to a public URL (e.g. `https://task-api.onrender.com`).

---

#### Track B: GCP Cloud Run (Optional - Credit Card Verification Required)
1. Go to [Google Cloud Console](https://console.cloud.google.com) and create an account.
2. **Billing Alarm Setup:** Search for **Billing** in the search bar, click **Budgets & Alerts**, and create a budget limit of **$1.00** with email notification alerts configured at 50% and 100% thresholds.
3. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) on your local computer.
   - *⚠️ Path Reload Warning:* Once the Google Cloud SDK installer completes, you **must close your current terminal window and open a fresh one** for the shell to reload its path list. If you do not restart your terminal, typing `gcloud` will fail with a `command not found` error.
4. Open your new terminal window and verify login:
   ```bash
   gcloud auth login
   ```
5. **Step A: Plan Cloud Run deployment.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan to deploy my FastAPI application from my local directory to Google Cloud Run using the `gcloud` CLI.
   > - The service should use the scale-to-zero configuration (`--min-instances 0`).
   > - The target deployment region should be a standard free-tier region (like `us-central1`).
   > - Detail the commands to submit the directory to GCP Cloud Build first so we don't build it locally.
6. **Step B: Critique scale settings.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the Cloud Run deployment plan. Are we securing endpoints? Is public access enabled (`--allow-unauthenticated`)?
7. **Step C: Revise & Execute.**
   > Follow #file:workflows/revise.md — Revise the plan to outline the final deployment script commands.
8. Deploy the API:
   ```bash
   # Build the container in the cloud and register it
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/task-api

   # Deploy the container to Cloud Run
   gcloud run deploy task-api --image gcr.io/[PROJECT_ID]/task-api --platform managed --region us-central1 --allow-unauthenticated --min-instances 0
   ```
   *(Replace `[PROJECT_ID]` with your GCP Project ID).*

---

### Checkpoint
Create `checkpoint_03.md`:
- Paste the public URL endpoint of your deployed Task Organizer API.
- Query the status path using curl (e.g., `curl -i https://[your-url]/`) and paste the response header output verifying status code 200.
