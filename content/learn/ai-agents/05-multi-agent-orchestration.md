---
title: "Multi-Agent Orchestration & HITL"
moduleNumber: 5
slug: "multi-agent-orchestration"
description: "Coordinate a Planner Agent and Auditor Agent using a Triage Router with Human-in-the-Loop approval gates."
soloCommand: "architect, critique, revise, code, test"
pillar: "03: Security-First"
checkpoint: true
---

# Module 5: Multi-Agent Orchestration & HITL

**Goal:** Build a multi-agent CLI supervisor that coordinates routing workflows and halts writes for manual student approval.

### What you need to know first

**Orchestration (The Router Pattern):** Instead of making one LLM do everything, you separate concerns by deploying specialized sub-agents:
- **Triage Router:** A lightweight prompt classifier that reads user requests and routes them to specialized agents (e.g., sending scheduling requests to the **Planner Agent**, and analytics checks to the **Auditor Agent**).
- **Planner Agent:** Creates structured milestone schedules.
- **Auditor Agent:** Scopes logs for procrastination and drift.

**Human-in-the-Loop (HITL):** A core design border in professional agent systems. When the Planner Agent generates database modifications, it must not apply them immediately. Instead, it writes a proposal to a local file and blocks execution, asking for manual user approval (`y/n`) in the terminal.

---

### The SOLO idea
Never let an agent operate blindly on user assets. Under **Pillar 03: Security-First**, we write a strict supervisor wrapper that monitors routing decisions and forces a secure fallback routing path if the model returns ambiguous classifications.

---

### Lab 5: Building the Orchestrator

**Estimated AI conversations: 3**

1. Create a script named `agent_coordinator.py`.
2. **Step A: Plan the Orchestration Layout.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a multi-agent coordinator script `agent_coordinator.py` using `google-genai` and the API connection classes.
   > - Build a Triage Router function that classifies user prompts into 'PLAN' or 'AUDIT'. If the classification is ambiguous, fallback default to 'PLAN'.
   > - The Router must print a routing log prefix to the terminal: `[Triage Router] Routing request to: [Agent Name]`.
   > - The Planner Agent generates study plans matching our Pydantic schema.
   > - Add a Human-in-the-Loop CLI gate: print the proposed tasks, halt execution using `input()`, and execute authenticated `POST /tasks` HTTP queries to write the plan to the cloud database only if the user types 'y'.
3. **Step B: Critique agent boundaries.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the multi-agent coordinator plan. How do we handle situations where some task requests succeed but others fail mid-write? How are API credential timeouts caught?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the code to include standard routing logs, fallback validations, and clean whitespace stripping on console inputs.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the python code in `agent_coordinator.py`.
6. Review your orchestration engine layout, verifying the routing and HITL validation checks:
   ```python
   import os
   import requests
   from google import genai
   from google.genai import types
   from planner import SyllabusPlan
   from memory import ChatMemory
   from agent_tools import get_jwt_token

   client = genai.Client()
   memory = ChatMemory()
   BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")

   def triage_router(prompt: str) -> str:
       response = client.models.generate_content(
           model='gemini-2.5-flash',
           contents=prompt,
           config=types.GenerateContentConfig(
               system_instruction="Classify request. Output only 'PLAN' if user wants a plan/schedule, or 'AUDIT' if they want status/analytics. Output nothing else."
           )
       )
       intent = response.text.strip().upper()
       if intent not in ["PLAN", "AUDIT"]:
           intent = "PLAN"
       
       print(f"[Triage Router] Routing request to: {intent} Agent")
       return intent

   def run_coordinator(user_prompt: str):
       intent = triage_router(user_prompt)
       
       if intent == "PLAN":
           response = client.models.generate_content(
               model='gemini-2.5-flash',
               contents=user_prompt,
               config=types.GenerateContentConfig(
                   response_mime_type="application/json",
                   response_schema=SyllabusPlan,
               )
           )
           plan = SyllabusPlan.model_validate_json(response.text)
           
           # Human-in-the-Loop (HITL) Gate
           print(f"\n[Proposed Plan] Topic: {plan.topic_name} ({plan.difficulty_level})")
           for t in plan.tasks:
               print(f" - {t.task_title} ({t.estimated_hours}h)")
           
           confirm = input("\nAccept proposed plan and write to cloud database? (y/n): ").strip().lower()
           if confirm == 'y':
               try:
                   token = get_jwt_token()
                   headers = {"Authorization": f"Bearer {token}"}
                   for t in plan.tasks:
                       requests.post(
                           f"{BASE_URL}/tasks",
                           json={"title": t.task_title, "hours": t.estimated_hours},
                           headers=headers
                       )
                   print("[Success] Plan successfully committed to the database.")
               except Exception as e:
                   print(f"[Error] Failed to write plan to API: {e}")
           else:
               print("[Cancelled] User rejected plan. No writes executed.")
   ```
7. Run the script prompting: *"I need to prepare for my math exam next week."* Verify that the triage routing path logs appear and the console halts waiting for your confirmation key.

---

### How to Mock Gemini API in Tests

Testing agents must not make real network API requests. Doing so slows down builds, wastes money, and risks rate limit drops. 

Instead, you use Python's `unittest.mock.patch` decorator to intercept calls to the global `client` object in your script and mock the returned class properties:

Create a file `test_coordinator.py`:
```python
from unittest.mock import MagicMock, patch
from agent_coordinator import triage_router

@patch("agent_coordinator.client")
def test_triage_router_routes_to_plan(mock_client):
    # 1. Create a mock response object mirroring SDK response structures
    mock_response = MagicMock()
    mock_response.text = "PLAN"
    
    # 2. Configure the mocked client to return our mock response
    mock_client.models.generate_content.return_value = mock_response

    # 3. Call the function and assert it handles the routing accurately
    result = triage_router("I need to study math")
    assert result == "PLAN"
    
    # 4. Verify that the SDK generate_content was called exactly once
    mock_client.models.generate_content.assert_called_once()
```

Run your agent tests:
```bash
pytest -v test_coordinator.py
```

---

### Checkpoint
Create `checkpoint_05.md`:
- Paste a copy of your console logs showing the triage path routing prefix `[Triage Router] Routing request to: PLAN Agent` followed by the proposed tasks and the HITL prompt.
- Explain in 1 sentence how the Human-in-the-Loop design protects database stores from malformed model writes.
- Paste your passing mock test suite logs from running `pytest -v test_coordinator.py`.
