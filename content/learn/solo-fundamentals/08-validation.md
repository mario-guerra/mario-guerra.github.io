---
title: "Validate Inputs and Handle Errors"
moduleNumber: 8
slug: "validation"
description: "Build robust defensive layers at your program's boundaries to prevent crashes."
soloCommand: "code"
pillar: "03: Security-First"
checkpoint: true
---

# Module 8: Validate Inputs and Handle Errors

**Pillar 03:** *"Build the walls before you furnish the house."*

### What you need to know first

**Input validation:** Checking that data is acceptable *before* your program tries to use it. If someone types "abc" when you asked for a number, your program should catch that at the front door — not crash somewhere deep in the math.

**Error handling:** Deciding what your program does when something goes wrong. Crashing is the worst option. Silently ignoring the error is almost as bad (the user thinks it worked, but it didn't). The right answer: tell the user what went wrong in plain language and let them try again.

**Defense in depth:** A security concept that means "don't rely on one layer of protection." For your program, this means: validate inputs at the boundary (where the user types them) *and* have your functions check their own inputs too. Belt *and* suspenders.

### The SOLO idea
Pillar 03 in the blog is called "Security-First Architecture." For enterprise web applications, this means authentication, encryption, and access control. For your CLI tool, the same *principle* applies at a simpler scale: **don't trust inputs, handle every error, and do it before writing features — not after.**

The `/security` workflow is designed for web applications and would be overkill here. Instead, you'll apply the underlying principle: validate early, fail gracefully, never crash.

---

### Lab 8: Bulletproof Your Program

**Estimated AI conversations: 1-2**

1. **Catalog every input your program accepts** from the user. For each one, list what "bad input" looks like:

   | Input | Valid | Invalid |
   |-------|-------|---------|
   | Class name | Non-empty string | Empty string, only spaces |
   | Hours | Positive number | Zero, negative, letters, symbols |
   | Date | YYYY-MM-DD format | Wrong format, future date (?), Feb 30 |
   | Session number (for delete) | Exists in the list | Doesn't exist, not a number, negative |

2. **Write tests for every invalid input** before fixing the code:
   ```python
   def test_reject_empty_class_name():
       result = validate_class_name("")
       assert result is not None  # should return an error message

   def test_reject_negative_hours():
       valid, _ = validate_hours("-5")
       assert valid is False

   def test_reject_letters_as_hours():
       valid, _ = validate_hours("abc")
       assert valid is False
   ```

3. **Run the tests** — some will probably fail because your validation isn't complete yet.

4. **Fix the code** (not the tests) until everything passes.

5. **Try to crash your program manually.** Open a terminal, run the program, and try to break it:
   - Enter nothing (just press Enter) at every prompt
   - Enter extremely long strings (paste 10,000 characters)
   - Enter special characters: `"; DROP TABLE sessions; --`
   - Delete `sessions.json` while the program is running, then try to list sessions
   - Make `sessions.json` contain `{invalid json` and then run the program

6. For every crash you find, **write a test that reproduces it**, then fix the code.

7. **Commit:**
   ```bash
   git add .
   git commit -m "Input validation and error handling"
   git push
   ```

> **The principle that scales:** Right now you're validating keyboard input. In a web application, you'd validate HTTP requests. In a mobile app, you'd validate user interface input. The technique is different; the principle is identical: never trust the input, check everything at the boundary.
