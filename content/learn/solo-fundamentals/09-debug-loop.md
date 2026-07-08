---
title: "The Debug Loop"
moduleNumber: 9
slug: "debug-loop"
description: "Shift from band-aid patches to root cause analysis using the Sherlock Holmes method."
soloCommand: "sherlock"
pillar: null
checkpoint: true
---

# Module 9: The Debug Loop — Investigation Over Band-Aids

**The SOLO Debug Loop:** *"Find the cause, don't just treat the symptom."*

### What you need to know first

**Root cause:** The actual reason something broke, not the place where you first notice it. Example: Your program shows the wrong total hours. The symptom is "wrong number on screen." The root cause might be "hours are stored as strings instead of numbers, so `'2' + '3'` equals `'23'` instead of `5`."

**Band-aid fix:** Changing the code at the symptom without understanding why. Example: Adding `int()` around the display output instead of fixing the storage format. This "works" until something else reads the stored strings and breaks.

**Root cause analysis:** Systematically tracing backward from the symptom to find the actual cause. "Where is this number coming from? What function produces it? What data does that function receive? Is that data correct? If not, where does *it* come from?" — follow the chain until you find the actual mistake.

### The SOLO idea
When something breaks, the AI's instinct is to patch the symptom. It'll add a type conversion here, a try/except there, a special-case check somewhere. Each patch makes the code harder to understand and hides the real problem.

The `/sherlock` command tells the AI to *investigate* instead of *fix*. It finds the root cause and reports back without changing any code. Then you decide how to fix it properly.

### Reading
- SOLO blog: "The debug loop"
- Open `workflows/sherlock.md` in VS Code — it's deliberately short. The power is in the persona shift, not a long checklist.

---

### Lab 9: Plant a Bug, Hunt a Bug

**Estimated AI conversations: 2-3**

You're going to plant a specific bug, then compare two debugging approaches.

1. **Plant the bug.** Open `storage.py` (or wherever your save function is) and make this change:

   When saving a session, convert hours to a string instead of keeping it as a number:
   ```python
   # BEFORE (correct):
   session = {"class": class_name, "date": date, "hours": hours}

   # AFTER (buggy):
   session = {"class": class_name, "date": date, "hours": str(hours)}
   ```

   This is subtle. The program will still work for logging and listing. But the summary (total hours per class) will break — it'll concatenate strings instead of adding numbers: `"2.0" + "3.0"` = `"2.03.0"` instead of `5.0`.

2. **Commit the bug** (so you can reset later):
   ```bash
   git add .
   git commit -m "Planted bug for debugging exercise"
   ```

3. **Approach A: No Sherlock.** Open a new Copilot Chat conversation (click the + icon) and type:
   > My study tracker's summary command is showing weird numbers. Instead of showing "5.0" hours for CS 101, it shows "2.03.0". Can you fix it?

   Let the AI fix it. Look at what it does — does it fix the *symptom* (add a type conversion in the summary function) or the *cause* (fix the storage format)?

   Save the AI's response/fix as `debug_approach_a.md`.
   Then undo the fix: `git checkout -- .`

4. **Approach B: Sherlock.** Open another new Copilot Chat conversation and type:
   > Follow #file:workflows/sherlock.md — My study tracker's summary command is showing weird numbers. Instead of showing "5.0" hours for CS 101, it shows "2.03.0". Investigate and report your findings. Do not fix anything.

   Read the investigation. Does it trace the data from storage → loading → summary calculation and identify that the data is being stored as strings?

   Save the AI's response as `debug_approach_b.md`.

5. **Compare:** Which approach found the real cause? Which would have led to a cleaner fix?

6. **Fix it properly** — fix the storage code (the root cause), then run `pytest` to verify:
   ```bash
   pytest -v
   git add .
   git commit -m "Fixed storage bug (root cause, not symptom)"
   git push
   ```
