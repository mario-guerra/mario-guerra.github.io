---
title: "Orientation: Authentication & Security"
moduleNumber: 0
slug: "orientation"
description: "Learn why security is a core system design pillar, and plan your secured API structure."
soloCommand: null
pillar: null
checkpoint: false
---

# Orientation: Authentication & Security

Welcome! In this curriculum, you'll learn how to secure your Task Organizer Web API. 

> [!NOTE]
> **Sequential Prerequisite (Step 3 of 5)**
> This program is **Step 3** in your learning path. To get the most out of it, make sure you have completed the **API Design** course first, as we build directly on top of the Task Organizer API codebase you developed in that course. 

Right now, your API is completely open to the world.
- Anyone can read all tasks.
- Anyone can edit or delete someone else's tasks.
- No user accounts exist.

### What is API Security?
Web API security consists of two foundational layers:
1. **Authentication (AuthN - Who are you?):** Verifying a user's identity through credentials like passwords and hashing, then generating temporary signed access keys.
2. **Authorization (AuthZ - What are you allowed to do?):** Guarding specific data and actions based on user roles and query ownership filters.

### What you will build
You will take the Task Organizer API from the previous course and secure it:
- You will add **user registration** with secure `bcrypt` hashing (no plain text storage).
- You will implement **token login** returning cryptographically signed stateless **JWT tokens**.
- You will write **dependency injectors** that act as auth gates on CRUD routes, ensuring database queries are scoped to the logged-in user.
- You will add **role permissions** restricting administration reports to authorized accounts.
- You will protect against standard vulnerabilities like credential guessing (rate limiting) and SQL injection.

Let's begin!
