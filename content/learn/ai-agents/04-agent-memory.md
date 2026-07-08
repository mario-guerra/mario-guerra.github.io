---
title: "Stateful Memory Serialization"
moduleNumber: 4
slug: "agent-memory"
description: "Build a sliding-window conversation history manager and serialize message states to disk."
soloCommand: "architect, critique, revise, code, test"
pillar: "05: Test-Driven"
checkpoint: true
---

# Module 4: Stateful Memory Serialization

**Goal:** Implement a conversation history class that saves logs to disk and prunes history to keep LLM context sizes small.

### What you need to know first

**The Stateless Border:** Large Language Models are completely stateless. They do not remember what you asked them three seconds ago. To build a continuous chat conversation, you must feed the entire history of past questions and answers back into the API on every new request.

**The SDK Serialization Trap:** The Gemini SDK uses rich Python classes (like `GenerateContentResponse`) to hold results. If you try to save these classes directly to disk using `json.dump()`, Python will crash with a `TypeError` because the classes are not JSON-serializable.
- You must extract the raw text and role names and convert them into flat Python dictionaries (like `{"role": "user", "text": "..."}`) before serialization.

**Token Bloat & Rate Limits:** The more messages you append to your history, the more tokens you send. This will quickly hit the free-tier rate limits. A standard solution is a **sliding-window buffer** that keeps only the last few messages in memory.

---

### The SOLO idea
Automation logic must be testable. Under **Pillar 05: Test-Driven**, we build a memory manager class separate from the LLM client, allowing us to write unit tests that verify historical pruning without executing slow API requests.

---

### Lab 4: Local Memory Management

**Estimated AI conversations: 2-3**

1. Create a script named `memory.py`.
2. **Step A: Plan the Memory Class.** Open Copilot Chat and type:
   > Follow #file:workflows/architect.md — Plan a sliding-window conversation memory manager in `memory.py`.
   > - Write a class `ChatMemory` that loads and saves messages to a local `history.json` file.
   > - Messages should be stored as a list of flat dictionaries: `[{"role": "user", "text": "..."}, {"role": "model", "text": "..."}]`.
   > - Implement an `add_message(role, text)` method.
   > - Implement a `get_context()` method that returns only the last 5 messages, automatically pruning older entries.
3. **Step B: Critique serialization boundaries.** In the same conversation, type:
   > Follow #file:workflows/critique.md — Critique the memory manager design. What happens if the `history.json` file is corrupted or contains invalid JSON syntax? Does the class handle loading empty files gracefully?
4. **Step C: Revise.**
   > Follow #file:workflows/revise.md — Revise the code to add fallback try-except blocks for corrupted files, returning a clean history array.
5. **Step D: Implement.**
   > Follow #file:workflows/code.md — Write the code in `memory.py`.
6. Review your class implementation, ensuring it maps messages to flat list types:
   ```python
   import json
   import os

   class ChatMemory:
       def __init__(self, filename="history.json", max_turns=5):
           self.filename = filename
           self.max_turns = max_turns
           self.history = self.load_history()

       def load_history(self) -> list:
           if not os.path.exists(self.filename):
               return []
           try:
               with open(self.filename, "r") as f:
                   return json.load(f)
           except (json.JSONDecodeError, IOError):
               print(f"[Warning] Corrupted memory file {self.filename}. Initializing fresh.")
               return []

       def save_history(self):
           try:
               with open(self.filename, "w") as f:
                   json.dump(self.history, f, indent=2)
           except IOError as e:
               print(f"[Error] Failed to write memory: {e}")

       def add_message(self, role: str, text: str):
           self.history.append({"role": role, "text": text})
           # Sliding window: keep only the last max_turns messages
           if len(self.history) > self.max_turns * 2:  # 5 turns = 10 messages (user + model)
               self.history = self.history[-(self.max_turns * 2):]
           self.save_history()

       def get_context(self) -> list:
           return self.history
   ```
7. **Write Unit Tests:** Create a test file `test_memory.py` and write tests to assert:
   - Adding a 11th message automatically trims the oldest message from `history.json`.
   - Corrupted JSON syntax in `history.json` is handled without throwing crashes.
8. Run your tests locally:
   ```bash
   pytest -v test_memory.py
   ```

---

### Checkpoint
Create `checkpoint_04.md`:
- Paste the test suite code from `test_memory.py`.
- Paste your terminal's `pytest` passing output.
- Explain in 1 sentence why converting SDK response objects to flat dictionaries is necessary before calling `json.dump()`.
