---
title: "Test-Driven Development"
moduleNumber: 6
slug: "test-driven"
description: "Write tests before code to create a reliable safety net for your AI."
soloCommand: "test, code"
pillar: "05: Test-Driven"
checkpoint: true
---

# Module 6: Test-Driven Development

**Pillar 05:** *"Green and clean, no exceptions."*

### What you need to know first

**Test:** A small program that runs your program and checks if it does the right thing. Instead of you manually running the program and typing inputs to check, a test does it automatically.

**Example:**
```python
# Your function
def add_hours(existing, new):
    return existing + new

# A test for that function
def test_add_hours():
    assert add_hours(2.0, 1.5) == 3.5      # normal case
    assert add_hours(0, 5) == 5              # zero case
    assert add_hours(0, 0) == 0              # both zero
```

The `assert` statement says "this must be true, and if it's not, the test fails." You run all your tests after every change, and if any fail, you know exactly what broke.

**pytest:** A Python tool that finds and runs all your test files automatically. You'll install it with `pip install pytest` and run it with `pytest` in your terminal.

**Test-Driven Development (TDD):** Writing the tests *before* writing the code. This sounds backward, but it forces you to think about what the code should do before thinking about *how* it does it.

### The SOLO idea
In agentic coding, tests are your safety net. The AI will change your code — sometimes correctly, sometimes not. Tests catch the "not" cases automatically. Without tests, you're manually checking every feature after every AI change. With tests, you type `pytest` and know in 2 seconds if anything broke.

SOLO adds one critical rule: **the AI is never allowed to modify a test to make it pass.** If a test fails, the AI must fix the *code*, not the test. This prevents the AI from silently lowering your standards.

### Reading
- SOLO blog: Pillar 05
- Open `workflows/test.md` in VS Code — note the strict prohibition on test hacking
- Open `workflows/code.md` — note "Truth in Tests" and "Mandatory TDD"

---

### Lab 6: Tests as a Safety Net

**Estimated AI conversations: 2-3**

1. **Set up pytest:**
   ```bash
   pip install pytest
   ```

2. **Write tests first.** Before implementing anything, type in Copilot Chat:
   > Based on #file:SPEC.md, I want to write tests for the study tracker. We're using pytest. Write test functions for these scenarios — but DON'T write the actual implementation yet:
   > - Logging a session with valid data saves it correctly
   > - Logging a session with empty class name is rejected
   > - Logging a session with negative hours is rejected
   > - Logging a session with non-numeric hours is rejected
   > - Listing sessions when no sessions exist shows an empty message
   > - Deleting a session that exists removes it
   > - Deleting a session that doesn't exist shows an error
   > - Summary shows correct total hours per class

3. **Run the tests** — they should all fail (since the code doesn't exist yet):
   ```bash
   pytest -v
   ```
   This is correct! Failing tests are the starting point.

4. **Now implement.** In Copilot Chat, type:
   > Follow #file:workflows/code.md — Here is my spec: #file:SPEC.md and my plan: #file:PLAN_v2.md. Implement the study tracker so that all existing tests pass.

5. **Run tests again:**
   ```bash
   pytest -v
   ```
   Watch them go green. If any fail, tell the AI: *"These tests are failing. Fix the code, not the tests."*

6. **Test your safety net.** Open one of the source files and make a small, intentional change — for example, remove the check that rejects negative hours. Run `pytest` again. Does a test catch it? If yes, the net works. Undo your change (`git checkout -- .`).

7. **Commit:**
   ```bash
   git add .
   git commit -m "Implemented with tests"
   git push
   ```

> **The mental model:** Tests are a contract between you and the AI. You define what "correct" means. The AI is free to write whatever code it wants, as long as the tests pass. Weak tests = weak code. Rigorous tests = rigorous code.
