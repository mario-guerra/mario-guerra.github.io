---
title: "Containerization (Docker)"
moduleNumber: 1
slug: "docker"
description: "Package your API and all its dependencies into an isolated container using Docker."
soloCommand: "architect, critique, revise, code"
pillar: "02: API-First"
checkpoint: true
---

# Module 1: Containerization (Docker)

**Goal:** Compile your FastAPI API and all its system requirements into an isolated container image.

### What you need to know first

**Virtual Machines vs. Containers:**
- **Virtual Machine (VM):** Simulates a complete physical computer, including its own operating system (OS). It is heavy, slow to boot, and consumes gigabytes of memory.
- **Container:** Shares the host computer's operating system kernel, separating only the application processes and library requirements. It is extremely lightweight, starts in milliseconds, and behaves identically on your computer, a Windows laptop, or a cloud rack.

**Docker:** The standard tool used to build and run containers.
- **Dockerfile:** A text file containing instructions to assemble your container image step-by-step.
- **Docker Image:** A read-only snapshot containing your code, python runtime, and package requirements.
- **Docker Container:** A running instance of your image.

---

### The SOLO idea
We do not write ad-hoc Docker files. We plan the container dependencies, base images, and port mappings systematically using the planning loop to prevent unnecessary build layers or security vulnerabilities (like running containers as root).

---

### Lab 1: Writing the Dockerfile

**Estimated AI conversations: 2-3**

1. Create a file named `Dockerfile` (no extension) in your project root.
2. **Step A: Plan the Container build.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a multi-stage Dockerfile for my FastAPI Task Organizer API.
   > - The base image should be a lightweight Python variant (e.g. `python:3.10-slim`).
   > - Set the working directory to `/app`.
   > - Install requirements first to utilize Docker's caching layers.
   > - Plan to copy code files, expose port `8000`, and define the `CMD` command to run the server using `uvicorn`.
   > - Ensure the container runs as a non-root user for security hygiene.
3. **Step B: Critique the container plan.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique this Dockerfile plan. Are we copying unnecessary files (like `.venv` or `.git`)? (Hint: we need a `.dockerignore` file). Is the final image size optimized?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to include a `.dockerignore` configuration file and optimized build layers.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the `Dockerfile` and `.dockerignore` files.
6. Verify your files look similar to this standard structure:
   * **`Dockerfile`:**
     ```dockerfile
     FROM python:3.10-slim

     WORKDIR /app

     # Install dependencies
     COPY requirements.txt .
     RUN pip install --no-cache-dir -r requirements.txt

     # Copy application code
     COPY . .

     # Create a non-root user and assign permissions
     RUN useradd -u 8888 appuser && chown -R appuser:appuser /app
     USER appuser

     EXPOSE 8000

     CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
     ```
   * **`.dockerignore`:**
     ```text
     .venv/
     __pycache__/
     *.db
     .git/
     .env
     ```
7. **Windows Users (WSL2 Workaround):** 
   *Note: If you run Windows and do not want to install WSL2 or Docker Desktop locally, you can skip local container builds. Your image will be compiled directly in the cloud by Render or GCP in Module 3. Proceed directly to Module 2.*
8. **Optional Local Build (Mac/Linux or WSL2 Windows):**
   - Build image: `docker build -t task-api .`
   - Run container: `docker run -p 8000:8000 --env-file .env task-api`
   - Query in a separate window: `curl -i http://localhost:8000/`

---

### Checkpoint
Create `checkpoint_01.md`:
- Paste the contents of your finished `Dockerfile` and `.dockerignore` files.
- Explain in 1-2 sentences why including a `.dockerignore` file prevents security issues (like leaking your secret key) when pushing Docker files.
