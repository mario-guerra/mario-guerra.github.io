---
title: "Structured Outputs (Pydantic)"
moduleNumber: 2
slug: "structured-outputs"
description: "Force LLMs to return strict JSON data matching Pydantic schemas to prevent parsing crashes."
soloCommand: "architect, critique, revise, code, test"
pillar: "02: API-First"
checkpoint: true
---

# Module 2: Structured Outputs (Pydantic)

**Goal:** Force the LLM to output structured JSON data that maps directly to a Pydantic model, allowing your Python code to parse it safely.

### What you need to know first

**The Parsing Failure Mode:** If you ask an LLM to "return data as JSON," it will often return markdown wrappers (like ` ```json ... ``` `), trailing text explanations, or slightly mismatched keys. If you try to parse this text with `json.loads()`, your script will crash with a `JSONDecodeError`.

**Structured Outputs:** In modern API engineering, you configure the model's response configuration to enforce a strict JSON schema. The model is forced to conform its output keys and types to match your specified Pydantic schema, guaranteeing that every response is safely parseable.

---

### The SOLO idea
We design our data models before writing generation endpoints. Following **Pillar 02: API-First**, we write our validation schemas using Pydantic classes and run critiques to check if the schema handles empty values or lists cleanly.

---

### Lab 2: Generating Study Milestones

**Estimated AI conversations: 3**

1. Create a script named `planner.py`.
2. **Step A: Plan the Structured Schema.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a study milestone generator script using Pydantic and the `google-genai` SDK.
   > - Define a Pydantic schema class named `StudyTask` (fields: `task_title`, `estimated_hours`).
   > - Define a parent schema class named `SyllabusPlan` (fields: `topic_name`, `difficulty_level`, `tasks` which is a list of `StudyTask`).
   > - Configure Gemini to accept a topic request and return responses conforming to the `SyllabusPlan` schema.
3. **Step B: Critique schema edge cases.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique this structured output plan. What happens if the model estimates negative study hours? (Hint: we can add validation annotations to Pydantic fields). How are JSON parsing exceptions caught?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the plan to add Pydantic Field constraints (e.g., `gt=0` for hours) and implement robust exception handling.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the python code in `planner.py`.
6. Verify your implementation uses the standard schema definition parameters:
   ```python
   from pydantic import BaseModel, Field
   from google import genai
   from google.genai import types

   client = genai.Client()

   class StudyTask(BaseModel):
       task_title: str = Field(description="Specific, actionable study task")
       estimated_hours: float = Field(gt=0, description="Hours required, must be greater than 0")

   class SyllabusPlan(BaseModel):
       topic_name: str
       difficulty_level: str = Field(description="Beginner, Intermediate, or Advanced")
       tasks: list[StudyTask]

   def generate_syllabus(topic: str) -> SyllabusPlan:
       try:
           response = client.models.generate_content(
               model='gemini-2.5-flash',
               contents=f"Generate a study syllabus for learning: {topic}",
               config=types.GenerateContentConfig(
                   response_mime_type="application/json",
                   response_schema=SyllabusPlan,
               ),
           )
           # The SDK automatically handles verification and returns the model parsed
           return SyllabusPlan.model_validate_json(response.text)
       except Exception as e:
           print(f"Failed to generate structured plan: {e}")
           raise
   ```
7. Run the script and verify that printing the output shows a clean Python object, not raw text strings.

---

### Checkpoint
Create `checkpoint_02.md`:
- Paste the Pydantic classes and the model validation method from your code.
- Paste a copy of the validated Python object printed in your terminal.
