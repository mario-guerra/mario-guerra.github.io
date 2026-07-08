---
title: "Continuous Deployment (CI/CD)"
moduleNumber: 5
slug: "cicd-pipeline"
description: "Automate code compilation and public deployments using GitHub Actions workflows."
soloCommand: "architect, critique, revise, code, test"
pillar: "05: Test-Driven"
checkpoint: true
---

# Module 5: Continuous Deployment (CI/CD)

**Goal:** Configure a GitHub Actions runner workflow that runs tests and deploys your code on every commit.

### What you need to know first

**CI/CD (Continuous Integration / Continuous Deployment):** 
- **Continuous Integration (CI):** Automating the process of running tests whenever code changes. This ensures that new features don't break existing functionality before deployment.
- **Continuous Deployment (CD):** Automatically compiling and launching the application to cloud servers once all tests pass.

**GitHub Actions:** GitHub's automation tool. It runs scripts inside temporary machines hosted by GitHub. You configure these scripts by writing a YAML workflow file in a folder named `.github/workflows/`.

---

### The SOLO idea
Automation must never bypass quality checks. Under **Pillar 05: Test-Driven**, your CI/CD pipeline must fail the build immediately if a single `pytest` integration test fails. No code is allowed to reach production if tests are broken. We plan our pipeline dependencies using the planning loop.

---

### Lab 5: Building the Pipeline

**Estimated AI conversations: 3**

Choose the track matching your deployment host:

#### Track A: Render CI/CD (No Credit Card)
Render handles CD automatically via **Deploy Hooks**.
1. Open your Render dashboard, select your service, and find the **Deploy Hook** URL in the settings.
2. In your local repository, create a directory `.github/workflows/` and a file named `deploy.yml`.
3. **Step A: Plan the pipeline.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a GitHub Actions workflow YAML in `.github/workflows/deploy.yml` that runs on push to the `main` branch.
   > - First Job (Test): Setup python, install `requirements.txt`, and run `pytest`.
   > - Second Job (Deploy): If the test job passes, execute a curl command to trigger the Render Deploy Hook.
4. **Step B: Critique credentials security.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the pipeline plan. Are we exposing the Render Deploy Hook URL in our public YAML file? (Hint: we need to use GitHub Repository Secrets).
5. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to load the Deploy Hook URL from `secrets.RENDER_DEPLOY_HOOK` in GitHub.
6. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the `deploy.yml` file.

---

#### Track B: GCP Cloud Run CI/CD (Credit Card Track)
1. **Step A: Provision the Service Account via CLI script.** Run this platform-agnostic shell script in your terminal to create the Service Account and bind the required roles in one step:
   * **Mac/Linux:**
     ```bash
     # Create Service Account
     gcloud iam service-accounts create github-deployer --display-name="GitHub Deployer"

     # Bind Artifact Registry Admin
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/artifactregistry.admin"

     # Bind Cloud Run Developer
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/run.developer"

     # Bind Service Account User (needed to bind roles)
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"

     # Generate authentication key file
     gcloud iam service-accounts keys create gcp-key.json --iam-account=github-deployer@[PROJECT_ID].iam.gserviceaccount.com
     ```
   * **Windows (Command Prompt):**
     *Note: Replace `[PROJECT_ID]` with your GCP Project ID before running.*
     ```cmd
     gcloud iam service-accounts create github-deployer --display-name="GitHub Deployer"
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/artifactregistry.admin"
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/run.developer"
     gcloud projects add-iam-policy-binding [PROJECT_ID] --member="serviceAccount:github-deployer@[PROJECT_ID].iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"
     gcloud iam service-accounts keys create gcp-key.json --iam-account=github-deployer@[PROJECT_ID].iam.gserviceaccount.com
     ```
2. Open your GitHub Repository dashboard, go to **Settings** → **Secrets and variables** → **Actions**, and add a new repository secret:
   - Name: `GCP_SA_KEY` | Value: Paste the entire content of `gcp-key.json`.
3. **CRITICAL SECURITY STEP:** Delete the local key file `gcp-key.json` immediately so it is never committed to Git:
   - **Mac/Linux:** `rm gcp-key.json`
   - **Windows CMD:** `del gcp-key.json`
   - **PowerShell:** `Remove-Item gcp-key.json`
4. **Step B: Plan the GCP workflow.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a GitHub Actions workflow in `.github/workflows/deploy.yml` that:
   > - Runs on push to the `main` branch.
   > - Runs python tests via `pytest`.
   > - If tests pass, authenticates using `GCP_SA_KEY`.
   > - Builds the Docker container, pushes it to Google Container Registry (or Artifact Registry), and deploys it to Cloud Run.
5. **Step C: Critique.**
   > Follow #file:workflows/critique.md — Critique the workflow plan. Are we passing the target project name and region variables cleanly?
6. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the `.github/workflows/deploy.yml` configuration file.

---

### Verify the CD Pipeline
- Push your changes to GitHub:
  ```bash
  git add .
  git commit -m "Module 5: configured CI/CD deployment pipeline"
  git push
  ```
- Open your GitHub repository in your browser, click on the **Actions** tab, and select the running workflow.
- Verify that the test job runs first and passes, followed by the deployment job.
- Open your public API URL and confirm the changes are active.

---

### Checkpoint
Create `checkpoint_05.md`:
- Paste the YAML content of your GitHub Actions `.github/workflows/deploy.yml` file.
- Screenshot (or copy the text summary of) a successful run from your GitHub Actions workflow history showing both test and deploy steps green.
